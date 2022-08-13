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
            
        <i class="fa-solid fa-minus"></i>
        </button>

    </div>
  )
}

export default SubButton