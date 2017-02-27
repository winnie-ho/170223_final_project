import React from "react"

class MessagesContainer extends React.Component{

constructor(props){
  super(props)
}

render() {
  console.log("messages in MsgContainer:", this.props.messages)
  var messageNodes = this.props.messages.map((message, index)=>{
    return(
      <div className = "message-div" key = {index}>
        <p key = {index}> {message.msg} </p>
      </div>
    )
  })

  return(
    <div>
      {messageNodes}
    </div>
    )
  }

}


export default MessagesContainer