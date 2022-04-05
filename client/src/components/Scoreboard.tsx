import { dblClick } from '@testing-library/user-event/dist/click';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPlayingReducer, setReducer } from '../slices/slices';
import Card from './Card';

const Scoreboard = () => {
const [scoreboardList, setScoreboardList] = useState([{username: '', score: 0}]);

  const state = useAppSelector(state => state.updateGame);
  const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

  useEffect(() => {
    fetch(`${address}/api/scoreboard`)
    .then(res => res.json())
    .then(data => {
      setScoreboardList(data);
    })
  }, []);
  
  return (
    <>
      <ul className="">
        {scoreboardList.map((person, index: number) => {
          return(
        <li key={index} >{person.username}, points: {person.score}</li>
        )})}
      </ul>
    </>
  );
}

export default Scoreboard;