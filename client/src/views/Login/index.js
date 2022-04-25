import React, { useContext, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../services/request'
import { setLocal } from '../../utils'
import { UserContext } from '../../App'
import { ROLE } from '../../constants/constants'
import './index.scss'

const Login = () => {
  const { setUserInfo } = useContext(UserContext)
  const [imgUrl] = useState(
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  )

  const history = useNavigate()

  const onFinish = async values => {
    try {
      const { data } = await request({
        url: '/user/login',
        data: values,
        method: 'post'
      })
      message.success('Login successful')
      const user = {
        id: data._id,
        username: data.username,
        token: data.token,
        avatar: data.avatar,
        hobby: data.hobby,
        sex: data.sex,
        role: data.role,
        description: data.description
      }
      setUserInfo(user)
      setLocal('user', user)
      if (data.role === ROLE.ADMIN) {
        history('/admin')
      } else {
        history('/chat')
      }
    } catch (error) {
      message.error('Login fail:' + error?.data?.msg)
    }
  }

  const forgetPassword = async () => {
    request({
      url: '/user/forgetPassword',
      method: 'post'
    })
  }

  return (
    <div className='login-form-wrapper'>
      <div className='login-container'>
        <div className='title'>Login</div>
        <Form className='login-form' onFinish={onFinish}>
          <img src={imgUrl} className='avatar-img' alt='avatar' />

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
              className='login-form-button'
            >
              Login
            </Button>
            <span>
              / <Link to='/register'>Register</Link>
            </span>
          </Form.Item>

          <Form.Item>
            <Button type='link'>
              <Link to='/forgetPassword'>Forget Password</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
