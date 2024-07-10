import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/DashBoard';
import Settings from './Settings/Settings';
import MyBooks from './MyBooks';
import Profile from './profile/Profile';
import ProtectedRoute from './ProtectedRoute';
import Home from './dashboard/DashBoard'; // Supongo que Home es el componente Dashboard renombrado
import Login from "./Login";
import SignUp from "./SignUp";
import '../Style/Style.css';
import '../Style/Global.css';
import Detail from "./book/Detail";

export default function App() {
    return (
        <Routes>
            {/* Rutas protegidas que requieren autenticación */}
            <Route path="/Dashboard/*" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="mybooks" element={<MyBooks />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Otras rutas públicas que no requieren autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />

            {/* Ruta para ver detalles de un libro */}
            <Route path="/book/:bookId" element={<Detail userId={'tu_user_id_aqui'} />} />
        </Routes>
    );
}
