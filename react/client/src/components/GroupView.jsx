import React from 'react'

class GroupView extends React.Component {

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.state = { 
      searchQuery: '', 
      events: [] 
    }
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