import React from "react"
import ReactDOM from "react-dom"
import MessagesContainer from "./MessagesContainer"
import EventsContainer from "./EventsContainer"
import { Link, browserHistory, hashHistory } from "react-router";

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    console.log("props in groupView", this.props)
    this.groupSelected = props.location.query.groupId
    this.addMessage = this.addMessage.bind(this)
    this.handleOnChangeMsg = this.handleOnChangeMsg.bind(this);
    this.addEventUpdate = this.addEventUpdate.bind(this)

    this.state = { 
      groupData: [],
      events: [],
      messages: [],
      msg: null,
      name: null,
      date: null,
      time: null,
      location: null,
      description: null,
      route: null
      }
  }

  componentDidMount(){
    this.getData()
    console.log("getting data")
  }

  getData(){
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
    console.log("message added", data);
    this.getData()
    ReactDOM.findDOMNode(this.refs.form).value = "";
  }

  addEventUpdate(event){
    this.getData()
  }

  handleOnChangeMsg(event){
    this.setState({msg: event.target.value})
  }
  render(){

    var groupTitle = this.state.groupData.name
    var upperGroupTitle = `${this.state.groupData.name}`.toUpperCase()
    return(
      <div className="group-view">
        <h2>{upperGroupTitle}</h2>
        <div className = "top-bar">
          <div>
          <Link to = "/groups">←my groups</Link>
          </div>
          <div className = "top-bar-right">
          <button className = "icon-button">✄</button>
          <button className = "icon-button">✎</button>
          </div>
        </div>
        <div className = "group-main">

          <div className = "message-board">
            <h3>MESSAGES</h3>
            <form onSubmit = {this.addMessage} className = "new-message-form">
            <input ref="form" type = "text" onChange = {this.handleOnChangeMsg} placeholder = "message" className = "message-box"/> 
            <button onClick = {this.addMessage}>POST</button>
            </form>
            <MessagesContainer groupId = {this.groupSelected} messages={this.state.messages}/>
          </div>


          <div className = "events-scroll">
            <h3>EVENTS</h3>

            <EventsContainer chiildren = {this.props.children}router = {this.props.router} addEventUpdate = {this.addEventUpdate}groupId = {this.groupSelected} events={this.state.events}/>
          </div>


        </div>
      </div>
    )
  }

}

export default GroupView