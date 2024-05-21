import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Login from "./Rutas/Login";
import SignUp from "./Rutas/SignUp";
import DashBoard from "./Rutas/dashboard/DashBoard";
import ProtectedRoute from "./Rutas/ProtectedRoute";
import Settings from "./Rutas/Settings";
import MyBooks from "./Rutas/MyBooks";
import Profile from "./Rutas/profile/Profile";
import './Style/Style.css';
import './Style/Global.css';
import Detail from "./Rutas/book/Detail";

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
        path: "/Profile",
        element: <Profile/>,
    },
    {
        path: "/Settings",
        element: <Settings />,
    },
    {
        path: "/MyBooks",
        element: <MyBooks />,
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/DashBoard",
                element: <DashBoard />,
            },
            {
                path: "/book/:bookId",
                element: <Detail/>,
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
