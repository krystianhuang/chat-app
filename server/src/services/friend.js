const Friend = require('../models/friend')

const get = friend => {
  const res = Friend.find(friend).populate({
    path: 'receiverId'
  })
  return res
}

const getOne = friend => {
  const res = Friend.findOne(friend)
  return res
}

const create = friend => {
  const { senderId, receiverId } = friend
  const newFriend = new Friend({
    senderId,
    receiverId
  })
  const friendReverse = new Friend({
    senderId: receiverId,
    receiverId: senderId
  })

  const res = newFriend.save()
  const friendReverseRes = friendReverse.save()

  return [res, friendReverseRes]
}

const remove = (req, res) => {
  const {} = req.body
}

module.exports = { get, getOne, create, remove }
