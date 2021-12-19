import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { toBase64 } from '../../../../utils'

const UploadFile = ({ onFileChange }, ref) => {
  const uploadRef = useRef()

  const onChange = async e => {
    const [file] = e.target?.files || []
    const url = await toBase64(file)
    onFileChange(url, file)
  }

  useImperativeHandle(ref, () => {
    return {
      click: () => {
        uploadRef.current.click()
      }
    }
  })

  return (
    <input type='file' className='hidden' ref={uploadRef} onChange={onChange} />
  )
}

export default React.memo(forwardRef(UploadFile))
