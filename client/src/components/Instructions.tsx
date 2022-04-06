import { useNavigate } from 'react-router-dom';

const Instructions = () => {

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  }
 // ß
  return (
    <>
    <article className="instructions">
      <h1 className="instructions__title">Instructions</h1>
      <p className="instructions__text">Each player starts the game with a board that includes images of 15 people and their names. Each player will randomly receive a card.<br></br>The objective of the game is to be the first to determine which card one's opponent has. Players alternate either guessing a candidate or asking various yes or no questions to eliminate candidates, such as:<br></br><br></br>

      "Does your person wear a hat?"<br></br>
      "Does your person wear glasses?"<br></br>
      "Is your person a man?"<br></br><br></br>
      The player will then eliminate candidates (based on the opponent's response) by clicking those images off. Well-crafted questions allow players to eliminate one or more possible cards.</p>
      
    <button className="instructions__go-back-btn" onClick={goHome}>Go back</button>
    </article>
    </>
  );
};

export default Instructions;