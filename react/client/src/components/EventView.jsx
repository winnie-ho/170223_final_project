import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    console.log("carry through:", this.props.location.query)
    this.goBack = this.goBack.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.addAttendee = this.addAttendee.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.parseEvent = this.parseEvent.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);

    this.state = {
      attendees: [],
      event: null,
      going: null,
      attendeeId: null
    }
  }

  componentWillMount(){
    this.parseEvent();
  }

  componentDidMount(){
    this.getAttendees();
  }

  getAttendees(){
    var url = "http://localhost:5000/groups/" + this.state.event.group_id + "/events/" + this.state.event.id + "/attendees";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
       if(request.status === 200){
        var data = JSON.parse(request.responseText);
        console.log("data", data);
        for(var attendee of data){
          if(attendee.userName == this.props.location.query.userName){
            this.setState({attendees: data, going: true, attendeeId: data[data.length-1].id});
          } else if (attendee.userName !== this.props.location.query.userName){
            this.setState({going: false, attendees: data});
            console.log("attendees:", this.state.attendees);
            console.log("going status:", this.state.going);
          }
        }
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
        console.log("attendee added",data);
        this.getAttendees();
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

  }

  removeAttendee(){
    event.preventDefault();
    var url = "http://localhost:5000/groups/"+ this.state.event.group_id + "/events/" +  this.state.event.id + "/attendees/" + this.state.attendeeId + ".json";
    const request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;
    request.onload = ()=>{
      if(request.status === 200){
        console.log("attendee removed");
        this.setState({going: false, attendees: []});
        this.getAttendees();
        console.log("attendees after removal:", this.state.attendees);
      }
    }
    request.send()
  }

  render() {
    console.log("THIS", this.state.event);
    console.log("going", this.state.going);

    var attendeesNodes = this.state.attendees.map((attendee, index)=>{
        return(
            <div key = {index}>
              ⦿{attendee.userName}
            </div>
          )
    })

//attendance control conditions
    if(this.state.going === false || this.state.going === null){
      var attendanceControl = 
        <div className = "attendance-control">
          <h1 onClick = {this.addAttendee}>+</h1>
        </div>
    } else if (this.state.going === true) {
      attendanceControl = 
        <div className = "attendance-control">
          <h1 onClick = {this.removeAttendee}>-</h1>
        </div>
    }


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
          {attendanceControl}

          {attendeesNodes}

        </div>
      )
  }

}

export default EventView
