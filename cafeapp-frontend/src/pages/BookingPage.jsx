import React, { useEffect, useState } from "react";
import api from "../api";
import "./BookingPage.css";

export default function BookingPage() {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]); // 🆕 món đã đặt

  useEffect(() => {
    fetchData();
  }, []);

  // 🧭 Lấy dữ liệu bàn & menu
  const fetchData = async () => {
    try {
      const t = await api.get("/tables");
      const m = await api.get("/menu");
      setTables(t.data || []);
      setMenu(m.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  // 🧩 Chọn bàn → xem món đã đặt
  const handleSelectTable = async (table) => {
    setSelectedTable(table);
    setCart([]);
    try {
      const res = await api.get(`/orders/table/${table.id}`);
      setOrderedItems(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy món đã đặt:", err);
      setOrderedItems([]);
    }
  };

  // ➕ Thêm món vào giỏ
  const addToCart = (item) => {
    if (!selectedTable) {
      alert("⚠️ Vui lòng chọn bàn trước khi thêm món!");
      return;
    }

    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // ❌ Xóa món khỏi giỏ
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // 🧾 Đặt món
  const placeOrder = async () => {
    if (!selectedTable) return alert("Vui lòng chọn bàn trước khi đặt!");
    if (cart.length === 0) return alert("Giỏ hàng trống!");

    const orderPayload = {
      tableId: selectedTable.id,
      items: cart.map((c) => ({
        menuItemId: c.id,
        quantity: c.qty,
      })),
    };

    try {
      await api.post("/orders", orderPayload);
      alert("✅ Đặt món thành công!");
      setCart([]);
      handleSelectTable(selectedTable); // cập nhật lại món đã đặt
      fetchData();
    } catch (err) {
      alert("❌ Lỗi khi đặt món!");
      console.error(err);
    }
  };

  // 💵 Thanh toán
  const handlePay = async () => {
    if (!selectedTable) return alert("Chưa chọn bàn!");
    if (
      !window.confirm(`Xác nhận thanh toán cho ${selectedTable.name}?`)
    )
      return;
    try {
      await api.post(`/orders/pay/${selectedTable.id}`);
      alert("💰 Thanh toán thành công!");
      setSelectedTable(null);
      setOrderedItems([]);
      fetchData();
    } catch (err) {
      alert("❌ Lỗi khi thanh toán!");
      console.error(err);
    }
  };

  const total = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  return (
    <div className="booking-page">
      <h1 className="title">☕ Cafe App</h1>
      <p className="subtitle">Nơi hương vị hòa quyện cùng cảm xúc</p>

      {/* --- Danh sách bàn --- */}
      <section>
        <h2>Danh sách bàn</h2>
        <div className="table-list">
          {tables.map((t, index) => (
            <div
              key={t.id}
              className={`table-card ${
                selectedTable?.id === t.id ? "selected" : ""
              } ${t.status === "AVAILABLE" ? "available" : "occupied"}`}
              onClick={() => handleSelectTable(t)}
            >
              <h4>{t.name || `Bàn ${index + 1}`}</h4>
              <p className="status-text">
                {t.status === "AVAILABLE" ? "Trống" : "Đã đặt"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Món đã đặt của bàn --- */}
      {selectedTable && (
        <section>
          <h2>
            Món đã đặt của <span className="highlight">{selectedTable.name}</span>
          </h2>
          {orderedItems.length === 0 ? (
            <p>Chưa có món nào được đặt cho bàn này.</p>
          ) : (
            orderedItems.map((order) => (
              <div key={order.id} className="order-item">
                <h4>Đơn #{order.id}</h4>
                {order.items?.map((item) => (
                  <div key={item.menuItemId}>
                    {item.menuItemName} x{item.quantity}
                  </div>
                ))}
              </div>
            ))
          )}
          {orderedItems.length > 0 && (
            <button className="btn-pay" onClick={handlePay}>
              💵 Thanh toán
            </button>
          )}
        </section>
      )}

      {/* --- Thực đơn --- */}
      <section>
        <h2>Thực đơn</h2>
        <div className="menu-list">
          {menu.map((m) => (
            <div key={m.id} className="menu-card">
              <img
                src={
                  m.imageUrl ||
                  "https://via.placeholder.com/150x100.png?text=No+Image"
                }
                alt={m.name}
              />
              <h4>{m.name}</h4>
              <p>{m.price} đ</p>
              <button onClick={() => addToCart(m)}>+ Thêm</button>
            </div>
          ))}
        </div>
      </section>

      {/* --- Giỏ hàng --- */}
      <section>
        <h2>Giỏ hàng</h2>
        {cart.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <div className="cart">
            {cart.map((c) => (
              <div key={c.id} className="cart-item">
                <span>
                  {c.name} x{c.qty}
                </span>
                <span>{c.price * c.qty} đ</span>
                <button onClick={() => removeFromCart(c.id)}>✕</button>
              </div>
            ))}
            <h3>Tổng cộng: {total} đ</h3>
            <button className="btn-order" onClick={placeOrder}>
              ✅ Đặt món
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
