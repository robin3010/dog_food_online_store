import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const isSessionSlice = createSlice({
  name: 'isSession',
  initialState: initState.isSession,
  reducers: {
    updateValue(_, action) {
      return !action.payload;
    },
  },
});

export const { updateValue } = isSessionSlice.actions;

export const isSessionReducer = isSessionSlice.reducer;
