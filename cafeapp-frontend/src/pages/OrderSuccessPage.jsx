import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../api";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState(null);

  // 🔍 Lấy đơn hàng từ backend nếu chưa có
  useEffect(() => {
    if (!order && orderId) {
      const fetchOrder = async () => {
        try {
          const res = await api.get(`/orders/${orderId}`);
          console.log("📦 Dữ liệu đơn hàng:", res.data);
          setOrder(res.data);
        } catch (err) {
          console.error("❌ Lỗi tải đơn:", err);
          setError("Không thể tải đơn hàng từ server");
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    } else if (!orderId) {
      setError("Không có mã đơn hàng trong URL");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [orderId, order]);

  if (loading)
    return (
      <div className="card center">
        <h2>Đang tải đơn hàng...</h2>
      </div>
    );

  if (error || !order)
    return (
      <div className="card center">
        <h2>{error || "Không tìm thấy đơn hàng"}</h2>
        <button className="btn" onClick={() => navigate("/")}>
          ⬅ Quay về trang chủ
        </button>
      </div>
    );

// 🧾 Xử lý dữ liệu theo đúng backend Spring Boot
const items = order.items || [];
const tableName =
  order.table?.tableNumber
    ? `Bàn ${order.table.tableNumber}`
    : "Không xác định";
const total =
  order.totalAmount ||
  items.reduce((sum, i) => sum + (i.price || 0), 0);

  return (
    <div className="order-success-container">
      <div className="card center">
        <h2>🎉 Đặt món thành công!</h2>
        <p>
          <strong>Bàn:</strong> {tableName}
        </p>
        <p>
          <strong>Mã đơn:</strong> #{order.id}
        </p>

        <h3>📋 Món đã đặt</h3>
        {items.length === 0 ? (
          <p>Không có món nào trong đơn này.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.menuItem?.name || "Món không tên"} ×{" "}
                {item.quantity || 1} —{" "}
                {item.price ? `${item.price.toLocaleString()} đ` : ""}
              </li>
            ))}
          </ul>
        )}

        <h3>💰 Tổng cộng: {total.toLocaleString()} đ</h3>

        <button className="btn" onClick={() => navigate("/")}>
          ⬅ Quay lại menu
        </button>
      </div>
    </div>
  );
}
