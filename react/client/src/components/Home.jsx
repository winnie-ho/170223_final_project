import React from "react";
import { Link, browserHistory, hashHistory } from "react-router";
import SignOut from "../auth/SignOut";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

class Home extends React.Component {

  constructor() {
    super()
    this.setUser = this.setUser.bind(this)
    this.goBack = this.goBack.bind(this)
    this.createAccount = this.createAccount.bind(this)
    this.state = {
      currentUser: null,
      createAccount: false,
    }
  }


  fetchUser(){
    console.log("fetching user");
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/users/1.json");
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

  setUser(user){
    this.setState({currentUser:user})
  }

  goBack(){
    this.setState({currentUser:null})
    this.setState({createAccount:false})
    console.log("current user", this.state.currentUser)
  }

  createAccount() {
    this.setState({currentUser:null})
    this.setState({createAccount:true})
    console.log("create account clicked", this.state.createAccount)
  }

  render() {

    console.log("currentUser", this.state.currentUser)
  {/*initial state render - sign in*/}
  var mainDiv = <div className = "sign-in" >
    <h4>LOGIN</h4>
    <SignIn url="http://localhost:5000/users/sign_in.json" onSignIn={this.setUser}></SignIn>
    <div className = "create-acc" onClick = {this.createAccount}>
      <p>create account</p>
    </div>
  </div>
  var signOutDiv = <div> </div>

  {/*2nd state render - sign up*/}
  if(this.state.createAccount === true){
    var createAccDiv = <div className = "create-account"> 
      <h4>SIGN UP</h4>
      <SignUp url="http://localhost:5000/users.json" create = {this.state.createAccount} onSignUp={this.setUser}></SignUp>
      <div onClick = {this.goBack}>
        <p> ← sign in </p>
      </div>

    </div>
    mainDiv = <div> </div>
    signOutDiv = <div> </div>
  }

  {/*3rd state render - enter*/}
if(this.state.currentUser){
  signOutDiv = <div className = "sign-out">
    <SignOut url="http://localhost:5000/users/sign_out.json" onSignOut={this.setUser}></SignOut>
  </div>
  mainDiv = <div className = "sign-in">
      <div className = "intro">
        <h3> Hi </h3>
        <h2> {this.state.currentUser.name}</h2>


        <Link to = {
          {
            "pathname": "/groups",
            "query":{
              "userName": this.state.currentUser.name,
              "userId": this.state.currentUser.id
            }
          }
        }>
        <h3>MY GR<span className = "enter">◉</span>UPS</h3>
        </Link>


      </div>
    </div>
    createAccDiv = <div></div>
}
  
{/*calling the render*/}
    return (
      <div className="home">
        <div className ="top">
          {signOutDiv}
          <h1>WH<span className='title'>◉◎</span>P</h1>
        
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
export default Home;