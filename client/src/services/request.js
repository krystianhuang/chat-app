import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

const request = async ({ url, headers, data, method = 'GET' }) => {
  try {
    let options = {
      url: BASE_URL + url,
      method,
      data
    }

    const res = await axios(options)
    return res
  } catch (error) {}
}

export default request
