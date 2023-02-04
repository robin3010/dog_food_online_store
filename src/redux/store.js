import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../api/shopApi';
import { IS_SESSION, STORE_SLICES } from '../utils/webStorageKeys';
import { getInitState } from './initState';
import { isSessionReducer } from './slices/isSessionSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isSession: isSessionReducer,
  },
  preloadedState: getInitState(),
});

const syncWebStorage = () => {
  const currentState = store.getState();

  const { isSession } = currentState;

  const webStorage = isSession
    ? window.sessionStorage
    : window.localStorage;

  Object.keys(currentState).forEach((slice) => {
    if (slice !== 'isSession') {
      webStorage.setItem(STORE_SLICES[slice], JSON.stringify(currentState[slice]));
    }
  });
  window.localStorage.setItem(IS_SESSION, JSON.stringify(isSession));

  shopApi.setAuthToken(currentState.user.authToken);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', shopApi.authToken);
};

store.subscribe(syncWebStorage);
