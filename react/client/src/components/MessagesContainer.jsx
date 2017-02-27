import React from "react"

class MessagesContainer extends React.Component{

constructor(props){
  super(props)

}

render() {
  var messageNodes = this.props.info.map((item, index)=>{
    return(
      <div className = "message-div" key = {item.id}>
      {item.messages.map((message, index)=>{
        return(

          <p key = {index}> {message.msg} </p>
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
    <input placeholder = "message" className = "message-box"/> 
    <button>post</button>
    </div>
    )
}

}


export default MessagesContainer