import React from 'react'
import Group from "./Group"
import GroupNew from "./GroupNew"


class GroupsListing extends React.Component{

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.handleNewGroup = this.handleNewGroup.bind(this)
    this.resetNewGroup = this.resetNewGroup.bind(this)
    this.state = {
      searchQuery: "",
      newGroup: false 
    }
  }

  doSearch(event){
    this.setState({searchQuery: event.target.value})
  }

  handleNewGroup(){
    console.log("new group clicked");
    this.setState({newGroup:true});
  }

  resetNewGroup(){
      this.setState({newGroup:false})  
      console.log("reset", this.state.newGroup)
  }




  render() {
    if (this.state.newGroup === true){
      var newGroupForm = <GroupNew reset = {this.resetNewGroup} update = {this.props.update}/>
    }else if (this.state.newGroup === false) {
      newGroupForm = "+";
    }



    return(
      <div>
        <nav>
          <h1>⃞⃞⃞</h1>
          <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
        </nav>

        <div className='groups-scroll'>

        {/*does the search filtering for the search bar*/}
        {
          this.props.groups.filter((group) => `${group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
          .map((group) => (
            <Group { ...group } key={group.id}  groups = {this.props.groups} handleGroupView = {this.props.handleGroupView} />
            ))
        }
          <div className = "new-group" onClick = {this.handleNewGroup}>
          {newGroupForm}
          </div>

        </div>
      </div>
      )
  }




}

export default GroupsListing