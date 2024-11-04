import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, blogDelete }) => {
  const [visible, setVisible] = useState(false)

  // console.log(blog.user.toString() === user.id.toString())
  console.log(blog)

  const blogStyle = {
    paddingTop : 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const update = () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: user }
    updateBlog(newBlog, blog.id)
  }

  const blogsDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogDelete(blog.id)
    }
  }

  // const blogsDelete = () => {
  //   blogDelete(blog.id)
  // }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const shownWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const showUser = () => {
    if(blog.user) {
      return (
        <div>
          <p>{blog.user.name}</p>
          {user === blog.user.name ?
            <button onClick={blogsDelete}>remove</button> :
            null}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='titleAuthor' data-testid='blogShown'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={shownWhenVisible} className='togglableContent'>
        <div>
          { blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>

        <p id='url-text'>{blog.url}</p>
        <div className='likes'>
        likes {blog.likes}
          <button onClick={update}>like</button>
        </div>
        {showUser()}
        {/* <p>{blog.user.name}</p> */}
        {/* {user === blog.user.name ?
          <button onClick={blogsDelete}>remove</button> :
          null} */}
      </div>
    </div>
  )
}

// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}
//     <button>view</button>
//   </div>
// )

export default Blog