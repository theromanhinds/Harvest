import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='Header'>
        <h6>2945 seeds planted</h6>
        <Link to="/">
          <h1 className='Title'>HARVEST</h1>
        </Link>
        <h6>built by: Roman Hinds</h6>
        </div>

  )
}

export default Header