import { shopApi } from '../api/shopApi';
import { IS_SESSION, STORE_SLICES } from './utils/webStorageKeys';

export const initState = {
  user: {},
  isSession: true,
  filters: {
    search: '',
    tagsCollection: [],
    tagsSelected: [],
  },
  goods: {
    list: [],
  },
  // cart: [],
};

export const getInitState = () => {
  const isSessionFromLS = !!JSON.parse(localStorage.getItem(IS_SESSION));
  console.log(isSessionFromLS);

  const webStorage = isSessionFromLS ? sessionStorage : localStorage;
  const userDataFromStorage = webStorage.getItem(STORE_SLICES.user);

  const initUserData = userDataFromStorage
    ? { user: JSON.parse(userDataFromStorage) }
    : initState.user;

  console.log(Object.keys(initUserData).length);
  if (Object.keys(initUserData).length) {
    shopApi.setAuthToken(initUserData.user.authToken);
  }

  return {
    ...initUserData,
    isSession: isSessionFromLS,
  };
};
