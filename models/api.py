import hashlib
import os
import tempfile
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

PROJECT_ROOT = Path(__file__).resolve().parent.parent
VIDEO_MODEL_DIR = PROJECT_ROOT / "models" / "video"
DEFAULT_CHECKPOINTS = (
    VIDEO_MODEL_DIR / "checkpoints" / "best_model.pth",
    VIDEO_MODEL_DIR / "checkpoints" / "best_finetuned_model.pth",
    VIDEO_MODEL_DIR / "checkpoints" / "best_cached_model.pth",
    VIDEO_MODEL_DIR / "checkpoints" / "best_raw_model.pth",
)
CHECKPOINT_PATH = Path(os.getenv("VIDEO_MODEL_CHECKPOINT", "")) if os.getenv("VIDEO_MODEL_CHECKPOINT") else next(
    (path for path in DEFAULT_CHECKPOINTS if path.is_file()), DEFAULT_CHECKPOINTS[0]
)
DEFAULT_CONFIG_PATH = (
    VIDEO_MODEL_DIR / "finetune_config.yaml"
    if "finetuned" in CHECKPOINT_PATH.name
    else VIDEO_MODEL_DIR / "config.yaml"
)
CONFIG_PATH = Path(os.getenv("VIDEO_MODEL_CONFIG", DEFAULT_CONFIG_PATH))

app = FastAPI(title="DeepTrace Video Model API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","),
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


def _risk_level(confidence: float, prediction: str) -> str:
    if prediction == "fake":
        if confidence >= 0.9:
            return "CRITICAL"
        if confidence >= 0.75:
            return "HIGH"
        return "MODERATE"
    if confidence >= 0.75:
        return "LOW"
    return "MODERATE"


def _analysis_result(filename: str, file_size: int, file_bytes: bytes, raw: dict[str, Any]) -> dict[str, Any]:
    prediction = raw.get("prediction")
    if prediction not in {"real", "fake"}:
        raise HTTPException(status_code=422, detail=raw.get("error", "Video analysis was inconclusive."))

    fake_probability = float(raw.get("confidence", 0.0)) if prediction == "fake" else 1.0 - float(raw.get("confidence", 0.0))
    fake_probability = max(0.0, min(1.0, fake_probability))
    confidence = round(max(fake_probability, 1.0 - fake_probability) * 100, 2)
    evidence = raw.get("evidence", {})
    metadata = evidence.get("video_metadata", {})
    fps = float(metadata.get("fps", 0.0))
    suspicious_frames = set(evidence.get("suspicious_frames", []))
    total_frames = int(evidence.get("total_frames_sampled", metadata.get("frame_count", 0)))
    frame_scores = evidence.get("frame_scores", {})
    timeline = []
    for frame in range(total_frames):
        frame_score = float(frame_scores.get(str(frame), frame_scores.get(frame, 0.0)))
        timeline.append({
            "timestamp": _timestamp(frame / fps) if fps else "00:00",
            "anomalyScore": round(frame_score * 100, 2),
            "frame": frame,
        })

    digest = hashlib.sha256(file_bytes).hexdigest()
    return {
        "id": str(uuid.uuid4()),
        "filename": filename,
        "fileSize": file_size,
        "mediaType": "VIDEO",
        "prediction": "LIKELY_MANIPULATED" if prediction == "fake" else "AUTHENTIC",
        "confidence": confidence,
        "riskLevel": _risk_level(confidence / 100, prediction),
        "probabilities": {
            "authentic": round((1 - fake_probability) * 100, 2),
            "manipulated": round(fake_probability * 100, 2),
            "inconclusive": 0,
        },
        "modelName": raw.get("model_name", "DeepTrace Video Model"),
        "modelVersion": raw.get("model_version", "unknown"),
        "processingTimeMs": raw.get("processing_time_ms", 0),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "sha256Hash": digest,
        "fileMetadata": {
            "name": filename,
            "size": file_size,
            "type": "video/*",
            "lastModified": 0,
            "previewUrl": "",
            "durationSeconds": metadata.get("duration_seconds"),
        },
        "evidenceSummary": [
            f"Analyzed {total_frames} sampled frames.",
            f"Detected {len(suspicious_frames)} suspicious frames.",
        ],
        "videoDetails": {
            "totalFramesAnalyzed": total_frames,
            "fps": fps,
            "suspiciousFramesCount": len(suspicious_frames),
            "suspiciousFrames": [],
            "timelineHeatmap": timeline,
        },
    }


def _timestamp(seconds: float) -> str:
    minutes, remainder = divmod(int(seconds), 60)
    return f"{minutes:02d}:{remainder:02d}"


@app.get("/health")
def health() -> dict[str, Any]:
    is_lfs_pointer = False
    if CHECKPOINT_PATH.is_file():
        is_lfs_pointer = CHECKPOINT_PATH.read_bytes()[:20] == b"version https://git-"
    return {
        "status": "ok",
        "checkpointAvailable": CHECKPOINT_PATH.is_file() and not is_lfs_pointer,
        "checkpointIsGitLfsPointer": is_lfs_pointer,
        "checkpointPath": str(CHECKPOINT_PATH),
        "configPath": str(CONFIG_PATH),
    }


@app.post("/api/v1/detect/video")
async def detect_video(file: UploadFile = File(...), mediaType: str = Form("VIDEO")) -> dict[str, Any]:
    if mediaType.upper() != "VIDEO":
        raise HTTPException(status_code=400, detail="This model service only accepts VIDEO media.")
    if not file.filename:
        raise HTTPException(status_code=400, detail="A video filename is required.")
    is_lfs_pointer = CHECKPOINT_PATH.is_file() and CHECKPOINT_PATH.read_bytes()[:20] == b"version https://git-"
    if not CHECKPOINT_PATH.is_file() or is_lfs_pointer:
        raise HTTPException(
            status_code=503,
            detail=f"Video checkpoint is not downloaded at {CHECKPOINT_PATH}. Run 'git lfs pull' or copy the real .pth file there.",
        )

    content = await file.read()
    suffix = Path(file.filename).suffix or ".mp4"
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as temp_file:
        temp_file.write(content)
        temp_path = Path(temp_file.name)

    try:
        try:
            from .video.inference import run_inference
        except ModuleNotFoundError as error:
            raise HTTPException(
                status_code=503,
                detail=f"Video model dependencies are not installed: {error.name}. Run pip install -r models/requirements.txt.",
            ) from error
        raw_result = run_inference(str(temp_path), str(CHECKPOINT_PATH), str(CONFIG_PATH))
        return _analysis_result(file.filename, len(content), content, raw_result)
    finally:
        temp_path.unlink(missing_ok=True)