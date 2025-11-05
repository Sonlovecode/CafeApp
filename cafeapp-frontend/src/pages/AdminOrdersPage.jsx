import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const STATUS_OPTIONS = [
    "RECEIVED",
    "PREPARING",
    "SERVED",
    "PAID",
    "CANCELLED",
  ];

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading orders:", err));
  }, []);

  const reload = () => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading orders:", err));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // assume backend supports PUT /orders/:id with { status }
      await api.put(`/orders/${orderId}`, { status: newStatus });
      reload();
      alert('Cập nhật trạng thái thành công');
    } catch (err) {
      console.error('Failed to update order status', err);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const markPaid = async (order) => {
    try {
      // try an order-pay endpoint; some backends expect tableId, some orderId
      // try order id first
      await api.post(`/orders/pay/${order.id}`);
      reload();
      alert('Đã đánh dấu đã thanh toán');
    } catch (err) {
      console.warn('pay by orderId failed, trying by tableId', err);
      try {
        if (order.tableId) {
          await api.post(`/orders/pay/${order.tableId}`);
          reload();
          alert('Đã đánh dấu đã thanh toán (theo bàn)');
          return;
        }
      } catch (e2) {
        console.error('Failed to mark paid by tableId', e2);
      }
      alert('Không thể đánh dấu đã thanh toán. Kiểm tra API backend.');
    }
  };

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
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customerName}</td>
              <td>{o.totalAmount}đ</td>
              <td>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <div>{o.status}</div>
                </div>
              </td>
              <td>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <select value={statusMap[o.id] ?? o.status} onChange={e=> setStatusMap(prev=>({ ...prev, [o.id]: e.target.value }))}>
                    {STATUS_OPTIONS.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button className="btn" onClick={()=> updateOrderStatus(o.id, statusMap[o.id] ?? o.status)}>Cập nhật</button>
                  <button className="btn" onClick={()=> markPaid(o)}>Mark Paid</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
