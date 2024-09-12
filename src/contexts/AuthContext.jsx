import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  const authLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      localStorage.setItem('userAuth', JSON.stringify(response.user))
      localStorage.setItem('userRole', response.user.id_rol);
      setUserRole(response.user.id_rol);
      setIsAuthenticated(true);
      navigate('/');
      return response;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <AuthContext.Provider value={{ user, userRole, isAuthenticated, loading, logout, authLogin }}>
      {children}
    </AuthContext.Provider>
  );
};