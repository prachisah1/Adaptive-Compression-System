import zlib
import time
import os

def static_compress(file_path):
    try:
        start_time = time.time()

        # Read file
        with open(file_path, 'rb') as f:
            data = f.read()

        original_size = len(data)

        # Compress using zlib
        compressed_data = zlib.compress(data)

        compressed_size = len(compressed_data)

        # Save compressed file
        compressed_path = file_path + ".zlib"
        with open(compressed_path, 'wb') as f:
            f.write(compressed_data)

        end_time = time.time()

        compression_ratio = compressed_size / original_size
        time_taken = end_time - start_time
        time_ms = time_taken * 1000
        return {
            "file_name": os.path.basename(file_path),
            "original_size": original_size,
            "compressed_size": compressed_size,
            "compression_ratio": round(compression_ratio, 4),
            "time_taken": round(time_taken, 4),
            "time_ms": round(time_ms, 2),
            "algorithm": "zlib",
            "status": "success"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }