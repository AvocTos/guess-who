import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks';

const Questions = ({socket, message, setMessage}: QuestionsProps) => {
    const state = useAppSelector(state => state.updateGame);
    const handleYesClick = () => {
      socket.emit('question-answer', message, 'yes', state.roomId);
      setMessage('');
    }
    
    const handleNoClick = () => {
      socket.emit('question-answer', message, 'no', state.roomId);
      setMessage('');
    }
    return (
    <div className={message.length > 0 ? 'question' : 'question--inactive'}>
      <h1>{message}</h1>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>
    </div>
  );
}

export default Questions;
