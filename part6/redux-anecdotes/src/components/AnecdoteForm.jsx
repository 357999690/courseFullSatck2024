import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
// import { addNotification } from "../reducers/notificationReducer";
// import { deleteNotification } from "../reducers/notificationReducer";
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you add ${anecdote}`, 10))
        // const newAnecdote = await anecdoteService.createNew(anecdote)
        // dispatch(createAnecdote(newAnecdote))
        // dispatch(addNotification(`you add ${anecdote}`, 10))
        // setTimeout(() => {
        //     dispatch(deleteNotification(''))
        // }, 5000)
        // dispatch(deleteNotification('', 10))
    }

    return(
        <div>
            <h2>create a new</h2>
            <div>
                <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <button type="submit">create</button>
                </form>
                </div>
            </div>
        
    )
}

export default AnecdoteForm