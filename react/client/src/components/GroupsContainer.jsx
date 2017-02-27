import React from "react"
import { Link, browserHistory } from "react-router"
import GroupsListing from "./GroupsListing"

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.state = { 
      groups: [],
      update: null
    }
  }

  componentDidMount(){
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

  update(){
    this.setState({update: "Yes"})
    this.componentDidMount()
    this.render()
  }

  render(){
    return(
      <div className="listing">
        <GroupsListing update={this.update} groups = {this.state.groups}/>
      </div>
    )
  }
}

export default GroupsContainer
