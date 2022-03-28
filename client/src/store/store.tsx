import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slices/slices"

export const store = configureStore({
  reducer: {
    updateGame: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
