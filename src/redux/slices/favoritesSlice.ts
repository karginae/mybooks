import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { FavoriteData, FavoritesSliceState } from '../types/favoriteType';
import { SliceStatus } from '../types/authType';

export const fetchFavorites = createAsyncThunk<FavoriteData[]>(
  'favorites/fetchFavorites',
  async () => {
    // try {
    const { data } = await axios.get<FavoriteData[]>('/favorites');
    return data;
    // } catch (error) {
    //   return error.response?.data || error.message;
    // }
  },
);

export const fetchAddFavorite = createAsyncThunk<FavoriteData, { _id: string }>(
  'favorites/fetchAddFavorite',
  async (id) => {
    // try {
    const { data } = await axios.post<FavoriteData>('/favorites', id);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

export const fetchRemoveFavorite = createAsyncThunk<{ id: string; msg: string }, string>(
  'favorites/fetchRemoveFavorite',
  async (id) => {
    // try {
    const { data } = await axios.delete<{ id: string; msg: string }>(`/favorites/${id}`);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

const initialState: FavoritesSliceState = {
  data: null,
  status: SliceStatus.LOADING,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoriteData[]>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchAddFavorite.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchAddFavorite.fulfilled, (state, action: PayloadAction<FavoriteData>) => {
        state.data = state.data ? [...state.data, action.payload] : [action.payload];
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchAddFavorite.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchRemoveFavorite.pending, (state) => {
        // state.status = SliceStatus.LOADING;
      })
      .addCase(
        fetchRemoveFavorite.fulfilled,
        (state, action: PayloadAction<{ id: string; msg: string }>) => {
          state.data =
            state.data &&
            state.data.filter((favoriteBook) => favoriteBook.book._id !== action.payload.id);
          state.status = SliceStatus.LOADED;
        },
      )
      .addCase(fetchRemoveFavorite.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      });
  },
});

export default favoritesSlice.reducer;
