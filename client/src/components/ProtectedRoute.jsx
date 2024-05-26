import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Example token check, replace with your logic

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
