import axios from 'axios'
import { useLoginDispatch, useLoginValue } from '../LoginContext'
const baseUrl = '/api/blogs'

const getConfig = () => {
  const user = useLoginValue()
  console.log(user)
  //const user = getUser()
  if (user) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
    console.log(config)
    return config
  }
  console.log('null')
  return null
}

/* const getUser = () => {
  const dispatch = useLoginDispatch()
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch({ type: 'SET_USER', payload: user })
    return user
  }
  return null
} */

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  console.print('in mutate')
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (newObject) => {
  console.log('updating', newObject)
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  console.log('updated', response.data)
  return response.data
}

const del = async (id) => {
  console.log(id)
  const response = await axios.delete(`${baseUrl}/${id}`)
  console.log(response)
  return response.data
}

export default { getAll, create, update, del }
