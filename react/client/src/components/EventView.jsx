import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";

class EventView extends React.Component{
  constructor(props){
    super(props)
    console.log(this.props.location.query)


  }

  render() {
    return(
        <div className = "event-view-div">
          <h2>{this.props.location.query.name}</h2>
          <h3>{this.props.location.query.date}</h3>
          <h4>{this.props.location.query.time}</h4>
          <h4>{this.props.location.query.location}</h4>
          <h4>{this.props.location.query.description}</h4>
          <h4>{this.props.location.query.route}</h4>

        </div>
      )
  }

}

export default EventView
