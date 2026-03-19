import React from 'react';

const HistoryTable = ({ data }) => {
  return (
    <div style={{ padding: "10px 20px 25px 20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", color: "#f1f5f9" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
            <th style={{ padding: "12px" }}>File Name</th>
            <th style={{ padding: "12px" }}>Algorithm</th>
            <th style={{ padding: "12px" }}>Original (B)</th>
            <th style={{ padding: "12px" }}>Compressed (B)</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #1e293b" }}>
              <td style={{ padding: "12px", fontSize: "0.9rem", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.file_name}
              </td>
              <td style={{ padding: "12px" }}>
                <span style={{ background: "#334155", color: "#60a5fa", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}>
                  {item.algorithm}
                </span>
              </td>
              <td style={{ padding: "12px", fontSize: "0.9rem" }}>{item.original_size.toLocaleString()}</td>
              <td style={{ padding: "12px", fontSize: "0.9rem", color: "#10b981" }}>{item.compressed_size.toLocaleString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;