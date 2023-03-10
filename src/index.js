import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import { ErrorPage } from './components/Pages/Error/Error';
import { Products } from './components/Pages/Products/Products';
import { Main } from './components/Pages/Main/Main';
import { Login } from './components/Pages/Login/Login';
import { SignIn } from './components/Pages/Login/SignIn';
import { SignUp } from './components/Pages/Login/SignUp';
import { Delivery } from './components/Pages/Delivery/Delivery';
import { Contacts } from './components/Pages/Contacts/Contacts';
import { store } from './redux/store';
import { Checkout } from './components/Pages/Checkout/Checkout';
import { Wishlist } from './components/Pages/Wishlist/Wishlist';
import { UserDetail } from './components/Pages/UserDetail/UserDetail';
import { ProductDetail } from './components/Pages/ProductDetail/ProductDetail';
import { ProductReviews } from './components/Pages/ProductDetail/ProductReviews/ProductReviews';
import { ProductDescription } from './components/Pages/ProductDetail/ProductDescription/ProductDescription';

const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetail />,
        children: [
          {
            index: true,
            element: <ProductDescription />,
          },
          {
            path: 'description',
            element: <ProductDescription />,
          },
          {
            path: 'reviews',
            element: <ProductReviews />,
          },
        ],
      },
      {
        path: 'delivery',
        element: <Delivery />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'user',
        element: <UserDetail />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'login/',
        element: <Login />,
        children: [
          {
            index: true,
            element: <SignIn />,
          },
          {
            path: 'signin',
            element: <SignIn />,
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
        ],
      },
    ],
  },
], {
  basename: '/dog_food_online_store',
});

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
      <Provider store={store}>
        <RouterProvider router={rootRouter} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
