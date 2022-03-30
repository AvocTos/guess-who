import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const LoadingPage = ({socket}: HomeProps) => {
  const state = useAppSelector(state => state.updateGame);
  const navigate = useNavigate();
  
  const navigateToHomepage = () => {
    navigate('/');
    socket.emit('leave-waiting');
  }

  return (
    <div className="loading__page">
      <h1>Waiting for someone to join...</h1>
      <button onClick={navigateToHomepage}>Go back</button>
    </div>
  );
}

export default LoadingPage;