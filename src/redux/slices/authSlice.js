import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  try {
    const { data } = await axios.post('/auth', params);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchReg = createAsyncThunk('reg/fetchReg', async (params) => {
  try {
    const { data } = await axios.post('/reg', params);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  try {
    const { data } = await axios.get('/me');
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchReg.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchReg.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchReg.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.data = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAuth.pending, (state) => {
//         state.data = null;
//         state.status = 'loading';
//       })
//       .addCase(fetchAuth.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.status = 'loaded';
//       })
//       .addCase(fetchAuth.rejected, (state) => {
//         state.data = null;
//         state.status = 'error';
//       })
//       .addCase(fetchAuthMe.pending, (state) => {
//         state.data = null;
//         state.status = 'loading';
//       })
//       .addCase(fetchAuthMe.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.status = 'loaded';
//       })
//       .addCase(fetchAuthMe.rejected, (state) => {
//         state.data = null;
//         state.status = 'error';
//       })
//       .addCase(fetchReg.pending, (state) => {
//         state.data = null;
//         state.status = 'loading';
//       })
//       .addCase(fetchReg.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.status = 'loaded';
//       })
//       .addCase(fetchReg.rejected, (state) => {
//         state.data = null;
//         state.status = 'error';
//       });
//   },
// });

export const selectorIsAuth = (state) => Boolean(state.auth.data?.email);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
