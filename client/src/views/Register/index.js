import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import request from '../../services/request'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'

const Register = () => {
  const navigate = useNavigate()

  const onFinish = async values => {
    console.log('Received values of form: ', values)
    try {
      await request({ url: '/user/register', data: values, method: 'post' })
      message.success('Register Successful')
      navigate('/login')
    } catch (error) {
      message.error('Register fail' + error?.msg)
    }
  }

  return (
    <div className='register-form-wrapper'>
      <div className='title'>Welcome to register</div>
      <Form className='register-form' initialValues={{}} onFinish={onFinish}>
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
  )
}

export default Register
