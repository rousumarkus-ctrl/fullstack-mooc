import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const process = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return process(request)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return process(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return process(request)
}
const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return process(request)
}

export default { getAll, create, update, del }