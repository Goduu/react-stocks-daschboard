import {  createSlice } from '@reduxjs/toolkit';

// import { fetchCount } from './counterAPI';

const initialState = {
  status: 'idle',
  token: undefined,
  user: ''
};

export const loginSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    removeToken: (state) => {
        state.token = undefined
      }
  },

});

export const { setStatus, setUser,setToken,removeToken } = loginSlice.actions;

export const selectStatus = (state) => state.grid.status;
export const selectUser = (state) => state.grid.user;
export const selectToken = (state) => state.grid.token;

export default loginSlice.reducer;
