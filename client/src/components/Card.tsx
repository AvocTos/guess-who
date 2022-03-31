import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setPlayingReducer } from "../slices/slices";

const Card = ({person, socket}: CardProps) => {
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (state.chosens.guess.name === person.name) {
      console.log(state.roomId);
      socket.emit('win', state.roomId, socket.id);
    }
    if (state.chosens.guess.name !== person.name) {
      socket.emit('change-turn', state.roomId);
      dispatch(setPlayingReducer('inactive'));
    }
  }

  return (
    <article className="card">
      <img src={require(`../player-images/${person.image}`)} className="card__img" />
      <p className="card__name">{person.name}</p>
      <button className={state.playing === 'active' && state.chosens.render.name !== person.name ? 'card__btn' : 'card__btn--inactive'} onClick={handleClick}>Guess</button>
    </article>
  );
}

export default Card;