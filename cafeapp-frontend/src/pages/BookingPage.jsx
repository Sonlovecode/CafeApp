import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./BookingPage.css";

export default function BookingPage() {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [totalPay, setTotalPay] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [t, m] = await Promise.all([api.get("/tables"), api.get("/menu")]);
      setTables(t.data || []);
      setMenu(m.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const handleSelectTable = async (table) => {
    setSelectedTable(table);
    setCart([]);
    try {
      const res = await api.get(`/orders/table/${table.id}`);
      const data = res.data;

      if (data && !Array.isArray(data)) setOrderedItems([data]);
      else if (Array.isArray(data)) setOrderedItems(data);
      else setOrderedItems([]);
    } catch (err) {
      console.error("Lỗi khi lấy món đã đặt:", err);
      setOrderedItems([]);
    }
  };

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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

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
      const res = await api.post("/orders", orderPayload);
      const createdOrder = res.data;

      if (createdOrder) {
        alert("✅ Đặt món thành công!");
        setCart([]);
        await handleSelectTable(selectedTable);
        await fetchData();

        navigate(`/order-success/${createdOrder.id}`, {
          state: { order: createdOrder },
        });
      }
    } catch (err) {
      alert("❌ Lỗi khi đặt món!");
      console.error(err);
    }
  };

  // 💵 Thanh toán (hiển thị mã QR)
  const handlePay = async () => {
    if (!selectedTable) return alert("Chưa chọn bàn!");

    // ✅ tính tổng tiền đơn hiện tại
    const total =
      orderedItems.flatMap((o) => o.items || []).reduce((sum, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0) || 0;

    setTotalPay(total);
    setShowQR(true); // mở popup QR
  };

  const confirmPayment = async () => {
    try {
      await api.post(`/orders/pay/${selectedTable.id}`);
      alert("💰 Thanh toán thành công!");
      setShowQR(false);
      setSelectedTable(null);
      setOrderedItems([]);
      await fetchData();
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
              key={t.id ?? `table-${index}`}
              className={`table-card ${
                selectedTable?.id === t.id ? "selected" : ""
              } ${t.status === "AVAILABLE" ? "available" : "occupied"}`}
              onClick={() => handleSelectTable(t)}
            >
              <h4>{t.name || `Bàn ${t.tableNumber || index + 1}`}</h4>
              <p className="status-text">
                {t.status === "AVAILABLE" ? "Trống" : "Đã đặt"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Món đã đặt --- */}
      {selectedTable && (
        <section>
          <h2>
            Món đã đặt của{" "}
            <span className="highlight">
              {selectedTable.name || `Bàn ${selectedTable.tableNumber}`}
            </span>
          </h2>

          {orderedItems.length === 0 ? (
            <p>Chưa có món nào được đặt cho bàn này.</p>
          ) : (
            orderedItems.map((order) => (
              <div key={order.id} className="order-item">
                <h4>Đơn #{order.id}</h4>
                {order.items?.map((item, iidx) => (
                  <div key={iidx}>
                    {/* ✅ Sửa: Hiển thị tên món đúng từ item.menuItem.name */}
                    {item.menuItem?.name || "Không rõ món"} × {item.quantity} —{" "}
                    {item.price?.toLocaleString()} đ
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

      {/* --- QR Modal --- */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <h2>🔍 Quét mã để thanh toán</h2>
            <img
              src="https://qrcode-gen.com/images/qrcode-default.png"
              alt="QR Code"
              className="qr-image"
            />
            <p className="amount">💰 Số tiền: {totalPay.toLocaleString()} đ</p>
            <button className="btn-ok" onClick={confirmPayment}>
              ✅ Đã thanh toán
            </button>
          </div>
        </div>
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
              <p>{m.price.toLocaleString()} đ</p>
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
                  {c.name} × {c.qty}
                </span>
                <span>{(c.price * c.qty).toLocaleString()} đ</span>
                <button onClick={() => removeFromCart(c.id)}>✕</button>
              </div>
            ))}
            <h3>Tổng cộng: {total.toLocaleString()} đ</h3>
            <button className="btn-order" onClick={placeOrder}>
              ✅ Đặt món
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
