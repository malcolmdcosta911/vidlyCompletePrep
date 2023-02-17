import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ children }) => {
    const user = auth.getCurrentUser();
    const location = useLocation();
    return (
        user ?
            children
            :
            <Navigate to="/login" state={{ from: location?.pathname }} />
    );
}

export default ProtectedRoute;