import axios from 'axios'
import { getLocal } from '../utils'
const BASE_URL = 'http://localhost:3001/api'

const request = async ({ url, headers, data, method = 'get' }) => {
  try {
    let options = {
      url: BASE_URL + url,
      method
    }

    if (headers) {
      options.headers = headers
    }

    const _method = method.toLocaleLowerCase()
    if (['get', 'delete'].includes(_method)) {
      options.params = data
    }

    if (['post', 'put'].includes(_method)) {
      options.data = data
    }

    const token = getLocal('user')?.token
    if (token) {
      if (!options.headers) options.headers = {}
      options.headers.authorization = token
    }

    const res = await axios({ ...options, withCredentials: true })
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default request
