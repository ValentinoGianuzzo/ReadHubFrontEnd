import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/DashBoard';
import Profile from './profile/Profile';
import MyBooks from './MyBooks';
import Settings from './Settings';
import ProtectedRoute from './ProtectedRoute';
import Home from './dashboard/DashBoard';
import Login from "./Login";
import SignUp from "./SignUp";
import '../Style/Style.css';
import '../Style/Global.css';
import Detail from "./book/Detail";

export default function App() {
    return (
        <Routes>
            {/* Utiliza ProtectedRoute para proteger la ruta de Dashboard */}
            <Route path="/Dashboard" element={<ProtectedRoute />}>
                {/* Estas rutas estarán protegidas por ProtectedRoute */}
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="mybooks" element={<MyBooks />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            {/* Otras rutas públicas que no requieren autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/book/:bookId" element={<Detail />} />
        </Routes>
    );
}
