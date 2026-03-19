import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalysisSection = ({ title, data, pieData, themeColor, chartBarColors }) => {
  return (
    <div style={{ padding: "10px" }}>
      {/* Title with Theme Color Border */}
      <h3 style={{ 
        color: "#f1f5f9", 
        borderLeft: `4px solid ${themeColor}`, 
        paddingLeft: "15px",
        fontSize: "1.1rem",
        marginBottom: "20px"
      }}>
        {title}
      </h3>

      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "30px",
        alignItems: "center"
      }}>
        
        {/* --- 1. Bar Chart Container --- */}
        <div style={{ width: "100%", height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="file_name" 
                stroke="#94a3b8" 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
                hide={data.length > 5} // Zada files ho to hide kar dete hai clutter avoid karne ke liye
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="original_size" fill={chartBarColors[0]} name="Original" radius={[4, 4, 0, 0]} />
              <Bar dataKey="compressed_size" fill={chartBarColors[1]} name="Compressed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* --- 2. Pie Chart Container --- */}
        <div style={{ width: "100%", height: "220px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                outerRadius={70} 
                innerRadius={40} // Isse "Donut" look aayega jo zada aesthetic lagta hai
                paddingAngle={5}
                label={{ fill: '#f1f5f9', fontSize: 10 }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AnalysisSection;