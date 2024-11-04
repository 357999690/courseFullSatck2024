import PropTypes from 'prop-types'

const LoginForm = ({ message, handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>log in to application</h2>
      {message === null ?
        null:
        <div>{message}</div>}
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

LoginForm.propTypes = {
  handleLogin:PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm