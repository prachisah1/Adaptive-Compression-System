import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const MethodComparison = ({ data }) => {
  const staticItems = data.filter(i => i.mode === "static");
  const adaptiveItems = data.filter(i => i.mode === "adaptive");
  const hybridItems = data.filter(i => i.mode === "hybrid");

  const calcAvg = (arr, key) => {
    if (arr.length === 0) return 0;
    const avg = arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length;
    return key === "compression_ratio" ? (avg * 100).toFixed(2) : avg.toFixed(2);
  };

  const chartData = [
    { name: 'Static', avg_compression: calcAvg(staticItems, 'compression_ratio'), avg_time: calcAvg(staticItems, 'time_ms') },
    { name: 'Adaptive', avg_compression: calcAvg(adaptiveItems, 'compression_ratio'), avg_time: calcAvg(adaptiveItems, 'time_ms') },
    { name: 'Hybrid', avg_compression: calcAvg(hybridItems, 'compression_ratio'), avg_time: calcAvg(hybridItems, 'time_ms') }
  ];

  return (
    <div style={{ width: "100%", height: "350px", marginTop: "10px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke="#27ae60" 
            tick={{ fill: '#27ae60' }} 
            label={{ value: 'Avg Comp %', angle: -90, position: 'insideLeft', fill: '#27ae60', fontSize: 12 }} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#3498db" 
            tick={{ fill: '#3498db' }} 
            label={{ value: 'Time (ms)', angle: 90, position: 'insideRight', fill: '#3498db', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar yAxisId="left" dataKey="avg_compression" fill="#10b981" name="Avg Compression %" radius={[4, 4, 0, 0]} barSize={40} />
          <Bar yAxisId="right" dataKey="avg_time" fill="#3b82f6" name="Avg Time (ms)" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MethodComparison;