import './App.css';
import Counter from './Counter/Counter';
import Header from './Header';

import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function App() {

  socket.emit("newUser", socket);
  
  return (
    <div className="App">
      <div className='Container'>
        <Header/>
        <Counter/>
        </div>
    </div>
  );
}

export default App;
