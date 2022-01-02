import { notification } from 'antd'

export const validateNotification = (message, onClick) => {
  notification.info({
    message: 'The new message',
    description: (
      <div>
        {`${message.senderUserName} request your as a friend`},
        <span
          onClick={() => {
            onClick()
          }}
          style={{ color: '#189099', cursor: 'pointer' }}
        >
          Immediately check
        </span>
      </div>
    )
  })
}

export const agreeValidateNotification = (message, onClick) => {
  notification.info({
    message: 'The new message',
    description: (
      <div>{`${message.senderUserName} agree your friend application!`}</div>
    )
  })
}

export const disAgreeValidateNotification = (message, onClick) => {
  notification.info({
    message: 'The new message',
    description: (
      <div>{`${message.senderUserName} reject your friend application!`}</div>
    )
  })
}
