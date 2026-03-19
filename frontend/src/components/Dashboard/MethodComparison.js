import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const MethodComparison = ({ data }) => {
  const staticItems = data.filter(i => i.mode === "static");
  const adaptiveItems = data.filter(i => i.mode === "adaptive");

const calcAvg = (arr, key) =>
  arr.length > 0
    ? (arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length).toFixed(2)
    : 0;
  const chartData = [
    {
      name: 'Static',
      avg_compression: calcAvg(staticItems, 'compression_ratio'),
      avg_time: calcAvg(staticItems, 'time_ms')
    },
    {
      name: 'Adaptive',
      avg_compression: calcAvg(adaptiveItems, 'compression_ratio'),
      avg_time: calcAvg(adaptiveItems, 'time_ms')
    }
  ];

  return (
    <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", marginBottom: "40px", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>
      <h3 style={{ marginBottom: "20px" }}>Method Comparison (Avg Performance)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#27ae60" label={{ value: 'Avg Compression %', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#3498db" label={{ value: 'Avg Time (ms)', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="avg_compression" fill="#27ae60" name="Avg Compression %" />
          <Bar yAxisId="right" dataKey="avg_time" fill="#3498db" name="Avg Time (ms)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MethodComparison;