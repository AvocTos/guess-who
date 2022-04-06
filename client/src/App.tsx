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
  setUserReducer,
} from "./slices/slices";
import ResultsPage from "./components/ResultsPage";
import LoadingPage from "./components/LoadingPage";
import { AnimatePresence } from "framer-motion";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Instructions from "./components/Instructions";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://guess-who-salt-game-socket.herokuapp.com/";
const address =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const initialSocket = io(url); //need to declare this here, if we put 'io(url)' in line 25 it creates 2 sockets cuz react reads the component twice

const App = () => {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>(['This is the beginning of the log!', 'Welcome to Guess Who!']);
  const [socket, setSocket] = useState(initialSocket);
  const [players, setPlayers] = useState({ yourself: "", opponent: "" });
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addSocketListeners = (socket: any) => {
    // helper function to dynamically add all listeners to a specific socket
    let playerNames: { yourself: string; opponent: string };
    socket.on("room-alert", (roomId: string, people: string[]) => {
      dispatch(setReducer(people));
      dispatch(setRoomReducer(roomId));
      navigate("/gamepage");
    });
    socket.on(
      "chosen",
      (
        render: Card,
        guess: Card,
        turnStatus: string,
        names: { yourself: string; opponent: string }
      ) => {
        setPlayers(names);
        playerNames = names;
        const chosens = {
          render: render,
          guess: guess,
        };
        dispatch(setPlayingReducer(turnStatus));
        dispatch(setChosenReducer(chosens));
      }
    );
    socket.on("return-win", (socketId: string, roomId: string) => {
      socket.emit("leave-room", roomId);
      setLog([]);
      dispatch(setReducer([]));
      if (socketId === socket.id) {
        dispatch(setPlayingReducer("won"));
        console.log(playerNames.yourself);
        fetch(`${address}/api/user/score/${playerNames.yourself}`, {
          method: "PUT",
          body: JSON.stringify({ score: 100 }),
          headers: { "content-type": "application/json" },
        });
      }
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer("lost"));
        console.log(playerNames.yourself);

        fetch(`${address}/api/user/score/${playerNames.yourself}`, {
          method: "PUT",
          body: JSON.stringify({ score: 10 }),
          headers: { "content-type": "application/json" },
        });
      }
      navigate("/results");

      setSocket(addSocketListeners(io(url))); // since addSocketListeners returns the socket on line 76, we can actually do this
    });
    socket.on("return-change-turn", (socketId: string, name: string) => {
      // if socketId is socket.id, lose points
      if (socketId !== socket.id) {
        dispatch(setPlayingReducer("active"));
        if (name !== null) {
          setLog((previousState) => [
            `${players.opponent} guessed ${name}, and was wrong!`,
            ...previousState,
          ]);
        }
        /// FIW OPPONENETETTETET
      }
    });
    socket.on("return-send-message", (userInput: string, socketId: string) => {
      if (socketId !== socket.id) {
        setMessage(userInput);
      }
    });
    socket.on("return-question-answer", (message: string, answer: string) => {
      setLog((previousState) => [answer, ...previousState]);
    });
    socket.on("return-print-question", (question: string) => {
      setLog((previousState) => [question, ...previousState]);
    });
    socket.on("disconnect-alert", (roomId: string) => {
      socket.emit("leave-room", roomId);
      navigate("/");
      setSocket(addSocketListeners(io(url)));
    });
    return socket;
  };

  useEffect(() => {
    if (!window.localStorage.sessionId) {
      navigate("/login");
    }
    if (window.localStorage.sessionId) {
      const address =
        process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";
      const storedSession = window.localStorage.getItem("sessionId");

      fetch(`${address}/api/user/id/${storedSession}`)
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            navigate("/login");
          }
          if (data !== null) {
            dispatch(setUserReducer(data.username));
            socket.emit("add-online-list", {
              id: socket.id,
              name: data.username,
            });
          }
        });
    }

    addSocketListeners(socket); // this function actually calls itself, on a new socket. So we only need to run it once on mount and
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
                <p></p>
              ) : (
                <Home socket={socket} />
              )
            }
          />
          <Route
            path="/gamepage"
            element={
              <GamePage
                socket={socket}
                message={message}
                log={log}
                setLog={setLog}
                setMessage={setMessage}
                players={players}
              />
            }
          />
          <Route path="/results" element={<ResultsPage socket={socket} />} />
          <Route path="/waiting" element={<LoadingPage socket={socket} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
