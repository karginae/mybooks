import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  try {
    const { data } = await axios.get('/favorites');
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchAddFavorite = createAsyncThunk('favorites/fetchAddFavorite', async (id) => {
  try {
    const { data } = await axios.post('/favorites', id);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchRemoveFavorite = createAsyncThunk('favorites/fetchRemoveFavorite', async (id) => {
  try {
    const { data } = await axios.delete(`/favorites/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  data: null,
  status: 'loading',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action) => {
      state.data = action;
    }
  },
  extraReducers: {
    [fetchFavorites.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchFavorites.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchFavorites.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAddFavorite.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddFavorite.fulfilled]: (state, action) => {
      state.data = [...state.data, action.payload];
      state.status = 'loaded';
    },
    [fetchAddFavorite.rejected]: (state) => {
      state.status = 'error';
    },
    [fetchRemoveFavorite.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchRemoveFavorite.fulfilled]: (state, action) => {
      state.data = state.data.filter((favoriteBook) => (favoriteBook.book._id !== action.payload.id));
      state.status = 'loaded';
    },
    [fetchRemoveFavorite.rejected]: (state) => {
      state.status = 'error';
    },
  }
});

export const { add } = favoritesSlice.actions;

export default favoritesSlice.reducer