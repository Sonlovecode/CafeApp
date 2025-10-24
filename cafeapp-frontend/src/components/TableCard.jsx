import React from 'react';
import './TableCard.css';
export default function TableCard({ table, onSelect }) {
  const statusClass = table.status === 'AVAILABLE' ? 'table-available' : table.status === 'OCCUPIED' ? 'table-occupied' : '';
  return (
    <div className={`card table-card ${statusClass}`} onClick={() => onSelect && onSelect(table)}>
      <div className="title">{table.name}</div>
      <div className="muted">Status: {table.status}</div>
    </div>
  );
}