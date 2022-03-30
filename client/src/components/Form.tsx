import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setPlayingReducer } from '../slices/slices';

const Form = ({ socket }: FormProps) => {
  const [userInput, setUserInput] = useState('');
  const state = useAppSelector(state => state.updateGame);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('send-message', state.roomId, userInput);
    socket.emit('change-turn', state.roomId);
    dispatch(setPlayingReducer('inactive'));
    setUserInput('');
  }

  return (
    <>
    <div className={state.playing === 'active' ? 'form' : 'form--inactive'}>
      <form onSubmit={handleSubmit}>
        <input required type="text" value={userInput} placeholder="my guesses" onChange={e => setUserInput(e.target.value)}/>
        <button>Guess</button>
      </form>
    </div>
    </>
  );
}

export default Form;