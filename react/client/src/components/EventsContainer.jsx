import React from "react"

class EventsContainer extends React.Component{

constructor(props){
  super(props)
}

render() {
  var eventNodes = this.props.info.map((item, index)=>{
    return(
      <div key = {item.id}>
      {item.events.map((event, index)=>{
        return(
          <p key = {index}>{event.name}</p>
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