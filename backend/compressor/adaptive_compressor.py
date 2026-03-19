import zlib
import brotli
import zstandard as zstd
import time
import os
from PIL import Image
import io

def compress_image(file_path):
    img = Image.open(file_path)

    buffer = io.BytesIO()
    img = img.convert("RGB")  
    img.save(buffer, format="JPEG", quality=50)

    return buffer.getvalue()

def adaptive_compress(file_path):
    try:
        start_time = time.time()

        with open(file_path, 'rb') as f:
            data = f.read()

        original_size = len(data)

        file_ext = os.path.splitext(file_path)[1].lower()

        #  DECISION LOGIC
        if file_ext in [".txt", ".json", ".csv"]:
            compressed_data = zlib.compress(data)
            algorithm = "zlib (text optimized)"
 
        elif file_ext in [".jpg", ".png", ".jpeg"]:
            compressed_data = compress_image(file_path)
            algorithm = "image compression (lossy)"

        elif original_size > 1_000_000:  # >1MB
            cctx = zstd.ZstdCompressor()
            compressed_data = cctx.compress(data)
            algorithm = "zstd (large file optimized)"

        else:
            compressed_data = brotli.compress(data)
            algorithm = "brotli (default)"

        compressed_size = len(compressed_data)

        compression_ratio = compressed_size / original_size

        end_time = time.time()
        time_taken = end_time - start_time
        time_ms = time_taken * 1000
        return {
            "file_name": os.path.basename(file_path),
            "original_size": original_size,
            "compressed_size": compressed_size,
            "compression_ratio": round(compression_ratio, 4),
            "time_taken": round(time_taken, 4),
            "time_ms": round(time_ms, 2),
            "algorithm": algorithm,
            "mode": "adaptive",
            "status": "success"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }