import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  rooms: [],
  recentRooms: [],
  favoriteRooms: [],

  loading: false,
  success: false,
  error: false,
  hasMore: false,
};

export const fetchRoomList = createAsyncThunk(
  'roomList/fetchRoomList',
  async ({ 
    offset, limit, keyword,
  }, thunkAPI) => {
    try {
      // const source = axios.CancelToken.source();
      // thunkAPI.signal.addEventListener('abort', () => source.cancel());
      const res = await axios.get('/room', {
        params: {
          offset, 
          limit,
          keyword,
        },
        // cancelToken: source.token,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (axios.isCancel(err)) {
        console.log('request canceled');
        return;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchRecentRooms = createAsyncThunk(
  'roomList/fetchRecentRooms',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.get(`/room/recent/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateRecentRooms = createAsyncThunk(
  'roomList/updateRecentRooms',
  async ({ email, roomId }, thunkAPI) => {
    try {
      const res = await axios.post('/room/recent', {
        email, roomId,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchFavoriteRooms = createAsyncThunk(
  'roomList/fetchFavoriteRooms',
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.get(`/room/favorite/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addFavoriteRoom = createAsyncThunk(
  'roomList/addFavoriteRoom',
  async ({ email, roomId }, thunkAPI) => {
    try {
      const res = await axios.post('/room/favorite', {
        email, roomId,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const removeFavoriteRoom = createAsyncThunk(
  'roomList/removeFavoriteRoom',
  async (_, thunkAPI) => {
    try {
      const res = await axios.delete('/room/favorite');
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const roomListSlice = createSlice({
  name: 'roomList',
  initialState,
  reducers: {
    resetRooms(state) {
      state.rooms = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchRoomList.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log('roomlist', payload);
      state.rooms = [...new Set([...payload.payload.findRoomList])];
      state.hasMore = payload.payload.findRoomList.length > 0;
    });
    builder.addCase(fetchRoomList.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(fetchRecentRooms.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchRecentRooms.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(fetchRecentRooms.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(updateRecentRooms.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(updateRecentRooms.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(updateRecentRooms.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(addFavoriteRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(addFavoriteRoom.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(addFavoriteRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(removeFavoriteRoom.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(removeFavoriteRoom.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(removeFavoriteRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(fetchFavoriteRooms.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchFavoriteRooms.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(fetchFavoriteRooms.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const { resetRooms } = roomListSlice.actions;

export default roomListSlice.reducer;
