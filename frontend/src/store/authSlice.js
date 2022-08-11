import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  email: null,
  nickname: null,
  isLoggedIn: false,
  isEmailSend: false,
  
  loading: false,
  success: false,
  error: false,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ 
    email, nickname, password, authToken,
  }, thunkAPI) => {
    try {
      const res = await axios.post('/user/new', { 
        email, nickname, password, authToken, 
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchAuthToken = createAsyncThunk(
  'auth/fetchAuthToken',
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

// export const signupCertification = createAsyncThunk(
//   'auth/singupCertification',
//   async ({ email, number }, thunkAPI) => {
//     try {
//       const res = await axios.get(`/user/email/${email}/${number}`);
//       const { data } = res;
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

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

export const changeNickname = createAsyncThunk(
  'auth/changeNickname',
  async ({ email, nickname }, thunkAPI) => {
    try {
      const res = await axios.patch('/user/nickname', {
        nickname,
        email,
        // userEmail: email,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.patch('/user/pw', {
        password,
        email,
        // userEmail: email,
      });
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
      state.email = payload.email;
    },
    addUser(state, { payload }) {
      state.email = payload.email;
      state.nickname = payload.nickname;
    },
    addErrMsg(state, { payload }) {
      state.errMsg = payload.errMsg;
    },
    addUserForSignup(state, { payload }) {
      state.email = payload.email;
      state.nickname = payload.nickname;
      state.pwd = payload.pwd;
    },
    addAuthToken(state, { paylaod }) {
      state.authToken = paylaod.authToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signup.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.email = null;
    });
    builder.addCase(fetchAuthToken.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.isEmailSend = false;
    });
    builder.addCase(fetchAuthToken.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.isEmailSend = true;
    });
    builder.addCase(fetchAuthToken.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.isEmailSend = false;
    });
    // builder.addCase(signupCertification.pending, (state) => {
    //   state.loading = true;
    //   state.success = false;
    //   state.error = false;
    // });
    // builder.addCase(signupCertification.fulfilled, (state) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.error = false;
    // });
    // builder.addCase(signupCertification.rejected, (state) => {
    //   state.loading = false;
    //   state.success = false;
    //   state.error = true;
    // });
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
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('token', action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
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
      state.email = null;
      state.nickname = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
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
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(changeNickname.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(changeNickname.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.nickname = action.payload.nickname;
    });
    builder.addCase(changeNickname.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const getNickname = (state) => state.auth.nickname;
export const getUserEmail = (state) => state.auth.email;
export const getAllUserState = (state) => state.auth;
export const getIsEmailSend = (state) => state.auth.isEmailSend;
export const getLoggedIn = (state) => state.auth.isLoggedIn;
export const getLoadding = (state) => state.auth.loading;

export const { 
  addUser, addUserEmail, addAuthToken, addUserForSignup,
} = authSlice.actions;

export default authSlice.reducer;
