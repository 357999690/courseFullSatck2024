import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import  { setNotification } from './notificationReducer'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addLogin (state, action) {
      return state = action.payload
    },
    wrongLogin (state, action) {
      return initialState
    }
  }
})

export const { addLogin, wrongLogin } = loginSlice.actions

export const initializeUser = (username, password, setUsername, setPassword) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user)

      dispatch(addLogin(user))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 10))
      setUsername('')
      setPassword('')
    }
  }
}

export default loginSlice.reducer