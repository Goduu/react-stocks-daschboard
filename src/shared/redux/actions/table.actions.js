// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {  createSlice } from '@reduxjs/toolkit';
// // import { fetchCount } from './counterAPI';

export const CHANGE_HEADER = 'CHANGE_HEADER'
export const CHANGE_HEADER_TYPE = 'CHANGE_HEADER_TYPE'
export const CHANGE_HEADER_NAME = 'CHANGE_HEADER_NAME'
export const CHANGE_ROW = 'CHANGE_ROW'
export const ADD_ROW = 'ADD_ROW'

export const changeHeader = (value) => ({
  type: CHANGE_HEADER,
  payload: value
})

export const changeHeaderType = (value) => ({
  type: CHANGE_HEADER_TYPE,
  payload: value
})

export const changeHeaderName = (value) => ({
  type: CHANGE_HEADER_NAME,
  payload: value
})

export const changeRow = (value) => ({
  type: CHANGE_ROW,
  payload: value
})

export const addRow = () => ({
  type: ADD_ROW
})

// const initialState = {
  
//   rows: [],
//   rowNumber: 0,
//   status: 'idle',
// };


// export const tableSlice = createSlice({
//   name: 'table',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     changeHeader: (state, action) => {
//       state.headers = action.payload;
//     },
//     changeHeaderType: (state, action) => {
//       console.log("change header type", action.payload)
//       let field = action.payload.field
//       let headersTemp = state.headers
//       headersTemp.find(h => { return h.field === field }).type = action.payload.type
//       state.headers = headersTemp;
//     },
//     changeHeaderName: (state, action) => {
//       console.log("change header type", action.payload)
//       let field = action.payload.field
//       let headersTemp = state.headers
//       headersTemp.find(h => { return h.field === field }).headerName = action.payload.type
//       state.headers = headersTemp;
//     },
//     changeRow: (state, action) => {
//       console.log("change rows value", action.payload)
//       let id = action.payload.id
//       let field = action.payload.field
//       let rowsTemp = state.rows
//       rowsTemp.find(h => { return h.id === id })[field] = action.payload.props.value
//       state.rows = rowsTemp;
//     },
//     addRow: (state) => {
//       console.log("addrow")
//       state.rows
//       .push({
//         id: state.rowNumber + 1,
//         h1: '',
//         h2: '',
//         h3: ''
//       });
//       state.rowNumber += 1
//     },
//   },

// });

// export const { changeHeader, changeHeaderType,changeHeaderName,addRow,changeRow } = tableSlice.actions;

// export const selectHeader = (state) => state.table.headers;
// export const selectRows = (state) => state.table.rows;


// export default tableSlice.reducer;
