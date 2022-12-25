import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  try {
    const { data } = await axios.get('/books');
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchAddBook = createAsyncThunk('books/fetchAddBook', async (params) => {
  try {
    const { data } = await axios.post('/books', params);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchUpdateBook = createAsyncThunk('books/fetchUpdateBook', async (params) => {
  try {
    const { data } = await axios.patch(`/books/${params.id}`, params.values);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchRemoveBook = createAsyncThunk('books/fetchRemoveBook', async (id) => {
  try {
    const { data } = await axios.delete(`/books/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
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
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchBooks.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAddBook.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddBook.fulfilled]: (state, action) => {
      state.data = [...state.data, action.payload];
      state.status = 'loaded';
    },
    [fetchAddBook.rejected]: (state) => {
      state.status = 'error';
    },
    [fetchUpdateBook.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUpdateBook.fulfilled]: (state) => {
      state.status = 'loaded';
    },
    [fetchUpdateBook.rejected]: (state) => {
      state.status = 'error';
    },
    [fetchRemoveBook.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchRemoveBook.fulfilled]: (state) => {
      // state.data = state.data.filter((book) => (book._id !== action.payload.id));
      state.status = 'loaded';
    },
    [fetchRemoveBook.rejected]: (state) => {
      state.status = 'error';
    },
  }
});

export const { add, remove } = booksSlice.actions;

export default booksSlice.reducer