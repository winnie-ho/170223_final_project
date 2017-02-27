import React from "react"
import { Link, browserHistory } from "react-router"
import GroupsListing from "./GroupsListing"

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.addGroup = this.addGroup.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.state = { 
      groups: [],
      name: ""
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
        name: this.state.name
      }
    }
    request.send(JSON.stringify(data));
    this.getGroups()
    console.log("group added",data);

  }

  handleOnChangeName(event){
    this.setState({name: event.target.value})
  }
  

  render(){
    return(
      <div className="listing">
        <GroupsListing addGroup={this.addGroup} groups = {this.state.groups}/>
        <div className = "new-group-form-div">
        <form onSubmit={this.addGroup} className="new-group-form">
          <input type="text" onChange={this.handleOnChangeName} placeholder="name" />
          <button onClick={this.addGroup}> ADD GROUP </button>
        </form>
        </div>
      </div>
    )
  }
}

export default GroupsContainer
