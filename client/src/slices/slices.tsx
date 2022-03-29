import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {playing: false, cards: []} as GameState;

export const gameSlice = createSlice({
  name: 'updateGameReducer',
  initialState,
  reducers: {
    setReducer: (state: GameState, action) => {
      return {
        playing: state.playing,
        cards: action.payload
      }
    },
    setPlayingReducer: (state: GameState, action) => {
      return {
        playing: action.payload,
        cards: state.cards
      }
    },
  }
})

export const { setReducer, setPlayingReducer } = gameSlice.actions
export default gameSlice.reducer
