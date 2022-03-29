import { useState } from "react";
import { useAppSelector } from '../hooks/hooks';

const Form = ({ socket }: FormProps) => {
  const [userInput, setUserInput] = useState('');
  const state = useAppSelector(state => state.updateGame);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === state.chosens.guess.name.toLowerCase()) {
      socket.emit('win', 'I win', state.roomId);
    }
    setUserInput('');
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} placeholder="my guesses" onChange={e => setUserInput(e.target.value)}/>
        <button>Guess</button>
      </form>
    </div>
  );
}

export default Form;