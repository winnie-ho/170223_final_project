import React from "react"

class MessagesContainer extends React.Component{

constructor(props){
  super(props)

}

render() {
  var messageNodes = this.props.info.map((item, index)=>{
    return(
      <div key = {item.id}>
      <p>GROUP {item.id}: {item.name}</p>
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
    </div>
    )
}

}


export default MessagesContainer