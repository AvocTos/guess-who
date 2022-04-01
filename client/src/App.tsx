import { useEffect, useState } from "react";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import GamePage from "./components/GamePage";
import { io } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import {
  setReducer,
  setChosenReducer,
  setRoomReducer,
  setPlayingReducer,
} from "./slices/slices";
import ResultsPage from "./components/ResultsPage";
import LoadingPage from "./components/LoadingPage";

const socket = io('https://guess-who-salt-game-socket.herokuapp.com/');
// const socket = io("http://localhost:8000/");

const App = () => {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-alert", (roomId, people) => {
      console.log('room-alert', roomId, '***');
      dispatch(setReducer(people));
      dispatch(setRoomReducer(roomId));
      navigate("/gamepage");
    });
    socket.on("chosen", (render, guess, turnStatus) => {
      console.log('chosen');
      const chosens = {
        render: render,
        guess: guess,
      };
      dispatch(setPlayingReducer(turnStatus));
      dispatch(setChosenReducer(chosens));
    });
    socket.on("return-win", (socketId, roomId) => {
      console.log('return-win', roomId, '*****');
      socket.emit("leave-room", roomId);
      dispatch(setReducer([]));
      // dispatch clear log
      if (socketId === socket.id) {
        dispatch(setPlayingReducer("won"));
      }
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer("lost"));
      }
      navigate("/results");
    });
    socket.on("return-change-turn", (socketId: string, name: string) => {
      console.log('change turn running')
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer('active'));
        if (name !== null) {
          setLog(previousState => [`Opponent guessed ${name}, and was wrong!`, ...previousState])
        }
      }
    });
    socket.on("return-send-message", (userInput: string, socketId: string) => {
      console.log('return send message running')
      if (socketId !== socket.id) {
        setMessage(userInput);
      }
    });
    socket.on("return-question-answer", (message: string, answer: string) => {
      setLog(previousState => {
        console.log(previousState);
        return [answer, ...previousState];
      });
    });
    socket.on('return-print-question', (question: string) => {
      setLog(previousState => [`${question}?`, ...previousState]);
    })
  }, [socket]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/gamepage" element={<GamePage socket={socket} message={message} log={log} setLog={setLog} setMessage={setMessage} />} />
        <Route path="/results" element={<ResultsPage socket={socket} />} />
        <Route path="/waiting" element={<LoadingPage socket={socket} />} />
      </Routes>
    </div>
  );
};

export default App;
