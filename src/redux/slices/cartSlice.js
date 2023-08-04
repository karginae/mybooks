import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  // try {
  const { data } = await axios.get('/cart');
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchAddCart = createAsyncThunk('cart/fetchAddCart', async (id) => {
  // try {
  const { data } = await axios.post('/cart', id);
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchRemoveCart = createAsyncThunk('favorites/fetchRemoveCart', async (id) => {
  // try {
  const { data } = await axios.delete(`/cart/${id}`);
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

const initialState = {
  data: null,
  status: 'loading',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      state.data = action;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchCart.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchAddCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.status = 'loaded';
      })
      .addCase(fetchAddCart.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchRemoveCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRemoveCart.fulfilled, (state, action) => {
        state.data = state.data.filter((cartBook) => cartBook.book._id !== action.payload.id);
        state.status = 'loaded';
      })
      .addCase(fetchRemoveCart.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
