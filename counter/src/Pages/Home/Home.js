import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'


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
          alert("Room does not exist.");
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

  
  return (
    <div className="App">
      <div className='Container'>
      <Header/>
      <div className='RoomForm'>
      {/* <Link to={`/counter/${worker.room}`}> */}
      <button  onClick={createRoom}>Create Room</button>
        {/*</Link> */}
      <form>
        <input type="text" 
          id="room" 
          room={worker.room} 
          onChange={handleGameIdChange} 
          autoComplete="off"
          // maxLength="9" minLength="9"
          />
          {/* <Link to={`/counter/${worker.room}`}> */}
        
          {/* </Link> */}
      </form>
      <button onClick={joinRoom} >Join Room</button>
      </div>
      </div>
    </div>
  )
}

export default Home