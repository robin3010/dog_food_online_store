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

  return {
    ...getDataFromStorage(STORE_SLICES),
  };
};
