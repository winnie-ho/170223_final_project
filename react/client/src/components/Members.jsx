import React from "react";
import MemberNew from "./MemberNew";
import dbHandler from "../dbHandler";

class Members extends React.Component {
	constructor(props){
		super(props)
		this.getMemberships = this.getMemberships.bind(this);
		this.removeMember = this.removeMember.bind(this);
		this.setUserMembership = this.setUserMembership.bind(this);
		this.uniqueMembers = this.uniqueMembers.bind(this);

		this.state = {
			memberships: [],
			members: [],
			isMember: false,
			userMembership: null
		}
	}

	componentDidMount(){
  	this.getMemberships();
	}

	getMemberships(){
		var urlSpec = "memberships";
    var word = "GET";
    var callback = function(data){
			this.setState({memberships: data});
			this.setUserMembership();
      this.uniqueMembers();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
	}

	setUserMembership(){
		for(var membership of this.state.memberships){
			if(membership.user_id == this.props.userId && membership.group_id == this.props.groupId){
				this.setState({userMembership: membership.id});
			}
		}
	}

	uniqueMembers(){
		var allMemberships = [];
		for(var membership of this.state.memberships){
			if(membership.group_id == this.props.groupId){
				allMemberships.push(membership.userName);
			}
		}

		var uniqueMembers = [...new Set(allMemberships)];
		this.setState({members: uniqueMembers})
		console.log("Group Members:", uniqueMembers);
	}

	removeMember(){
		event.preventDefault();
    var urlSpec = "memberships/" + this.state.userMembership;
    var word = "DELETE";
    var callback = function(data){
    	this.getMemberships();
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
	}

	render(){
		console.log("props", this.props)
		console.log("userMembership", this.state.userMembership);
		console.log("members", this.state.members);

		//mapping members for render
		var membersNodes = this.state.members.map((member, index)=>{
	    return(
		    	<div key = {index} className = "members-list">
		        ◉ {member}  ◎
		      </div>
	    )
	  })

	  //check if current user is member and render option to leave
	  for(var member of this.state.members){
	   	if(member === this.props.userName){
	   		var removeMemberDiv = <div className = "add-member-plus" onClick = {this.removeMember}> <h1>-</h1> </div>
	   	} else {
	   		removeMemberDiv = <div></div>
	   	}
	  }




		return(
			<div className = "members-inner">
				<div className = "members-add-div">
				<h3>GROUPIES</h3>
				<div className = "members-list-div">
					{removeMemberDiv}
				</div>
				<MemberNew groupId = {this.props.groupId} getMemberships = {this.getMemberships}/>
				</div>
				<div className = "members-list-div">
					{membersNodes}
				</div>
			</div>
		)
	}
}

export default Members