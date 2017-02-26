import React from "react"

class EventsContainer extends React.Component{

constructor(props){
  super(props)

}

render() {
  console.log(this.props.info)
  var groupDataObject = this.props.info
  var messagesArray = groupDataObject.messages
  var eventsArray = groupDataObject.events
  console.log(groupDataObject)
  console.log("array of Messages", messagesArray)
  console.log("array of Events", eventsArray)


          var eventNodes = groupDataObject.map((item, index)=>{
            return(
                <div key = {item.id}>
                  {item.events.map((event, index)=>{
                    return(
                      <p>{event.name}</p>
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
    )
  }

}


export default EventsContainer