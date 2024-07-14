import { Navigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import React from 'react';

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <Component />;
};

export default ProtectedRoute;