const Friend = require('../models/friend')
const User = require('../models/user')

const get = friend => {
  const res = Friend.find(friend)
  return res
}

const getOne = friend => {
  const res = Friend.findOne(friend)
  return res
}

const create = friend => {
  const { selfId, friendId } = friend
  const newFriend = new Friend({
    selfId,
    friendId
  })
  const friendReverse = new Friend({
    selfId: friendId,
    friendId: selfId
  })

  const res = newFriend.save()
  const friendReverseRes = friendReverse.save()

  return [res, friendReverseRes]
}

module.exports = { get, getOne, create }
