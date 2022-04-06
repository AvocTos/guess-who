import React from 'react';
import Board from './Board';
import Form from './Form';
import Card from './Card';
import { useAppSelector } from '../hooks/hooks';
import Questions from './Questions';
import Chatlog from './Chatlog';

const GamePage = ({
  socket,
  message,
  log,
  setMessage,
  players,
}: GamePageProps) => {
  const gameState = useAppSelector((state) => state.updateGame);

  return (
    <>
      <div className={message.length > 0 ? 'game-page--hide' : 'game-page'}>
        <Board socket={socket} />
        <aside className="panel">
          <h2>
            {gameState.playing === 'active'
              ? `It's your turn, ${players.yourself}!`
              : `${players.opponent}'s turn`}
          </h2>
          <p>
            {gameState.playing === 'active'
              ? 'Ask a question or make a guess'
              : 'please wait...'}
          </p>
          <br></br>
          <p>Opponent's card to guess:</p>
          <Card socket={socket} person={gameState.chosens.render} />
          <Chatlog log={log} />
          <Form socket={socket} players={players} />
        </aside>
      </div>
      <Questions
        players={players}
        socket={socket}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export default GamePage;
