import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    this.goBack = this.goBack.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.parseAttendees = this.parseAttendees.bind(this);
    this.addAttendee = this.addAttendee.bind(this);
    console.log(this.props.location.query);

    this.state = {
      attendees: []
    }
  }

  componentDidMount(){
    this.parseAttendees();
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

  parseAttendees(){
    var data = this.props.location.query.attendees;
    var attendeesData = JSON.parse(data);

    this.setState({attendees: attendeesData});
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
        event_id: this.props.location.query.id,
        user_id: this.props.location.query.userId,
        userName: this.props.location.query.userName
      }
    }
    request.send(JSON.stringify(data));
    console.log("attendee added",data);
  }

  render() {

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
          <h2>{this.props.location.query.name}</h2>
          <h3>{this.props.location.query.date.slice(0,10)}</h3>
          <h4>{this.props.location.query.time.slice(11,16)}</h4>
          <h4>{this.props.location.query.location}</h4>
          <h4>{this.props.location.query.description}</h4>
          
          <h1 onClick = {this.addAttendee}>+</h1>
          <h3>GOING </h3>
          {attendeesNodes}

        </div>
      )
  }

}

export default EventView
