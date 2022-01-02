import { useState, useCallback, useEffect } from 'react'
import request from '../../services/request'
import { getLocal } from '../../utils'

const useChat = () => {
  const [pendingList, setPendingList] = useState([])

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

  const addPendingList = useCallback(v => {
    setPendingList(list => [...list, v])
  }, [])

  const updatePendingList = useCallback(v => {
    setPendingList(v)
  }, [])

  return {
    pendingList,
    updatePendingList,
    addPendingList
  }
}

export default useChat
