import zlib
import zstandard as zstd
import time
import os

def hybrid_compress(file_path):
    try:
        start_time = time.time()

        with open(file_path, 'rb') as f:
            data = f.read()

        original_size = len(data)

        # 🔥 Step 1: zlib compression
        step1 = zlib.compress(data)

        # 🔥 Step 2: zstd compression
        cctx = zstd.ZstdCompressor()
        final_compressed = cctx.compress(step1)

        compressed_size = len(final_compressed)

        end_time = time.time()

        time_taken = end_time - start_time
        time_ms = time_taken * 1000

        compression_ratio = compressed_size / original_size

        return {
            "file_name": os.path.basename(file_path),
            "original_size": original_size,
            "compressed_size": compressed_size,
            "compression_ratio": round(compression_ratio, 4),
            "time_taken": round(time_taken, 4),
            "time_ms": round(time_ms, 2),
            "algorithm": "zlib + zstd (hybrid)",
            "mode": "hybrid",
            "status": "success"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }