import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

export const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    login: {
      reducer(state, action) {
        console.log(action.payload);
        return action.payload;
      },
      prepare(apiUserData) {
        return {
          payload: {
            ...apiUserData.data,
            authToken: apiUserData.token,
          },
        };
      },
    },
    logout() {
      return initState.user;
    },
  },
});

export const { login, logout } = userSlice.actions;

// export const getAuthTokenSelector = (state) => state.user.authToken;

export const getUserDataSelector = (state) => state.user;

export const userReducer = userSlice.reducer;
