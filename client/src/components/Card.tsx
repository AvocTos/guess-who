import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';

const Card = ({ person, socket }: CardProps) => {
  const [active, setActive] = useState(true);
  const gameState = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (gameState.chosens.guess.name === person.name) {
      socket.emit('win', gameState.roomId, socket.id);
    }
    if (gameState.chosens.guess.name !== person.name) {
      socket.emit('change-turn', gameState.roomId, person.name);
      dispatch(setPlayingReducer('inactive'));
    }
  };

  const togglecard = () => {
    setActive(!active);
  };
  return (
    <article
      onClick={togglecard}
      className={active ? "card" : "card card--inactive"}
      id={gameState.playing === "active" ? "" : "card-not-turn"}
    >
      <img
        src={require(`../player-images/${person.image}`)}
        alt={`a portrait of ${person.name}`}
        className="card__img"
      />
      <p className="card__name">
        {person.name}
      </p>
      <button
        className={gameState.playing === 'active' ? 'card__btn' : 'card__btn--inactive'}
        type="button"
        onClick={handleClick}
      >
        Guess
      </button>
    </article>
  );
};

export default Card;
