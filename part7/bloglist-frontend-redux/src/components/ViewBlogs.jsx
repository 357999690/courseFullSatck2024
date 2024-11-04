import { useSelector } from 'react-redux'
import Blog from './Blog'

const ViewBlogs = ({ user, blogDelete }) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  user={user} blogDelete={blogDelete}/>
      )}
    </div>
  )
}

export default ViewBlogs