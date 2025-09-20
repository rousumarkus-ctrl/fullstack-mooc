import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { useLoginDispatch } from '../LoginContext'
import loginService from '../services/login'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const loginDispatch = useLoginDispatch()
  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      console.log('login', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      loginDispatch({ type: 'SET_USER', payload: user })
      navigate('/')
      //queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `${error.response.data.error}`,
      })
      setTimeout(
        () => dispatch({ type: 'SET_NOTIFICATION', payload: '' }),
        5000
      )
    },
  })

  const onLogin = (event) => {
    console.log('start login')
    event.preventDefault()
    const username = event.target.username.value
    event.target.username.value = ''
    const password = event.target.password.value
    event.target.password.value = ''
    loginMutation.mutate({ username, password })
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        <TextField name="username" label="username" />
      </div>
      <div>
        <TextField name="password" label="password" type="password" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  )
}

export default LoginForm
