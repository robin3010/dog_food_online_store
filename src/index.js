import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorPage } from './components/Pages/Error/Error';
import { Products } from './components/Pages/Products/Products';
import { Main } from './components/Pages/Main/Main';
import { Login } from './components/Pages/Login/Login';
import { SignIn } from './components/Pages/Login/SignIn';
import { SignUp } from './components/Pages/Login/SignUp';

const rootRouter = createBrowserRouter(
  createRoutesFromElements(
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
  ),
);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rootRouter} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
