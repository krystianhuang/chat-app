import { useContext } from 'react'
import FriendList from '../FriendList/FriendList'
import { ChatContext } from '../index'

const Friends = () => {
  const { friends, updateFriends } = useContext(ChatContext)

  return <FriendList friends={friends} setFriends={updateFriends} />
}

export default Friends
