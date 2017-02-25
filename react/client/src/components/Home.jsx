import React from 'react'
import { Link, browserHistory } from 'react-router'
import LoginBox from '../auth/LoginBox'
import SignOut from '../auth/SignOut'

const Home = () => (
  <div className="home">
    <div className ="top">
      <h1 className='title'>WHOP</h1>
    </div>
    <LoginBox url="http://localhost:5000/" />
    </div>
)

export default Home