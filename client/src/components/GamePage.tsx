import Board from './Board';
import Form from './Form';
import Card from './Card';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';

const GamePage = ({socket}: GamePageProps) => {
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("return-change-turn", (socketId: string) => {
      if (socketId !== socket.id) {
        console.log(state.playing, 'switch to active');
        dispatch(setPlayingReducer('active'));
      }
    });
  }, []);

  return (
    <div className="game__page">
      <h1>I'm the game page</h1>
      <Board socket={socket}/>
      <Form socket={socket}/>
    </div>
  );
}

export default GamePage;