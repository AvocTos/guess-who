import React from 'react';
import './App.css';
import Home from './components/Home';
import { Route, Routes  } from 'react-router-dom';
import GamePage from './components/GamePage';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamepage" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
