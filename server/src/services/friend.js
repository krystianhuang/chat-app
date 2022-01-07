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

const remove = friend => {
  const { senderId, receiverId } = friend
  const data = Friend.findOneAndRemove({ senderId, receiverId })
  return data
}

const removeAll = friend => {
  const { senderId, receiverId } = friend
  // $or is both parties delete the friendship
  const data = Friend.remove({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId }
    ]
  })
  return data
}

module.exports = { get, getOne, create, remove, removeAll }
