import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;