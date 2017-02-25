import React from 'react'
import { Link, browserHistory } from 'react-router'

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.state = { 
      searchQuery: '', 
      events: [] 
    }
  }


  componentDidMount(){
    var url = 'http://localhost:5000/groups'
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/json")
    request.withCredentials = true

    request.onload = () => {
       if(request.status === 200){
        console.log("request: ", request.responseText)
        var data = JSON.parse(request.responseText)
        this.setState( { events: data } )
       } else{
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack()
       }
    }
    request.send(null)
  }

  doSearch(event){
    this.setState({searchQuery: event.target.value})
  }

  handleNewEvent(){
    console.log("new event clicked");
  }

  handleEventView(){
    console.log("view event clicked");
  }

  render(){
    return(
      <div className="group-view">
        <h1>{this.state.events[0]}</h1>
        <div className = "group-main">
          <div className = "message-board">
            <h2>Message Board</h2>
          </div>
          <div className = "events-scroll">
            <h2>Events Scroll</h2>
          </div>
        </div>
      </div>
    )
  }

}

export default GroupView