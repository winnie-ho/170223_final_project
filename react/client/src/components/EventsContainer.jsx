import React from "react"

class EventsContainer extends React.Component{

constructor(props){
  super(props)
  this.state = {
    searchQuery: "",
  }
}

doSearch(event){
  this.setState({searchQuery: event.target.value})
}

render() {
  var eventNodes = this.props.info.map((item, index)=>{
    return(
      <div className = "event-div" key = {item.id}>
      {item.events.map((event, index)=>{
        return(

          <button className = "event-box" key = {index}>
            <h3>{event.name}</h3>
            ({event.time})
          </button>

          )

      })
    }
          <button className = "event-box"><h1>+</h1>
          </button>
    </div>
    )
  })

  return(
    <div>
    <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
    {eventNodes}
    </div>
    )}
}


export default EventsContainer