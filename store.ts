import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import createSagaMiddleware from'redux-saga';

const saga = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
