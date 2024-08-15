import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import ClientSlice from './Client/ClientSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    client:ClientSlice
  },
});