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
            {props.count}

        <i style={{ position: "relative", bottom: "-30px"}} class="fa-solid fa-plus"></i>
        </button>

    </div>
  )
}

export default AddButton