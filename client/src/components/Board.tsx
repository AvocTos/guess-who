import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setPlayingReducer, setReducer } from "../slices/slices";
import Card from "./Card";

const Board = ({ socket }: BoardProps) => {
  const state = useAppSelector((state) => state.updateGame);

  // ß
  return (
    <>
      <section className="board">
        {state.cards.map((person, index: number) => {
          return <Card key={index} person={person} socket={socket} />;
        })}
      </section>
    </>
  );
};

export default Board;
