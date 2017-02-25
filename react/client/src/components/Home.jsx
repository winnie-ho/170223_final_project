import React from 'react'
import { Link, browserHistory } from 'react-router'
import LoginBox from '../auth/LoginBox'
import SignOut from '../auth/SignOut'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'

class Home extends React.Component {

  constructor() {
    super()
    this.setUser = this.setUser.bind(this)
    this.state = {
      currentUser: null
    }
  }

  setUser(user){
    this.setState({currentUser:user})
  }


  render() {
  var mainDiv = <div className = "sign-in" >
    <h4>LOGIN</h4>
    <SignIn url="http://localhost:5000/users/sign_in.json" onSignIn={this.setUser}></SignIn>
    <SignUp url="http://localhost:5000/users.json" onSignUp={this.setUser}></SignUp>
  </div>

if(this.state.currentUser){
  mainDiv = <div className = "sign-in">
      <div className = "intro">
        <h1> Hi {this.state.currentUser.name}!</h1>
        <a href = "/#/groups">My Groups</a>
      </div>
    </div>
}
  

    return (
      <div className="home">
        <div className = "sign-out">
          <SignOut url="http://localhost:5000/users/sign_out.json" onSignOut={this.setUser}></SignOut>
        </div>
        <div className ="top">
          <div className = "sign-in">
            <h1 className='title'>WHOOP</h1>
            { mainDiv }
          </div>
        </div>
      </div>
    ) 
  }
}
export default Home