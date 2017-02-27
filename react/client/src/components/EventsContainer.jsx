import React from "react"

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
    <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
    {
      this.props.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
            .map((event) => (
        <div key = {event.id}>
          <button className = "event-box" >
            <h3>{event.name}</h3>
            <p>{event.time}</p>
          </button>
        </div>
      ))
    }

      <button className = "event-box">
        <h1>+</h1>
      </button>
    </div>
    )
  }
}


export default EventsContainer