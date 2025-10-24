import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">☕ CafeAdmin</h2>
        <nav>
          <Link to="/admin/dashboard" className="nav-link active">🏠 Tổng quan</Link>
          <Link to="/admin/menu" className="nav-link">🍽️ Quản lý Menu</Link>
          <Link to="/admin/tables" className="nav-link">🪑 Quản lý Bàn</Link>
          <Link to="/admin/orders" className="nav-link">🧾 Đơn hàng</Link>
          <Link to="/admin/users" className="nav-link">👥 Người dùng</Link>
          <Link to="/report" className="nav-link">📈 Báo cáo</Link>
        </nav>
      </aside>

      <main className="content">
        <h1>📊 Tổng quan hệ thống</h1>
        <p>Xin chào Admin, đây là bảng điều khiển quản lý quán cà phê.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>👥 Người dùng</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>🧾 Đơn hàng hôm nay</h3>
            <p>18</p>
          </div>
          <div className="stat-card">
            <h3>💰 Doanh thu</h3>
            <p>2.340.000 đ</p>
          </div>
          <div className="stat-card">
            <h3>🍽️ Món trong menu</h3>
            <p>12</p>
          </div>
        </div>
      </main>
    </div>
  );
}
