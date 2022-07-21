import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../Components/Header'
import socket from "../../App.js";

function Home(props) {

  const [worker, updateWorker] = useState({
    socket: props.socket,
    room: "",
    host: false,
  });

  function generateRoom() {
    const roomCode = Math.random().toString(36).substr(2, 9);
    updateWorker(prevState => {
      return { ...prevState, room: roomCode}
    })
  }

  // function printWorker() {
  //   console.log(`socket is ${worker.socket.id}`);
  //   // console.log(worker);
  // }

  const handleGameIdChange = (event) => {
    updateWorker(prevState => {
      return { ...prevState, room: event.target.value}
    })
  }

  const handleSubmit = (event) => {
    socket.emit("userJoin", worker);
    console.log("form submitted");
  }

  return (
    <div className="App">
      <div className='Container'>
      <Header/>
      <div className='RoomForm'>
        
      <form>
        <Link to="/counter">
      <button type="submit" onClick={generateRoom}>Create Room</button>
        </Link>
        <input type="text" 
          id="room" 
          room={worker.room} 
          onChange={handleGameIdChange} 
          autoComplete="off"
          // maxLength="9" minLength="9"
          />
          <Link to="/counter">
        <button type="submit">Join Room</button>
          </Link>
      </form>
      
      </div>
      </div>
    </div>
  )
}

export default Home