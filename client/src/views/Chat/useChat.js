import { useState, useCallback, useEffect } from 'react'
import request from '../../services/request'
import { getLocal } from '../../utils'

const useChat = () => {
  const [pendingList, setPendingList] = useState([])
  const [friends, setFriends] = useState([])

  const getList = useCallback(async () => {
    const res = await request({
      url: '/validateMessages/list',
      data: { id: getLocal('user')?.id }
    })
    setPendingList(res.data)
  }, [])

  useEffect(() => {
    getList()
  }, [getList])

  const getFriends = useCallback(async () => {
    try {
      const user = getLocal('user') || {}
      const res = await request({
        url: '/friend/list',
        data: { selfId: user.id }
      })
      setFriends(res.data)
    } catch (error) {}
  }, [])

  const addPendingList = useCallback(v => {
    setPendingList(list => [...list, v])
  }, [])

  const updatePendingList = useCallback(v => {
    setPendingList(v)
  }, [])

  const updateFriends = useCallback(v => {
    setFriends(v)
  }, [])

  return {
    pendingList,
    friends,
    updatePendingList,
    addPendingList,
    getFriends,
    updateFriends
  }
}

export default useChat
