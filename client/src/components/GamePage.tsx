import Board from './Board';
import Form from './Form';
import Card from './Card';

const GamePage = ({socket}: GamePageProps) => {
  return (
    <div className="game__page">
      <h1>I'm the game page</h1>
      <Board />
      <Form socket={socket}/>
    </div>
  );
}

export default GamePage;