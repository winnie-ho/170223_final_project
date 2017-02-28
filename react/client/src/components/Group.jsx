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
    }>
     {props.name}
   </Link>
  </div>
  )

export default Group;
