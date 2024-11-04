import { useSelector, useDispatch } from "react-redux";
// import { vote } from "../reducers/anecdoteReducer";
// import { addNotification, deleteNotification } from "../reducers/notificationReducer";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return anecdotes
        }

        const anecdotesFilters = anecdotes.filter(e => e.content.toUpperCase().indexOf(filter) != -1)
        return anecdotesFilters

        


    })

    const anecdoteOrder = [...anecdotes].sort((a,b) => {
        return b.votes - a.votes
    })

    const votes = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
        dispatch(updateAnecdote(id, changedAnecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
        // dispatch(vote(id))
        // dispatch(addNotification(`you voted '${anecdote.content}'`))
        // setTimeout(() => {
        //     dispatch(deleteNotification(''))
        // }, 5000)
    }

    return(
        <div>
            {anecdoteOrder.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => votes(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList