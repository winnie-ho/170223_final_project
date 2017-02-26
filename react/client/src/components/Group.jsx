import React from "react"
import { Link } from "react-router"

const Group = (props) => (
  <form method = "get" action = "/#/groups/:id">
  <button className="group" value = {props.id} onClick = {props.handleGroupView} type = "submit" >
 {props.name}
  </button>
  </form>
  )

const { string, number } = React.PropTypes

export default Group;