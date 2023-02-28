import { createSlice } from '@reduxjs/toolkit';
import { renameIdKey } from '../../utils/utils';
import { initState } from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    login(_, action) {
      return {
        ...renameIdKey(action.payload.data),
        authToken: action.payload.token,
      };
    },
    setUserInfo(state, action) {
      return {
        ...state,
        ...renameIdKey(action.payload),
      };
    },
    logout() {
      return initState.user;
    },
  },
});

export const { login, setUserInfo, logout } = userSlice.actions;

export const getUserDataSelector = (state) => state.user;
export const getAuthTokenSelector = (state) => state.user.authToken;

export const userReducer = userSlice.reducer;
