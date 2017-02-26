import React from "react"
import MessagesContainer from "./MessagesContainer"

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      groupData: [] 
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
        console.log("api data", data);
        this.setState({groupData: data})
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
  }

  render(){
    return(
      <div className="group-view">
        <div className = "group-main">
          <div className = "message-board">

            <h2>Message Board</h2>

            <MessagesContainer info = {this.state.groupData}/>
          </div>


          <div className = "events-scroll">
            <h2>Events Scroll</h2>
          </div>


        </div>
      </div>
    )
  }

}

export default GroupView