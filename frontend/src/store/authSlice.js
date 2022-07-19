import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    // token: null,
  },
  // reducers: {
  // }
});

export default authSlice.reducer;
