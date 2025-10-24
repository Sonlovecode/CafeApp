import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handler = () => {
      const s = localStorage.getItem('user');
      setUser(s ? JSON.parse(s) : null);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // login expects backend -> { token, role, username }
  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const { token, role, username: uname } = res.data;
      const userInfo = { username: uname, role };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      return userInfo;
    } catch (err) {
      // normalize error so pages can show message
      const message = err.response?.data?.error || err.response?.data?.message || 'Login failed';
      const e = new Error(message);
      e._response = err.response;
      throw e;
    }
  };

  // register -> backend returns { msg: 'registered' } or { error: ... }
  const register = async (username, password) => {
    try {
      const res = await api.post('/auth/register', { username, password });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Register failed';
      const e = new Error(message);
      e._response = err.response;
      throw e;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}