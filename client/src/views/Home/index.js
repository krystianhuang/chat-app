import { Button } from 'antd'
import logo from '../../assets/imgs/CC_Logo.png'
import { useNavigate } from 'react-router-dom'
import feature1 from '../../assets/imgs/CC_ChatWindow.png'
import feature2 from '../../assets/imgs/CC_Recommend.png'
import './index.scss'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='home-wrapper'>
      <div className='container'>
        <div className='banner'>
          <div className='home-header-wrapper'>
            <img src={logo} className='logo' />
            <div className='right'>
              <Button className='btn' onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className='btn' onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          </div>
        </div>

        <div className='features'>
          <div className='feature-chat'>
            <div className='feature'>
              <img src={feature1} className='feature-img' />
              <div className='text-wrapper'>
                <h2 className='feature-title'>Chat function</h2>
                <div className='text'>
                  User can communicate with each other in real time.
                </div>
                <div className='text'>
                  User can send emojis when chatting based on the Emoji package.
                </div>
                <div className='text'>
                  User can send their favourite pictures(png/jpeg) through local
                  upload.
                </div>
                <div className='text'>
                  User can delete a single chat history (The single chat history
                  of both chatters will be cleared).
                </div>
              </div>
            </div>
          </div>

          <div className='feature-recommend'>
            <div className='recommend-wrapper'>
              <div className='feature'>
                <img src={feature2} className='feature-img' />
                <div className='text-wrapper'>
                  <h2 className='feature-title'>Recommendation function</h2>
                  <div className='text'>
                    The system will recommend friends of all related hobbies to
                    the user according to the user's hobbies.
                  </div>

                  <div className='text'>
                    If the user is not interested in this recommended friend,
                    user can delete it. The system will never recommend this
                    friend.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
