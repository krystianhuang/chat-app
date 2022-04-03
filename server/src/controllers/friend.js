const { errorResponse, successResponse } = require('../utils/util')
const { ERROR_MSG } = require('../constants/constants')
const FriendServices = require('../services/friend')
const UserServices = require('../services/user')
const { objectIdToId } = require('../utils/mongoose')
const redis = require('../modules/redis')

const friendAdapter = list => {
  return list.map(({ receiverId }) => {
    return {
      id: receiverId._id,
      username: receiverId.username,
      avatar: receiverId.avatar,
      createDate: receiverId.createDate,
      updateDate: receiverId.updateDate
    }
  })
}

const getFriends = async id => {
  const friends = await FriendServices.get({ senderId: id })
  return friendAdapter(friends)
}

const getFriendList = async (req, res) => {
  const { selfId } = req.query
  if (!selfId) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const friends = await getFriends(selfId)
  successResponse(res, friends)
}

const addFriend = async (req, res) => {
  const { senderId, receiverId } = req.body
  if (!senderId || !receiverId) {
    errorResponse(res)
    return
  }

  if (senderId === receiverId) {
    errorResponse(res, ERROR_MSG.CAN_NOT_ADD_YOURSELF)
    return
  }
  const checkUser = await UserServices.getOne({ _id: senderId })
  if (!checkUser) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const record1 = await FriendServices.getOne({
    senderId,
    receiverId
  })
  const record2 = await FriendServices.getOne({
    senderId: receiverId,
    receiverId: senderId
  })

  if (record1 && record2) {
    errorResponse(res, ERROR_MSG.HAVE_ALREADY_ADDED_THIS_FRIEND)
    return
  }

  await FriendServices.removeAll({ senderId, receiverId })
  const results = await FriendServices.create({ senderId, receiverId })

  successResponse(res, results)
}

const deleteFriend = async (req, res) => {
  try {
    const data = await FriendServices.remove(req.query)
    successResponse(res, data)
  } catch (error) {
    errorResponse(res)
  }
}

const isFriend = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query
    const record1 = await FriendServices.getOne({
      senderId,
      receiverId
    })
    const record2 = await FriendServices.getOne({
      senderId: receiverId,
      receiverId: senderId
    })

    successResponse(res, record1 && record2)
  } catch (error) {
    errorResponse(res)
  }
}

const getRecommendFriends = async (req, res) => {
  const { userId, hobby } = req.query
  if (!hobby) return successResponse(res, [])
  const regex = new RegExp(hobby, 'i')

  const friends = await FriendServices.get({ senderId: userId })
  const recommends = []
  const allUsers = await UserServices.get({
    _id: { $ne: userId }
    // hobby: { $regex: regex }
  })

  const isIncludes = (o, v) => {
    if (!o) return false
    return o.split(',').some(s => v.includes(s))
  }

  const users = allUsers.filter(user => {
    if (
      (user.hobby && isIncludes(hobby, user.hobby)) ||
      isIncludes(user.hobby, hobby)
    ) {
      return true
    }
    return false
  })

  const disLikeUsers = (await redis.getValue('disLikeUsers')) || []

  users.forEach(u => {
    if (
      !friends.find(
        f => objectIdToId(f.receiverId._id) === objectIdToId(u._id)
      ) &&
      !(disLikeUsers[userId] || []).includes(objectIdToId(u._id))
    ) {
      recommends.push(u)
    }
  })

  successResponse(res, recommends)
}

const notInterested = async (req, res) => {
  const { userId, disLikeUserId } = req.body
  console.log('userId', userId)
  try {
    const disLikeUsers = (await redis.getValue('disLikeUsers')) || {}
    disLikeUsers[userId] = [...(disLikeUsers[userId] || []), disLikeUserId]
    await redis.setValue('disLikeUsers', disLikeUsers)
    successResponse(res)
  } catch (error) {
    console.log('error', error)
    errorResponse(res)
  }
}

module.exports = {
  getFriendList,
  getFriends,
  addFriend,
  isFriend,
  deleteFriend,
  getRecommendFriends,
  notInterested
}
