import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import booksSlice from './slices/booksSlice';
import favoritesSlice from './slices/favoritesSlice';
import cartSlice from './slices/cartSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
  }
})