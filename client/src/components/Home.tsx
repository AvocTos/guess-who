// header
// welcome *player*
// go play btn
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    navigate('/gamepage');
  }

  return (
    <div className="home">
      <h1>I'm home</h1>
      <button onClick={navigateToGamepage}>Go play</button>
    </div>
  );
}

export default Home;
