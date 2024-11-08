require('dotenv').config()
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



const userExtractor = async (request, response, next) => {
    const authorization = request.get('Authorization')
    let token = ''
    if (authorization && authorization.startsWith('Bearer ')) {
                 token = authorization.replace('Bearer ', '')
            }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        response.status(401).json({ error: 'token invalid'})
    } 
        request.user = await User.findById(decodedToken.id)
    

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}



const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
        
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
        return response.status(400).json({ error: 'expected `username` to be unique'})
    } else if (error.name === 'jsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    
    userExtractor,
}