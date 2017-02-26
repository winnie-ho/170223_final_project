import React from 'react'

class GroupNew extends React.Component {

  constructor(props) {
    super(props)
    this.addGroup = this.addGroup.bind(this)
    this.handleOnChangeName = this.handleOnChangeName.bind(this)
    this.state = { 
      name: "" 
    }
  }

  addGroup(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/groups.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if (request.status === 201) {
        const user = JSON.parse(request.responseText);
      }
    }

    const data = {
      group: {
        name: this.state.name
      }
    }
    request.send(JSON.stringify(data));
    this.props.update
    console.log("group added");
  }

  handleOnChangeName(event){
    this.setState({name: event.target.value})
  }
  

  render(){
    return(
      <div className = "new-group-form-div">
      <form onSubmit={this.addGroup} className="new-group-form">
        <input type="text" onChange={this.handleOnChangeName} placeholder="name" />
        <button onClick={this.addGroup}> ADD GROUP </button>
      </form>
      </div>
    )
  }

}

export default GroupNew