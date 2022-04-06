import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../hooks/hooks';
import Card from './Card';

const Board = ({ socket }: BoardProps) => {
  const gameState = useAppSelector((state) => state.updateGame);

  // ß
  return (
    <section className="board">
      {gameState.cards.map((person) => (
        <Card key={uuidv4()} person={person} socket={socket} />
      ))}
    </section>
  );
};

export default Board;
