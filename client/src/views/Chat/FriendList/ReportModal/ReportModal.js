import { Modal, Radio, Input, message } from 'antd'
import { useState, useContext } from 'react'
import request from '../../../../services/request'
import { UserContext } from '../../../../App'
import './reportModal.scss'

const ReportModal = ({ user, visible, hidden }) => {
  const { user: currentUser } = useContext(UserContext)

  const [type, setType] = useState('')
  const [val, setVal] = useState('')

  const onCancel = () => {
    hidden()
  }

  const onOk = async () => {
    await request({
      url: '/user/report',
      method: 'post',
      data: {
        reportInfo: {
          userId: user.id,
          reportName: currentUser.username,
          name: user.username,
          avatar: user.avatar,
          reason: val
        }
      }
    })
    hidden()
    message.success('Report Successful! Waiting for administrator review.')
  }

  return (
    <Modal
      title='Report Reason'
      visible={visible}
      onCancel={onCancel}
      className='report-modal-container'
      onOk={onOk}
    >
      <Radio.Group
        onChange={e => {
          setType(e.target.value)
          setVal(e.target.value)
        }}
      >
        <Radio
          value='I was harassed by posting inappropriate content'
          className='radio'
        >
          I was harassed by posting inappropriate content
        </Radio>
        <Radio value='The user is cheating' className='radio'>
          The user is cheating
        </Radio>
        <Radio value='other' className='radio'>
          Other
        </Radio>
      </Radio.Group>

      {type === 'other' ? (
        <div className='input'>
          <Input onChange={e => setVal(e.target.value)} />
        </div>
      ) : null}
    </Modal>
  )
}

export default ReportModal
