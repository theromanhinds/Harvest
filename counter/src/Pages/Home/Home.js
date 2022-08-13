import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'
import '../../App.css';


import { getDatabase, ref, set, get, child } from 'firebase/database';
import { socket } from '../../App';

function Home(props) {

  const navigate = useNavigate();
  const handleNavigate = useCallback((roomCode) => navigate(`/counter/${roomCode}`, {replace: true}), [navigate]);

  const [worker, updateWorker] = useState({
    socket: socket,
    room: "",
    host: false,
  });

  function createRoom() {
    const roomCode = Math.random().toString(36).substr(2, 9);
    console.log("creating room " + roomCode + " for " + worker.socket.id);
    
    updateWorker(prevState => {
      return { ...prevState, room: roomCode}
    })

    socket.emit('userJoin', {
      id: worker.socket.id,
      room: roomCode,
      host: worker.host,
    });
    
    const db = getDatabase();
      set(ref(db, `${roomCode}`), {
        count: 0,
      });

    handleNavigate(roomCode);

  }

  function joinRoom() {

    if (worker.room === ""){
      return;
    }

    const dbRef = ref(getDatabase());
      get(child(dbRef, `${worker.room}`)).then((snapshot) => {
        console.log(worker.room);
        if (snapshot.exists()) {
          console.log(worker.socket.id + " joining room " + worker.room);
          handleNavigate(worker.room);
          socket.emit('userJoin', {
            id: worker.socket.id,
            room: worker.room,
            host: worker.host
          });
        } else {
          alert(`Sorry! Room [${worker.room}] does not exist. Try again.`);
        }
      }).catch((error) => {
        console.error(error);
      });

  }

  const handleGameIdChange = (event) => {
    updateWorker(prevState => {
      return { ...prevState, room: event.target.value}
    })
  }

  const aboutHarvest = (event) => {
    alert("Welcome to Harvest!");
    alert("Harvest is a tool to track the number of people you share your faith with." +
    " Either create a room or join your friends by entering their room code below!");
  }

  
  return (
    <div className="App">
      <img className='Background' alt='background' src='/images/background.jpg'/>

      <div className='Container'>
        
        <div className='Blur'/>

        <Header/>

        <button onClick={aboutHarvest} className='About'>?</button>

        <div className='RoomFormDiv'>
          
          <button className='RoomButton' onClick={createRoom}>Create Room</button>

          <form >
            <input className='RoomForm' 
              type="text" 
              id="room"
              room={worker.room} 
              onChange={handleGameIdChange} 
              autoComplete="off"/>
          </form>
          
          <button className='RoomButton' onClick={joinRoom} >Join Room</button>

        </div>

        <div className='Footer'>
          <h4>938 Seeds planted</h4>
          <h4><a rel="noreferrer" href='http://www.romanhinds.com' target="_blank">Built by: Roman Hinds</a></h4>
        </div>
      </div>
    </div>
  )
}

export default Home