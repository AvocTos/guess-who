import { useState } from "react";

const Form = () => {
  const [userInput, setUserInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInput);
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