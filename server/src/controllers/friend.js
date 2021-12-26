const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const FriendServices = require('../services/friend')
const UserServices = require('../services/user')

const friendAdapter = list => {
  return list.map(({ friendId }) => {
    return {
      id: friendId._id,
      username: friendId.username,
      avatar: friendId.avatar,
      createDate: friendId.createDate,
      updateDate: friendId.updateDate
    }
  })
}

const getFriendList = async (req, res) => {
  const { selfId } = req.query
  if (!selfId) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const friends = await FriendServices.get({ selfId })

  successResponse(res, friendAdapter(friends))
}

const addFriend = async (req, res) => {
  const { selfId, friendId } = req.body
  if (!selfId || !friendId) {
    errorResponse(res)
    return
  }
  if (selfId === friendId) {
    errorResponse(res, ERROR_MSG.CAN_NOT_ADD_YOURSELF)
    return
  }
  const checkUser = await UserServices.get('_id', selfId)
  if (!checkUser) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }

  const checkFriend = await FriendServices.getOne({ selfId, friendId })
  if (checkFriend) {
    errorResponse(res, ERROR_MSG.HAVE_ALREADY_ADDED_THIS_FRIEND)
    return
  }

  const results = await FriendServices.create({ selfId, friendId })
  successResponse(res, SUCCESS_MSG.ADD_SUCCESSFUL)
}

module.exports = {
  getFriendList,
  addFriend
}
