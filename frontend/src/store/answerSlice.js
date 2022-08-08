import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  answers: [],
  
  loading: false,
  success: false,
  error: false,
};

export const fetchAnswerList = createAsyncThunk(
  'answer/fetchAnswerList',
  async ({ questionId }, thunkAPI) => {
    try {
      const res = await axios.get(`/answer/list/${questionId}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// export const fetchAnswerDetail = createAsyncThunk(
//   'answer/fetchAnswerDetail',
//   async ({ answerId }, thunkAPI) => {
//     try {
//       const res = await axios.get(`/answer/list/${answerId}`);
//       const { data } = res;
//       return thunkAPI.fulfillWithValue(data);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   },
// );

export const createAnswer = createAsyncThunk(
  'answer/createAnswer',
  async ({ 
    questionId, roomId, email, content, language, code, 
  }, thunkAPI) => {
    try {
      const res = await axios.post('/answer', {
        questionId,
        roomId,
        answerWriterEmail: email,
        content,
        // title: '가짜',
        language,
        code,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const updateAnswer = createAsyncThunk(
  'answer/updateAnswer',
  async ({ 
    answerId, email, code, content, language,
  }, thunkAPI) => {
    try {
      const res = await axios.put('/answer', {
        answerId,
        email,
        code,
        content,
        language,
        // title: '가짜',
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const deleteAnswer = createAsyncThunk(
  'answer/deleteAnswer',
  async ({ 
    answerId, email,
  }, thunkAPI) => {
    try {
      const res = await axios.delete(`/answer/${answerId}/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnswerList.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.answers = [];
    });
    builder.addCase(fetchAnswerList.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.answers = [...payload.payload.findAnswerList];
    });
    builder.addCase(fetchAnswerList.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    // builder.addCase(fetchAnswerDetail.pending, (state) => {
    //   state.loading = true;
    //   state.success = false;
    //   state.error = false;
    // });
    // builder.addCase(fetchAnswerDetail.fulfilled, (state, payload) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.error = false;
    //   console.log(payload);
    // });
    // builder.addCase(fetchAnswerDetail.rejected, (state) => {
    //   state.loading = false;
    //   state.success = false;
    //   state.error = true;
    // });
    builder.addCase(createAnswer.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(createAnswer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(createAnswer.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(updateAnswer.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(updateAnswer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(updateAnswer.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(deleteAnswer.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(deleteAnswer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(deleteAnswer.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const getAnswers = (state) => state.answer.answers; 

export default answerSlice.reducer;
