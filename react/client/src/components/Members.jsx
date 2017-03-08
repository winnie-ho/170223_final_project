import React from "react"

class Members extends React.Component {
	constructor(props){
		super(props)


		this.state = {
			memberships: [],
			members: []
		}

	}

	componentDidMount(){
  		this.getMemberships();

	}

	getMemberships(){
		var url = "http://localhost:5000/memberships";
		var request = new XMLHttpRequest();
		request.open("GET", url);
		request.setRequestHeader("Content-Type", "application/json");
		request.withCredentials = true;
    	request.onload = () => {
	       if(request.status === 200){
	        var data = JSON.parse(request.responseText);
	        this.setState({memberships: data});
	        console.log("mememberships returning", data);
	        console.log("getting memberships", this.state.memberships);
	        this.uniqueMembers();
	       	} else {
	        console.log("Uh oh you're not logged in!");
	       }
	    };
	    request.send(null); 
	}

	uniqueMembers(){
		var allMemberships = []

		for (var membership of this.state.memberships){
				if(membership.group_id == this.props.groupId){
					allMemberships.push(membership.userName);
				}
		}

		var uniqueMembers = [...new Set(allMemberships)];
		this.setState({members: uniqueMembers})
		console.log("Group Members:", uniqueMembers);
	}


	render(){
		
	var membersNodes = this.state.members.map((member, index)=>{
	    return(
		    	<div key = {index} className = "members-list">
		         {member}
		        </div>
	    )
	  })

		return(
			<div>
				Members
				<div className = "members-list-div">
					{membersNodes}
	        	</div>
			</div>
			)
	}


}

export default Members