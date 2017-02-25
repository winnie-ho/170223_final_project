import React from 'react'
import { Link, browserHistory } from 'react-router'
import Group from './Group'

class Listing extends React.Component {

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.state = { 
      searchQuery: '', 
      groups: [] 
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
        this.setState( { groups: data } )
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

  render(){
    return(
      <div className="listing">
        <nav>
          <h1>WHOP</h1>
          <input className='search-box' type='text' placeholder='Search...' value={this.state.searchQuery} onChange={this.doSearch} />
        </nav>

        <div className='groups-container'>
          {
            this.state.groups.filter((group) => `${group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
             .map((group) => (
              <Group { ...group } key={group.id}/>
            ))

          }
        </div>
      
      </div>
    )
  }

}

export default Listing