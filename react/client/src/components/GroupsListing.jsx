import React from 'react'
import Group from "./Group"
import GroupNew from "./GroupNew"


class GroupsListing extends React.Component{

  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.handleNewGroup = this.handleNewGroup.bind(this)
    this.state = {
      searchQuery: "",
      newGroup: null 
    }
  }

  doSearch(event){
    this.setState({searchQuery: event.target.value})
  }

  handleNewGroup(){
    console.log("new group clicked");
    this.setState({newGroup:"Yes"});
  }

  handleGroupView(){
    console.log("view group clicked");
  }

  render() {
    if (this.state.newGroup === "Yes"){
      var newGroupForm = <GroupNew/>
    }else{
      newGroupForm = "+";
    }

    return(
      <div>
        <nav>
          <h1>WHOOP</h1>
          <input className='search-box' type='text' placeholder='🔎 search' value = {this.state.searchQuery} onChange={this.doSearch} />
        </nav>

        <div className='groups-scroll'>

        {/*does the search filtering for the search bar*/}
        {
          this.props.groups.filter((group) => `${group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
          .map((group) => (
            <Group { ...group } key={group.id} handleGroupView = {this.handleGroupView}/>
            ))
        }

          <div className = "new-group" update = {this.props.update} onClick = {this.handleNewGroup}>
          {newGroupForm}
          </div>
        </div>
      </div>
      )
  }




}

export default GroupsListing