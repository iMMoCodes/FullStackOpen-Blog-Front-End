import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null
export const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}
