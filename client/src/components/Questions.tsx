import React from 'react';
import { useAppSelector } from '../hooks/hooks';

const Questions = ({
  socket,
  message,
  setMessage,
  players,
}: QuestionsProps) => {
  const gameState = useAppSelector((state) => state.updateGame);
  const handleYesClick = () => {
    socket.emit('question-answer', message, 'yes', gameState.roomId);
    setMessage('');
  };

  const handleNoClick = () => {
    socket.emit('question-answer', message, 'no', gameState.roomId);
    setMessage('');
  };

  return (
    <div className={message.length > 0 ? 'question' : 'question--inactive'}>
      <div className="question__content">
        <p className="question__title">
          {players.opponent }
          asks:
        </p>
        <h2 className="question__message">
          &quot;
          {message}
          &quot;
        </h2>
        <button type="button" className="question__btn-yes" onClick={handleYesClick}>
          Yes
        </button>
        <button type="button" className="question__btn-no" onClick={handleNoClick}>
          No
        </button>
        <div className="question__img">
          <article className="card">
            <img
              src={require(`../player-images/${gameState.chosens.render.image}`)}// eslint-disable-line import/no-dynamic-require
              alt={`a portrait of ${gameState.chosens.render.name}`}
              className="card__img"
            />
            <p className="card__name">{gameState.chosens.render.name}</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Questions;
