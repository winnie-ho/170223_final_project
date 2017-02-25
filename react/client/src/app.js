import React from "react"
import ReactDOM from "react-dom"
import Home from "./components/Home"
import Listing from "./components/Listing"
import Main from "./components/Main"
import SignUp from "./auth/SignUp"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

class App extends React.Component{
  render() {
    return(
    <Router history = {hashHistory}>
      <Route path = "/" component = {Main}>
        <IndexRoute component = {Home}/>
        <Route path = "/groups" component = {Listing}/>
        <Route path = "/signUp" component = {SignUp}/>
      </Route>
    </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"))