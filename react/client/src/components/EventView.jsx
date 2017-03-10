import React from "react";
import dbHandler from "../dbHandler";
import {Link, browserHistory, hashHistory} from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    this.eventId = this.props.location.query.id;
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

  parseEvent(){
    var eventString = this.props.location.query.event;
    var eventObject = JSON.parse(eventString);
    this.setState({event: eventObject});
  }

  goBack(){
    browserHistory.goBack();
  }

  getAttendees(){
    var urlSpec = "/groups/" + this.state.event.group_id + "/events/" + this.state.event.id + "/attendees";
    var word = "GET";
    var callback = function(data){
      for(var attendee of data){
        if(attendee.userName == this.props.location.query.userName){
          this.setState({attendees: data, going: true, attendeeId: data[data.length-1].id});
        } else if (attendee.userName !== this.props.location.query.userName){
          this.setState({going: false, attendees: data});
        }
      }
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  deleteEvent(){
    event.preventDefault();
    var urlSpec = "groups/" + this.state.event.group_id + "/events/" + this.state.event.id;
    var word = "DELETE";
    var callback = function(data){
      console.log("event deleted", data);
      this.goBack();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  addAttendee(){
    var urlSpec = "groups/:id/events/:id/attendees";
    var word = "POST";
    var callback = function(data){
      console.log("attendee added",data);
      this.getAttendees();
    }.bind(this);
    const data = {
      attendee:{
        event_id: this.state.event.id,
        user_id: this.props.location.query.userId,
        userName: this.props.location.query.userName
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  removeAttendee(){
    event.preventDefault();
    var urlSpec = "groups/" + this.state.event.group_id + "/events/" + this.state.event.id + "/attendees/" + this.state.attendeeId;
    var word = "DELETE";
    var callback = function(data){
      console.log("attendee removed");
      this.setState({going: false, attendees: []});
      this.getAttendees();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  render() {
    //mapping attendees for render
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
              <div className = "go-back" onClick = {this.goBack}>
                ←back
              </div>
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
