const schedule = require('node-schedule')
const redis = require('./redis')

const scheduleJob = () => {
  schedule.scheduleJob('10 * * * * *', async () => {
    const tempMessages = (await redis.getValue('tempMessages')) || []
    const nowTime = Math.round(+new Date().getTime() / 1000)
    const newMessages = tempMessages.filter(v => nowTime - v.createTime < 10)
    redis.setValue('tempMessages', newMessages)
    console.log('newMessages', newMessages)
  })
}

module.exports = {
  scheduleJob
}
