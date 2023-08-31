import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import booksSlice from './slices/booksSlice';
import favoritesSlice from './slices/favoritesSlice';
import cartSlice from './slices/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
