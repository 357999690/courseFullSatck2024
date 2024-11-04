import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import Togglable from './components/Togglable'
import NameUser from './components/NameUser'
import BlogForm from './components/BlogForm'
import ViewBlogs from './components/ViewBlogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Navbar from './components/Navbar'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient }  from '@tanstack/react-query'
import UserContext from './components/UserContext'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'



const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SETNOTIFICATION':
    return state = action.payload
  default:
    return state
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SETUSER':
    return state = action.payload
  default:
    return state
  }
}


const App = () => {
  
  const queryClient = useQueryClient()

  


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [User, setUser] = useState(null)

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const [user, userDispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SETUSER', payload: user })
      blogService.setToken(user.token)

    }
  }, [])

  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    } })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })

    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.blogDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const commentsUpdateBlogMutation = useMutation({
    mutationFn: blogService.commentsUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
  })

   const usersResult = useQuery({
        queryKey: ['users'],
        queryFn: () => usersService.getAll()
      })

  if( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const users = usersResult.data
  // console.log(users)

  




  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)


    // const response = newBlogMutation.mutate(blogObject)
    // response.user = user
    // console.log(response)


    notificationDispatch({ type: 'SETNOTIFICATION', payload: `a new blog ${blogObject.title} by ${blogObject.author} added` })
    setTimeout(() => {
      notificationDispatch({ type: 'SETNOTIFICATION', payload: null })
    }, 5000)
  }

  const updateBlog =  (newBlogObject) => {
    console.log(newBlogObject.id)
    updateBlogMutation.mutate({ ...newBlogObject, likes : newBlogObject.likes + 1 })
    // const response = await blogService.update(id, newBlogObject)


  }

  const blogDelete = async (id) => {
    deleteBlogMutation.mutate(id)
    // await blogService.blogDelete(id)
  }

  const commentUpdate = async (blog) => {
    commentsUpdateBlogMutation.mutate(blog)
    // console.log(comment.comment)
  }

  const logOut = () => {
    userDispatch({ type: 'SETUSER', payload: null })
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const viewBlogsAndNameUser = () => {
    return (
      <div>
        <NameUser message={notification} user={user} logOut={logOut}/>
        <Togglable buttonLabel='a new blog' ref={blogFormRef} buttonCancel='cancel'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <ViewBlogs blogs={blogs} />

        {/* <ViewBlogs blogs={blogs} updateBlog={updateBlog} user={user.name} blogDelete={blogDelete}/> */}
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
      userDispatch({ type: 'SETUSER', payload: user })
      setUsername('')
      setPassword('')
      





    } catch (exception) {
      notificationDispatch({ type: 'SETNOTIFICATION', payload: 'wrong credentials' })
      setTimeout(() => {
        notificationDispatch({ type: 'SETNOTIFICATION', payload: null })
      }, 5000)
    }
  }

  if ( user === null ) {
    return <LoginForm message={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
  }

  return (
    <Router>
      
      <Navbar name={user.name} logout={logOut} />

      <Routes>
        <Route path='/blogs/:id' element={<Blog blogs={blogs} name={user.name} logOut={logOut} updateBlog={updateBlog} username={user.username} blogDelete={blogDelete} commentUpdate={commentUpdate} />} />
        <Route path="/users/:id" element={<User users={users} logOut={logOut} />} />
        <Route path='/' element={<Home user={user} notification={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} viewBlogsAndNameUser={viewBlogsAndNameUser} />} />
        <Route path='/users' element={<Users username={user.username} logOut={logOut} users={users} />} />
      </Routes>
      {/* <div>
        {user === null ?
          <LoginForm message={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> :
          viewBlogsAndNameUser()}
      </div> */}

    </Router>

  )
}

export default App