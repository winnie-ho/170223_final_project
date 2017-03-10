import React from "react";
import MemberNew from "./MemberNew";
import dbHandler from "../dbHandler";

class Members extends React.Component {
	constructor(props){
		super(props)
		this.getMemberships = this.getMemberships.bind(this);

		this.state = {
			memberships: [],
			members: []
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
      this.uniqueMembers();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
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



	render(){
		//mapping members for render
		var membersNodes = this.state.members.map((member, index)=>{
	    return(
		    	<div key = {index} className = "members-list">
		        ◉ {member}  ◎
		      </div>
	    )
	  })

		return(
			<div className = "members-inner">
				<div className = "members-add-div">
				<h3>GROUPIES</h3>
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