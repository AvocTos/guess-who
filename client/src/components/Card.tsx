import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setPlayingReducer } from "../slices/slices";
import { useState } from "react";

const Card = ({ person, socket }: CardProps) => {
  const [active, setActive] = useState(true);
  const state = useAppSelector((state) => state.updateGame);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (state.chosens.guess.name === person.name) {
      socket.emit("win", state.roomId, socket.id);
    }
    if (state.chosens.guess.name !== person.name) {
      socket.emit("change-turn", state.roomId, person.name);
      dispatch(setPlayingReducer("inactive"));
    }
  };

  const togglecard = () => {
    setActive(!active);
  };
  return (
    <article
      onClick={togglecard}
      className={active ? "card" : "card card--inactive"}
    >
      <img
        src={require(`../player-images/${person.image}`)}
        className="card__img"
      />
      <p className="card__name">{person.name}</p>
      <button
        className={
          state.playing === "active" ? "card__btn" : "card__btn--inactive"
        }
        onClick={handleClick}
      >
        Guess
      </button>
    </article>
  );
};

export default Card;
