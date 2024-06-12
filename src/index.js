import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store, persistor } from './state/store';
import { PersistGate } from 'redux-persist/integration/react'

import Nav from './components/nav';
import Footer from './components/footer';
import Home from './routes/home';
import Add from './routes/add';
import View from './routes/view';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './custom.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/add',
    element: <Add/>,
  },
  {
    path: '/edit/:id',
    element: <Add/>
  },
  {
    path: '/view/:id',
    element: <View/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
