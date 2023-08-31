import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { BookData, BookInit, BooksSliceState } from '../types/booksType';
import { SliceStatus } from '../types/authType';

export const fetchBooks = createAsyncThunk<BookData[]>('books/fetchBooks', async () => {
  // try {
  const { data } = await axios.get<BookData[]>('/books');
  return data;
  // } catch (error) {
  //   return error.response.data;
  // }
});

export const fetchAddBook = createAsyncThunk<BookData, BookInit>(
  'books/fetchAddBook',
  async (params) => {
    // try {
    const { data } = await axios.post<BookData>('/books', params);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

export const fetchUpdateBook = createAsyncThunk<BookData, { id: string; values: BookInit }>(
  'books/fetchUpdateBook',
  async (params) => {
    // try {
    const { data } = await axios.patch<BookData>(`/books/${params.id}`, params.values);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

export const fetchRemoveBook = createAsyncThunk<{ id: string; msg: string }, string>(
  'books/fetchRemoveBook',
  async (id) => {
    // try {
    const { data } = await axios.delete<{ id: string; msg: string }>(`/books/${id}`);
    return data;
    // } catch (error) {
    //   return error.response.data;
    // }
  },
);

const initialState: BooksSliceState = {
  data: null,
  status: SliceStatus.LOADING,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookData[]>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchAddBook.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchAddBook.fulfilled, (state, action) => {
        // state.data = [...state.data, action.payload];
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchAddBook.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchUpdateBook.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchUpdateBook.fulfilled, (state) => {
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchUpdateBook.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchRemoveBook.pending, (state) => {
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchRemoveBook.fulfilled, (state) => {
        // state.data = state.data.filter((book) => (book._id !== action.payload.id));
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchRemoveBook.rejected, (state) => {
        state.status = SliceStatus.ERROR;
      });
  },
});

export default booksSlice.reducer;
