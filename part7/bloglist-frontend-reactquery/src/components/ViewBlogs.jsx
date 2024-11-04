// import Blog from './Blog'

import { Link } from "react-router-dom"

// const ViewBlogs = ({ blogs, updateBlog, user, blogDelete }) => {
//   return (
//     <div>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} blogDelete={blogDelete}/>
//       )}
//     </div>
//   )
// }

const ViewBlogs = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ViewBlogs