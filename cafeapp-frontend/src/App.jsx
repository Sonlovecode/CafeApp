import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import BookingPage from "./pages/BookingPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminMenuPage from "./pages/AdminMenuPage";
import AdminTablesPage from "./pages/AdminTablesPage";
import ReportPage from "./pages/ReportPage";

import "./App.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-root">
          <Navbar />
          <main className="container">
            <Routes>
              {/* ====== KHÁCH HÀNG / NHÂN VIÊN ====== */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Đặt bàn & đặt món */}
              <Route
                path="/booking"
                element={
                  <PrivateRoute roles={["USER", "ADMIN"]}>
                    <BookingPage />
                  </PrivateRoute>
                }
              />

              {/* Trang xác nhận đơn hàng */}
              <Route
                path="/order-success"
                element={
                  <PrivateRoute roles={["USER", "ADMIN"]}>
                    <OrderSuccessPage />
                  </PrivateRoute>
                }
              />

              {/* ✅ Thêm đường dẫn có orderId để truy cập bằng URL */}
              <Route
                path="/order-success/:orderId"
                element={
                  <PrivateRoute roles={["USER", "ADMIN"]}>
                    <OrderSuccessPage />
                  </PrivateRoute>
                }
              />

              {/* ====== QUẢN TRỊ VIÊN ====== */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminDashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/menu"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminMenuPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/tables"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminTablesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <OrdersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <ReportPage />
                  </PrivateRoute>
                }
              />

              {/* ====== 404 ====== */}
              <Route
                path="*"
                element={
                  <div className="card center">
                    <h2>404 - Trang không tồn tại</h2>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
