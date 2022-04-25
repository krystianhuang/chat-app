import React, { useContext, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../services/request'
import { setLocal } from '../../utils'
import { UserContext } from '../../App'
import { ROLE } from '../../constants/constants'
import './index.scss'

const Forget = () => {
  const { setUserInfo } = useContext(UserContext)
  const [imgUrl] = useState(
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  )

  const [form] = Form.useForm()

  const history = useNavigate()

  const [loading, setLoading] = useState(false)

  const getCode = async () => {
    const values = form.getFieldsValue()
    setLoading(true)
    console.log('values', values)
    try {
      await request({
        url: '/user/getVerCode',
        method: 'post',
        data: {
          email: values.email
        }
      })

      message.success('Verification code send successful')
    } catch (error) {
      message.error('Verification code send failed')
    }
    setLoading(false)
  }

  const onFinish = async () => {
    const values = form.getFieldsValue()

    try {
      await request({
        url: '/user/resetPassword',
        method: 'post',
        data: {
          email: values.email,
          code: values.code,
          password: values.password
        }
      })
      message.success('Reset success')
      history('/login')
    } catch (error) {
      message.error(error.data?.msg)
    }
  }

  return (
    <div className='forget-form-wrapper'>
      <div className='forget-container'>
        <div className='title'>Reset Password</div>
        <Form form={form} className='forget-form' onFinish={onFinish}>
          <img src={imgUrl} className='avatar-img' alt='avatar' />

          <Form.Item className='form-item'>
            <>
              <Form.Item
                noStyle
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                />
              </Form.Item>

              <Button
                loading={loading}
                type='primary'
                className='code-btn'
                onClick={getCode}
              >
                Code
              </Button>
            </>
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              {
                required: true,
                message: 'Please input your Verification Code!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Verification Code'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your NewPassword!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='NewPassword'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='forget-form-button'
            >
              Submit
            </Button>
            <span>
              / <Link to='/login'>Login</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Forget
