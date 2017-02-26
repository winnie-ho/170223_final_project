import React from 'react'

class GroupNew extends React.Component {

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
      <div className="group-new">
        <h1>Create New Group</h1>

      </div>
    )
  }

}

export default GroupNew