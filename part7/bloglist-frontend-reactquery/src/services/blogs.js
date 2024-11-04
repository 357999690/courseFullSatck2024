import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.data
}

const blogDelete = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const commentsUpdate = async (blog) => {
  // console.log(blog.comments)
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment: blog.comments } )
  return response.data
  
}



export default { getAll, create, setToken, update, blogDelete, commentsUpdate }