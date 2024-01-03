import React from 'react'

function Box(props) {
  return (
    <div onClick={props.onClick} className='box-container'>
        <h3>{props.value}</h3>
    </div>
  )
}

export default Box