import React from "react"

class EventsContainer extends React.Component{

constructor(props){
  super(props)
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
    </div>
    )
  })

  return(
    <div>
    {eventNodes}
    </div>
    )}
}


export default EventsContainer