import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const ResultsPage = ({socket}: HomeProps) => {
  const state = useAppSelector(state => state.updateGame);
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting");
    navigate('/waiting');
  }
  
  const navigateToHomepage = () => {
    navigate('/');
  }

  return (
    <div className="results__page">
      <h1>Results page</h1>
      <h2>{state.playing}</h2>
      <button onClick={navigateToGamepage}>Play again</button>
      <button onClick={navigateToHomepage}>Home page</button>
    </div>
  );
}

export default ResultsPage;