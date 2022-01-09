import { useCallback, useContext, useMemo } from 'react'
import { ChatContext } from '../index'
import FriendList from '../FriendList/FriendList'

const OnlineFriends = () => {
  const { friends, onlineUsers, updateFriends } = useContext(ChatContext)

  const onlineList = useMemo(
    () => friends.filter(v => !!onlineUsers[v.id]),
    [friends]
  )

  return onlineList.length ? (
    <FriendList friends={onlineList} setFriends={updateFriends} />
  ) : (
    <div className='none-tip'>No online friends</div>
  )
}

export default OnlineFriends
