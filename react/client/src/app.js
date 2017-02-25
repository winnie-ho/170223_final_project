import React from "react"
import ReactDOM from "react-dom"
import Home from "./components/Home"
import GroupListing from "./components/GroupListing"
import EventListing from "./components/EventListing"
import Main from "./components/Main"
import SignUp from "./auth/SignUp"
import GroupView from "./components/GroupView"
import EventView from "./components/EventView"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

class App extends React.Component{
  render() {
    return(
    <Router history = {hashHistory}>
      <Route path = "/" component = {Main}>
        <IndexRoute component = {Home}/>
        <Route path = "/groups" component = {GroupListing}/>
        <Route path = "/groups/:id" component = {GroupView}/>

        <Route path = "/events" component = {EventListing}/>
        <Route path = "/events/:id" component = {EventView}/>
      </Route>
    </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"))