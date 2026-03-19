import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell 
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function Dashboard() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const fetchResults = () => {
    fetch("http://127.0.0.1:5000/results")
      .then(res => res.json())
      .then(data => setData(data));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const staticData = data.filter(item => item.mode === "static");
  const adaptiveData = data.filter(item => item.mode === "adaptive");

  const getPieData = (filteredData) => {
    const counts = {};
    filteredData.forEach(item => {
      counts[item.algorithm] = (counts[item.algorithm] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const staticPieData = getPieData(staticData);
  const adaptivePieData = getPieData(adaptiveData);

  const upload = async (mode) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://127.0.0.1:5000/compress/${mode}`, {
      method: "POST",
      body: formData
    });

    const resultData = await res.json();
    setResult(resultData);
    fetchResults();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}> Compression Dashboard </h2>

      <div style={{
          maxWidth: "800px",
          margin: "0 auto 40px auto",
          background: "linear-gradient(135deg, #ffffff 0%, #f1f4f8 100%)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          border: "1px solid #e1e8ed",
          textAlign: "center"
      }}>
          <h3 style={{ color: "#34495e", marginBottom: "25px", fontSize: "1.5rem" }}>Upload & Compress 📁</h3>
          
          <div style={{ marginBottom: "25px" }}>
              <label htmlFor="file-upload" style={{
                  display: "inline-block",
                  padding: "15px 30px",
                  cursor: "pointer",
                  backgroundColor: file ? "#e3f2fd" : "#fff",
                  color: "#1976d2",
                  borderRadius: "12px",
                  fontWeight: "600",
                  border: "2px dashed #1976d2",
                  transition: "all 0.3s ease"
              }}>
                  {file ? ` Selected: ${file.name}` : "📁 Click to Choose File"}
              </label>
              <input 
                  id="file-upload"
                  type="file" 
                  style={{ display: "none" }} 
                  onChange={(e) => setFile(e.target.files[0])} 
              />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button 
                  onClick={() => upload("static")}
                  style={{
                      padding: "14px 28px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                      boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
              >
                   Static Mode
              </button>

              <button 
                  onClick={() => upload("adaptive")}
                  style={{
                      padding: "14px 28px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#388e3c",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                      boxShadow: "0 4px 10px rgba(56, 142, 60, 0.2)"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
              >
                   Adaptive Mode
              </button>
          </div>
      </div>

      {result && (
        <div style={{ 
          maxWidth: "800px", 
          margin: "0 auto 30px auto", 
          background: "#e8f5e9", 
          padding: "20px", 
          borderRadius: "12px", 
          borderLeft: "5px solid #388e3c",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>Latest Result ({result.mode})</h3>
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "1.1rem" }}>
            <span>Algorithm: <b>{result.algorithm}</b></span>
            <span>Ratio: <b>{result.compression_ratio}</b></span>
          </div>
        </div>
      )}

      <hr style={{ border: "0", height: "1px", background: "#e1e8ed", margin: "40px 0" }} />

      <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", marginBottom: "40px", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>
        <h3 style={{ color: "#1976d2", borderLeft: "4px solid #1976d2", paddingLeft: "15px" }}>1. Static Compression Analysis 📊</h3>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
          <BarChart width={500} height={300} data={staticData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="file_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="original_size" fill="#90caf9" name="Original Size" radius={[5, 5, 0, 0]} />
            <Bar dataKey="compressed_size" fill="#1565c0" name="Compressed Size" radius={[5, 5, 0, 0]} />
          </BarChart>

          <PieChart width={400} height={300}>
            <Pie data={staticPieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {staticPieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", marginBottom: "40px", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>
        <h3 style={{ color: "#388e3c", borderLeft: "4px solid #388e3c", paddingLeft: "15px" }}>2. Adaptive Compression Analysis 🧠</h3>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
          <BarChart width={500} height={300} data={adaptiveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="file_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="original_size" fill="#a5d6a7" name="Original Size" radius={[5, 5, 0, 0]} />
            <Bar dataKey="compressed_size" fill="#2e7d32" name="Compressed Size" radius={[5, 5, 0, 0]} />
          </BarChart>

          <PieChart width={400} height={300}>
            <Pie data={adaptivePieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {adaptivePieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

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
                <td style={{ padding: "12px" }}><span style={{ background: "#f0f2f5", padding: "4px 8px", borderRadius: "6px", fontSize: "0.9rem" }}>{item.algorithm}</span></td>
                <td style={{ padding: "12px" }}>{item.original_size}</td>
                <td style={{ padding: "12px" }}>{item.compressed_size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;