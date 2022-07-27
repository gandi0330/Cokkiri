import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  user: {
    email: null,
    nickname: null,
    // accessToken: null,
    isLoggedIn: false,
  },
  
  loading: false,
  success: false,
  error: false,
};

export const signupDetail = createAsyncThunk(
  'auth/singupDetail',
  async ({ email, nickname, password }, thunkAPI) => {
    try {
      const res = await axios.post('/user/new', { email, nickname, password });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signupEmail = createAsyncThunk(
  'auth/singupEmail',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.post('/user/email', { email });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signupCertification = createAsyncThunk(
  'auth/singupCertification',
  async ({ email, number }, thunkAPI) => {
    try {
      const res = await axios.get(`/user/email/${email}/${number}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/user', { email, password });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.get(`/user/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  'auth/getuserInfo',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.get(`/user/info/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserEmail(state, { payload }) {
      state.user.email = payload.email;
    },
    addUser(state, { payload }) {
      state.user.email = payload.email;
      state.user.nickname = payload.nickname;
      // state.user.accessToken = payload.accessToken;
    },
    // resetUser(state) {
    //   state.user.email = null;
    //   state.user.nickname = null;
    //   // state.user.accessToken = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signupDetail.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signupDetail.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(signupDetail.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.user.email = null;
    });
    builder.addCase(signupEmail.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signupEmail.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(signupEmail.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(signupCertification.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signupCertification.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(signupCertification.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      console.log(action.payload.accessToken);
      localStorage.setItem('token', action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      localStorage.removeItem('token');
      state.email = null;
      state.nickname = null;
      state.isLoggedIn = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(action);
      state.nickname = action.payload.nickname; // TODO 제대로 됐는지 체크 필요
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const getUser = (state) => state.auth.user;
export const getUserEmail = (state) => state.auth.user.email;
export const getAllUserState = (state) => state.auth;
export const getLoggedIn = (state) => state.auth.user.isLoggedIn;
export const getLoadding = (state) => state.auth.loading;

export const { addUser, addUserEmail, resetUser } = authSlice.actions;

export default authSlice.reducer;
