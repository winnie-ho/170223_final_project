import React from 'react'

class GroupNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      name: "" 
    }
  }

  handleOnChangeName(event){
    this.setState({name: event.target.value})
  }


  render(){

  }

}

export default GroupNew