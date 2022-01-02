import { Input } from 'antd'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  SmileOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons'
import { ChatContext } from '../index'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import MsgList from './MsgList'
import EmojiPicker from './EmojiPicker/EmojiPicker'
import UploadImg from './UploadImg/UploadImg'
import { onUploadImg } from './util'
import { MSG_SPLIT_STR } from '../../../constants/constants'
import './chatWindow.scss'

const autoScroll = () => {
  const ele = document.querySelector('.chat-window')
  setTimeout(() => {
    ele.scrollTop = ele.scrollHeight + 60
  }, 200)
}

const ChatWindow = () => {
  const { roomId, socket, currentChatFriend, reset } = useContext(ChatContext)
  const { user } = useContext(UserContext)

  const [chatMsg, setChatMsg] = useState('')
  const [msgList, setMsgList] = useState([])
  const [showEmoji, setShowEmoji] = useState(false)
  const [loading, setLoading] = useState(false)
  const uploadRef = useRef()
  const [uploadInfo, setUploadInfo] = useState({})

  useEffect(() => {
    socket.on('receiverMessage', msg => {
      setMsgList(v => [...v, msg])
      autoScroll()
    })
  }, [])

  const getMsgList = useCallback(async () => {
    setLoading(true)
    const res = await request({
      url: '/message/recent',
      data: {
        roomId,
        page: 1,
        pageSize: 100
      }
    })
    setMsgList(res.data)
    autoScroll()
    setLoading(false)
  }, [roomId])

  const sendMessage = msg => {
    const message = {
      roomId,
      senderId: user.id,
      senderName: user.username,
      senderAvatar: user.avatar,
      message: msg.message,
      messageType: msg.messageType
    }
    socket.emit('sendMessage', message)
    return message
  }

  const choiceEmoji = emoji => {
    setShowEmoji(false)
    setChatMsg(chatMsg + emoji.native)
  }

  useEffect(() => {
    getMsgList()
  }, [getMsgList])

  const onSend = async () => {
    let message = {}
    if (uploadInfo.file) {
      const url = await onUploadImg(uploadInfo.file)
      message = {
        message: `${chatMsg}${MSG_SPLIT_STR}url:${url}`,
        messageType: 'img'
      }
    } else {
      message = {
        message: chatMsg,
        messageType: uploadInfo.file ? 'img' : 'text'
      }
    }

    const msg = sendMessage(message)
    setChatMsg('')
    setUploadInfo({})
    setMsgList([...msgList, msg])
    autoScroll()
  }

  const onAddFile = () => {
    uploadRef.current.click()
  }

  const onFileChange = (url, file) => {
    setUploadInfo({ url, file })
  }

  const onDeleteMessage = useCallback(id => {
    setMsgList(msgs => msgs.filter(v => v._id !== id))
  }, [])

  const back = () => {
    reset()
  }

  return (
    <div className='chat-window'>
      <div className='chat-top-banner'>
        <ArrowLeftOutlined onClick={back} />
        <span className='chat-user-name'>{currentChatFriend.username}</span>
      </div>

      <MsgList
        loading={loading}
        msgList={msgList}
        onDeleteMessage={onDeleteMessage}
      />

      <div
        className={`send-container ${uploadInfo.url ? 'has-upload-img' : ''}`}
      >
        {uploadInfo.url ? (
          <img src={uploadInfo.url} alt='' className='upload-img' />
        ) : null}
        <Input
          value={chatMsg}
          size='large'
          className='chat-input'
          onPressEnter={onSend}
          onChange={e => setChatMsg(e.target.value)}
        />

        <PlusCircleOutlined className='add-icon' onClick={onAddFile} />
        <UploadImg ref={uploadRef} onFileChange={onFileChange} />

        <SmileOutlined
          className='emoji-icon'
          onClick={() => setShowEmoji(true)}
        />

        {showEmoji ? <EmojiPicker choiceEmoji={choiceEmoji} /> : null}
      </div>
    </div>
  )
}

export default ChatWindow
