import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    this.goBack = this.goBack.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    console.log(this.props.location.query)


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


  render() {
    return(
        <div className = "event-view-div">
        <div>
        <div className = "top-bar">

          <div onClick = {this.goBack}>←back</div>

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

        </div>
      )
  }

}

export default EventView
