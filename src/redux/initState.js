import { STORE_SLICES } from './reduxUtils/webStorageKeys';

export const initState = {
  user: {},
  isSession: true,
  filters: {
    search: '',
    tagsCollection: [],
  },
  checkout: [],
  wishlist: [],
};

export const getInitState = () => {
  const getDataFromStorage = (keys) => {
    const sliceKeys = Object.keys(keys);

    return sliceKeys.reduce((acc, slice) => {
      let webStorage = localStorage;

      if (slice === 'user' && acc.isSession) {
        webStorage = sessionStorage;
      }
      const dataFromStorage = webStorage.getItem(keys[slice]);

      const initData = dataFromStorage
        ? JSON.parse(dataFromStorage)
        : initState[slice];

      acc[slice] = initData;

      return acc;
    }, {});
  };

  // const userDataFromStorage = webStorage.getItem(STORE_SLICES.user);
  // const initUserData = userDataFromStorage
  //   ? JSON.parse(userDataFromStorage)
  //   : initState.user;

  // const checkoutFromStorage = webStorage.getItem(STORE_SLICES.checkout);
  // const initCheckout = checkoutFromStorage
  //   ? JSON.parse(checkoutFromStorage)
  //   : initState.checkout;

  // console.log(Object.keys(initUserData).length);
  // if (Object.keys(initUserData).length) {
  //   shopApi.setAuthToken(initUserData.user.authToken);
  // }

  // return {
  //   user: initUserData,
  //   isSession: isSessionFromLS,
  //   checkout: initCheckout,
  // };

  return {
    ...getDataFromStorage(STORE_SLICES),
  };
};
