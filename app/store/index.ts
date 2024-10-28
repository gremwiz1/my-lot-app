import { configureStore } from '@reduxjs/toolkit';
import lotReducer from './lotSlice';

export const store = configureStore({
  reducer: {
    lot: lotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
