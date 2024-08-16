import { configureStore } from '@reduxjs/toolkit';
import userSlice from './User/userSlice';
import clientSlice from './Client/ClientSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    client:clientSlice
  },
});