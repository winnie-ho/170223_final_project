import React from "react"
import MessagesContainer from "./MessagesContainer"
import EventsContainer from "./EventsContainer"

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    this.groupSelected = props.location.query.groupId
    this.state = { 
      groupData: [],
      events: [],
      messages: []
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
        console.log("api data", data[this.groupSelected-1]);
        this.setState({groupData: data[this.groupSelected-1]})
        this.setState({events: data[this.groupSelected-1].events})
        this.setState({messages: data[this.groupSelected-1].messages})
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
  }

  render(){
    
    //get rid of this trail below
    // console.log("group id", this.props.route.groupId)
    //

    console.log("messages:", this.state.messages)
    console.log("events:", this.state.events)


    return(
      <div className="group-view">
        <div className = "group-main">

          <div className = "message-board">
            <h2>MESSAGES</h2>
            <MessagesContainer messages={this.state.messages}/>
          </div>


          <div className = "events-scroll">
            <h2>EVENTS</h2>
            <EventsContainer events={this.state.events}/>
          </div>


        </div>
      </div>
    )
  }

}

export default GroupView