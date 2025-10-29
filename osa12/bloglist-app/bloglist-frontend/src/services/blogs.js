import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => {
  const config = {
    headers: { Authorization: token },
  }
  return config
}

const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`
  } else {
    token = null
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig())
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, setToken, create, update, del }
