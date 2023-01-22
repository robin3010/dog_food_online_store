import {
  useMemo,
  useContext, createContext, useEffect, useState,
} from 'react';
import { shopApi } from '../api/shopApi';

export const authTokenContext = createContext();

export function AuthTokenContextWr({ children }) {
  const [authToken, setAuthToken] = useState(() => {
    const authTokenFromLS = localStorage.getItem('LS_AUTH_TOKEN');
    // const initAuthToken = getAuthTokenLS || '';

    return authTokenFromLS;
  });

  useEffect(() => {
    localStorage.setItem('LS_AUTH_TOKEN', authToken);
    shopApi.setAuthToken(authToken);
    console.log({ authToken }, '>>>>>>>>>>>>>>', shopApi.authToken);
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken('');
  };

  const contextProps = useMemo(() => ({ authToken, login, logout }), [authToken]);

  return (
    <authTokenContext.Provider value={contextProps}>
      {children}
    </authTokenContext.Provider>
  );
}

export const useAuthTokenContext = () => useContext(authTokenContext);
