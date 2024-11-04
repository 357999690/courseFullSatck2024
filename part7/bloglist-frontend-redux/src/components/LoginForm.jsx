import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notication = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(initializeUser(username, password, setUsername, setPassword))
  }

  return (
    <div>
      <h2>log in to application</h2>
      {notication === null ?
        null:
        <div>{notication}</div>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid = 'username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input
            data-testid = 'password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm