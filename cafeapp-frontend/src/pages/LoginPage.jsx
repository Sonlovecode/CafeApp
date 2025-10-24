import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const u = await login(username, password);
      if (u.role === 'ADMIN') navigate('/admin/menu'); else navigate('/booking');
    } catch (e) {
      setErr(e.message || 'Login failed');
    }
  };

  return (
    <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
      <h2 className="page-title">Login</h2>
      <form onSubmit={submit} className="mt-2" style={{display:'flex', flexDirection:'column', gap:12}}>
        <input className="input" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" style={{marginTop:8}}>Login</button>
        {err && <div className="small" style={{color:'var(--danger)'}}>{err}</div>}
      </form>
    </div>
  );
}