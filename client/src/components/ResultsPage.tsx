import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const ResultsPage = ({ socket }: HomeProps) => {
  const state = useAppSelector((state) => state.updateGame);
  const navigate = useNavigate();
  const navigateToGamepage = () => {
    socket.emit("add-to-waiting", state.playerName);
    navigate("/waiting");
  };

  const navigateToHomepage = () => {
    navigate("/");
  };
  const points = () => {
    if (state.playing === "won") {
      return 30;
    }
    if (state.playing === "lost") {
      return 10;
    }
  };

  return (
    <div className="results">
      <h1 className="results__title">You {state.playing}!</h1>
      <h2 className="results__points">You gained {points()} points!</h2>
      <button className="results__play-btn" onClick={navigateToGamepage}>
        Play again
      </button>
      <button className="results__back-btn" onClick={navigateToHomepage}>
        Home page
      </button>
    </div>
  );
};

export default ResultsPage;
