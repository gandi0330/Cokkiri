import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';
// import useRefreshToken from '../hooks/useRefreshToken';

// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('token') || '';
//     if (config.headers) {
//       config.headers = {
//         ...config.headers,
//         jwt: accessToken,
//       };
//     } else {
//       config.headers = { ...config.headers };
//     }
//     return config;
//   },
//   (error) => {
//     console.error(err);
//     return Promise.reject(error);
//   },
// );

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => { 
//     const prevRequest = error?.config;
//     const refresh = useRefreshToken();
//     console.log('error', error);
//     console.log('prevRequest', prevRequest);
//     // access token invalid
//     if (error?.response?.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const newAccessToken = await refresh();
//       prevRequest.headers.jwt = newAccessToken;
//       console.log('refreshed');
//       return axios(prevRequest); 
//     }
//     return Promise.reject(error);
//   },
// );

const initialState = {
  room: {},
  token: null,

  loading: false,
  success: false,
  error: false,
};

export const makeRoom = createAsyncThunk(
  'room/makeRoom',
  async ({ email, title, userLimit }, thunkAPI) => {
    try {
      const res = await axios.post('/room/new', { email, title, userLimit });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const entranceRoom = createAsyncThunk(
  'room/entranceRoom',
  async ({ userEmail, roomNumber }, thunkAPI) => {
    try {
      const res = await axios.post('/room/entrance', { userEmail, roomNumber });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // addErrMsg(state, { payload }) {
    //   state.errMsg = payload.errMsg;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(makeRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(makeRoom.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.error = false;
      state.roomTitle = payload.roomTitle;
    });
    builder.addCase(makeRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(entranceRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(entranceRoom.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.token = payload.token;
    });
    builder.addCase(entranceRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const getUser = (state) => state.auth.user;

export const { addUser, addUserEmail } = roomSlice.actions;

export default roomSlice.reducer;
