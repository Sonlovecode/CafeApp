// src/components/MenuItemCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function MenuItemCard({ item, onAdd }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
      onClick={() => onAdd(item)}
    >
      <div className="font-medium text-gray-800">{item.name}</div>
      <div className="text-sm text-gray-500 mb-1">{item.category}</div>
      <div className="text-rose-500 font-semibold">{item.price} đ</div>
      <button className="mt-auto bg-indigo-500 hover:bg-indigo-600 text-white py-1 rounded-lg text-sm mt-2">
        + Thêm
      </button>
    </motion.div>
  );
}
