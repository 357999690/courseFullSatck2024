import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { useQuery, useQueryClient }  from '@tanstack/react-query'

const Users = ({ username, logOut, users }) => {

    // const usersResult = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => usersService.getAll()
    //   })
    
    //   if( usersResult.isLoading ) {
    //     return <div>loading data...</div>
    //   }
    
    //   const users = usersResult.data

  const usersName = users.map(u => u.name)
  const usersBlogCreated = users.map(u => u.blogs.length)

const usersView = [
        usersName,
        usersBlogCreated
  ]

    

  return (
    <div>
      <h1>blogs</h1>
      {/* <p>{username} logged in</p>
      <button onClick={logOut}>logout</button> */}
      <h2>Users</h2>
      <div>
        <table>
            <thead>
                <tr>
                <th></th>
                <th>blogs created</th>

                </tr>
            </thead>
            <tbody>
                {/* {usersView.map((u,i) =>
                <tr key={i}>
                    {u.map((us, i) =>
                    <td key={i}>{us}</td>)}
                </tr>)} */}
                {users.map(u => 
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </td>
                            <td>{u.blogs.length}</td>
                        </tr>
                )}
                {/* {users.map((u, i)=>
                    <tr key={i}>
                        <td>{u.blogs.length}</td>
                    </tr>
                )} */}
            </tbody>
            
        </table>
      </div>
    </div>
  )
}

export default Users