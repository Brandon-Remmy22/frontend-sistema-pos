import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    // tus reducers aquí
  },
});

// Define el tipo para `dispatch`
export type AppDispatch = typeof store.dispatch;

export default store;