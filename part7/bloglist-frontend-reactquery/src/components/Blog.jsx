import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// const Blog = ({ blog, user, updateBlog, blogDelete }) => {
//   const [visible, setVisible] = useState(false)

  

//   const blogStyle = {
//     paddingTop : 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   const update = () => {
    
//     updateBlog(blog)
//   }

 

  

  

//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const shownWhenVisible = { display: visible ? '' : 'none' }

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }




//   return (
//     <div style={blogStyle}>
//       <div style={hideWhenVisible} className='titleAuthor' data-testid='blogShown'>
//         {blog.title} {blog.author}
//         <button onClick={toggleVisibility}>view</button>
//       </div>
//       <div style={shownWhenVisible} className='togglableContent'>
//         <div>
//           { blog.title} {blog.author}
//           <button onClick={toggleVisibility}>hide</button>
//         </div>

//         <p id='url-text'>{blog.url}</p>
//         <div className='likes'>
//         likes {blog.likes}
//           <button onClick={update}>like</button>
//         </div>
//         {showUser()}
        
//       </div>
//     </div>
//   )
// }

const Blog = ({ blogs, name, logOut, updateBlog, username, blogDelete, commentUpdate }) => {
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const update = () => {
    updateBlog(blog)
  }

  const commentsUpdate = (event) => {

    event.preventDefault()
    
    commentUpdate({ ...blog, comments: comment })
  }

  const blogsDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogDelete(blog.id)
      navigate('/')
    }
  }

  const showUser = () => {
    if(blog.user) {
      return (
        <div>
          {/* <p>{blog.user.name}</p> */}
          {name === blog.user.name ?
            <button onClick={blogsDelete}>remove</button> :
            null}
        </div>
      )
    } else {
      return null
    }
  }
  
  return (
    <div>
      <h1>blogs</h1>
      <p>{name} logged in</p>
      <button onClick={logOut}>logout</button>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <div>
        <p>{blog.likes} likes</p>
        <button onClick={update}>like</button>
      </div>
      {showUser()}
      <p>added by {username}</p>
      <div>
        <h2>comments</h2>
        <form onSubmit={commentsUpdate}>
          <div>
            <input
             type='text'
             value={comment}
             name='Comment'
             onChange={({ target }) => setComment(target.value)}/>
          </div>
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) =>
          <li key={i}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}



export default Blog