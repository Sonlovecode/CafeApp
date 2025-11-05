import React, { useEffect, useState } from "react";
import api from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, occupiedTables: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchChart();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/orders/stats/today");
      setStats(res.data);
    } catch (err) {
      console.error("Lỗi khi tải thống kê:", err);
    }
  };

  const fetchChart = async () => {
    try {
      const res = await api.get("/orders/stats/week"); // bạn có thể thêm sau ở backend
      setChartData(res.data || []);
    } catch {
      // demo tạm thời
      setChartData([
        { day: "T2", revenue: 200000 },
        { day: "T3", revenue: 350000 },
        { day: "T4", revenue: 150000 },
        { day: "T5", revenue: 500000 },
        { day: "T6", revenue: 300000 },
        { day: "T7", revenue: 450000 },
        { day: "CN", revenue: 600000 },
      ]);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>📊 Thống kê quán Cafe</h1>

      <div className="stats-cards">
        <div className="card">
          <h3>☕ Đơn hàng hôm nay</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="card">
          <h3>💰 Doanh thu hôm nay</h3>
          <p>{stats.totalRevenue.toLocaleString()} đ</p>
        </div>
        <div className="card">
          <h3>🪑 Bàn đang có khách</h3>
          <p>{stats.occupiedTables}</p>
        </div>
      </div>

      <div className="chart-box">
        <h2>📅 Doanh thu 7 ngày gần nhất</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
