import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from "./Rutas/Login";
import SignUp from "./Rutas/SignUp";
import DashBoard from "./Rutas/DashBoard";
import ProtectedRoute from "./Rutas/ProtectedRoute";
import {AuthenticationProvider} from "./Authentication/AuthenticationProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/SignUp",
        element: <SignUp />,
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/DashBoard",
                element: <DashBoard />,
            },
        ],
    },

]);




const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);root.render(
  <React.StrictMode>
      <AuthenticationProvider>
          <RouterProvider router={router} />
      </AuthenticationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
