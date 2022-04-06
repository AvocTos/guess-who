import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/hooks';
import LogoSpinner from './LogoSpinner';
import Scoreboard from './Scoreboard';

const Home = ({ socket }: HomeProps) => {
  const [score, setScore] = useState('');
  const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

  const gameState = useAppSelector((state) => state.updateGame);
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit('add-to-waiting', gameState.playerName);
    navigate('/waiting');
  };

  const getPoints = async () => {
    if (gameState.playerName.length > 0) {
      const result = await fetch(`${address}/api/user/${gameState.playerName}`);
      const data = await result.json();
      setScore(data.score);
    }
  };

  useEffect(() => {
    getPoints();
  }, [gameState.playerName]);

  const signOut = () => {
    window.localStorage.clear();
    navigate('/login');
  };

  const goToInstructions = () => {
    navigate('/instructions');
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="home__nav">
        <button type="button" className="home__instructions-btn" onClick={goToInstructions}>Instructions</button>
        <button type="button" className="home__signout-btn" onClick={signOut}>Log Out</button>
      </nav>
      <div className="home">
        <LogoSpinner />
        <h1 className="home__title">Guess Who?</h1>
        <div className="home__welcome">
          <h2>{`Welcome ${gameState.playerName}`}</h2>
          <br></br>
          <h3>{`Your current score is ${score}`}</h3>
        </div>
        <button type="button" className="home__play-btn" onClick={navigateToGamepage}>Go play</button>
        <Scoreboard />
      </div>
    </motion.div>
  );
};

export default Home;
