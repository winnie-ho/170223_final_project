import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    this.goBack = this.goBack.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.addAttendee = this.addAttendee.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.parseEvent = this.parseEvent.bind(this);

    this.state = {
      attendees: [],
      event: null
    }
  }

  componentWillMount(){
    this.parseEvent();
  }

  componentDidMount(){
    this.getAttendees();
  }



  getAttendees(){
    var url = "http://localhost:5000/groups/"+ this.state.event.group_id + "/events/" +  this.state.event.id + "/attendees";
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText)
        console.log("data", data)
        this.setState({attendees: data})
       } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    };
    request.send(null);
  }

  goBack(){
    browserHistory.goBack();
  }

  deleteEvent(){
    event.preventDefault();
    var eventId = this.props.location.query.id
    var url = "http://localhost:5000/groups/:id/events/" + eventId + ".json"

    const request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = ()=>{
      if(request.status === 200){
        console.log("event deleted", data);
      }
        this.goBack()
    }
    request.send()
  }

  parseEvent(){
    var eventString = this.props.location.query.event;
    var eventObject = JSON.parse(eventString);
    this.setState({event: eventObject});
  }

  addAttendee(){
    event.preventDefault();
    var url = "http://localhost:5000/groups/:id/events/:id/attendees.json"
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
      if (request.status === 200) {
        const user = JSON.parse(request.responseText);
      }
    }
    const data = {
      attendee:{
        event_id: this.state.event.id,
        user_id: this.props.location.query.userId,
        userName: this.props.location.query.userName
      }
    }
    request.send(JSON.stringify(data));
    console.log("attendee added",data);
    this.getAttendees();
  }

  render() {
    console.log("THIS", this.state.event);

    var attendeesNodes = this.state.attendees.map((attendee, index)=>{
        return(
            <div key = {index}>
              ⦿{attendee.userName}
            </div>
          )
    })

    return(
        <div className = "event-view-div">
        <div>
        <div className = "top-bar">

          <div className = "go-back" onClick = {this.goBack}>←back</div>

          <div className = "top-bar-right">
          <button onClick = {this.deleteEvent} className = "icon-button">✄</button>
          <button className = "icon-button">✎</button>
          </div>
        </div>
        </div>
          <h2>{this.state.event.name}</h2>
          <h3>{this.state.event.date.slice(0,10)}</h3>
          <h4>{this.state.event.time.slice(11,16)}</h4>
          <h4>{this.state.event.location}</h4>
          <h4>{this.state.event.description}</h4>
          
            <h3> GOING </h3>
          <div className = "attendance-control">
            <h1 onClick = {this.addAttendee}>+</h1>
            <h1>-</h1>
          </div>
          {attendeesNodes}

        </div>
      )
  }

}

export default EventView
