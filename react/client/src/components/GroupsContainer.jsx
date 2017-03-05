import React from "react"
import { Link, browserHistory } from "react-router"
import GroupsListing from "./GroupsListing"

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    console.log("props in GroupsContainer", this.props)
    this.addGroup = this.addGroup.bind(this);
    this.setAddedGroup = this.setAddedGroup.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.state = { 
      groups: [],
      addedGroup: null,
      newGroup: false,
      userName: null,
      userId: null,
      recentGroup: null
    }
  }

  componentDidMount(){
    this.getGroups()
  }

  componentWillReceiveProps(){
    this.getGroups()
  }

  getGroups(){
    var url = "http://localhost:5000/memberships"
    var request = new XMLHttpRequest()
    request.open("GET", url)

    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        console.log("data in GroupsContainer:", data)
        this.setState({
          groups: data,
          newGroup: false,
          userName: data[0].userName,
          userId: data[0].user_id
        })
        console.log("setting groups:", this.state.groups)
        console.log("setting userName:", this.state.userName)
        console.log("setting userId:", this.state.userId)
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
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
        this.setState({recentGroup: data[data.length-1].group_id
        }, this.addMembership())
        console.log("data", data)
        console.log("lastGroup", data[data.length-1].group_id)
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
        userName: this.state.userName,
        user_id: this.state.userId,
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
