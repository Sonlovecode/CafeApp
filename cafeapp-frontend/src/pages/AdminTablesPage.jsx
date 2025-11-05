import React, { useEffect, useState } from 'react';
import api from '../api';
import TableCard from '../components/TableCard';

export default function AdminTablesPage() {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState('');
  const [statusMap, setStatusMap] = useState({});

  const fetch = async () => {
    const res = await api.get('/tables');
    setTables(res.data || []);
  };
  useEffect(()=>{ fetch(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/tables', { name });
    setName(''); fetch();
  };

  const updateStatus = async (tableId, newStatus) => {
    try {
      await api.put(`/tables/${tableId}`, { status: newStatus });
      // refresh list
      fetch();
      setStatusMap(prev => ({ ...prev, [tableId]: newStatus }));
    } catch (err) {
      console.error('Error updating status', err);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  return (
    <div>
      <h2 className="page-title">Admin - Tables</h2>
      <form onSubmit={add} className="card mt-2" style={{display:'flex', gap:10, alignItems:'center'}}>
        <input className="input" placeholder="table name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="btn" style={{background:'#10b981'}}>Add Table</button>
      </form>

      <div className="grid grid-cols-4 mt-4">
        {tables.map(t => (
          <div key={t.id} style={{display:'flex', flexDirection:'column', gap:6}}>
            <TableCard table={t} />
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <select value={statusMap[t.id] ?? t.status} onChange={e=> setStatusMap(prev=>({ ...prev, [t.id]: e.target.value }))}>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="OCCUPIED">OCCUPIED</option>
                <option value="PAID">PAID</option>
              </select>
              <button className="btn" onClick={()=> updateStatus(t.id, statusMap[t.id] ?? t.status)}>Cập nhật</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}