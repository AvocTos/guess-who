import React, { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <article className="instructions">
      <h1 className="instructions__title">Instructions</h1>
      <p className="instructions__text">
        {// eslint-disable-next-line
        }Each player starts the game with a board that includes images of 15 people and their names. Each player will randomly receive a card.
        <br></br>
        {// eslint-disable-next-line
        }The objective of the game is to be the first to determine which card one&apos;s opponent has. Players alternate either guessing a candidate or asking various yes or no questions to eliminate candidates, such as:
        <br></br>
        <br></br>
        &quot;Does your person wear a hat?&quot;
        <br></br>
        &quot;Does your person wear glasses?&quot;
        <br></br>
        &quot;Is your person a man?&quot;
        <br></br>
        <br></br>
        {// eslint-disable-next-line
        }The player will then eliminate candidates (based on the opponent&apos;s response) by clicking those images off. Well-crafted questions allow players to eliminate one or more possible cards.
      </p>
      <button type="button" className="instructions__go-back-btn" onClick={goHome}>Go back</button>
    </article>
  );
};

export default Instructions;
