# NeuroScreen AI — Dataset Strategy & Acquisition Protocols

## 1. Overview
NeuroScreen AI operates on standardized multimodal 15-second smartphone recordings encompassing facial biomechanics, upper-limb motor kinematics, and vocal speech acoustics.

To train, calibrate, and validate clinical screening models without risk of synthetic bias or ethical compromise, data must adhere to strict biomedical acquisition standards.

## 2. Required Clinical Schema
Every recording session in the research database must capture:

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `participant_id` | String | De-identified alphanumeric subject code (e.g. `SUBJ-0042`) |
| `session_id` | String | Longitudinal test identifier (e.g. `SUBJ-0042-M03`) |
| `recording_timestamp` | ISO8601 | Capture date and local time |
| `video_raw_path` | URI | 30 FPS RGB video (1080p or 720p, front-facing camera) |
| `audio_raw_path` | URI | 44.1 kHz / 48 kHz uncompressed WAV (16-bit PCM) |
| `protocol_version` | String | Standardized 6-phase sequence version (`v1.0`) |
| `clinical_reference_label` | Integer/Enum | Independent expert neurologist assessment (0: Control, 1: Elevated Risk) |
| `mds_updrs_iii_score` | Float (Optional) | Motor subscale score when assessing parkinsonian motor patterns |
| `house_brackmann_score` | Integer (Optional) | Facial nerve grading when assessing unilateral facial asymmetry |

## 3. Data Leakage Prevention (Crucial Requirement)
- **Subject-Isolated Partitioning:** Multiple recordings from the same patient must NEVER be split randomly between training and validation/test folds.
- **GroupKFold Cross-Validation:** Always split by `participant_id` to ensure that testing simulates real-world deployment on unseen patients.

## 4. Ethically Sourced De-Identified Public Repositories
Researchers can benchmark their models against approved public academic databases:
1. **mPower Study (Sage Bionetworks):** Large-scale smartphone sensor dataset tracking finger tapping and phonation.
2. **Toronto Neuroface Dataset:** Clinical facial movement and speech dataset in ALS and stroke patients.
3. **Parkinson Speech Dataset (University of Istanbul / UCI ML):** Acoustic recordings of vowel phonations and sustained sentences.
4. **PhysioNet Gait & Tremor Repositories:** Validated accelerometer and optical kinematic time-series.

## 5. Ethics & Regulatory Adherence
- Institutional Review Board (IRB) approval is mandatory prior to human subject data collection.
- Written informed consent must be recorded from all subjects.
- All facial video recordings must be processed in compliance with HIPAA de-identification standards (45 CFR § 164.514).
