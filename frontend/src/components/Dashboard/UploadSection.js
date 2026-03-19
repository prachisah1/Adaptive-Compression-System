import React from 'react';

const UploadSection = ({ file, setFile, onUpload }) => {
  return (
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
          onClick={() => onUpload("static")}
          style={btnStyle("#1976d2")}
        >
          Static Mode
        </button>
        <button 
          onClick={() => onUpload("adaptive")}
          style={btnStyle("#388e3c")}
        >
          Adaptive Mode
        </button>
        <button onClick={() => onUpload("hybrid")}
        style={btnStyle("#8e388e")}>
  Hybrid Compress 
</button>
      </div>
    </div>
  );
};

const btnStyle = (color) => ({
  padding: "14px 28px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: color,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: `0 4px 10px ${color}33`
});

export default UploadSection;