import axios from 'axios'
import { useLoginDispatch, useLoginValue } from './LoginContext'

const baseUrl = 'http://localhost:5173/api/blogs'

const getConfig = (user) => {
  if (user) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
    return config
  }
  return null
}

export const createComment = ({ blog, comment }) => {
  console.log('mutator', blog, comment)
  return axios
    .post(`${baseUrl}/${blog.id}/comments`, { comment })
    .then((res) => res.data)
}

export const getUsers = () =>
  axios.get('http://localhost:5173/api/users').then((res) => res.data)

export const login = () =>
  axios.post('http://localhost:5173/api/login').then((res) => res.data)

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const createBlog = ({ newBlog, user }) =>
  axios.post(baseUrl, newBlog, getConfig(user)).then((res) => res.data)

export const updateBlog = (updatedBlog) =>
  axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog).then((res) => res.data)

export const deleteBlog = ({ updatedBlog, user }) =>
  axios
    .delete(`${baseUrl}/${updatedBlog.id}`, getConfig(user))
    .then((res) => res.data)
