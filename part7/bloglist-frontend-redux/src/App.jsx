import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import NameUser from './components/NameUser'
import BlogForm from './components/BlogForm'
import ViewBlogs from './components/ViewBlogs'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, updateBlog } from './reducers/blogReducer'
import { useSelector } from 'react-redux'
import { addLogin } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const User = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addLogin(user))
      // setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogObject, User))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 10))
  }

  const likes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(id,changedBlog))
  }

  const blogDelete = () => null

  const logOut = () => {
    dispatch(addLogin(null))
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const viewBlogsAndNameUser = () => {
    return (
      <div>
        <NameUser user={User} logOut={logOut}/>
        <Togglable buttonLabel='a new blog' ref={blogFormRef} buttonCancel='cancel'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>

        <ViewBlogs  user={User.name} blogDelete={blogDelete}/>
      </div>
    )
  }

  return (
    <>
      {User === null ?
        <LoginForm/> :
        viewBlogsAndNameUser()}
    </>

  )
}

export default App