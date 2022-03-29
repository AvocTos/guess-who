/// <reference types="react-scripts" />

type Card = {
  name: string,
  image: string,
  id: number,
  isTheOne: boolean,
}

type CardList = Card[];

type GameState = {
  playing: boolean,
  cards: CardList,
}

declare module 'list-react-files';

interface CardProps {
  person: Card,
}

interface HomeProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}

interface GamePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}
