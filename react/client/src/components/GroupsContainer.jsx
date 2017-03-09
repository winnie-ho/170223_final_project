import React from "react"
import { Link, browserHistory } from "react-router"
import GroupsListing from "./GroupsListing"

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    console.log("props in GroupsContainer", this.props)
    this.getUser = this.getUser.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.setAddedGroup = this.setAddedGroup.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);

    this.state = { 
      groups: [],
      addedGroup: null,
      newGroup: false,
      userId: null,
      recentGroup: null
    }
  }

  componentWillMount(){
    this.getGroups();
    this.getUser();
  }

  getUser(){
    var url = "http://localhost:5000/users/1"
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        console.log("Users data in GroupsContainer:", data)
          this.setState({
            userId: data.id,
            userName: data.name
          })
        console.log("setting userId:", this.state.userId)
        console.log("setting userName:", this.state.userName)
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
  }

  getGroups(){
    var url = "http://localhost:5000/memberships/1"
    var request = new XMLHttpRequest()
    request.open("GET", url)

    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        console.log("data in GroupsContainer:", data)
          this.setState({groups: data})
        console.log("setting groups:", this.state.groups)
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
  }


  addGroup(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/groups.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if (request.status === 200) {
        const user = JSON.parse(request.responseText);
        this.setState({ newGroup:false}, this.getLastGroup())
      }
    }

    const data = {
        group: {
          name: this.state.addedGroup
        }
    }
      request.send(JSON.stringify(data));
      console.log("group added", data);
  }


  getLastGroup(){
    var url = "http://localhost:5000/groups"
    var request = new XMLHttpRequest()
    request.open("GET", url)

    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        var lastGroupId = data[data.length-1].id
        this.setState({recentGroup: lastGroupId})
        this.addMembership()
        console.log("lastGroup", data[data.length-1].id)
        console.log("lastGroupstate", this.state.recentGroup)
        
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)    
  }



  addMembership(){
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/memberships.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if (request.status === 200) {
        const user = JSON.parse(request.responseText);
        this.setState({ newGroup:false },this.getGroups())
      }
    }

    const data = {
        membership: {
        user_id: this.state.userId,
        userName: this.state.userName,
        group_id: this.state.recentGroup
      }
    }

    request.send(JSON.stringify(data));
    console.log("membership added", data);
  }

  handleNewGroup(){
    this.setState({newGroup:true})
  }

  setAddedGroup(addedGroup){
    this.setState({addedGroup: addedGroup})
  }

  render(){
    console.log("groups to pass", this.state.groups)
    return(
      <div className="listing">
        <GroupsListing newGroup={this.state.newGroup} setGroup={this.setAddedGroup} addGroup={this.addGroup} groups={this.state.groups} handleNewGroup = {this.handleNewGroup}/>
      </div>
    )
  }
}

export default GroupsContainer
