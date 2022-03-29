import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPlayingReducer, setReducer } from '../slices/slices';
import Card from './Card';

const Board = () => {
  const state = useAppSelector(state => state.updateGame);
  
  // ß
  return (
    <div className="board">
      <h1>I'm the board</h1> 
      <section className="">
        {state.cards.map((person, index: number) => {
          return(
          <Card key={index} person={person} />
        )})}
      </section>
      <p>I'm the chosen</p>
      <Card person={state.chosens.render} />
    </div>
  );
}

export default Board;