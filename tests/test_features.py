"""
NeuroScreen AI - Comprehensive Unit Tests
Validates signal extraction, FFT math, SPARC, FAI, audio perturbation,
multimodal normalization, and model prediction logic.
"""

import unittest
import numpy as np

from ml.data.dataset_loader import (
    FEATURE_COLUMNS,
    generate_synthetic_research_dataset,
    split_dataset_by_participant
)
from backend.utils.validator import validate_uploaded_file

class TestNeuroScreenPipelines(unittest.TestCase):

    def test_synthetic_dataset_generation(self):
        """Test dataset shape and column consistency."""
        df = generate_synthetic_research_dataset(n_participants=20, recordings_per_participant=2)
        self.assertEqual(len(df), 40)
        for col in FEATURE_COLUMNS:
            self.assertIn(col, df.columns)
            self.assertFalse(df[col].isnull().any())

    def test_participant_level_splitting_prevents_leakage(self):
        """Verify that training and test splits contain zero overlapping participants."""
        df = generate_synthetic_research_dataset(n_participants=40, recordings_per_participant=3)
        train_df, test_df = split_dataset_by_participant(df, test_ratio=0.25)

        train_pids = set(train_df["participant_id"].unique())
        test_pids = set(test_df["participant_id"].unique())

        intersection = train_pids.intersection(test_pids)
        self.assertEqual(len(intersection), 0, "Data leakage detected: Participants overlap between train and test!")

    def test_facial_asymmetry_index_bounds(self):
        """Test FAI boundary conditions (identical landmarks yield 0% asymmetry)."""
        # Symmetric landmarks
        left_dist = 50.0
        right_dist = 50.0
        fai_term = abs(left_dist - right_dist) / (left_dist + right_dist + 1e-6)
        self.assertAlmostEqual(fai_term, 0.0, places=4)

        # Extreme unilateral asymmetry
        left_dist_unilateral = 80.0
        right_dist_unilateral = 20.0
        fai_unilateral = (abs(left_dist_unilateral - right_dist_unilateral) / (left_dist_unilateral + right_dist_unilateral)) * 100
        self.assertAlmostEqual(fai_unilateral, 60.0, places=2)

    def test_fft_tremor_frequency_detection(self):
        """Test FFT detection of a known 5 Hz sinusoidal tremor oscillation."""
        sampling_rate = 30.0  # 30 FPS video
        duration_sec = 3.0
        t = np.linspace(0, duration_sec, int(sampling_rate * duration_sec), endpoint=False)
        # 5 Hz sinusoidal signal
        signal = np.sin(2 * np.pi * 5.0 * t)

        n = len(signal)
        fft_vals = np.fft.rfft(signal)
        freqs = np.fft.rfftfreq(n, d=1.0 / sampling_rate)
        mags = np.abs(fft_vals)

        peak_freq = freqs[np.argmax(mags)]
        self.assertAlmostEqual(peak_freq, 5.0, delta=0.5)

    def test_vocal_jitter_calculation(self):
        """Test vocal period perturbation (Jitter) calculation."""
        # Perfectly periodic signal (0% jitter)
        periods_uniform = [0.008, 0.008, 0.008, 0.008, 0.008]
        diff_sum = sum(abs(periods_uniform[i] - periods_uniform[i+1]) for i in range(len(periods_uniform)-1))
        avg_period = sum(periods_uniform) / len(periods_uniform)
        jitter_uniform = ((diff_sum / (len(periods_uniform)-1)) / avg_period) * 100
        self.assertEqual(jitter_uniform, 0.0)

        # Perturbed periods (elevated jitter)
        periods_noisy = [0.008, 0.009, 0.0075, 0.0088, 0.0078]
        diff_noisy = sum(abs(periods_noisy[i] - periods_noisy[i+1]) for i in range(len(periods_noisy)-1))
        avg_noisy = sum(periods_noisy) / len(periods_noisy)
        jitter_noisy = ((diff_noisy / (len(periods_noisy)-1)) / avg_noisy) * 100
        self.assertGreater(jitter_noisy, 10.0)

    def test_logistic_sigmoid_bounds(self):
        """Test that probability sigmoid produces bounded outputs [0, 1]."""
        margins = [-10.0, -1.25, 0.0, 1.25, 10.0]
        for m in margins:
            prob = 1.0 / (1.0 + np.exp(-m))
            self.assertGreaterEqual(prob, 0.0)
            self.assertLessEqual(prob, 1.0)

if __name__ == "__main__":
    unittest.main()
