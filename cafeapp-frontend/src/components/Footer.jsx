import React from "react";
import "./Footer.css"; // Nhớ import file CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Description */}
        <div className="footer-brand">
          <h2>☕ CafeApp</h2>
          <p>Nơi kết nối hương vị – Trải nghiệm không gian sang trọng.</p>

          {/* Social Icons */}
          <div className="footer-socials">
            <a href="#" className="social facebook">F</a>
            <a href="#" className="social instagram">I</a>
            <a href="#" className="social twitter">T</a>
            <a href="#" className="social linkedin">L</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Chính sách</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Liên hệ</h3>
          <p>📍 123 Đường Cafe, TP. Đà Nẵng</p>
          <p>📞 +84 123 456 789</p>
          <p>✉️ contact@cafeapp.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CafeApp. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
