import os

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")

def save_file(file):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    return file_path