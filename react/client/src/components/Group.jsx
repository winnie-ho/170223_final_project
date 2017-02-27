import React from "react"
import { Link } from "react-router"

const Group = (props) => (
  <div className="group">
   <Link to={
      {
        "pathname": "/groups/:id",
        "query": {"groupId": props.id},
        "state": "something being passed through",
      }
    }
   >
     {props.name}
   </Link>
  </div>
  )

export default Group;




// <form method = "get" action = "/#/groups/:id">
// <button className="group" value = {props.id} onClick = {props.handleGroupView} type = "submit" >
//  <h3>{props.name}</h3>
// </button>
// </form>