import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";


class EventsContainer extends React.Component{

constructor(props){
  super(props)
  this.doSearch = this.doSearch.bind(this)
  console.log("Events in Eventcontainer:", this.props.events)

  this.state = {
    searchQuery: "",
  }
}

doSearch(event){
  this.setState({searchQuery: event.target.value})
}

render() {
  return(
    <div className="event-div" >
      <div className = "event-tools">
        <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
        
        <Link to = "/groups/:id/newEvent"><h1>+</h1></Link>
      </div>
      <div className = "event-inner-div">
        {
          this.props.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
                .map((event) => (
            <div className = "event-list" key = {event.id}>
              <button className = "event-box" >
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