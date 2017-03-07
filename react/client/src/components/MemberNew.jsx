import React from "react"

class MemberNew extends React.Component {

	constructor(props){
		super(props)

		this.handleNewMember = this.handleNewMember.bind(this);

		this.state = {
			newMember: false,
		}

	}

	handleNewMember(){
		this.setState({newMember: true});
	}

	render(){

		if(this.state.newMember == true){
			var memberDD = <div><select/></div>
		}else{
			memberDD = <div></div>
		}



		return(
			<div>
			    GROUPIES: <h1 onClick = {this.handleNewMember}>+</h1>
			    {memberDD}
			</div>
			)
	}
}

export default MemberNew