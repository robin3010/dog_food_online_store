import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorPage } from './components/Pages/Error/Error';
import { Products } from './components/Pages/Products/Products';
import { Main } from './components/Pages/Main/Main';
import { Login } from './components/Pages/Login/Login';
import { SignIn } from './components/Pages/Login/SignIn';
import { SignUp } from './components/Pages/Login/SignUp';
import { UserDataContextWr } from './context/UserDataContext';

// const basename = { basename: '/dog_food_online_store' };
const basename = '';

const rootRouter = createBrowserRouter(createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
    errorElement={<ErrorPage />}
  >
    <Route index element={<Main />} />
    <Route
      path="products"
      element={<Products />}
    />
    <Route
      path="login/"
      element={<Login />}
    >
      <Route index element={<SignIn />} />
      <Route
        path="signin"
        element={<SignIn />}
      />
      <Route
        path="signup"
        element={<SignUp />}
      />
    </Route>
  </Route>,
), basename);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserDataContextWr>
        <RouterProvider router={rootRouter} />
      </UserDataContextWr>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
