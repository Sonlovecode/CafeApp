import React, { useEffect, useState } from "react";
import axios from "../api/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading orders:", err));
  }, []);

  return (
    <div className="card">
      <h2>🧾 Quản lý Đơn hàng</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customerName}</td>
              <td>{o.totalAmount}đ</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
