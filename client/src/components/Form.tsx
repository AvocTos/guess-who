import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';

const Form = ({ socket, players }: FormProps) => {
  const [userInput, setUserInput] = useState('');
  const gameState = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('send-message', gameState.roomId, userInput);
    socket.emit('change-turn', gameState.roomId);
    socket.emit(
      'print-question',
      gameState.roomId,
      `${players.yourself}: ${userInput}`,
    );
    dispatch(setPlayingReducer('inactive'));
    setUserInput('');
  };

  return (
    <form className={gameState.playing === 'active' ? 'form' : 'form--inactive'} onSubmit={handleSubmit}>
      <p>Ask your question below:</p>
      <input
        className="form__input"
        required
        type="text"
        value={userInput}
        placeholder="ex. are they blond"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit" className="form__ask-btn">
        Ask
      </button>
    </form>
  );
};

export default Form;
