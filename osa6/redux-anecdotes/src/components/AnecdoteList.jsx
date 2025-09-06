import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.filter(a=>a.content.includes(state.filter)))
  

  return (
    <div>
      {anecdotes.toSorted((a,b) => b.votes-a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`,5))
            }
          }
        />
      )}
    </div>
  )
}

export default Anecdotes