import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createBlog,
  createComment,
  deleteBlog,
  getBlogs,
  getUsers,
  updateBlog,
} from './requests'
import { useLoginValue, useLoginDispatch } from './LoginContext'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import {
  Table,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  const dispatch = useNotificationDispatch()
  const dispatchLogin = useLoginDispatch()
  const user = useLoginValue()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatchLogin({ type: 'SET_USER', payload: null })
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: 'logged out',
    })
    setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: '' }), 5000)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <div>
            {user ? (
              <div>
                <em>{user.name} logged in</em>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </div>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {/*       <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user ? (
        <em>
          {user.name} logged in
          
        </em>
      ) : (
        <div>
          <h2>login to application</h2>
          <LoginForm></LoginForm>
        </div>
      )} */}
    </div>
  )
}

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>author</TableCell>
              <TableCell>user</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog}></Blog>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const SingleBlog = ({ blog }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const user = useLoginValue()

  const likeBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `blog '${blog.title}' liked`,
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

  const newCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
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

  const removeBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `blog '${blog.title}' removed`,
      })
      setTimeout(
        () => dispatch({ type: 'SET_NOTIFICATION', payload: '' }),
        5000
      )
      navigate('/')
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
  const newBlog = (event) => {
    event.preventDefault()
    console.log('liking')
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate({ updatedBlog: blog, user })
    }
  }

  const onCreate = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    newCommentMutation.mutate({ blog, comment })
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `comment '${comment}' created`,
    })
    setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: '' }), 5000)
    console.log('new comment')
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>
          {blog.likes} likes{' '}
          <Button variant="contained" color="primary" onClick={newBlog}>
            like
          </Button>
        </p>
      </div>
      <p>added by {blog.user.name}</p>
      {user && blog.user.username === user.username && (
        <Button variant="contained" color="primary" onClick={removeBlog}>
          remove
        </Button>
      )}
      <h3>comments</h3>
      <form onSubmit={onCreate}>
        <div>
          <TextField name="comment" label="comment"></TextField>
        </div>
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const user = useLoginValue()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const dispatchLogin = useLoginDispatch()

  const blogFormRef = useRef()

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: false,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      dispatchLogin({ type: 'SET_USER', payload: user })
    }
  }, [])

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
  })
  if (resultUsers.isLoading) {
    return <div>loading data...</div>
  } else if (resultUsers.isError) {
    return <div>user service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data
  const users = resultUsers.data
  const userShow = matchUser
    ? users.find((a) => a.id === matchUser.params.id)
    : null
  const blog = matchBlog
    ? blogs.find((a) => a.id === matchBlog.params.id)
    : null

  return (
    <Container>
      <div>
        <Menu></Menu>
        <Notification />
        {user && (
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm></BlogForm>
          </Togglable>
        )}
        <Routes>
          <Route path="/" element={<Blogs blogs={blogs}></Blogs>}></Route>
          <Route path="/users" element={<Users users={users}></Users>}></Route>
          <Route
            path="/users/:id"
            element={<User user={userShow}></User>}
          ></Route>
          <Route
            path="/blogs/:id"
            element={<SingleBlog blog={blog}></SingleBlog>}
          ></Route>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        </Routes>
      </div>
    </Container>
  )
}

export default App
