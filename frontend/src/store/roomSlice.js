import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  room: {},
  nicknameObj: {},
  publisher: {},
  subscribers: [],
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
      console.log(roomId);
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
  reducers: {
    addPublisher(state, { payload }) {
      state.publisher = payload;
    },
    addSubscribers(state, { payload }) {
      state.subscribers.push(payload);
    },
    removeSubscriber(state, { payload }) {
      state.subscribers = state.subscribers.filter((sub) => sub !== payload);
    },
    addNickname(state, { payload }) {
      state.nicknameObj = { ...state.nicknameObj, ...payload };
    },
  },
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
      state.roomInfo = payload;
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

export const {
  addPublisher, addSubscribers, removeSubscriber, addNickname,
} = roomSlice.actions;

export default roomSlice.reducer;
