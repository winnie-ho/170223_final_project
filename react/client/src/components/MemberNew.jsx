import React from "react"


class MemberNew extends React.Component {

	constructor(props){
		super(props)
		this.getUsers = this.getUsers.bind(this);
		this.handleNewMember = this.handleNewMember.bind(this);
		this.handleSelectorChange = this.handleSelectorChange.bind(this);
		this.addMember = this.addMember.bind(this);
		this.state = {
			newMember: false,
			users: [],
			selectedMember: null,
		}

	}

	componentDidMount(){
  	this.getUsers();
	}

	getUsers(){
			var url = "http://localhost:5000/users";
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.withCredentials = true;
	    request.onload = () => {
	       if(request.status === 200){
	        var data = JSON.parse(request.responseText);
	        this.setState({users: data});
	        console.log("data returning", data);
	        console.log("getting users", this.state.users);
	       } else {
	        console.log("Uh oh you're not logged in!");
	       }
	    };
	    request.send(null); 
	}

	handleNewMember(){
		this.setState({newMember: true});
	}

	handleSelectorChange(event){
		var userToAdd = event.target.value;
		this.setState({selectedMember: this.state.users[userToAdd]});
		console.log("Member to add:", this.state.users[userToAdd]);
	}

	addMember(event){
		event.preventDefault();
		const request = new XMLHttpRequest();
    	request.open("POST", "http://localhost:5000/memberships.json");
    	request.setRequestHeader("content-type", "application/json");
    	request.withCredentials = true;

    	request.onload = () => {
      		if (request.status === 200) {
        const user = JSON.parse(request.responseText);
      		}
      		this.setState({newMember: false});
      		this.props.getMemberships();
    	}

    	const data = {
        	membership: {
         		user_id: this.state.selectedMember.id,
        		userName: this.state.selectedMember.name,
        		group_id: this.props.groupId
        	}
    	}

    	request.send(JSON.stringify(data));
    	console.log("member added", data);
	}



	render(){
// filling in the options for selector
		var memberOptions = this.state.users.map(function(user, index){
			return <option placeholder = "select" value = {index} key = {index}>{user.name}</option>
		})

// conditional for on addMember
		if(this.state.newMember === true){
			var memberDD = 
			<div>
				<select defaultValue = "select" onChange = {this.handleSelectorChange}>
					<option disabled = "true">select</option>
					{memberOptions}
				</select>
				<button onClick = {this.addMember}>
					ADD
				</button>
			</div>
		} else if (this.state.newMember === false){
			memberDD = <h1 onClick = {this.handleNewMember}>+</h1>;
		}


// defining the render
		return(
			<div className = "new-member" >
			    {memberDD}  
			</div>
			)
	}
}

export default MemberNew