import React from 'react';

const AnalysisSummary = ({ data }) => {
  const total = data.length;
  const storageSaved = data.reduce((acc, item) => acc + (item.original_size - item.compressed_size), 0);
  const avgRatio = total > 0 ? (data.reduce((acc, item) => acc + item.compression_ratio, 0) / total).toFixed(2) : 0;
  // Assuming your backend sends 'time_ms'. If not, default to 0.
  const avgTime = total > 0 ? (data.reduce((acc, item) => acc + (item.time_ms || 0), 0) / total).toFixed(2) : 0;

  const cardStyle = {
    flex: "1",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    minWidth: "150px"
  };

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
      <div style={cardStyle}>
        <p style={{ color: "#666", margin: "0" }}>Total Compressions</p>
        <h2 style={{ margin: "10px 0", color: "#2c3e50" }}>{total}</h2>
      </div>
      <div style={cardStyle}>
        <p style={{ color: "#666", margin: "0" }}>Storage Saved</p>
        <h2 style={{ margin: "10px 0", color: "#e67e22" }}>{storageSaved} B</h2>
      </div>
      <div style={cardStyle}>
        <p style={{ color: "#666", margin: "0" }}>Avg Compression</p>
        <h2 style={{ margin: "10px 0", color: "#27ae60" }}>{avgRatio}%</h2>
      </div>
      <div style={cardStyle}>
        <p style={{ color: "#666", margin: "0" }}>Avg Time</p>
        <h2 style={{ margin: "10px 0", color: "#3498db" }}>{avgTime}ms</h2>
      </div>
    </div>
  );
};

export default AnalysisSummary;