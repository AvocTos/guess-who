import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {playing: false, cards: []} as GameState;

export const gameSlice = createSlice({
  name: 'gameReducer',
  initialState,
  reducers: {
    setReducer: (state: GameState, action) => {
      return {
        playing: state.playing,
        cards: action.payload
      }
    },
  }
})

export const { setReducer } = gameSlice.actions
export default gameSlice.reducer
