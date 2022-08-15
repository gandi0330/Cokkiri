import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  room: {},
  id: null,
  chats: [],

  audioActive: false,
  cameraActive: false,
  soundActive: true,
  doneShare: false,

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
      const res = await axios.get(`/room/detail/${roomId}`);
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

export const exitRoom = createAsyncThunk(
  'room/exitRoom',
  async ({ email, roomId, id }, thunkAPI) => {
    try {
      const res = await axios.post('/room/exit', { email, roomId, id });
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
    updateChats(state, { payload }) {
      state.chats.push(payload);
    },
    clickAuido(state, { payload }) {
      state.audioActive = payload;
    },
    clickCamera(state, { payload }) {
      state.cameraActive = payload;
    },
    clickSound(state, { payload }) {
      state.soundActive = payload;
    },
    shareScreen(state, { payload }) {
      state.doneShare = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(makeRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(makeRoom.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
    builder.addCase(getRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getRoom.fulfilled, (state, { payload }) => {
      state.roomInfo = payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getRoom.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
    builder.addCase(entranceRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(entranceRoom.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.id = payload.id;
    });
    builder.addCase(entranceRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(exitRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(exitRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.id = null;
      state.room = {};
      state.chats = [];
      state.audioActive = true;
      state.cameraActive = true;
      state.soundActive = true;
      state.doneShare = false;
    });
    builder.addCase(exitRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const {
  updateChats, clickAuido, clickCamera, clickSound, shareScreen,
} = roomSlice.actions;

export default roomSlice.reducer;
