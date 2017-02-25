import React from 'react'
import SignIn from './SignIn'
// import SignUp from './SignUp' 
import SignOut from './SignOut'

class LoginBox extends React.Component {

  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
    this.state = {
      currentUser: null
    }
  }

  setUser(user){
    this.setState({currentUser:user})
  }

  fetchUser(){
    console.log("fetching user");
    const request = new XMLHttpRequest();
    request.open("GET", this.props.url + "users.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if(request.status === 200){
        console.log("request.responseText", request.responseText);
        const receivedUser = JSON.parse(request.responseText);
        this.setUser(receivedUser);
      } else if (request.status === 401){
        this.setUser(null)
      }
    }
    request.send(null);
  }

  componentDidMount(){
    this.fetchUser()
  }

  render () {
      var mainDiv = <div className = "sign-in" >
        <h4>LOGIN</h4>
        <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser}></SignIn>
      </div>
      if(this.state.currentUser){
        mainDiv = <div className = "sign-in">
          <h4> Hi {this.state.currentUser.email}</h4>
          <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.setUser}></SignOut>
        </div>
      }
      return (
        <div className = "sign-in">
          { mainDiv }
        </div>
      ) 
  }
}

export default LoginBox
      //  <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser}></SignUp>