import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchAddBook = createAsyncThunk('addBook/fetchAddBook', async (params) => {
  try {
    const { data } = await axios.post('/books', params);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  data: null,
  status: 'loading',
};

const addBookSlice = createSlice({
  name: 'addBook',
  initialState,
  extraReducers: {
    [fetchAddBook.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAddBook.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAddBook.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  }
});

export default addBookSlice.reducer