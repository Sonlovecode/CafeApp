import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    try {
      await register(username, password);
      // on success redirect to login
      setMsg('Registered successfully. Redirecting to login...');
      setTimeout(()=>navigate('/login'), 900);
    } catch (e) {
      setErr(e.message || 'Register failed');
    }
  };

  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
      <h2 className="page-title">Register</h2>
      <form onSubmit={submit} className="mt-2" style={{display:'flex', flexDirection:'column', gap:12}}>
        <input className="input" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">Register</button>
        {msg && <div className="small" style={{color:'#059669'}}>{msg}</div>}
        {err && <div className="small" style={{color:'var(--danger)'}}>{err}</div>}
      </form>
    </div>
  );
}