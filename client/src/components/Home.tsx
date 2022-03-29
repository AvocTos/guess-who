import { useNavigate } from 'react-router-dom';

const Home = ({socket}: HomeProps) => {
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting");
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
