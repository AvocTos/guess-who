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
    <div className="loading-page">
      <h1 className="loading-page__title">Waiting for someone to join...</h1>
      <button className="loading-page__back-btn" onClick={navigateToHomepage}>Go back</button>
    </div>
  );
}

export default LoadingPage;