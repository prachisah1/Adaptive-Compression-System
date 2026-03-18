from flask import Flask, request, jsonify
from utils.file_handler import save_file
from compressor.static_compressor import static_compress
import json

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)