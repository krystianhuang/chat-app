import React, { useState, useRef } from 'react'
import { Form, Input, Button, message, Radio } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  HeartOutlined,
  MailOutlined
} from '@ant-design/icons'
import request from '../../services/request'
import { Link, useNavigate } from 'react-router-dom'
import { toBase64 } from './../../utils/index'
import { DEFAULT_AVATAR_URL } from '../../constants/constants'
import './index.scss'

const Register = () => {
  const navigate = useNavigate()
  const uploadRef = useRef()
  const [imgUrl, setImgUrl] = useState(DEFAULT_AVATAR_URL)
  const [file, setFile] = useState()

  const onFileChange = async e => {
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
    let avatar = DEFAULT_AVATAR_URL
    if (file) {
      avatar = await upload()
    }
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
              alt='avatar'
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

          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item name='hobby'>
            <Input
              prefix={<HeartOutlined />}
              placeholder='Hobby multiple are separated by commas'
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
              / <Link to='/login'>Log in</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
