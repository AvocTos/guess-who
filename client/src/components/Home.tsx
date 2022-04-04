import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Home = ({socket}: HomeProps) => {
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting");
    navigate('/waiting');
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
        <button className="home__play-btn" onClick={navigateToGamepage}>Go play</button>
      </div>
    </motion.div>
  );
}

export default Home;
