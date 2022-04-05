import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAppSelector } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';

const Home = ({socket}: HomeProps) => {
  const [score, setScore] = useState('');
 const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

 const state = useAppSelector(state => state.updateGame);
 const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting", state.playerName);
    navigate('/waiting');
  }

  const getPoints = async () => {
    if(state.playerName.length > 0){
      const result = await fetch(`${address}/api/user/${state.playerName}`)
      const data = await result.json();
      setScore(data.score);
    }
  };
  
  useEffect(() => {
    getPoints();
  }, [state.playerName]);
  
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
        <h3>Your currentscore is {score}</h3>
        <button className="home__play-btn" onClick={navigateToGamepage}>Go play</button>
        <button className="home__play-btn" onClick={signOut}>Sign Out</button>
        <Scoreboard />
      </div>
    </motion.div>
  );
}

export default Home;
