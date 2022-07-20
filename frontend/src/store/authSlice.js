import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isRequestedCertif: false,
    isCertificated: false,
    isSignedUp: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    reqCertificationNumber: (state) => {
      state.isRequestedCertif = true;
    },
    certificateNumber: (state, action) => {
      console.log(action.payload);
      state.isCertificated = true;
    },
    signup: (state, action) => {
      console.log(action.payload);
      state.isSignedUp = true;
    },
  },
});

export const {
  login, logout, reqCertificationNumber, certificateNumber, signup,
} = authSlice.actions;

export default authSlice.reducer;
