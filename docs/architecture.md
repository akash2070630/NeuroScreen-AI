# NeuroScreen AI — System Architecture

## Architecture Diagram

```
                 SMARTPHONE CLIENT (React + Vite)
                                │
                                ▼
                     15-SECOND RECORDING
            (WebRTC MediaStream + AudioContext)
                                │
                  ┌─────────────┴─────────────┐
                  ▼                           ▼
            VIDEO STREAM                 AUDIO STREAM
                  │                           │
                  ▼                           ▼
          FACIAL LANDMARKS            AUDIO FEATURES
        (Mid-sagittal Axis)          (F0, Jitter, Shimmer)
                  │                           │
                  ▼                           ▼
           FACIAL FEATURES             SPEECH FEATURES
                  │                           │
                  └─────────────┬─────────────┘
                                │
                                ▼
                         MOTOR FEATURES
                        (Kinematics, FFT)
                                │
                                ▼
                      MULTIMODAL FUSION
                       (21-D Vector)
                                │
                                ▼
                     GBDT ENSEMBLE CLASSIFIER
                        (20 Regressors)
                                │
                                ▼
                         RISK INDICATION
                      (Low / Mod / Elevated)
                                │
                                ▼
                         TreeSHAP ENGINE
                    (Exact Additive Explanations)
                                │
                                ▼
                        EXPLAINABLE REPORT
                                │
                                ▼
                     PROFESSIONAL REFERRAL
                            SUPPORT
```

## Frontend Components
- **Client Execution:** React 19, TypeScript, Tailwind CSS, Lucide icons.
- **Biometric Processing:** Browser AudioContext (PCM float parsing, autocorrelation pitch detection, RMS energy), Canvas-accelerated overlay.
- **Explainability UI:** Interactive TreeSHAP bar chart and waterfall decomposition.
- **Export Engine:** Native clinical browser print formatting and JSON payload export.

## Backend Components (FastAPI + Python ML)
- **API Server:** FastAPI with Pydantic model validation.
- **ML Engine:** GBDT / XGBoost / CatBoost ensemble inference.
- **Explainability:** SHAP TreeExplainer.
- **Data Security:** Ephemeral in-memory stream processing; zero permanent disk writes of raw videos.
