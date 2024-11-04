const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initalBlogs)
    })

    test('blogs are returned as json and there are two blogs', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await helper.blogsInDb()

        assert.strictEqual(response.length, helper.initalBlogs.length)
    })

    test('unique identifier call id', async () => {
        const blogsAtDb = await helper.blogsInDb()
        const oneBlog = blogsAtDb[0]
        const oneBlogKeys = Object.keys(oneBlog)

        assert(oneBlogKeys.includes('id'))
    })

    describe('addition of a new blog', async () => {
        test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ authorization: 'abc'})
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length +1 )

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Canonical string reduction'))
})

test('likes default 0', async () => {
    const newBlog = {
        title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlogCreated = blogsAtEnd[blogsAtEnd.length - 1]

    assert.strictEqual(lastBlogCreated.likes, 0)
})

test('title missing return status code 400', async () => {
    const newBlog = {
        
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    }

    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)

     
})

test('url missing return status code 400', async () => {
    const newBlog = {
        title: "Type wars",
          author: "Robert C. Martin",
          
          likes: 2,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length - 1)

            const titles = blogsAtEnd.map(b => b.title)
            assert(!titles.includes(blogToDelete.title))
        })
    })

    describe('update blog', () => {
        test('return update blog', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const blogUpdate = {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 8,
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogUpdate)
                

            const blogsAtEnd = await helper.blogsInDb()
            const updtaeBlog = blogsAtEnd[0]

            assert.strictEqual(updtaeBlog.likes, blogUpdate.likes)
        })
    })
    
})

after(async () => {
    await mongoose.connection.close()
})