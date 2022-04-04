import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAppSelector } from '../hooks/hooks';

const Home = ({socket}: HomeProps) => {
 const state = useAppSelector(state => state.updateGame);
 const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting", state.playerName);
    navigate('/waiting');
  }

  const signOut = () => {
    window.localStorage.clear();
    navigate('/login');
  }

  return (
    <motion.div
    initial={{ opacity: 0 }} // should be === to the exit value of where we came from
    animate={{ opacity: 1 }} // what you want to happen
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }} // for smooth transitions
    >
      <div className="home">
        <h1 className="home__title">Guess Who?</h1>
        <h2>Welcome {state.playerName}</h2>
        <button className="home__play-btn" onClick={navigateToGamepage}>Go play</button>
        <button className="home__play-btn" onClick={signOut}>Sign Out</button>
      </div>
    </motion.div>
  );
}

export default Home;
