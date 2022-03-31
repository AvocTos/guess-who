import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import Card from "./Card";

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
      <div className="question__content">
        <p className="question__title">Your opponent asks:</p>
        <h2 className="question__message">"{message} ? "</h2>
        <button className= "question__btn-yes" onClick={handleYesClick}>Yes</button>
        <button className="question__btn-no" onClick={handleNoClick}>No</button>
         <div className="question__img">  
          <Card socket={socket} person={state.chosens.render} />
         </div>
      </div>
    </div>
  );
}

export default Questions;
