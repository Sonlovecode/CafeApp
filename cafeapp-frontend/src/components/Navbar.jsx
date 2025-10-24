import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="app-navbar">
      <div className="nav-left">
        <Link to="/" className="brand">CafeApp</Link>
        <Link to="/booking" className="nav-link">Booking</Link>
        {user && user.role === 'ADMIN' && <Link to="/admin/menu" className="nav-link">Admin</Link>}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <div className="small" style={{color:'#e6eefc'}}>{user.username} <span style={{opacity:0.8}}>({user.role})</span></div>
            <button onClick={logout} className="btn btn-danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}