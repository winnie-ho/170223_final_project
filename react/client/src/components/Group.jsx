import React from "react"
import { Link } from "react-router"

const Group = (props) => (
  <div className="group">
   <Link to={
      {
        "pathname": "/groups/"+ props.groupId,
        "query": {
          "groupId": props.groupId,
          "userName": props.userName
        }
      }
    }>
     {props.group.name}
   </Link>
  </div>
  )

export default Group
