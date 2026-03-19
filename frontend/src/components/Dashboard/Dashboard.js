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

  // Logic for filtering data
  const staticData = data.filter(item => item.mode === "static");
  const adaptiveData = data.filter(item => item.mode === "adaptive");

  const getPieData = (filteredData) => {
    const counts = {};
    filteredData.forEach(item => { counts[item.algorithm] = (counts[item.algorithm] || 0) + 1; });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <UploadSection file={file} setFile={setFile} onUpload={upload} />

      {result && (
        <div style={{ maxWidth: "800px", margin: "0 auto 30px auto", background: "#e8f5e9", padding: "20px", borderRadius: "12px", borderLeft: "5px solid #388e3c" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>Latest Result ({result.mode})</h3>
          <p>Algorithm: <b>{result.algorithm}</b> | Ratio: <b>{result.compression_ratio}</b></p>
        </div>
      )}

      <hr style={{ border: "0", height: "1px", background: "#e1e8ed", margin: "40px 0" }} />

      <AnalysisSection 
        title="1. Static Compression Analysis" 
        data={staticData} 
        pieData={getPieData(staticData)} 
        themeColor="#1976d2" 
        chartBarColors={["#90caf9", "#1565c0"]} 
      />

      <AnalysisSection 
        title="2. Adaptive Compression Analysis" 
        data={adaptiveData} 
        pieData={getPieData(adaptiveData)} 
        themeColor="#388e3c" 
        chartBarColors={["#a5d6a7", "#2e7d32"]} 
      />
{/* 1. Metric Cards */}
      <AnalysisSummary data={data} />

      {/* 2. Global Method Comparison */}
      <MethodComparison data={data} />

      {/* 3. Original Upload Section */}
      <UploadSection file={file} setFile={setFile} onUpload={upload} />
      <HistoryTable data={data} />
    </div>
  );
}

export default Dashboard;