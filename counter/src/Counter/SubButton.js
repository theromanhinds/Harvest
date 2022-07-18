import React from 'react'
import './Counter.css';

function SubButton(props) {

    function decrementCount() {
        props.decrement()
      } 

  return (
    <div>
        <button 
        disabled = {props.cooldown}
        className='SubButton'
        onClick={decrementCount}>
            Subtract
        </button>

    </div>
  )
}

export default SubButton