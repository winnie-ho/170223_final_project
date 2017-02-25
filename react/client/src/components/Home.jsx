import React from 'react'
import { Link, browserHistory } from 'react-router'
import LoginBox from '../auth/LoginBox'

const Home = () => (
  <div className="home">
    <h1 className='title'>WHOP</h1>
    <LoginBox url="http://localhost:5000/" />
    </div>
)

export default Home