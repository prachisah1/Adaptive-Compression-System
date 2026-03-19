import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalysisSection = ({ title, data, pieData, themeColor, chartBarColors }) => {
  return (
    <div style={{ background: "#fff", padding: "25px", borderRadius: "15px", marginBottom: "40px", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>
      <h3 style={{ color: themeColor, borderLeft: `4px solid ${themeColor}`, paddingLeft: "15px" }}>{title}</h3>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
        
        {/* Bar Chart */}
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="file_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="original_size" fill={chartBarColors[0]} name="Original Size" radius={[5, 5, 0, 0]} />
          <Bar dataKey="compressed_size" fill={chartBarColors[1]} name="Compressed Size" radius={[5, 5, 0, 0]} />
        </BarChart>

        {/* Pie Chart */}
        <PieChart width={400} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AnalysisSection;