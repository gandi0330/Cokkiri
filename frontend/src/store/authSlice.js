import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const res = await axios.post('http://', { email, password }, {
        headers: {},
      });

      const data = await response.json();
      console.log('data', data);

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        return { ...data, email, password };
      }
      return thunkAPI.rejectWithValue(data);
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
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loginLoading = false;
      state.loginDone = true;
      state.loginError = null;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = payload;
    });
  },
});

export const {
  loginRequest,
} = authSlice.actions;

export default authSlice.reducer;
