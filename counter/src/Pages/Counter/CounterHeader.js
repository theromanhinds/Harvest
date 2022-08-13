import React from 'react'
import './Counter.css';
import { Link } from "react-router-dom";


function CounterHeader() {
  return (
    <div className='CounterHeader'>
      <Link to="/">
        <button className='NavHome'>
          <img alt="logo" style={{ width: "75px", position: "relative", left: "-5px"}} src='/images/HarvestLogo.png'/>
        </button>
        </Link>
        <button className='ProfileButton' disabled='true'>
        <i class="fa-solid fa-user"></i>
        </button>
    </div>
  )
}

export default CounterHeader