import { useState, useCallback, useEffect, useContext } from 'react'
import request from '../../services/request'
import { getLocal } from '../../utils'

const useChat = () => {
  const [pendingList, setPendingList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const res = await request({
        url: '/validateMessages/list',
        data: { id: getLocal('user')?.id }
      })
      setPendingList(res.data)
      console.log('pendingList', res)
    }
    getList()
  }, [])

  const addPendingList = useCallback(v => {
    setPendingList(list => [...list, v])
  }, [])

  return {
    pendingList,
    addPendingList
  }
}

export default useChat
