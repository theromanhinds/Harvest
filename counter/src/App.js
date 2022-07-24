import './App.css';
import Counter from './Pages/Counter/Counter';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import io from 'socket.io-client';
import Home from './Pages/Home/Home';
export const socket = io.connect("http://localhost:3001");

function App() {
  
  return (
    
    <Router>
    <Routes>
    {/* <div className="App">
      <div className='Container'> */}
        {/* <Header/> */}
        <Route path='/*' element={<Home socket={socket}/>}/>
        <Route path='/counter/*' element={<Counter/>}/>
        {/* </div>
    </div> */}
    </Routes>
    </Router>
  );
}

export default App;
