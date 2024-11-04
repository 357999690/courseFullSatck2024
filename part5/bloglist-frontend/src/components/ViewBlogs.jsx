import Blog from './Blog'

const ViewBlogs = ({ blogs, updateBlog, user, blogDelete }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} blogDelete={blogDelete}/>
      )}
    </div>
  )
}

export default ViewBlogs