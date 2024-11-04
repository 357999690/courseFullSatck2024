import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop : 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const update = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(id, changedBlog))
  }

  const blogsDelete = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(id))
    }
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const shownWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const showUser = () => {
    if(blog.user) {
      return (
        <div>
          <p>{blog.user.name}</p>
          {user === blog.user.name ?
            <button onClick={() => blogsDelete(blog.id)}>remove</button> :
            null}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='titleAuthor' data-testid='blogShown'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={shownWhenVisible} className='togglableContent'>
        <div>
          { blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>

        <p id='url-text'>{blog.url}</p>
        <div className='likes'>
        likes {blog.likes}
          <button onClick={() => update(blog.id)}>like</button>
        </div>
        {showUser()}
      </div>
    </div>
  )
}

export default Blog