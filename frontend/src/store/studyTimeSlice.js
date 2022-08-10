import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  totalTime: 0, // 누적 시간 (second)

  loading: false,
  success: false,
  error: false,
};

export const fetchStudyTime = createAsyncThunk(
  'studyTime/fetchStudyTime',
  async ({ 
    email, startDatetime, endDatetime,
  }, thunkAPI) => {
    try {
      const res = await axios.get(`/studytime/${email}`, {
        params: {
          startDatetime,
          endDatetime,
        },
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const studyTimeSlice = createSlice({
  name: 'studyTime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudyTime.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchStudyTime.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(fetchStudyTime.rejected, (state, payload) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      // console.log(payload);
      if (payload.payload.statusCode === 404) {
        state.studytimes = [];
        state.error = false;
      }
    });
  },
});

export const getTotalTime = (state) => state.studyTime.totalTime;

export default studyTimeSlice.reducer;
