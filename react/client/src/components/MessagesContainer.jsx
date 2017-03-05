import React from "react"

class MessagesContainer extends React.Component{

constructor(props){
  super(props)
}

render() {

  var messageNodes = this.props.messages.map((message, index)=>{
    return(
      <div className = "message-div" key = {index}>
         <h6 key = {index}> {this.props.userName}</h6> <p>▻ {message.msg} </p>
      </div>
    )
  })

  return(
    <div className = "message-list">
      {messageNodes}
    </div>
    )
  }

}


export default MessagesContainer