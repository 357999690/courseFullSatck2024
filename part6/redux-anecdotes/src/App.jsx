// import { useSelector, useDispatch } from 'react-redux'
// import { vote } from './reducers/anecdoteReducer'
// import { createAnecdote } from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
    // anecdoteService
    //   .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const votes = (id) => {
  //   dispatch(vote(id))
  // }

  // const addAnecdote = (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ''
  //   dispatch(createAnecdote(content))
  // }

  // const anecdoteOrder = anecdotes.sort((a, b) => {
  //   return b.votes - a.votes
  // })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      {/* {anecdoteOrder.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote.id)}>vote</button>
          </div>
        </div>
      )} */}
      {/* <h2>create new</h2> */}
      <AnecdoteForm/>
      <Notification/>
      {/* <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form> */}
    </div>
  )
}

export default App