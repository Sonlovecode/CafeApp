import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ReportPage() {
  const [report, setReport] = useState(null);
  useEffect(()=>{
    api.get('/report/daily').then(res=>setReport(res.data)).catch(()=>{});
  }, []);
  if (!report) return <div className="card center">Loading...</div>;
  return (
    <div>
      <h2 className="page-title">Daily Report</h2>
      <div className="card mt-2">
        <div className="small">Total Customers: <strong>{report.totalCustomers}</strong></div>
        <div className="small">Total Orders: <strong>{report.totalOrders}</strong></div>
        <div className="small">Total Revenue: <strong>{report.totalRevenue}</strong></div>
      </div>
    </div>
  );
}