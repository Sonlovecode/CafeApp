import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-title"
        >
          ☕ Chào mừng đến với <span>CafeApp</span>
        </motion.h1>
        <p className="hero-subtitle">
          Trải nghiệm không gian cafe hiện đại, đặt bàn nhanh chóng và quản lý tiện lợi.
        </p>
      </section>

      {/* SLIDER SECTION */}
      <section className="slider-container">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          <div>
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80" alt="Cafe view 1" />
            <p className="legend">Không gian sang trọng</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" alt="Cafe view 2" />
            <p className="legend">Menu đa dạng - Hương vị đậm đà</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" alt="Cafe view 3" />
            <p className="legend">Phục vụ tận tâm, chuyên nghiệp</p>
          </div>
        </Carousel>
      </section>

      {/* INFO SECTION */}
      <section className="info">
        <h2>☕ Dịch vụ nổi bật</h2>
        <div className="info-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            <h3>📋 Quản lý menu</h3>
            <p>Admin có thể thêm, chỉnh sửa và quản lý món trong quán.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            <h3>🪑 Quản lý bàn</h3>
            <p>Tạo và theo dõi tình trạng bàn: trống, có khách, đã thanh toán.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            <h3>🧾 Đặt món nhanh</h3>
            <p>Khách có thể đặt bàn và chọn món trực tuyến dễ dàng.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
