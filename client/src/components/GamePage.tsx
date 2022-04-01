import Board from './Board';
import Form from './Form';
import Card from './Card';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';
import Questions from './Questions';
import Chatlog from './Chatlog';


const GamePage = ({socket, message, log, setLog, setMessage}: GamePageProps) => {
  const state = useAppSelector((state) => state.updateGame);

  return (
    <>
    <div className={message.length > 0 ? 'game-page--hide' : 'game-page'}>
      <Board socket={socket}/>
      <aside className="panel">
        <h2>{state.playing === "active" ? "It's your turn!" : "Opponent's turn"}</h2>
        <p>{state.playing === "active" ? "Ask a question or make a guess" : "please wait..."}</p>
        <Card socket={socket} person={state.chosens.render} />
        <Chatlog log={log}/>
        <Form socket={socket}/>
      </aside>
    </div>
      <Questions socket={socket} message={message} setMessage={setMessage} />
    </>
  );
}

export default GamePage;