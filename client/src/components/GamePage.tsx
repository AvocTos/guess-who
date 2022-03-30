import Board from './Board';
import Form from './Form';
import Card from './Card';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';
import Questions from './Questions';
import Chatlog from './Chatlog';


const GamePage = ({socket}: GamePageProps) => {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("return-change-turn", (socketId: string) => {
      if (socketId !== socket.id) {
        console.log(state.playing, 'switch to active');
        dispatch(setPlayingReducer('active'));
      }
    });
    socket.on("return-send-message", (userInput: string, socketId: string) => {
      if (socketId !== socket.id) {
        setMessage(userInput);
      }
    });
    socket.on("return-question-answer", (message: string, answer: string) => {
      setLog(previousState => [...previousState, `${message}: ${answer}`]);
    });
  }, []);
  
  return (
    <div className="game__page">
      <h1>I'm the game page</h1>
      <Board socket={socket}/>
      <Form socket={socket}/>
      <Chatlog log={log}/>
      <Questions socket={socket} message={message} setMessage={setMessage} />
    </div>
  );
}

export default GamePage;