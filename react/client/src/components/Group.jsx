import React from "react"
import { Link } from "react-router"

const Group = (props) => (
  <form method = "get" action = "/#/groups/:id">
  <button className="group" value = {props.id} onClick = {props.handleGroupView} type = "submit" >
   <h3>{props.name}</h3>
  </button>
  </form>
  )

export default Group;