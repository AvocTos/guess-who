/// <reference types="react-scripts" />

type Card = {
  name: string,
  image: string,
  id: number,
  isTheOne: boolean,
}

type CardList = Card[];

type GameState = {
  roomId: string,
  playing: string,
  cards: CardList,
  chosens: {
    render: Card,
    guess: Card,
  }
}

declare module 'list-react-files';

interface CardProps {
  person: Card,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}

interface HomeProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}

interface GamePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}

interface FormProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}
interface BoardProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}

interface QuestionsProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  message: string,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}