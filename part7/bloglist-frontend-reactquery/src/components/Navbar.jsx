import { Link } from "react-router-dom"

const Navbar = ({ name, logout }) => {
  
    const padding = {
    padding: 5
  }

  return (
    <div>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='users'>users</Link>
      {name} logged in
      <button onClick={logout}>logout</button>
      </div>
  )

}

export default Navbar