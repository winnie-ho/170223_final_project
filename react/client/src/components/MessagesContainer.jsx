import React from "react"

class MessagesContainer extends React.Component{

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







  var messageNodes = groupDataObject.map((item, index)=>{
    return(
        <div key = {item.id}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          {item.events.map((event, index)=>{
            return(
              <p>{event.name}</p>
              )
          })
        }
        </div>
      )
  })


  // var eventNodes = eventsArray.map((event, index)=>{
  //   return(
  //         <p>{event.name}</p>
  //     )
  // })

  return(
    <div>
    {messageNodes}
    <p>{this.props.info.name}</p>
    <p>{this.props.info.id}</p>
    </div>
    )
  }

}


export default MessagesContainer