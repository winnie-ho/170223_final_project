import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";


class EventsContainer extends React.Component{

constructor(props){
  super(props)
  this.doSearch = this.doSearch.bind(this)
  this.eventView = this.eventView.bind(this)
  console.log("props", this.props)
  console.log("Events in Eventcontainer:", this.props.events)

  this.state = {
    searchQuery: "",
  }
}

doSearch(event){
  this.setState({searchQuery: event.target.value})
}

eventView(){
  console.log("clicking to view event")
  this.props.router.push("/groups/:id/event/:id")
}


render() {
    console.log(this.props.groupId)
  return(
    <div className="event-div" >
      <div className = "event-tools">
        <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
        
        <Link to = {
          {
            "pathname": "/groups/:id/newEvent",
            "query": {"groupId": this.props.groupId}
          }
        }>

        <h1>+</h1></Link>
      </div>
      <div className = "event-inner-div">
        {
          this.props.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
                .map((event) => (
            <div className = "event-list" key = {event.id}>
              <button onClick = {this.eventView} className = "event-box" >
                <h3>{event.name}</h3>
                <p>{event.time}</p>
              </button>
            </div>
          ))
        }
      </div>
    </div>
    )
  }
}


export default EventsContainer