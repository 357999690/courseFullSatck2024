const NameUser = ({ message, user, logOut }) => {
  // console.log(user)
  return (
    <div>
      <h2>blogs</h2>
      {message === null ?
        null :
        <div>{message}</div>}
      <p>{user.username} logged in</p>
      <button onClick={logOut}>logOut</button>
    </div>
  )
}

export default NameUser