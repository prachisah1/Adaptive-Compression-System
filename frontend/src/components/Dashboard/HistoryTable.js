import React from 'react';

const HistoryTable = ({ data }) => {
  return (
    <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>
      <h3 style={{ marginBottom: "20px" }}>History Log 📜</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eee", color: "#666" }}>
            <th style={{ padding: "12px" }}>File Name</th>
            <th style={{ padding: "12px" }}>Algorithm</th>
            <th style={{ padding: "12px" }}>Original (B)</th>
            <th style={{ padding: "12px" }}>Compressed (B)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #f9f9f9" }}>
              <td style={{ padding: "12px" }}>{item.file_name}</td>
              <td style={{ padding: "12px" }}>
                <span style={{ background: "#f0f2f5", padding: "4px 8px", borderRadius: "6px", fontSize: "0.9rem" }}>
                  {item.algorithm}
                </span>
              </td>
              <td style={{ padding: "12px" }}>{item.original_size}</td>
              <td style={{ padding: "12px" }}>{item.compressed_size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;