from flask import Flask, request, jsonify
from utils.file_handler import save_file
from compressor.static_compressor import static_compress
import json
from compressor.adaptive_compressor import adaptive_compress
from flask_cors import CORS
from compressor.hybrid_compressor import hybrid_compress
app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Static Compression Server Running 🚀"

@app.route("/compress/static", methods=["POST"])
def compress_static():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Save file
    file_path = save_file(file)

    # Compress
    result = static_compress(file_path)
    result["mode"] = "static" 
    # SAVE RESULT (important)
    save_result(result)

    return jsonify(result)

def save_result(result):
    try:
        with open("data.json", "r") as f:
            data = json.load(f)
    except:
        data = []

    data.append(result)

    with open("data.json", "w") as f:
        json.dump(data, f, indent=4)

@app.route("/compress/adaptive", methods=["POST"])
def compress_adaptive():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    file_path = save_file(file)

    result = adaptive_compress(file_path)
    result["mode"] = "adaptive"
    save_result(result)

    return jsonify(result)
@app.route("/compress/hybrid", methods=["POST"])
def compress_hybrid():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = save_file(file)

    result = hybrid_compress(file_path)

    save_result(result)

    return jsonify(result)

@app.route("/results", methods=["GET"])
def get_results():
    try:
        with open("data.json", "r") as f:
            data = json.load(f)
    except:
        data = []

    return jsonify(data)  
if __name__ == "__main__":
    app.run() 