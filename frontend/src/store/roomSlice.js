import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

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

export const getRoom = createAsyncThunk(
  'room/getRoom',
  async ({ roomId }, thunkAPI) => {
    try {
      const res = await axios.get(`/room/${roomId}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const entranceRoom = createAsyncThunk(
  'room/entranceRoom',
  async ({ email, roomId }, thunkAPI) => {
    try {
      const res = await axios.post('/room/entrance', { email, roomId });
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
  // reducers: {
  // addErrMsg(state, { payload }) {
  //   state.errMsg = payload.errMsg;
  // },
  // },
  extraReducers: (builder) => {
    builder.addCase(makeRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(makeRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(makeRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(getRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getRoom.fulfilled, (state, { payload }) => {
      state.room = payload;
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(getRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(entranceRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(entranceRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(entranceRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

// export const { addUser, addUserEmail } = roomSlice.actions;

export default roomSlice.reducer;
