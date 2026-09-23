# DeepTrace model handoff

Place the extracted trained model and its inference service in this folder. The React app does not load Python, PyTorch, TensorFlow, or model weights in the browser; it uploads media to an inference API.

The included API adapter is `models/api.py`. It imports the existing video pipeline and exposes the endpoint expected by the frontend.

## Run the local video service

From the project root:

```powershell
python -m pip install -r models/requirements.txt
python -m uvicorn models.api:app --reload --port 8000
```

The service expects the trained checkpoint at `models/video/checkpoints/best_model.pth`. Override it with the `VIDEO_MODEL_CHECKPOINT` environment variable if the file has another name or location.

## Required video endpoint

Run the model service with:

```text
POST /api/v1/detect/video
Content-Type: multipart/form-data
file=<video file>
mediaType=VIDEO
```

Configure the service URL in the app under **Settings > Backend API URL**, or with `VITE_API_BASE_URL` before starting Vite. The endpoint must return the `AnalysisResult` JSON shape defined in `src/types/analysis.ts`.

## Expected response

At minimum, return these fields:

```json
{
  "id": "unique-analysis-id",
  "filename": "sample.mp4",
  "fileSize": 0,
  "mediaType": "VIDEO",
  "prediction": "AUTHENTIC",
  "confidence": 0,
  "riskLevel": "LOW",
  "probabilities": { "authentic": 100, "manipulated": 0, "inconclusive": 0 },
  "modelName": "video-model",
  "modelVersion": "1.0.0",
  "processingTimeMs": 0,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "sha256Hash": "",
  "fileMetadata": { "name": "sample.mp4", "size": 0, "type": "video/mp4", "lastModified": 0, "previewUrl": "" },
  "evidenceSummary": []
}
```

For the video report, also return `videoDetails` with suspicious frames and timeline scores. Keep model-specific preprocessing and weights here, behind the API; do not commit secrets or generated uploads.