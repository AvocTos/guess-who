import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';

const Form = ({ socket }: FormProps) => {
  const [userInput, setUserInput] = useState('');
  const state = useAppSelector(state => state.updateGame);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === state.chosens.guess.name.toLowerCase()) {
      socket.emit('win', state.roomId, socket.id);
    }
    if (userInput.toLowerCase() !== state.chosens.guess.name.toLowerCase()) {
      socket.emit('change-turn', state.roomId);
      dispatch(setPlayingReducer('inactive'));
    }
    setUserInput('');
  }

  return (
    <div className={state.playing === 'active' ? 'form' : 'form--inactive'}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} placeholder="my guesses" onChange={e => setUserInput(e.target.value)}/>
        <button>Guess</button>
      </form>
    </div>
  );
}

export default Form;