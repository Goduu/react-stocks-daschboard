// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  headers: [
    { field: 'h1', headerName: 'headStr', flex: 1, type: 'string', editable: true },
    { field: 'h2', headerName: 'headNum', flex: 1, type: 'number', editable: true },
    {
      field: 'h3',
      headerName: 'headDate',
      type: 'date',
      width: 180,
      editable: true,
    },
  ],
  rows: [],
  rowNumber: 0,
  status: 'idle',
};


export const tableSlice = createSlice({
  name: 'table',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeHeader: (state, action) => {
      state.headers = action.payload;
    },
    changeHeaderType: (state, action) => {
      let field = action.payload.field
      let headersTemp = state.headers
      headersTemp.find(h => { return h.field === field }).type = action.payload.type
      state.headers = headersTemp;
    },
    changeHeaderName: (state, action) => {
      let field = action.payload.field
      let headersTemp = state.headers
      headersTemp.find(h => { return h.field === field }).headerName = action.payload.type
      state.headers = headersTemp;
    },
    changeRow: (state, action) => {
      let id = action.payload.id
      let field = action.payload.field
      let rowsTemp = state.rows
      rowsTemp.find(h => { return h.id === id })[field] = action.payload.props.value
      state.rows = rowsTemp;
    },
    addRow: (state) => {
      state.rows
      .push({
        id: state.rowNumber + 1,
        h1: '',
        h2: '',
        h3: ''
      });
      state.rowNumber += 1
    },
  },

});

export const { changeHeader, changeHeaderType,changeHeaderName,addRow,changeRow } = tableSlice.actions;

export const selectHeader = (state) => state.table.headers;
export const selectRows = (state) => state.table.rows;


export default tableSlice.reducer;
