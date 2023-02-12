import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../api/shopApi';
import { STORE_SLICES } from './reduxUtils/webStorageKeys';
import { getInitState } from './initState';
import { filtersReducer } from './slices/filtersSlice';
import { isSessionReducer } from './slices/isSessionSlice';
import { userReducer } from './slices/userSlice';
import { goodsReducer } from './slices/goodsSlice';
import { checkoutReducer } from './slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isSession: isSessionReducer,
    filters: filtersReducer,
    goods: goodsReducer,
    checkout: checkoutReducer,
  },
  preloadedState: getInitState(),
});

const syncWebStorage = (keys) => {
  const currentState = store.getState();
  const { isSession } = currentState;

  const sliceKeys = Object.keys(keys);

  sliceKeys.forEach((slice) => {
    let webStorage = window.localStorage;

    if (slice === 'user' && isSession) {
      webStorage = window.sessionStorage;
    }
    webStorage.setItem(keys[slice], JSON.stringify(currentState[slice]));
  });

  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<', { 'shopApi.authToken': shopApi.authToken });
  if (!shopApi.authToken) {
    shopApi.setAuthToken(currentState.user.authToken);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', { 'shopApi.authToken': shopApi.authToken });
  }
};

store.subscribe(() => syncWebStorage(STORE_SLICES));
