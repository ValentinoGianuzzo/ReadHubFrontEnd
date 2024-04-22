import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getUserData = async () => {
    // Asumiendo que tienes una forma de obtener el token de autenticación del usuario logeado
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/v1/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Asegúrate de que tu backend espera el token de esta manera
        }
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        console.error('Error al obtener los datos del usuario:', response.statusText);
    }
};

export default function Profile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            setUserData(user);
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Asegúrate de incluir el token de autenticación aquí
            },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            setIsEditMode(false);
            // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        } else {
            console.error('Error al actualizar los datos del usuario:', response.statusText);
        }
    };

    const handleDeleteUser = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Asegúrate de incluir el token de autenticación aquí
            }
        });
        if (response.ok) {
            // Redirigir al usuario a la página de registro
            <Link to="/signup" />;
            // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        } else {
            console.error('Error al eliminar el usuario:', response.statusText);
        }
    };


    return (
        <div className="Profile">
            <h2>Profile</h2>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} disabled={!isEditMode} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} disabled={!isEditMode} />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input type="text" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} disabled={!isEditMode} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} disabled={!isEditMode} />
                </div>
                {isEditMode ? (
                    <button type="button" onClick={handleSave}>Guardar cambios</button>
                ) : (
                    <button type="button" onClick={() => setIsEditMode(true)}>Modificar Datos</button>
                )}
            </form>
            <div className="delete-user">
                <button onClick={() => setShowConfirmModal(true)}>Delete User</button>
                {showConfirmModal && (
                    <div className="confirm-modal">
                        <p>¿Estás seguro?</p>
                        <button onClick={handleDeleteUser}>Sí</button>
                        <button onClick={() => setShowConfirmModal(false)}>No</button>
                    </div>
                )}
            </div>
            <Link to="/Dashboard">Volver a Dashboard</Link>
        </div>
    );
}
