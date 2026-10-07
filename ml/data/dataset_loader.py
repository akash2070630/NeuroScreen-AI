"""
NeuroScreen AI - Dataset Loader & Preprocessing
Generates and partitions multimodal research datasets with strict participant-level splitting.
Prevents data leakage across multiple recordings of the same individual.
"""

import numpy as np
import pandas as pd
from typing import Tuple, List, Dict

FEATURE_COLUMNS = [
    "facial_asymmetry_index",
    "mouth_corner_asymmetry",
    "eye_region_asymmetry",
    "eyebrow_movement_symmetry",
    "lip_mobility_symmetry",
    "temporal_facial_consistency",
    "facial_motion_range",
    "dominant_motion_frequency",
    "oscillation_amplitude",
    "movement_smoothness_sparc",
    "motion_variability",
    "peak_velocity",
    "spectral_energy_ratio",
    "mean_f0_hz",
    "pitch_variability_st",
    "jitter_percent",
    "shimmer_percent",
    "zero_crossing_rate",
    "spectral_centroid_hz",
    "spectral_flux",
    "energy_rms",
]

def generate_synthetic_research_dataset(
    n_participants: int = 120,
    recordings_per_participant: int = 3,
    random_seed: int = 42
) -> pd.DataFrame:
    """
    Generates a realistic synthetic multimodal dataset for benchmarking and training.
    Simulates both normative participants and subjects exhibiting neuromuscular deviations.
    """
    np.random.seed(random_seed)
    records = []

    for p_id in range(1, n_participants + 1):
        participant_code = f"SUBJ-{p_id:04d}"
        # ~25% cohort elevated risk prevalence
        has_risk_profile = (p_id % 4 == 0)

        # Baseline individual traits
        base_fai = np.random.uniform(9.0, 15.0) if has_risk_profile else np.random.uniform(3.0, 6.5)
        base_tremor_freq = np.random.uniform(4.5, 6.2) if has_risk_profile else np.random.uniform(1.0, 2.5)
        base_sparc = np.random.uniform(-3.2, -2.2) if has_risk_profile else np.random.uniform(-1.8, -1.1)
        base_jitter = np.random.uniform(1.1, 2.4) if has_risk_profile else np.random.uniform(0.3, 0.8)
        base_shimmer = np.random.uniform(3.9, 6.5) if has_risk_profile else np.random.uniform(1.2, 2.8)

        for rec_num in range(1, recordings_per_participant + 1):
            # Add intra-subject session noise
            rec = {
                "participant_id": participant_code,
                "session_id": f"{participant_code}-S{rec_num}",
                "screening_risk_label": 1 if has_risk_profile else 0,
                
                # Visual
                "facial_asymmetry_index": float(np.clip(base_fai + np.random.normal(0, 0.4), 1.0, 25.0)),
                "mouth_corner_asymmetry": float(np.clip(base_fai * 0.012 + np.random.normal(0, 0.005), 0.01, 0.3)),
                "eye_region_asymmetry": float(np.clip(base_fai * 0.008 + np.random.normal(0, 0.004), 0.01, 0.2)),
                "eyebrow_movement_symmetry": float(np.clip(0.95 - (0.2 if has_risk_profile else 0.0) + np.random.normal(0, 0.03), 0.4, 1.0)),
                "lip_mobility_symmetry": float(np.clip(0.96 - (0.22 if has_risk_profile else 0.0) + np.random.normal(0, 0.03), 0.4, 1.0)),
                "temporal_facial_consistency": float(np.clip(0.04 + (0.06 if has_risk_profile else 0.0) + np.random.normal(0, 0.01), 0.01, 0.2)),
                "facial_motion_range": float(np.clip(15.0 - (4.0 if has_risk_profile else 0.0) + np.random.normal(0, 1.0), 5.0, 30.0)),

                # Motor
                "dominant_motion_frequency": float(np.clip(base_tremor_freq + np.random.normal(0, 0.3), 0.5, 12.0)),
                "oscillation_amplitude": float(np.clip((5.5 if has_risk_profile else 1.8) + np.random.normal(0, 0.5), 0.5, 15.0)),
                "movement_smoothness_sparc": float(np.clip(base_sparc + np.random.normal(0, 0.15), -4.5, -0.5)),
                "motion_variability": float(np.clip((0.26 if has_risk_profile else 0.11) + np.random.normal(0, 0.02), 0.03, 0.5)),
                "peak_velocity": float(np.clip((0.65 if has_risk_profile else 1.05) + np.random.normal(0, 0.08), 0.3, 2.0)),
                "spectral_energy_ratio": float(np.clip((0.32 if has_risk_profile else 0.05) + np.random.normal(0, 0.03), 0.01, 0.8)),

                # Audio
                "mean_f0_hz": float(np.clip(160.0 + np.random.normal(0, 20.0), 85.0, 300.0)),
                "pitch_variability_st": float(np.clip((1.1 if has_risk_profile else 2.5) + np.random.normal(0, 0.2), 0.4, 5.0)),
                "jitter_percent": float(np.clip(base_jitter + np.random.normal(0, 0.15), 0.1, 8.0)),
                "shimmer_percent": float(np.clip(base_shimmer + np.random.normal(0, 0.25), 0.4, 15.0)),
                "zero_crossing_rate": float(np.clip((0.095 if has_risk_profile else 0.072) + np.random.normal(0, 0.008), 0.02, 0.25)),
                "spectral_centroid_hz": float(np.clip((2100.0 if has_risk_profile else 1800.0) + np.random.normal(0, 100.0), 1000.0, 3500.0)),
                "spectral_flux": float(np.clip(0.14 + np.random.normal(0, 0.02), 0.03, 0.4)),
                "energy_rms": float(np.clip(0.065 + np.random.normal(0, 0.01), 0.01, 0.2)),
            }
            records.append(rec)

    df = pd.DataFrame(records)
    return df

def split_dataset_by_participant(
    df: pd.DataFrame,
    test_ratio: float = 0.2,
    random_seed: int = 42
) -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    CRITICAL: Splits dataset strictly by participant ID to prevent data leakage.
    Never trains and tests on different sessions from the same individual.
    """
    unique_participants = df["participant_id"].unique()
    np.random.seed(random_seed)
    np.random.shuffle(unique_participants)

    n_test = int(len(unique_participants) * test_ratio)
    test_pids = set(unique_participants[:n_test])

    train_df = df[~df["participant_id"].isin(test_pids)].copy()
    test_df = df[df["participant_id"].isin(test_pids)].copy()

    return train_df, test_df
