import { useEffect } from "react";
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
//const socket = io("http://localhost:8000/");

const App = () => {
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-alert", (roomId, people) => {
      dispatch(setReducer(people));
      dispatch(setRoomReducer(roomId));
      navigate("/gamepage");
    });
    socket.on("chosen", (render, guess, turnStatus) => {
      const chosens = {
        render: render,
        guess: guess,
      };
      dispatch(setPlayingReducer(turnStatus));
      dispatch(setChosenReducer(chosens));
    });
    socket.on("return-win", (socketId) => {
      socket.emit("leave-room", state.roomId);
      dispatch(setReducer([]));
      if (socketId === socket.id) {
        dispatch(setPlayingReducer("won"));
      }
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer("lost"));
      }
      navigate("/results");
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/gamepage" element={<GamePage socket={socket} />} />
        <Route path="/results" element={<ResultsPage socket={socket} />} />
        <Route path="/waiting" element={<LoadingPage socket={socket} />} />
      </Routes>
    </div>
  );
};

export default App;
