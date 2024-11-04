import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      const blogChanged = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(b =>
        b.id !== id ? b : blogChanged
      )
    },
    deleteBlog (state, action) {
      const id = action.payload
      return state.filter(b =>
        b.id !== id
      )
    }
  }
})

export const { setBlogs, appendBlog, like, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog  = await blogService.create(blog)
    newBlog.user = user
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (id, newBlog) => {
  return async dispatch => {
    const updateBlog = await blogService.update(id, newBlog)
    dispatch(like(updateBlog.id))
  }
}

export const deleteBlogs = (id) => {
  return async dispatch => {
    await blogService.blogDelete(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer