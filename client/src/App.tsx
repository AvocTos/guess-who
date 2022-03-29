import { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { Route, Routes  } from 'react-router-dom';
import GamePage from './components/GamePage';
import { io } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from './hooks/hooks';
import { setReducer } from './slices/slices';



const socket = io('https://guess-who-salt-game-socket.herokuapp.com/');
// const socket = io('http://localhost:8000/');

const App = () => {
  const state = useAppSelector(state => state.updateGame);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    socket.on('room-alert', (roomId, people) => {
      dispatch(setReducer(people));
    });
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/gamepage" element={<GamePage socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
