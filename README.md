# NeuroScreen AI
### Multimodal Smartphone-Based Neuromuscular Risk Screening and Explainable AI Platform

> **IMPORTANT MEDICAL & ETHICAL NOTICE:**  
> NeuroScreen AI is an academic and biomedical machine learning research prototype for early-risk screening and referral support. It is **NOT** a medical diagnostic device and **NEVER** claims that it can diagnose Parkinson's disease, stroke, Bell's palsy, ALS, or any neurological disease. Results are for research and screening support only and must not replace evaluation by a qualified healthcare professional.

---

## 1. Project Overview
NeuroScreen AI investigates non-invasive, accessible neuromuscular risk stratification using ubiquitous smartphone sensors. By capturing a standardized 10–15 second multi-phase video and audio recording, the platform synchronizes facial biomechanics, upper-extremity motor kinematics, and vocal speech acoustics into a 21-dimensional multimodal feature vector evaluated by a gradient boosted ensemble model and explained through exact TreeSHAP feature attributions.

---

## 2. Problem Statement
Neurological and neuromuscular conditions often develop with subtle, insidious early signs across facial motor control, involuntary tremors, and voice acoustics. In many regions, specialized movement disorder neurologists and neuromuscular clinics face multi-month backlogs. Traditional telemedicine triage frequently relies on subjective observation without standardized objective biometric measurements or transparent mathematical explanations.

---

## 3. Proposed Solution
A client-first, non-invasive screening platform where users execute a guided 6-phase protocol:
1. **Resting Face (2s):** Mid-sagittal baseline symmetry.
2. **Smile (2s):** Oral commissure excursion and zygomaticus bilateral symmetry.
3. **Raise Eyebrows (2s):** Frontalis elevation and forehead symmetry.
4. **Close & Open Eyes (2s):** Orbicularis oculi closure strength.
5. **Simple Arm Movement (3s):** Upper-limb tremor band power (FFT) and SPARC smoothness.
6. **Speech Sample (4s):** Standardized sentence ("Today is a beautiful day and I am feeling well") for vocal jitter, shimmer, and prosodic pitch analysis.

The system extracts 21 engineered signals, computes calibrated risk probabilities, visualizes exact TreeSHAP contributions, and offers tailored clinical referral recommendations without ever storing raw videos.

---

## 4. Key Features
- **Standardized Guided Prompter:** Visual real-time phase countdown and instructions.
- **Computer Vision Pipeline:** Mid-sagittal plane orthogonal projection calculating the Facial Asymmetry Index (FAI).
- **Motor Kinematic Analysis:** Discrete Fast Fourier Transform (FFT) for tremor frequency spectra and Spectral Arc Length (SPARC) for movement smoothness.
- **Acoustic Signal Processing:** Normalized autocorrelation fundamental frequency ($F_0$), MDVP-standard Jitter % and Shimmer %, spectral centroid, and zero-crossing rate.
- **Multimodal Fusion:** 21-dimensional normalized vector comparing patient signals to published clinical benchmarks.
- **Explainable AI (TreeSHAP):** Exact additive Shapley value attributions explaining which signals pushed the screening index higher or lower.
- **Clinical Referral Report:** Printable PDF report format and JSON data export.
- **Emergency Safety Interceptor:** Explicit warnings intercepting acute stroke symptoms (FAST criteria).
- **Research Benchmark Cohorts:** Built-in calibrated profiles (Normative Control, Hemifacial Asymmetry, Kinetic Tremor, Dysphonic Speech) for instant demonstration and validation.

---

## 5. Architecture
```
             SMARTPHONE
                  │
                  ▼
          10–15 SEC RECORDING
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
   VIDEO STREAM          AUDIO STREAM
        │                   │
        ▼                   ▼
 FACIAL LANDMARKS       AUDIO FEATURES
        │                   │
        ▼                   ▼
 FACIAL FEATURES       SPEECH FEATURES
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
           MOTOR FEATURES
                  │
                  ▼
        FEATURE NORMALIZATION
                  │
                  ▼
        MULTIMODAL FUSION (21-D)
                  │
                  ▼
          XGBoost / CatBoost
                  │
                  ▼
          RISK INDICATION
                  │
                  ▼
             TreeSHAP XAI
                  │
                  ▼
       EXPLAINABLE REPORT
                  │
                  ▼
       PROFESSIONAL REFERRAL SUPPORT
```

---

## 6. ML Pipeline
- **Ensemble Model:** 20 calibrated regression trees evaluating multimodal splits.
- **Link Function:** Logistic sigmoid mapping log-odds margins to calibrated risk probabilities.
- **Screening Tiers:**
  - *Low Risk Indication:* $P < 0.35$
  - *Moderate Risk Indication:* $0.35 \le P < 0.65$
  - *Elevated Risk Indication:* $P \ge 0.65$
- **Preventing Data Leakage:** GroupKFold cross-validation partitioned strictly by `participant_id`.

---

## 7. Computer Vision Pipeline
- Mid-sagittal axis derived from glabella ($\mathbf{p}_{168}$) and subnasale ($\mathbf{p}_{2}$).
- Orthogonal distance projection:
  $$d(\mathbf{p}) = \frac{|(\mathbf{p} - \mathbf{p}_{\text{nas}}) \times (\mathbf{p}_{\text{sub}} - \mathbf{p}_{\text{nas}})|}{\|\mathbf{p}_{\text{sub}} - \mathbf{p}_{\text{nas}}\|}$$
- Facial Asymmetry Index (FAI):
  $$\text{FAI} = \frac{100}{N} \sum_{i=1}^{N} \frac{|d(\mathbf{p}_{L,i}) - d(\mathbf{p}_{R,i})|}{d(\mathbf{p}_{L,i}) + d(\mathbf{p}_{R,i}) + \epsilon}$$

---

## 8. Audio Pipeline
- **Sample Rate:** 44.1 kHz / 16-bit PCM.
- **Pitch Extraction ($F_0$):** Time-domain autocorrelation in the 75–500 Hz vocal frequency range.
- **Vocal Frequency Jitter (Cycle Perturbation %):** Relative average perturbation of pitch periods.
- **Vocal Amplitude Shimmer (Amplitude Perturbation %):** Peak amplitude variation across consecutive cycles.
- **Wav2Vec 2.0 Abstraction:** Clean decoupled interface allowing drop-in connection to deep acoustic encoders.

---

## 9. Feature Engineering
The 21-D fused feature vector comprises:
- **Visual (7):** `facial_asymmetry_index`, `mouth_corner_asymmetry`, `eye_region_asymmetry`, `eyebrow_movement_symmetry`, `lip_mobility_symmetry`, `temporal_facial_consistency`, `facial_motion_range`
- **Motor (6):** `dominant_motion_frequency`, `oscillation_amplitude`, `movement_smoothness_sparc`, `motion_variability`, `peak_velocity`, `spectral_energy_ratio`
- **Audio (8):** `mean_f0_hz`, `pitch_variability_st`, `jitter_percent`, `shimmer_percent`, `zero_crossing_rate`, `spectral_centroid_hz`, `spectral_flux`, `energy_rms`

---

## 10. Model Training
```bash
python -m ml.training.train
```
Executes GroupKFold cross-validation, reports sensitivity, specificity, precision, F1, and confusion matrix, and serializes metadata to `models/model_metadata.json`.

---

## 11. Explainable AI (TreeSHAP)
Implements exact TreeSHAP (Lundberg et al., 2020) guaranteeing strict additivity:
$$\sum_{i=1}^{21} \phi_i(\mathbf{x}) = \hat{y}(\mathbf{x}) - \mathbb{E}[\hat{y}(\mathbf{X})]$$
Each signal's $\phi_i$ value quantifies whether it pushed the patient's log-odds margin toward elevated risk ($\phi_i > 0$) or toward typical baseline ($\phi_i \le 0$).

---

## 12. Dataset Requirements
- Participant-level isolation (`participant_id`).
- Standardized 6-phase video and uncompressed audio recordings.
- Ethical IRB protocol approval and written informed consent.
- See `datasets/README.md` for full specification.

---

## 13. Installation
```bash
# Clone repository
git clone https://github.com/example/neuroscreen-ai.git
cd neuroscreen-ai

# Install Node dependencies
npm install

# (Optional) Install Python backend dependencies
pip install -r requirements.txt  # fastapi uvicorn numpy pandas scipy scikit-learn
```

---

## 14. Running Locally
```bash
# Start frontend application (Port 3000)
npm run dev

# Start Python FastAPI backend (Port 8000)
python backend/main.py
```

---

## 15. API Documentation
- `POST /api/screening/upload`: Validates upload, extracts biometric features ephemerally.
- `POST /api/screening/predict`: Runs GBDT model and TreeSHAP attribution on multimodal vectors.
- `GET /api/screening/{id}`: Retrieves screening report.
- `GET /api/health`: Health status.
- Interactive Swagger docs available at `http://localhost:8000/api/docs`.

---

## 16. Testing
```bash
# Run Python unit tests
python -m unittest tests/test_features.py

# Run TypeScript compile validation
npm run lint
```

---

## 17. Limitations
- Environmental illumination and asymmetric facial shadows can introduce landmark bias.
- Background acoustic noise impairs vocal autocorrelation and elevates jitter.
- Research models require prospective clinical dataset validation before diagnostic use.

---

## 18. Privacy & Data Governance
- **Zero Permanent Video Storage:** Videos are processed ephemerally in device RAM and immediately cleared.
- **Zero Collection of PII:** No names, phone numbers, or government identifiers are stored.
- **Local-First Architecture:** Signal feature extraction runs client-side in the browser.

---

## 19. Medical Safety Disclaimer
This prototype does not diagnose disease. Results are for research and screening support only and should not replace evaluation by a qualified healthcare professional. If experiencing sudden facial drooping, limb weakness, or speech difficulty, contact local emergency medical services immediately.

---

## 20. Future Work
- Prospective multi-center clinical trials with IRB protocol clearance.
- Integration with pretrained deep acoustic embeddings (Wav2Vec 2.0).
- Longitudinal tracking across patient visits to quantify disease progression rates.
