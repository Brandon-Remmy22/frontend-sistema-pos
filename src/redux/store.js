import { configureStore } from '@reduxjs/toolkit';
import userSlice from './User/userSlice';
import clientSlice from './Client/ClientSlice';
import ArticleSlice from './Article/ArticleSlice';
import SaleSlice from './Sale/SaleSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    client:clientSlice,
    article:ArticleSlice,
    sale:SaleSlice
  },
});