import { configureStore } from '@reduxjs/toolkit';
import gridSlice from '../logged_in/components/grid/gridSlice';
import tableSlice from '../logged_in/components/grid/table/tableSlice';

export const store = configureStore({
  reducer: {
    grid: gridSlice,
    table: tableSlice
  },
});
