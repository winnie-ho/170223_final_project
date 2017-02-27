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
  console.log("Events in Eventcontainer:", this.props.events)



  var eventNodes = this.props.events.map(function(event, index){
    return(
      <div className="event-div" key={event.id}>
        <h2>{event.name}</h2>
        <p>{event.date}</p>
    </div>
    )
  }.bind(this))

    //   {item.events.map((event, index)=>{
    //     return(

    //       item.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
    //       .map((event) => (

    //         <button className = "event-box" key = {index.id}>
    //         <h3>{event.name}</h3>
    //         ({event.time})
    //         </button>

    //         ))
    //       )
    //   })
    // }
    // <button className = "event-box"><h1>+</h1></button>




  return(
    <div>
    <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
    {eventNodes}
    </div>
    )}
}


export default EventsContainer