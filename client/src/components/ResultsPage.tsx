import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const ResultsPage = ({socket}: HomeProps) => {
  const state = useAppSelector(state => state.updateGame);
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting", state.playerName);
    navigate('/waiting');
  }
  
  const navigateToHomepage = () => {
    navigate('/');
  }

  return (
    <div className="results">
      <h1 className="results__title">You {state.playing}!</h1>
      <button className='results__play-btn' onClick={navigateToGamepage}>Play again</button>
      <button className='results__back-btn' onClick={navigateToHomepage}>Home page</button>
    </div>
  );
}

export default ResultsPage;