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
          <p>GROUP {item.id}: {item.name}</p>
          {item.messages.map((message, index)=>{
            return(
              <p>{message.msg}</p>
              )
            })
          }
        </div>
      )
  })



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