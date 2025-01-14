import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../../Store';

export default function ProtectedRoutes({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return userInfo ? children : <Navigate to="/login" />;
}
