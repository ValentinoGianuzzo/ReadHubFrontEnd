import React from 'react';
import Toggle from '../Properties/Toggle';
import { useNavigate } from 'react-router-dom';
import '../Style/Style.css';
import '../Style/Global.css';

export default function Settings() {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/Dashboard'); // Redirige a la página de Dashboard al hacer clic en el botón
    };

    return (
        <div>
            <h1>Configuración</h1>
            <h2>Cambiar Tema</h2>
            <Toggle />
            <button onClick={handleGoToDashboard}>Ir a Dashboard</button> {/* Botón para ir a Dashboard */}
        </div>
    );
};
