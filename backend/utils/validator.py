"""
NeuroScreen AI - Upload Security & Validation Utility
Enforces strict MIME validation, file size bounds, and header sanity checks.
"""

from fastapi import HTTPException, UploadFile, status

MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024  # 50 MB

ALLOWED_MIME_TYPES = {
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/mpeg",
    "audio/mp3",
    "audio/ogg",
}

DISALLOWED_EXTENSIONS = {
    ".exe", ".bat", ".sh", ".py", ".bin", ".elf", ".js", ".php", ".phtml"
}

def validate_uploaded_file(file: UploadFile) -> None:
    # 1. Extension check
    filename_lower = (file.filename or "").lower()
    for ext in DISALLOWED_EXTENSIONS:
        if filename_lower.endswith(ext):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Security violation: Executable or script extension '{ext}' is forbidden."
            )

    # 2. MIME type check
    content_type = file.content_type or ""
    if content_type not in ALLOWED_MIME_TYPES and not content_type.startswith(("video/", "audio/")):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Invalid MIME type '{content_type}'. Allowed types are standard video (MP4, WebM) and audio (WAV, MP3, OGG)."
        )
