import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access-token'); 
  
  if (!token) {
    console.log("please log in")
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;
