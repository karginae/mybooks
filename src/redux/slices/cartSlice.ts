import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { CartData, CartSliceState } from '../types/cartType';
import { SliceStatus } from '../types/authType';

export const fetchCart = createAsyncThunk<CartData[]>('cart/fetchCart', async () => {
  // try {
  const { data } = await axios.get<CartData[]>('/cart');
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchAddCart = createAsyncThunk<CartData, { _id: string }>(
  'cart/fetchAddCart',
  async (id) => {
    // try {
    const { data } = await axios.post<CartData>('/cart', id);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

export const fetchRemoveCart = createAsyncThunk<{ id: string; msg: string }, string>(
  'favorites/fetchRemoveCart',
  async (id) => {
    // try {
    const { data } = await axios.delete<{ id: string; msg: string }>(`/cart/${id}`);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

const initialState: CartSliceState = {
  data: null,
  status: SliceStatus.LOADING,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartData[]>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchAddCart.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchAddCart.fulfilled, (state, action: PayloadAction<CartData>) => {
        state.data = state.data ? [...state.data, action.payload] : [action.payload];
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchAddCart.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchRemoveCart.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(
        fetchRemoveCart.fulfilled,
        (state, action: PayloadAction<{ id: string; msg: string }>) => {
          state.data =
            state.data && state.data.filter((cartBook) => cartBook.book._id !== action.payload.id);
          state.status = SliceStatus.LOADED;
        },
      )
      .addCase(fetchRemoveCart.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      });
  },
});

export default cartSlice.reducer;
