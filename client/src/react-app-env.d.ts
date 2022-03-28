/// <reference types="react-scripts" />

type Card = {
  name: string,
  image: string,
  id: string,
  isTheOne: boolean,
}

type CardList = Card[];

type GameState = {
  playing: boolean,
  cards: CardList,
}

declare module 'list-react-files';

interface CardProps {
  person: string,
}