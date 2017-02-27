import React from "react"

class MessagesContainer extends React.Component{

constructor(props){
  super(props)
  this.addMessage = this.addMessage.bind(this)
  this.state = {
    msg: ""
  }
}

addMessage(event){
  event.preventDefault();
  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5000/groups.json");
  request.setRequestHeader("content-type", "application/json");
  request.withCredentials = true;

  request.onload = ()=>{
    if(request.status === 201){
      const user = JSON.parse(request.responseText);
    }
  }

  const data = {
    message: {
      msg: this.state.msg
    }
  }
  request.send(JSON.stringify(data));

  this.render()
  console.log("message added",data);

}

handleAddMessage(event){
  this.setState({msg: event.target.value})
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
      <input type = "text" onChange = {this.handleOnChangeMsg}placeholder = "message" className = "message-box"/> 
      <button onClick = {this.addMessage}>POST</button>
    </div>
    )
  }

}


export default MessagesContainer