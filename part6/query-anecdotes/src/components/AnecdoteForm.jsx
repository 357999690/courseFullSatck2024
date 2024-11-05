import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../request"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"




const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // queryClient.invalidateQueries({ queryKey:['anecdotes'] })
    
    },
    onError: (error) => {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error
      })
      setTimeout(() => {
        dispatch({
          type: "NULL"
        })
      }, 5000)
    }})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
    
    if (content.length >= 5) {
      dispatch({ type: "CREATE",
        payload: content
       })
      setTimeout(() => {
        dispatch({ type: "NULL"})
      }, 5000)
    }

    
    
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
