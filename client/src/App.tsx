import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch } from './hooks/hooks';
import {
  setReducer,
  setChosenReducer,
  setRoomReducer,
  setPlayingReducer,
  setUserReducer,
} from './slices/slices';
import GamePage from './components/GamePage';
import ResultsPage from './components/ResultsPage';
import LoadingPage from './components/LoadingPage';
import Instructions from './components/Instructions';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://guess-who-salt-game-socket.herokuapp.com/';
const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

const initialSocket = io(url);

const App = () => {
  const [stateMessage, setStateMessage] = useState('');
  const [log, setLog] = useState<string[]>(['This is the beginning of the log!', 'Welcome to Guess Who!']);
  const [stateSocket, setStateSocket] = useState(initialSocket);
  const [players, setPlayers] = useState({ yourself: '', opponent: '' });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addSocketListeners = (socket: any) => {
    let playerNames: { yourself: string; opponent: string };
    socket.on('room-alert', (roomId: string, people: string[]) => {
      dispatch(setReducer(people));
      dispatch(setRoomReducer(roomId));
      navigate('/gamepage');
    });
    socket.on(
      'chosen',
      (
        render: Card,
        guess: Card,
        turnStatus: string,
        names: { yourself: string; opponent: string },
      ) => {
        setPlayers(names);
        playerNames = names;
        const chosens = { render, guess };
        dispatch(setPlayingReducer(turnStatus));
        dispatch(setChosenReducer(chosens));
      },
    );
    socket.on('return-win', (socketId: string, roomId: string) => {
      socket.emit('leave-room', roomId);
      setLog(['This is the beginning of the log!', 'Welcome to Guess Who!']);
      dispatch(setReducer([]));
      if (socketId === socket.id) {
        dispatch(setPlayingReducer('won'));
        fetch(`${address}/api/user/score/${playerNames.yourself}`, {
          method: 'PUT',
          body: JSON.stringify({ score: 100 }),
          headers: { 'content-type': 'application/json' },
        });
      }
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer('lost'));
        fetch(`${address}/api/user/score/${playerNames.yourself}`, {
          method: 'PUT',
          body: JSON.stringify({ score: 10 }),
          headers: { 'content-type': 'application/json' },
        });
      }
      navigate('/results');

      setStateSocket(addSocketListeners(io(url)));
    });
    socket.on('return-change-turn', (socketId: string, name: string) => {
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer('active'));
        if (name !== null) {
          const hahahaha = () => { // eslint-disable-line
            while (players.opponent === '') {
              setTimeout(hahahaha, 50); // eslint-disable-line
            }
          };
          setLog((previousState) => [
            `${players.opponent} guessed ${name}, and was wrong!`,
            ...previousState,
          ]);
        }
      }
    });
    socket.on('return-send-message', (userInput: string, socketId: string) => {
      if (socketId !== socket.id) {
        setStateMessage(userInput);
      }
    });
    socket.on('return-question-answer', (message: string, answer: string) => {
      setLog((previousState) => [answer, ...previousState]);
    });
    socket.on('return-print-question', (question: string) => {
      setLog((previousState) => [question, ...previousState]);
    });
    socket.on('disconnect-alert', (roomId: string) => {
      socket.emit('leave-room', roomId);
      navigate('/');
      setStateSocket(addSocketListeners(io(url)));
    });
    return socket;
  };

  useEffect(() => {
    if (!window.localStorage.sessionId) {
      navigate('/login');
    }
    if (window.localStorage.sessionId) {
      const storedSession = window.localStorage.getItem('sessionId');
      fetch(`${address}/api/user/id/${storedSession}`)
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            navigate('/login');
          }
          if (data !== null) {
            dispatch(setUserReducer(data.username));
            stateSocket.emit('add-online-list', {
              id: stateSocket.id,
              name: data.username,
            });
          }
        });
    }

    addSocketListeners(stateSocket);
    // ^ this function actually calls itself, on a new socket.
    // So we only need to run it once on mount and
    // it will run itself again whenever it needs to.
  }, []);

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes>
          <Route
            path="/"
            element={
              !window.localStorage.sessionId ? (
                <p />
              ) : (
                <Home socket={stateSocket} />
              )
            }
          />
          <Route
            path="/gamepage"
            element={(
              <GamePage
                socket={stateSocket}
                message={stateMessage}
                log={log}
                setLog={setLog}
                setMessage={setStateMessage}
                players={players}
              />
            )}
          />
          <Route path="/results" element={<ResultsPage socket={stateSocket} />} />
          <Route path="/waiting" element={<LoadingPage socket={stateSocket} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
