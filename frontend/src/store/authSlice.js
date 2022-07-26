import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  signupEmailLoading: false,
  signupEmailDone: false,
  signupEmailError: null,

  signupCertificationLoading: false,
  signupCertificationDone: false,
  signupCertificationError: null,

  signupDetailLoading: false,
  signupDetailDone: false,
  signupDetailError: null,
};

export const singupDetail = createAsyncThunk(
  'auth/singupDetail',
  async ({ email, nickname, password }, thunkAPI) => {
    try {
      const res = await axios.post('/user/new', { email, nickname, password });
      const { data } = res;
      console.log('res', res);
      // if (res.status === 200) {
      //   navigate('/singupEmail', { replace: true });
      // }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const singupEmail = createAsyncThunk(
  'auth/singupEmail',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.post('/user/email', { email });
      const { data } = res;
      console.log('res', res);
      // if (res.status === 200) {
      //   navigate('/signupCertification', { replace: true, state: { email } });
      // }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const singupCertification = createAsyncThunk(
  'auth/singupCertification',
  async ({ email, number }, thunkAPI) => {
    try {
      const res = await axios.get(`/user/email/${email}/${number}`);
      const { data } = res;
      console.log('data', res);
      // if (res.status === 200) {
      // }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/user', { email, password });
      console.log('res', res);
      const { data } = res;
      if (res.status === 200) {
        localStorage.setItem('token', data.accessToken);
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.get(`/user/${email}`);
      console.log('res', res);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singupDetail.pending, (state) => {
      state.signupDetailLoading = true;
      state.signupDetailDone = false;
      state.signupDetailError = null;
    });
    builder.addCase(singupDetail.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.signupDetailLoading = false;
      state.signupDetailDone = true;
      state.signupDetailError = null;
    });
    builder.addCase(singupDetail.rejected, (state, { payload }) => {
      state.signupDetailLoading = false;
      state.signupDetailDone = false;
      state.signupDetailError = payload;
    });
    builder.addCase(singupEmail.pending, (state) => {
      state.signupEmailLoading = true;
      state.signupEmailDone = false;
      state.signupEmailError = null;
    });
    builder.addCase(singupEmail.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.signupEmailLoading = false;
      state.signupEmailDone = true;
      state.signupEmailError = null;
    });
    builder.addCase(singupEmail.rejected, (state, { payload }) => {
      state.signupEmailLoading = false;
      state.signupEmailDone = false;
      state.signupEmailError = payload;
    });
    builder.addCase(singupCertification.pending, (state) => {
      state.signupCertificationLoading = true;
      state.signupCertificationDone = false;
      state.signupCertificationError = null;
    });
    builder.addCase(singupCertification.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.signupCertificationLoading = false;
      state.signupCertificationDone = true;
      state.signupCertificationError = null;
    });
    builder.addCase(singupCertification.rejected, (state, { payload }) => {
      state.signupCertificationLoading = false;
      state.signupCertificationDone = false;
      state.signupCertificationError = payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log('payload', payload);
      state.loginLoading = false;
      state.loginDone = true;
      state.loginError = null;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      console.log('payload', payload);
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      console.log('payload', payload);
      state.logoutLoading = false;
      state.logoutDone = true;
      state.logoutError = null;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      console.log('payload', payload);
      state.logoutLoading = false;
      state.logoutDone = false;
      state.logoutError = payload;
    });
  },
});

// export const {
//   singupEmail,
// } = authSlice.actions;

export default authSlice.reducer;
