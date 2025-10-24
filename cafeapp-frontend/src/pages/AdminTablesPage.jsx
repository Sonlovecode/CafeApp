import React, { useEffect, useState } from 'react';
import api from '../api';
import TableCard from '../components/TableCard';

export default function AdminTablesPage() {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState('');

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

  return (
    <div>
      <h2 className="page-title">Admin - Tables</h2>
      <form onSubmit={add} className="card mt-2" style={{display:'flex', gap:10, alignItems:'center'}}>
        <input className="input" placeholder="table name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="btn" style={{background:'#10b981'}}>Add Table</button>
      </form>

      <div className="grid grid-cols-4 mt-4">
        {tables.map(t => <TableCard key={t.id} table={t} />)}
      </div>
    </div>
  );
}