import React from 'react'
import { Link, browserHistory } from 'react-router'
import SignOut from '../auth/SignOut'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'

class Home extends React.Component {

  constructor() {
    super()
    this.setUser = this.setUser.bind(this)
    this.createAccount = this.createAccount.bind(this)
    this.state = {
      currentUser: null,
      createAccount: null
    }
  }

  setUser(user){
    this.setState({currentUser:user})
  }

  // fetchUser(){
  //   console.log("fetching user");
  //   const request = new XMLHttpRequest();
  //   request.open("GET", "http://localhost:5000/users.json");
  //   request.setRequestHeader("content-type", "application/json");
  //   request.withCredentials = true;

  //   request.onload = () => {
  //     if(request.status === 200){
  //       console.log("request.responseText", request.responseText);
  //       const receivedUser = JSON.parse(request.responseText);
  //       this.setUser(receivedUser);
  //     } else if (request.status === 401){
  //       this.setUser(null)
  //     }
  //   }
  //   request.send(null);
  // }

  // componentDidMount(){
  //   this.fetchUser()
  // }

  createAccount() {
    this.setState({createAccount:"yes"})
    console.log("create account clicked", this.state.createAccount)
  }

  render() {
  var mainDiv = <div className = "sign-in" >
    <h4>LOGIN</h4>
    <SignIn url="http://localhost:5000/users/sign_in.json" onSignIn={this.setUser}></SignIn>
    <div className = "create-acc" onClick = {this.createAccount}>
      <p>create account</p>
    </div>
  </div>

  if(this.state.createAccount === "yes"){
    var createAccDiv = <div className = "create-account"> 
      <h4>SIGN UP</h4>
      <SignUp url="http://localhost:5000/users.json" create = {this.state.createAccount} onSignUp={this.setUser}></SignUp>
    </div>
    mainDiv = <div> </div>
  }


if(this.state.currentUser){
  mainDiv = <div className = "sign-in">
      <div className = "intro">
        <h1> Hi {this.state.currentUser.name}!</h1>
        <a href = "/#/groups">My Groups</a>
      </div>
    </div>
    createAccDiv = <div></div>
}
  

    return (
      <div className="home">
        <div className ="top">
          <div className = "sign-out">
            <SignOut url="http://localhost:5000/users/sign_out.json" onSignOut={this.setUser}></SignOut>
          </div>
          <h1 className='title'>WHOOP</h1>
        </div>
          <div className = "sign-in">
            { mainDiv }
          </div>
          <div className = "create-account">
            { createAccDiv }
          </div>
      </div>
    ) 
  }
}
export default Home