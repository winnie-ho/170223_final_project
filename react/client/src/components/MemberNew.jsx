import React from "react"

class MemberNew extends React.Component {

	constructor(props){
		super(props)

		this.handleNewMember = this.handleNewMember.bind(this);
		this.state = {
			newMember: false,
			users: []
		}

	}

	componentDidMount(){
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




	render(){
// filling in the options for selector
		var memberOptions = this.state.users.map(function(user, index){
			return <option value = {index} key = {index}>{user.name}</option>
		})

// conditional for on addMember
		if(this.state.newMember === true){
			var memberDD = 
			<div>
				<select>
					{memberOptions}
				</select>
				<button>
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