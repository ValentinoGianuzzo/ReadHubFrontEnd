import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    // Cargar los datos del usuario a la pagina
    useEffect(() => {
        getUserData();
    }, []);


    const getUserData = async () => {
        try {
            // Llamada a la API para obtener los datos del usuario
            const response = await  fetch("http://localhost:8080/user/getUser", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                console.error('Error al obtener los datos del usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    const handleModifyPassword = async () => {
        try {
            // Llamada a la API para modificar la contraseña
            const response = await fetch('http://localhost:8080/auth/changePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ newPassword: userData.password })
            });
            if (response.ok) {
                setIsEditMode(false);
                console.log('Contraseña modificada exitosamente');
            } else {
                console.error('Error al modificar la contraseña:', response.statusText);
            }
        } catch (error) {
            console.error('Error al modificar la contraseña:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            // Llamada a la API para borrar al usuario
            const response = await fetch('http://localhost:8080/user/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                console.log('Usuario eliminado exitosamente');
                window.location.href = '/signup'; // Redirección a SignUp después de borrar el usuario
            } else {
                console.error('Error al eliminar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const handleEditPassword = () => {
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    return (
        <div className="Account Settings">
            <h2>Account Settings</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" value={userData.firstName} disabled />
            </div>
            <div>
                <label>Apellido:</label>
                <input type="text" value={userData.lastName} disabled />
            </div>
            <div>
                <label>Correo electrónico:</label>
                <input type="text" value={userData.email} disabled />
            </div>
            <div>
                <label>Contraseña:</label>
                {isEditMode ? (
                    <input
                        type="password"
                        value={userData.password} disabled
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                ) : (
                    <input type="password" value={userData.password} readOnly />
                )}
            </div>
            <div>
                {isEditMode ? (
                    <>
                        <button onClick={handleModifyPassword}>Guardar Cambios</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                ) : (
                    <button onClick={handleEditPassword}>Modificar Contraseña</button>
                )}
                <button onClick={handleDeleteUser}>Borrar Usuario</button>
            </div>
            <Link to="/dashboard">Volver a Dashboard</Link>
        </div>
    );
};

export default Settings;
