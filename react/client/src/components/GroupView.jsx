import React from "react"
import MessagesContainer from "./MessagesContainer"
import EventsContainer from "./EventsContainer"

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    this.groupSelected = props.location.query.groupId
    this.addMessage = this.addMessage.bind(this)
    this.handleOnChangeMsg = this.handleOnChangeMsg.bind(this);

    this.state = { 
      groupData: [],
      events: [],
      messages: [],
      msg: ""
      }
  }

  componentDidMount(){
    this.getMessages()
  }

  getMessages(){
    var url = "http://localhost:5000/groups"
    var request = new XMLHttpRequest()
    request.open("GET", url)

    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        console.log("updated api data", data[this.groupSelected-1]);
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

  addMessage(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/groups/:id/messages.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = ()=>{
      if(request.status === 201){
        const user = JSON.parse(request.responseText);
      }
    }

    const data = {
      message: {
        msg: this.state.msg,
        group_id: this.groupSelected
      }
    }
    request.send(JSON.stringify(data));
    this.getMessages()
    console.log("message added", data);

  }

  handleOnChangeMsg(event){
    this.setState({msg: event.target.value})
  }
  render(){
    return(
      <div className="group-view">
        <div className = "group-main">

          <div className = "message-board">
            <h2>MESSAGES</h2>
            <form onSubmit = {this.addMessage} className = "new-message-form">
            <input type = "text" onChange = {this.handleOnChangeMsg} placeholder = "message" className = "message-box"/> 
            <button onClick = {this.addMessage}>POST</button>
            </form>
            <MessagesContainer groupId = {this.groupSelected} messages={this.state.messages}/>
          </div>


          <div className = "events-scroll">
            <h2>EVENTS</h2>
            <EventsContainer groupId = {this.groupSelected}events={this.state.events}/>
          </div>


        </div>
      </div>
    )
  }

}

export default GroupView