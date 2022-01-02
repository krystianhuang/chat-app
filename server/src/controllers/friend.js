const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const FriendServices = require('../services/friend')
const UserServices = require('../services/user')

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

const getFriendList = async (req, res) => {
  const { selfId } = req.query
  if (!selfId) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const friends = await FriendServices.get({ senderId: selfId })

  successResponse(res, friendAdapter(friends))
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
  const checkUser = await UserServices.get('_id', senderId)
  if (!checkUser) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const checkFriend = await FriendServices.getOne({ senderId, receiverId })
  if (checkFriend) {
    errorResponse(res, ERROR_MSG.HAVE_ALREADY_ADDED_THIS_FRIEND)
    return
  }

  const results = await FriendServices.create({ senderId, receiverId })
  successResponse(res, results, SUCCESS_MSG.ADD_SUCCESSFUL)
}

module.exports = {
  getFriendList,
  addFriend
}
