import React from 'react'
import { Link } from 'react-router'


const Group = (props) => (
  <div className='group' value = {props.id} onClick = {props.handleGroupView}>
    <Link to = '/groups/:id' >{props.name}</Link>
  </div>

)

const { string, number } = React.PropTypes



export default Group;