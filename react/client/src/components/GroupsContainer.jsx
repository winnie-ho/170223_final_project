import React from "react"
import { Link, browserHistory } from "react-router"
import GroupsListing from "./GroupsListing"

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.addGroup = this.addGroup.bind(this);
    this.setAddedGroup = this.setAddedGroup.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.state = { 
      groups: [],
      addedGroup: null,
      newGroup: false
    }
  }

  componentDidMount(){
    this.getGroups()
  }

  getGroups(){
    var url = "http://localhost:5000/groups"
    var request = new XMLHttpRequest()
    request.open("GET", url)

    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        this.setState( { groups: data } )
        this.setState({ newGroup:false })

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
      if (request.status === 201) {
        const user = JSON.parse(request.responseText);
      }
    }

    const data = {
        group: {
        name: this.state.addedGroup
      }
    }
    request.send(JSON.stringify(data));
    console.log("group added",data);
        this.setState({ newGroup:false })
        this.getGroups()
  }
  


  handleNewGroup(){
    this.setState({newGroup:true})
  }

  setAddedGroup(addedGroup){
    this.setState({addedGroup: addedGroup})
  }

  render(){
    console.log(this.state.newGroup)
    return(
      <div className="listing">
        <GroupsListing newGroup = {this.state.newGroup}setGroup = {this.setAddedGroup}addGroup={this.addGroup} groups = {this.state.groups} handleNewGroup = {this.handleNewGroup}/>
      </div>
    )
  }
}

export default GroupsContainer
