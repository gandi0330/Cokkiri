import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  rooms: [],
  recentRooms: [],
  favoriteRooms: [],
  // pageNumber: 0,
  pageNumber: -1,

  loading: false,
  success: false,
  error: false,
  hasMore: false,
};

export const fetchRoomList = createAsyncThunk(
  'roomList/fetchRoomList',
  async ({ 
    // offset, limit, keyword,
    cursor, limit, keyword,
  }, thunkAPI) => {
    try {
      const res = await axios.get('/room/list', {
        params: {
          cursor,
          // offset, 
          limit,
          keyword,
        },
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
  async ({ id }, thunkAPI) => {
    try {
      const res = await axios.delete(`/room/favorite/${id}`);
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
    resetPageNumber(state) {
      // state.pageNumber = 0;
      state.pageNumber = -1;
    },
    incrementPageNumber(state, action) {
      state.pageNumber += action.payload.lastItemIdx;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.pending, (state) => {
      state.loading = true;
      if (!state.hasMore) state.loading = false;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchRoomList.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      if (payload.meta.keyword === '' && payload.payload.findRoomList?.length > 0) {
        state.rooms = [...new Set([...state.rooms, ...payload.payload.findRoomList])];
      } 
      if (payload.meta.keyword !== '' && payload.payload.findRoomList?.length > 0) {
        if (payload.meta.offset === 0) {
          state.rooms = [...new Set([...payload.payload.findRoomList])];
        } else {
          state.rooms = [...new Set([...state.rooms, ...payload.payload.findRoomList])];
        }
      }
      state.hasMore = payload === '';
    });
    builder.addCase(fetchRoomList.rejected, (state, payload) => {
      if (payload.error?.message !== 'Aborted') {      
        state.loading = false;
        state.success = false;
        state.error = true;
      }
      
      if (payload.error?.message !== 'Aborted') {
        state.loading = false;
        state.success = false;
        state.error = false;
      }
    });
    builder.addCase(fetchRecentRooms.pending, (state) => {
      // state.loading = true;
      state.loading = false;
      state.success = false;
      state.error = false;
      state.recentRooms = [];
    });
    builder.addCase(fetchRecentRooms.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.recentRooms = [...payload.payload.findRecentRoomList];
    });
    builder.addCase(fetchRecentRooms.rejected, (state, payload) => {
      state.loading = false;
      state.success = false;
      if (payload.payload.statusCode === 404) {
        state.error = false;
      } else {
        state.error = true;
      }
      state.recentRooms = [];
    });
    builder.addCase(updateRecentRooms.pending, (state) => {
      state.loading = false;
      // state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(updateRecentRooms.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(updateRecentRooms.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(fetchFavoriteRooms.pending, (state) => {
      state.loading = false;
      // state.loading = true;
      state.success = false;
      state.error = false;
      state.favoriteRooms = [];
    });
    builder.addCase(fetchFavoriteRooms.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.favoriteRooms = [...payload.payload.userLikeRoomList];
    });
    builder.addCase(fetchFavoriteRooms.rejected, (state, payload) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.favoriteRooms = [];
      if (payload.payload.statusCode === 404) {
        state.error = false;
      } else {
        state.error = true;
      }
    });
    builder.addCase(addFavoriteRoom.pending, (state) => {
      state.loading = false;
      // state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(addFavoriteRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(addFavoriteRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(removeFavoriteRoom.pending, (state) => {
      state.loading = false;
      // state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(removeFavoriteRoom.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(removeFavoriteRoom.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const { resetRooms, incrementPageNumber, resetPageNumber } = roomListSlice.actions;

export const getPageNumber = (state) => state.roomList.pageNumber;
export const getRecentRooms = (state) => state.roomList.recentRooms;
export const getFavoriteRooms = (state) => state.roomList.favoriteRooms;

export default roomListSlice.reducer;
