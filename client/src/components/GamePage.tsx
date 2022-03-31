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
        dispatch(setPlayingReducer('active'));
      }
    });
    socket.on("return-send-message", (userInput: string, socketId: string) => {
      if (socketId !== socket.id) {
        setMessage(userInput);
      }
    });
    socket.on("return-question-answer", (message: string, answer: string) => {
      setLog(previousState => {
        return [...previousState, `${message}: ${answer}`];
    });
    });
  }, []);
  
  return (
    <>
    <div className={message.length > 0 ? 'game-page--hide' : 'game-page'}>
      <Board socket={socket}/>
      <aside className="panel">
        <Card socket={socket} person={state.chosens.render} />
        <Form socket={socket}/>
        <Chatlog log={log}/>
      </aside>
    </div>
      <Questions socket={socket} message={message} setMessage={setMessage} />
    </>
  );
}

export default GamePage;