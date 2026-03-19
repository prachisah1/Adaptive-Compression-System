import React, { useEffect, useState } from "react";
import UploadSection from "./UploadSection";
import AnalysisSection from "./AnalysisSection";
import AnalysisSummary from "./AnalysisSummary"; 
import MethodComparison from "./MethodComparison"; 
import HistoryTable from "./HistoryTable";

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

  const upload = async (mode) => {
    if (!file) { alert("Please select a file first!"); return; }
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`http://127.0.0.1:5000/compress/${mode}`, { method: "POST", body: formData });
    const resultData = await res.json();
    setResult(resultData);
    fetchResults();
  };

  const staticData = data.filter(item => item.mode === "static");
  const adaptiveData = data.filter(item => item.mode === "adaptive");
  const hybridData = data.filter(item => item.mode === "hybrid");

  const getPieData = (filteredData) => {
    const counts = {};
    filteredData.forEach(item => { counts[item.algorithm] = (counts[item.algorithm] || 0) + 1; });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  return (
    <div style={containerStyle}>
      {/* --- 1. Top Navbar --- */}
      <nav style={navStyle}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
          ⚡ OptiCompress <span style={{ fontWeight: "300", fontSize: "0.9rem", color: "#94a3b8" }}></span>
        </div>
      </nav>

      <div style={mainBodyStyle}>
        {/* --- 2. Hero Section (Upload) --- */}
        <section style={heroSection}>
          <UploadSection file={file} setFile={setFile} onUpload={upload} />
          
          {result && (
            <div style={resultToastStyle}>
              <strong style={{color: '#fff'}}>{result.mode.toUpperCase()} Success:</strong> {result.algorithm} ({result.compression_ratio} Ratio)
            </div>
          )}
        </section>

        {/* --- 3. Key Metrics --- */}
        <section style={sectionMargin}>
           <h4 style={sectionTitle}>System Performance Overview</h4>
           <AnalysisSummary data={data} />
        </section>

        {/* --- 4. Global Comparison --- */}
        <section style={chartCardStyle}>
           <h4 style={sectionTitle}>Comparative Insights</h4>
           <MethodComparison data={data} />
        </section>

        {/* --- 5. Analysis Grid (Responsive) --- */}
        <h4 style={sectionTitle}>Detailed Analysis</h4>
        <div style={gridContainer}>
          <div style={gridItem}>
            <AnalysisSection 
              title="Static Analysis" 
              data={staticData} 
              pieData={getPieData(staticData)} 
              themeColor="#1976d2" 
              chartBarColors={["#90caf9", "#1565c0"]} 
            />
          </div>
          <div style={gridItem}>
            <AnalysisSection 
              title="Adaptive Analysis" 
              data={adaptiveData} 
              pieData={getPieData(adaptiveData)} 
              themeColor="#388e3c" 
              chartBarColors={["#a5d6a7", "#2e7d32"]} 
            />
          </div>
          <div style={gridItem}>
            <AnalysisSection 
              title="Hybrid Analysis" 
              data={hybridData} 
              pieData={getPieData(hybridData)} 
              themeColor="#8b388e" 
              chartBarColors={["#d6a5cf", "#792e7d"]} 
            />
          </div>
        </div>

        {/* --- 6. Table Section (Fixed Visibility) --- */}
        <section style={tableCardStyle}>
           <h4 style={{...sectionTitle, padding: '20px 20px 0 20px'}}>History Log 📜</h4>
           <HistoryTable data={data} />
        </section>
      </div>
    </div>
  );
}

// --- CSS-in-JS (Optimized for Visibility) ---

const containerStyle = {
  backgroundColor: "#0f172a", 
  minHeight: "100vh",
  fontFamily: "'Inter', sans-serif",
  color: "#f1f5f9",
  paddingBottom: "50px"
};

const navStyle = {
  height: "70px",
  backgroundColor: "#1e293b",
  display: "flex",
  alignItems: "center",
  padding: "0 50px",
  borderBottom: "1px solid #334155",
  position: "sticky",
  top: 0,
  zIndex: 1000
};

const mainBodyStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "20px"
};

const heroSection = {
  marginBottom: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const resultToastStyle = {
  marginTop: "20px",
  padding: "12px 20px",
  borderRadius: "8px",
  backgroundColor: "#059669",
  color: "#fff",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
  fontWeight: "500"
};

const sectionMargin = { marginBottom: "40px" };

const sectionTitle = {
  fontSize: "1.1rem",
  fontWeight: "600",
  marginBottom: "15px",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const chartCardStyle = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #334155",
  marginBottom: "40px",
  width: "100%",
  boxSizing: "border-box"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  marginBottom: "40px"
};

const gridItem = {
  backgroundColor: "#1e293b",
  borderRadius: "12px",
  border: "1px solid #334155",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  minHeight: "400px", // Fit ensure karne ke liye
  overflow: "hidden"
};

const tableCardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "12px",
  border: "1px solid #334155",
  marginTop: "20px"
};

export default Dashboard;