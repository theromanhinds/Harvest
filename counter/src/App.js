import './App.css';
import Counter from './Pages/Counter/Counter';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import io from 'socket.io-client';
import Home from './Pages/Home/Home';
export const socket = io.connect("https://mighty-escarpment-43370.herokuapp.com/");
// export const socket = io.connect("http://localhost:3001");

function App() {
  
  return (
    
    <Router>
    <Routes>
        <Route path='/*' element={<Home socket={socket}/>}/>
        <Route path='/counter/*' element={<Counter/>}/>
    </Routes>
    </Router>
  );
}

export default App;
