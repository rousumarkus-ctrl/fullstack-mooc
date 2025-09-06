import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,createAnecdote,updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError : (error) => {
      console.log(error)
      dispatch({ type:'SET_NOTIFICATION', payload: `${error.response.data.error}`})
      setTimeout(() => dispatch({ type:'SET_NOTIFICATION', payload: ''}),5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    dispatch({ type:'SET_NOTIFICATION', payload: `anecdote '${content}' created`})
    setTimeout(() => dispatch({ type:'SET_NOTIFICATION', payload: ''}),5000)
    console.log('new anecdote')
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
