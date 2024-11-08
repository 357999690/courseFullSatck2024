require('dotenv').config()

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username:1, name:1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    

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



blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    

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
    


    const body = request.body

    

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        
        
    }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    
    response.json(updateBlog)
})


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