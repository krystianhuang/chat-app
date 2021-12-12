import axios from 'axios'
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
    if (['get'].includes(_method)) {
      options.params = data
    }

    if (['post'].includes(_method)) {
      options.data = data
    }

    const res = await axios(options)
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
