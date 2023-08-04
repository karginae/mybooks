import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  // try {
  const { data } = await axios.get('/books');
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchAddBook = createAsyncThunk('books/fetchAddBook', async (params) => {
  // try {
  const { data } = await axios.post('/books', params);
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchUpdateBook = createAsyncThunk('books/fetchUpdateBook', async (params) => {
  // try {
  const { data } = await axios.patch(`/books/${params.id}`, params.values);
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchRemoveBook = createAsyncThunk('books/fetchRemoveBook', async (id) => {
  // try {
  const { data } = await axios.delete(`/books/${id}`);
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

const initialState = {
  data: null,
  status: 'loading',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    add: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchAddBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddBook.fulfilled, (state, action) => {
        // state.data = [...state.data, action.payload];
        state.status = 'loaded';
      })
      .addCase(fetchAddBook.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchUpdateBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateBook.fulfilled, (state) => {
        state.status = 'loaded';
      })
      .addCase(fetchUpdateBook.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchRemoveBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRemoveBook.fulfilled, (state) => {
        // state.data = state.data.filter((book) => (book._id !== action.payload.id));
        state.status = 'loaded';
      })
      .addCase(fetchRemoveBook.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { add } = booksSlice.actions;

export default booksSlice.reducer;
