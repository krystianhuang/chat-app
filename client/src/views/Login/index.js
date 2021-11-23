import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'

const Login = () => {
  const history = useNavigate()

  const onFinish = async values => {
    history('/home')
    console.log('Received values of form: ', values)
  }

  return (
    <div className='login-form-wrapper'>
      <div className='title'>Login</div>
      <Form className='login-form' onFinish={onFinish}>
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
            login
          </Button>
          <span>
            Or <Link to='/register'>Register</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
