import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NameUser from './components/NameUser'
import BlogForm from './components/BlogForm'
import ViewBlogs from './components/ViewBlogs'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [User, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()



    const response = await blogService.create(blogObject)
    response.user = User
    setBlogs(blogs.concat(response))

    setMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = async (newBlogObject, id) => {
    const response = await blogService.update(id, newBlogObject)
    response.user = User
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
  }

  const blogDelete = async (id) => {
    await blogService.blogDelete(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const viewBlogsAndNameUser = () => {
    return (
      <div>
        <NameUser message={message} user={User} logOut={logOut}/>
        <Togglable buttonLabel='a new blog' ref={blogFormRef} buttonCancel='cancel'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>

        <ViewBlogs blogs={blogs} updateBlog={updateBlog} user={User.name} blogDelete={blogDelete}/>
      </div>
    )
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')




    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {User === null ?
        <LoginForm message={message} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> :
        viewBlogsAndNameUser()}
    </>

  )
}

export default App