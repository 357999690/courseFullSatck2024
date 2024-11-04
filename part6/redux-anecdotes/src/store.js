import { configureStore } from "@reduxjs/toolkit";

// import reducer from './reducers/anecdoteReducer'
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
// import filterReducer from './reducers/filterReducer'
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import AnecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
    
  })

  AnecdoteService.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
  )

export default store
