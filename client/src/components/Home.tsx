import { useNavigate } from 'react-router-dom';

const Home = ({socket}: HomeProps) => {
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting");
    navigate('/waiting'); 
  }

  return (
    <div className="home">
      <h1 className="home__title">Guess Who?</h1>
      <button className="home__play-btn" onClick={navigateToGamepage}>Go play</button>
    </div>
  );
}

export default Home;
