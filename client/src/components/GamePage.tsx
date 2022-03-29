// header
// GAME BOARD
// chosen card
// form
import Board from './Board';
import Form from './Form';
import Card from './Card';

const GamePage = ({socket}: GamePageProps) => {
  return (
    <div className="game__page">
      <h1>I'm the game page</h1>
      <Board />
      <Form />
    </div>
  );
}

export default GamePage;