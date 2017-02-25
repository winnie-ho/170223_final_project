import React from 'react'

const Group = (props) => (
  <div className='group'>
    <div className='group-name'>
      <h3 className='group-date'>{props.name}</h3>
    </div>
  </div>
)

const { string, number } = React.PropTypes



export default Group;