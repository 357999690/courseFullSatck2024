import { useParams } from "react-router-dom";

const User = ({ users, logOut }) => {

    // console.log(users)
    const id = useParams().id
    // console.log(id)
    const user = users.find(u => u.id === id)
    
    return (
        <div>
            <h1>blogs</h1>
            <p>{user.name} logged in</p>
            <button onClick={logOut}>logout</button>
            <h1>{user.username}</h1>
            <p>added blogs</p>
            <ul>
                {user.blogs.map(blog =>
                    <li key={user.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>
    )

}

export default User