import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import Card from './Card';

const Board = ({ socket }: BoardProps) => {
  const gameState = useAppSelector((state) => state.updateGame);

  // ß
  return (
    <section className="board">
      {gameState.cards.map((person, index: number) => (
        <Card key={index} person={person} socket={socket} />
      ))}
    </section>
  );
};

export default Board;
