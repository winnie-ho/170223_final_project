import React from "react"
import ReactDOM from "react-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import SignUp from "./auth/SignUp"
import GroupsContainer from "./components/GroupsContainer"
import GroupView from "./components/GroupView"
import GroupNew from "./components/GroupNew"
import EventListing from "./components/EventListing"
import EventView from "./components/EventView"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

class App extends React.Component{

  constructor(props) {
    super(props)
    this.state = { 
      groupId : "initial value"
    }
  }

  handleGroupView(event){
    console.log("group id selected:", event.target.value)
    console.log("view group clicked");
    var groupSelected = event.target.value
    this.setState({groupId: groupSelected})
  }

  render() {
      console.log("app level", this.state.groupId)
    return(
    <Router history = {hashHistory}>
      <Route path = "/" component = {Main}>
        <IndexRoute component = {Home}/>
        <Route path = "/groups" component = {GroupsContainer} handleGroupView = {this.handleGroupView}/>
        <Route path = "/groups/:id" component = {GroupView} groupId = {this.state.groupId}/>
        <Route path = "newgroup" component = {GroupNew}/>

        <Route path = "/events" component = {EventListing}/>
        <Route path = "/events/:id" component = {EventView}/>
      </Route>
    </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"))

