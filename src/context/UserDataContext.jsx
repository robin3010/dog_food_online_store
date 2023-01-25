import {
  useMemo, useContext, createContext, useEffect, useState,
} from 'react';
import { shopApi } from '../api/shopApi';

const LS_KEYS = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  USER_DATA: 'USER_DATA',
  IS_SESSION: 'IS_SESSION',
};

export const userDataContext = createContext();

export function UserDataContextWr({ children }) {
  const [isSession, setIsSession] = useState(() => {
    const isSessionFromLS = JSON.parse(localStorage.getItem(LS_KEYS.IS_SESSION));

    return !!isSessionFromLS;
  });

  const [authToken, setAuthToken] = useState(() => {
    const authTokenFromStorage = !isSession
      ? localStorage.getItem(LS_KEYS.AUTH_TOKEN)
      : sessionStorage.getItem(LS_KEYS.AUTH_TOKEN);
    const initAuthToken = authTokenFromStorage || '';

    return initAuthToken;
  });

  const [userData, setUserData] = useState(() => {
    const userDataFromStorage = !isSession
      ? localStorage.getItem(LS_KEYS.USER_DATA)
      : sessionStorage.getItem(LS_KEYS.USER_DATA);
    const initUserData = userDataFromStorage ? JSON.parse(userDataFromStorage) : {};

    return initUserData;
  });

  useEffect(() => {
    if (!isSession) {
      localStorage.setItem(LS_KEYS.AUTH_TOKEN, authToken);
      localStorage.setItem(LS_KEYS.USER_DATA, JSON.stringify(userData));
    }
    if (isSession) {
      sessionStorage.setItem(LS_KEYS.AUTH_TOKEN, authToken);
      sessionStorage.setItem(LS_KEYS.USER_DATA, JSON.stringify(userData));
    }
    shopApi.setAuthToken(authToken);
  }, [authToken, userData]);

  const login = ({ token }, remember) => {
    setIsSession(!remember);
    localStorage.setItem(LS_KEYS.IS_SESSION, JSON.stringify(!remember));
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem(LS_KEYS.IS_SESSION);
    setUserData({});
    setAuthToken('');
  };

  const withoutProperty = (fullUserData, property) => {
    const { [property]: unused, ...rest } = fullUserData;

    return rest;
  };

  const renameUserDataKeys = ({ name: userName, _id: id, ...rest }) => ({
    userName,
    id,
    ...rest,
  });

  const contextProps = useMemo(
    () => ({
      authToken,
      userData,
      setUserData,
      login,
      logout,
      withoutProperty,
      renameUserDataKeys,
    }),
    [authToken, userData],
  );

  return (
    <userDataContext.Provider value={contextProps}>
      {children}
    </userDataContext.Provider>
  );
}

export const useUserDataContext = () => useContext(userDataContext);
