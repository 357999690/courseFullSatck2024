require('dotenv').config()
const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username:1, name:1 })
    // .populate('comments', {comment: 1})
    response.json(blogs)
    // Blog.find({}).then(blogs => {
    //     response.json(blogs)
    // })
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid'})
    // }

    const user = request.user
    

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

})

// blogsRouter.post()

// blogsRouter.put('/:id/comments', async (request, response, next) => {

//     const blog = await Blog.findById(request.params.id)
//     // console.log(blog)

//     // const newBlog = {...blog, comments: blog.comments.concat(request.body.comments) }

//     // const updateBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new : true})

//     response.json(blog)
// })

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid'})
    // }

    const user = request.user

    const blog =await Blog.findById(request.params.id)
    
    if(!blog) {
        return response.status(400).json({ error: 'blog not found'})
    }
    
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).json({ error: 'delete invalid'})
    }
    
})

blogsRouter.put('/:id', async (request, response) => {
    // const blog = await Blog.findById(request.params.id)


    const body = request.body

    // const newBlog = {...blog, likes: body.likes,comments: blog.comments.push(body.comments)}
    

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        
        
    }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    
    response.json(updateBlog)
})

// blogsRouter.post('/:id/comments', async (request, response) => {
//     const blog = await Blog.findById(request.params.id)

//     const comment = new Comment({
//         comment : request.body.comment
//         // blog: blog.id
//     })

//     // console.log(request.body.comment)


//     // const comment = request.body.comment
//     // blog.comments = blog.comments.concat(comment)
  
//     const savedComment = await comment.save()
//     blog.comments.push(savedComment.comment)
//     blog.save()
//     response.status(201).end()
//   })

blogsRouter.post('/:id/comments', async (request, response) => {
    const { comment } = request.body
  
   
  
    const blog = await Blog.findById(
      request.params.id,
    )
  
    blog.comments = blog.comments.concat(comment)
  
    await blog.save()
    response.status(201).end()
  })

module.exports = blogsRouter