import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { motion } from "framer-motion";

const LoadingPage = ({ socket }: HomeProps) => {
  const state = useAppSelector((state) => state.updateGame);
  const navigate = useNavigate();

  const navigateToHomepage = () => {
    navigate("/");
    socket.emit("leave-waiting");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-page">
        <h1 className="loading-page__title">Waiting for someone to join...</h1>
        <button className="loading-page__back-btn" onClick={navigateToHomepage}>
          Go back
        </button>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
