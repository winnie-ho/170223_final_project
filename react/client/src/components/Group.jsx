import React from "react"
import { Link } from "react-router"

const Group = (props) => (
  <div className="group">
   <Link to={
      {
        "pathname": "/groups/:id",
        "query": {"groupId": props.groupId}
      }
    }>
     {props.name}
   </Link>
  </div>
  )

export default Group
