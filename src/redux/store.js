import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import addBookSlice from './slices/addBookSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    addBook: addBookSlice,
  }
})