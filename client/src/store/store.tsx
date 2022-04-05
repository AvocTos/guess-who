import { configureStore } from '@reduxjs/toolkit';
import updateGameReducer from '../slices/slices';

export const store = configureStore({
  reducer: {
    updateGame: updateGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
