import React, { useEffect, useState } from "react";
import api from "../api";
import "./AdminMenuPage.css";

export default function AdminMenuPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setItems(res.data || []);
    } catch (err) {
      console.error("Lỗi khi tải menu:", err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("⚠️ Nhập đầy đủ tên và giá món!");
      return;
    }
    try {
      await api.post("/menu", {
        name,
        price: Number(price),
        imageUrl,
      });
      setName("");
      setPrice("");
      setImageUrl("");
      setShowForm(false);
      fetchMenu();
      alert("✅ Thêm món thành công!");
    } catch (err) {
      alert("❌ Lỗi khi thêm món!");
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Bạn chắc muốn xóa món này?")) return;
    try {
      await api.delete(`/menu/${id}`);
      fetchMenu();
      alert("🗑️ Đã xóa món!");
    } catch (err) {
      alert("❌ Lỗi khi xóa!");
      console.error(err);
    }
  };

  return (
    <div className="admin-menu-page">
      <div className="header">
        <h1>🍽️ Quản lý Menu</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Đóng" : "+ Thêm món mới"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addItem} className="menu-form">
          <input
            type="text"
            placeholder="Tên món..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Giá..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ảnh (URL)..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit">Lưu</button>
        </form>
      )}

      <div className="menu-grid">
        {items.map((it) => (
          <div className="menu-card" key={it.id}>
            <img
              src={
                it.imageUrl ||
                "https://via.placeholder.com/150x100.png?text=No+Image"
              }
              alt={it.name}
            />
            <div className="menu-info">
              <h3>{it.name}</h3>
              <p>{it.price} đ</p>
            </div>
            <button className="btn-delete" onClick={() => deleteItem(it.id)}>
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
