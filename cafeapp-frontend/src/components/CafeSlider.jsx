// src/components/CafeSlider.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9"
];

export default function CafeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative w-full h-56 md:h-72 overflow-hidden rounded-2xl shadow-lg mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        key={index}
        src={images[index]}
        alt="Cafe"
        className="absolute w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-wide">☕ CafeApp – Thưởng thức vị đậm đà</h2>
      </div>
    </motion.div>
  );
}
