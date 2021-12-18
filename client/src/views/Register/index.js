import React, { useState, useRef } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import request from '../../services/request'
import { Link, useNavigate } from 'react-router-dom'
import { toBase64 } from './../../utils/index'
import './index.scss'

const Register = () => {
  const navigate = useNavigate()
  const uploadRef = useRef()
  const [imgUrl, setImgUrl] = useState(
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  )
  const [file, setFile] = useState()

  const onFileChange = async e => {
    console.log('file', e.target.files)
    const [file] = e.target?.files || []
    if (!file) {
      message.warning('Please choose a image')
      return
    }
    const url = await toBase64(file)
    setImgUrl(url)
    setFile(file)
  }

  const upload = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await request({
        url: '/upload/file',
        data: formData,
        method: 'post'
      })
      return res.data.url
    } catch (error) {
      message.warning('Avatar upload failed')
    }
  }

  const onFinish = async values => {
    const avatar = await upload()
    try {
      await request({
        url: '/user/register',
        data: { ...values, avatar },
        method: 'post'
      })
      message.success('Register Successful')
      navigate('/login')
    } catch (error) {
      message.error('Register fail' + error?.msg)
    }
  }

  return (
    <div className='register-form-wrapper'>
      <div className='register-container'>
        <div className='title'>Welcome to register</div>
        <Form className='register-form' initialValues={{}} onFinish={onFinish}>
          <div className='avatar-wrapper'>
            <img
              src={imgUrl}
              className='avatar-img'
              onClick={() => {
                console.log('uploadRe', uploadRef.current)
                uploadRef.current.click()
              }}
            />
            <input
              type='file'
              className='hidden'
              ref={uploadRef}
              onChange={onFileChange}
            />
          </div>

          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='register-form-button'
            >
              Register
            </Button>
            <span>
              Or <Link to='/login'>Log in</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
