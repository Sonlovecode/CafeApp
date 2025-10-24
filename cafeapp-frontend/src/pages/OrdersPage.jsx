import React, { useEffect, useState } from 'react';
import api from '../api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const fetch = async () => {
    const res = await api.get('/orders');
    setOrders(res.data || []);
  };
  useEffect(()=>{ fetch(); }, []);

  return (
    <div>
      <h2 className="page-title">Orders</h2>
      <div className="mt-4">
        {orders.map(o => (
          <div key={o.id} className="card mb-2">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div>Order #{o.id}</div><div className="small">Table: {o.table?.name}</div></div>
            <div className="muted">Total: {o.total}</div>
            <div className="muted">Status: {o.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}