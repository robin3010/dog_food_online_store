import { createSlice } from '@reduxjs/toolkit';
import { renameIdKey, withoutProperty } from '../reduxUtils/reduxUtils';
import { initState } from '../initState';

const userSlice = createSlice({
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

export const getUserDataSelector = (state) => state.user;
export const getAuthTokenSelector = (state) => state.user.authToken;

export const userReducer = userSlice.reducer;
