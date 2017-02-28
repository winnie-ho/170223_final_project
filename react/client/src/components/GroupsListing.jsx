import React from 'react'
import Group from "./Group"
import GroupNew from "./GroupNew"


class GroupsListing extends React.Component{

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.handleNewGroup = this.handleNewGroup.bind(this)
    this.resetNewGroup = this.resetNewGroup.bind(this)
    this.updateGroupsListing = this.updateGroupsListing.bind(this)
    this.state = {
      searchQuery: "",
      update: false
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
    console.log("reset", this.state.newGroup)
    this.setState({newGroup:this.props.newGroup});
  }

  updateGroupsListing(){
    this.setState({update:true});
  }


  render() {
    if (this.props.newGroup === true){
      var newGroupForm = <GroupNew reset = {this.resetNewGroup} setGroup = {this.props.setGroup}addGroup = {this.props.addGroup}/>
    }else if (this.props.newGroup === false) {
      newGroupForm = "+";
    }



    return(
      <div>
        <nav>
          <h1>WH◉◎P</h1>
          <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
        </nav>

        <div className='groups-scroll'>

        {/*does the search filtering for the search bar*/}
        {
          this.props.groups.filter((group) => `${group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
          .map((group) => (
            <Group { ...group } key={group.id}  groupId = {group.id} groups = {this.props.groups} />
            ))
        }
          <div className = "new-group" onClick = {this.props.handleNewGroup}>
          {newGroupForm}
          </div>

        </div>
      </div>
      )
  }




}

export default GroupsListing