import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const isSessionSlice = createSlice({
  name: 'isSession',
  initialState: initState.isSession,
  reducers: {
    setIsSession(_, action) {
      return !action.payload;
    },
  },
});

export const { setIsSession } = isSessionSlice.actions;

export const isSessionReducer = isSessionSlice.reducer;
