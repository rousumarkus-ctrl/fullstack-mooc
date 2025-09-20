import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogs from '../services/blogs'
import { createBlog } from '../requests'
import { useLoginValue } from '../LoginContext'
import { Button, TextField } from '@mui/material'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const user = useLoginValue()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `blog '${blog.title}' created`,
      })
      setTimeout(
        () => dispatch({ type: 'SET_NOTIFICATION', payload: '' }),
        5000
      )
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

  const onCreate = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ''
    const author = event.target.author.value
    event.target.author.value = ''
    const url = event.target.url.value
    event.target.url.value = ''
    newBlogMutation.mutate({ newBlog: { title, author, url }, user })
    console.log('new blog')
  }

  return (
    <form onSubmit={onCreate}>
      <div>
        <TextField name="title" label="title" />
      </div>
      <div>
        <TextField name="author" label="author" />
      </div>
      <div>
        <TextField name="url" label="url" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm
