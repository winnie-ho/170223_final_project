import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventListing extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className = "event-inner-div">
        {
          this.props.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.props.searchQuery.toUpperCase()) >= 0)
                .map((event) => (
            <div className = "event-list" key = {event.id}>
 
        <div className = "event-box" onClick = {this.props.setEventView}>
        <h4>{event.name}</h4>
        <p>{event.time}</p>
        </div>
        <Link to = {
          {
            "pathname": "/groups/:id/showEvent",
            "query":{
              "id": event.id,
              "name": event.name,
              "date": event.date,
              "time": event.time,
              "location": event.location,
              "description": event.description,
              "route": event.route
            }
          }
        }>more▷</Link>
             
            </div>
          ))
        }
      </div>


      )
  }

}

export default EventListing
