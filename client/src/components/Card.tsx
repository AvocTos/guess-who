import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setPlayingReducer } from "../slices/slices";

const Card = ({person, socket}: CardProps) => {
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (state.chosens.guess.name === person.name) {
      socket.emit('win', state.roomId, socket.id);
    }
    if (state.chosens.guess.name !== person.name) {
      socket.emit('change-turn', state.roomId);
      dispatch(setPlayingReducer('inactive'));
    }
  }

  return (
    <div className="card">
      <h1>I'm the card</h1>
      <img src={require(`../player-images/${person.image}`)} />
      <p>{person.name}</p>
      <button className={state.playing === 'active' ? 'card__btn' : 'card__btn--inactive'} onClick={handleClick}>Guess</button>
    </div>
  );
}

export default Card;