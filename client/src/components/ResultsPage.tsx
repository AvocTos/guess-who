import React, { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const ResultsPage = ({ socket }: HomeProps) => {
  const gameState = useAppSelector((state) => state.updateGame);
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit('add-to-waiting', gameState.playerName);
    navigate('/waiting');
  };

  const navigateToHomepage = () => {
    navigate('/');
  };
  const points = () => {
    if (gameState.playing === 'won') {
      return 100;
    }
    if (gameState.playing === 'lost') {
      return 10;
    }
  };

  return (
    <div className="results">
      <h1 className="results__title">
        You
        { gameState.playing}
        !
      </h1>
      <h2 className="results__title">
        You gained
        { points() }
        points!
      </h2>
      <button type="button" className="results__play-btn" onClick={navigateToGamepage}>
        Play again
      </button>
      <button type="button" className="results__back-btn" onClick={navigateToHomepage}>
        Home page
      </button>
    </div>
  );
};

export default ResultsPage;
