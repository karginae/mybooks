import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { AuthData, AuthSliceState, SliceStatus, UserAuth, UserReg } from '../types/authType';

export const fetchAuth = createAsyncThunk<AuthData, UserAuth>('auth/fetchAuth', async (params) => {
  try {
    const { data } = await axios.post<AuthData>('/auth', params);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const fetchReg = createAsyncThunk<AuthData, UserReg>('reg/fetchReg', async (params) => {
  try {
    const { data } = await axios.post<AuthData>('/reg', params);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const fetchAuthMe = createAsyncThunk<AuthData>('auth/fetchAuthMe', async () => {
  try {
    const { data } = await axios.get<AuthData>('/me');
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});

const initialState: AuthSliceState = {
  data: null,
  status: SliceStatus.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      })
      .addCase(fetchReg.pending, (state) => {
        state.data = null;
        state.status = SliceStatus.LOADING;
      })
      .addCase(fetchReg.fulfilled, (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.status = SliceStatus.LOADED;
      })
      .addCase(fetchReg.rejected, (state) => {
        state.data = null;
        state.status = SliceStatus.ERROR;
      });
  },
});

export const selectorIsAuth = (state: RootState) => Boolean(state.auth.data?.email);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
