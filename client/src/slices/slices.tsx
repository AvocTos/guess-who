import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCard = {
  name: '',
  image: 'Fabrizio.png',
  id: 0,
  isTheOne: false,
}

const initialState = {roomId: '', playing: false, cards: [], chosens: {render: initialCard, guess: initialCard}} as GameState;

export const gameSlice = createSlice({
  name: 'updateGameReducer',
  initialState,
  reducers: {
    setReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: state.playing,
        cards: action.payload,
        chosens: state.chosens
      }
    },
    setPlayingReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: action.payload,
        cards: state.cards,
        chosens: state.chosens
      }
    },
    setChosenReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: state.playing,
        cards: state.cards,
        chosens: action.payload
      }
    },
    setRoomReducer: (state: GameState, action) => {
      return {
        roomId: action.payload,
        playing: state.playing,
        cards: state.cards,
        chosens: state.chosens
      }
    },
  }
})

export const { setReducer, setPlayingReducer, setChosenReducer, setRoomReducer } = gameSlice.actions
export default gameSlice.reducer
