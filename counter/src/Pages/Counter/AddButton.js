import React from 'react'
import './Counter.css';

function AddButton(props) {

    function incrementCount() {
        props.increment()
      } 

  return (
    <div>
        <button 
        disabled = {props.cooldown}
        className='AddButton'
        onClick={incrementCount}>
            {props.count}/100
            <h4>Add</h4>
        </button>

    </div>
  )
}

export default AddButton