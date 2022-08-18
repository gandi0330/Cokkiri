import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../api/axios';

const initialState = {
  questions: [],
  question: {},
  
  loading: false,
  success: false,
  error: false,
};

export const fetchQuestionList = createAsyncThunk(
  'question/fetchQuestionList',
  async ({ roomId }, thunkAPI) => {
    try {
      const res = await axios.get(`/question/list/${roomId}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchQuestionDetail = createAsyncThunk(
  'question/fetchQuestionDetail',
  async ({ questionId }, thunkAPI) => {
    try {
      const res = await axios.get(`/question/detail/${questionId}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async ({ 
    roomId, email, title, content, code, language,
  }, thunkAPI) => {
    try {
      const res = await axios.post('/question', {
        roomId, email, title, content, code, language,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateQuestion = createAsyncThunk(
  'question/updateQuestion',
  async ({ 
    questionId, email, title, content, code, language,
  }, thunkAPI) => {
    try {
      const res = await axios.put('/question', {
        questionId, email, title, content, code, language,
      });
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteQuestion = createAsyncThunk(
  'question/deleteQuestion',
  async ({ 
    questionId, email,
  }, thunkAPI) => {
    try {
      const res = await axios.delete(`/question/${questionId}/${email}`);
      const { data } = res;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestionList.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(fetchQuestionList.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.questions = [...payload.payload.findQuestionList];
    });
    builder.addCase(fetchQuestionList.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(fetchQuestionDetail.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.question = {};
    });
    builder.addCase(fetchQuestionDetail.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.question = { ...payload.payload };
    });
    builder.addCase(fetchQuestionDetail.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.question = {};
    });
    builder.addCase(createQuestion.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(createQuestion.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(createQuestion.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(updateQuestion.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(updateQuestion.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(updateQuestion.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log(payload);
    });
    builder.addCase(deleteQuestion.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const getQuestions = (state) => state.question.questions; 
export const getQuestion = (state) => state.question.question; 

export default questionSlice.reducer;
