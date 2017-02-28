import React from "react"
import ReactDOM from "react-dom"
import { Link, browserHistory, hashHistory } from "react-router";

class EventNew extends React.Component{

  constructor(props){
    super(props)
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeDate = this.handleOnChangeDate.bind(this);
    this.handleOnChangeTime = this.handleOnChangeTime.bind(this);
    this.handleOnChangeLocation = this.handleOnChangeLocation.bind(this)
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    this.handleOnChangeRoute = this.handleOnChangeRoute.bind(this);
    this.addEvent = this.addEvent.bind(this);

    this.state = {
      name: null,
      date: null,
      time: null,
      location: null,
      description: null,
      route: null
    }
  }



  handleOnChangeName(event){
    this.setState({name: event.target.value})
    console.log(this.state.name)
  }

  handleOnChangeDate(event){
    this.setState({date: event.target.value})
  }

  handleOnChangeTime(event){
    this.setState({time: event.target.value})
  }

  handleOnChangeLocation(event){
    this.setState({location: event.target.value})
  }

  handleOnChangeDescription(event){
    this.setState({description: event.target.value})
  }

  handleOnChangeRoute(event){
    this.setState({Route: event.target.value})
  }

  addEvent(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/groups/:id/events.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = ()=>{
      if(request.status === 201){
        const user = JSON.parse(request.responseText);
      }
    }

    const data = {
      event: {
        name: this.state.name,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        description: this.state.description,
        route: this.state.route,
        group_id: this.groupSelected
      }
    }
    request.send(JSON.stringify(data));
    console.log("event added", data);
    ReactDOM.findDOMNode(this.refs.form).value = "";
  }

  render(){
    return(
      <div className = "new-event-form">
      <h4>ADD EVENT</h4>
        <form>
          <input type = "text" onChange = {this.handleOnChangeName} placeholder = "name" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeDate} placeholder = "date" className = "event-form-input"/>
          <input type = "text" onChange = {this.handleOnChangeTime} placeholder = "time" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeLocation} placeholder = "location" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeDescription} placeholder = "description" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeRoute} placeholder = "route" className = "event-form-input"/>         
          <button onClick = {this.addEvent}>ADD</button>
        </form>





      </div>
      )
  }


}

export default EventNew