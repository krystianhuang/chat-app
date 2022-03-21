import React, { forwardRef } from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const EmojiPicker = ({ choiceEmoji }) => {
  console.log('choiceEmoji', choiceEmoji)

  return (
    <Picker
      style={{
        position: 'absolute',
        top: -365,
        right: 25,
        backgroundColor: '#2f3136'
      }}
      set='apple'
      inclde={['people']}
      showPreview={false}
      showSkinTones={false}
      onClick={choiceEmoji}
    />
  )
}

export default React.memo(EmojiPicker)
