#  Adaptive Compression System for Cloud Storage

A comparative compression system that evaluates **Static Compression** and **Adaptive Compression** techniques. This project dynamically selects algorithms based on file characteristics and provides a visual analytics dashboard.

---

## 📌 Overview
This system evaluates the trade-offs between fixed compression (Static) and intelligent, data-aware compression (Adaptive). By analyzing file type, size, and **entropy**, the system selects the most efficient algorithm to improve storage density in cloud environments.

## 🎯 Objectives
* **Compare** performance metrics between Static and Adaptive modes.
* **Improve** storage efficiency using multi-algorithm support.
* **Analyze** real-time metrics through a React-based visual dashboard.

---

## 🏗️ System Architecture

The system follows a decoupled architecture:
1.  **Frontend (React):** User interface for file uploads and data visualization.
2.  **Backend (Flask API):** Processes requests and manages the compression engine.
3.  **Compression Engine:** * **Static Module:** Uses a fixed algorithm (zlib).
    * **Adaptive Module:** Calculates entropy and selects the best fit (Brotli, Zstd, or Pillow).
4.  **Storage:** Persistent history tracking in `data.json`.

---

## ⚙️ Tech Stack

### 🔹 Frontend
* **React.js** (Functional Components & Hooks)
* **Recharts** (Professional Data Visualization)
* **CSS3** (Glassmorphism & Responsive UI)

### 🔹 Backend
* **Python (Flask)**
* **Compression Libs:** `zlib`, `brotli`, `zstandard` (zstd)
* **Image Processing:** `Pillow`
* **Utilities:** `flask-cors` for cross-origin requests

---

## 📂 Project Structure

```text
 Adaptive-Compression-System/
   ├── backend/
   │   ├── app.py                  # Flask Entry Point
   │   ├── compressor/
   │   │   ├── static_compressor.py
   │   │   └── adaptive_compressor.py
   │   └── data.json               # Local Database
   ├── frontend/
   │   ├── src/
   │   │   ├── components/
   │   │   │   └── Dashboard/      # Modular UI Components
   │   │   │       ├── AnalysisSection.js
   │   │   │       ├── AnalysisSummary.js
   │   │   │       ├── Dashboard.js
   │   │   │       ├── HistoryTable.js
   │   │   │       ├── MethodComparison.js
   │   │   │       ├── ResultCard.js
   │   │   │       └── UploadSection.js
   │   │   ├── App.js
   │   │   └── index.js
```

---

## 🧠 Adaptive Decision Logic

The Adaptive module analyzes the file before processing:
* **Low Entropy:** Uses `zlib` for standard text/logs.
* **Medium Entropy:** Uses `brotli` for high-efficiency web-type data.
* **High Entropy:** Uses `zstd` for complex binary data.
* **Multimedia:** Uses `Pillow` for specialized image-aware compression.

---

## ▶️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <your-repo-link>
cd Adaptive-Compression-System
```

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install flask flask-cors zstandard brotli pillow
python app.py
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm install recharts
npm start
```

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/compress/static` | `POST` | Execute fixed zlib compression. |
| `/compress/adaptive` | `POST` | Execute entropy-based dynamic compression. |
| `/results` | `GET` | Fetch entire compression history for the dashboard. |

---

## 📈 Performance Trade-off

| Approach | Speed | Efficiency | Complexity |
| :--- | :--- | :--- | :--- |
| **Static** | ⚡ Very Fast | 🟠 Moderate | Low |
| **Adaptive**| 🐢 Slower | 🟢 High | High |

---

## 👩‍💻 Contributors
* **Prachi Sah**
* **Mokshita Joshi**
* **Tarun Yadav**

## 📜 License
This project is for academic and research purposes.
```
