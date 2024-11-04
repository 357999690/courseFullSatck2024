import { useSelector } from 'react-redux'

const NameUser = ({ user, logOut }) => {
  const notication = useSelector(state => state.notification)
  return (
    <div>
      <h2>blogs</h2>
      {notication === null ?
        null :
        <div>{notication}</div>}
      <p>{user.username} logged in</p>
      <button onClick={logOut}>logOut</button>
    </div>
  )
}

export default NameUser