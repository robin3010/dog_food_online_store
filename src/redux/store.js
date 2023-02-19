import { configureStore } from '@reduxjs/toolkit';
import { STORE_SLICES } from './reduxUtils/webStorageKeys';
import { getInitState } from './initState';
import { filtersReducer } from './slices/filtersSlice';
import { isSessionReducer } from './slices/isSessionSlice';
import { userReducer } from './slices/userSlice';
import { checkoutReducer } from './slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    isSession: isSessionReducer,
    filters: filtersReducer,
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
};

store.subscribe(() => syncWebStorage(STORE_SLICES));
