import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCard = {
  name: '',
  image: 'Fabrizio.png',
  id: 0,
  isTheOne: false,
}

const initialState = {roomId: '', playing: 'inactive', cards: [], chosens: {render: initialCard, guess: initialCard}, playerName: ''} as GameState;

export const gameSlice = createSlice({
  name: 'updateGameReducer',
  initialState,
  reducers: {
    setReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: state.playing,
        cards: action.payload,
        chosens: state.chosens,
        playerName: state.playerName,
      }
    },
    setPlayingReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: action.payload,
        cards: state.cards,
        chosens: state.chosens,
        playerName: state.playerName,
      }
    },
    setChosenReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: state.playing,
        cards: state.cards,
        chosens: action.payload,
        playerName: state.playerName,
      }
    },
    setRoomReducer: (state: GameState, action) => {
      return {
        roomId: action.payload,
        playing: state.playing,
        cards: state.cards,
        chosens: state.chosens,
        playerName: state.playerName,
      }
    },
    setUserReducer: (state: GameState, action) => {
      return {
        roomId: state.roomId,
        playing: state.playing,
        cards: state.cards,
        chosens: state.chosens,
        playerName: action.payload,
      }
    },
    
  }
})

export const { setReducer, setPlayingReducer, setChosenReducer, setRoomReducer, setUserReducer } = gameSlice.actions
export default gameSlice.reducer
