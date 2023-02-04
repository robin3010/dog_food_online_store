import { createSlice } from '@reduxjs/toolkit';
import { renameIdKey, withoutProperty } from '../../utils/utils';
import { initState } from '../initState';

export const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    login: {
      reducer(_, action) {
        console.log(action.payload);
        return action.payload;
      },
      prepare(apiUserData) {
        const withoutEmail = withoutProperty(apiUserData.data, 'email');
        const renamedIdKey = renameIdKey(withoutEmail);

        return {
          payload: {
            ...renamedIdKey,
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