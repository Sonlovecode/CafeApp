import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminTablesPage from './pages/AdminTablesPage';
import BookingPage from './pages/BookingPage';
import OrdersPage from './pages/OrdersPage';
import ReportPage from './pages/ReportPage';
import AdminDashboardPage from "./pages/AdminDashboardPage";

import './App.css'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-root">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/dashboard" element={<PrivateRoute roles={["ADMIN"]}><AdminDashboardPage /></PrivateRoute>} />

              <Route path="/booking" element={<PrivateRoute roles={["USER","ADMIN"]}><BookingPage /></PrivateRoute>} />

              <Route path="/admin/menu" element={<PrivateRoute roles={["ADMIN"]}><AdminMenuPage /></PrivateRoute>} />
              <Route path="/admin/tables" element={<PrivateRoute roles={["ADMIN"]}><AdminTablesPage /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute roles={["ADMIN"]}><OrdersPage /></PrivateRoute>} />
              <Route path="/report" element={<PrivateRoute roles={["ADMIN"]}><ReportPage /></PrivateRoute>} />

              <Route path="*" element={<div className="card center">Page not found</div>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}
