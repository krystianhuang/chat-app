const { createClient } = require('redis')
const { isObject } = require('../utils/util')

// let client = createClient()

// const initRedis = async () => {
//   await client.connect()
// }

// const setValue = (key, value) => {
//   try {
//     const v = JSON.stringify(value)
//     client.set(key, v)
//   } catch (err) {}
// }

// const getValue = async key => {
//   try {
//     const value = await JSON.parse(client.get(key))
//     return value
//   } catch (err) {}
// }

// const getInstance = () => {
//   return client
// }

class Redis {
  client

  constructor(config) {
    if (!this.client) {
      this.client = createClient(config)
      this.client.connect()
    }
  }

  getInstance() {
    return this.client
  }

  setValue = (key, value) => {
    try {
      const v = JSON.stringify(value)
      this.client.set(key, v)
    } catch (err) {
      console.error('redis set error', err)
    }
  }

  getValue = async key => {
    try {
      const value = await this.client.get(key)
      if (value) {
        const v = await JSON.parse(value)
        return v
      }
    } catch (err) {
      console.error('redis get error', err)
    }
  }
}

// module.exports = Redis
const redis = new Redis()
module.exports = redis

// module.exports = { initRedis, setValue, getValue, getInstance }
