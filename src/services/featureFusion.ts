/**
 * NeuroScreen AI - Feature Fusion Service
 * Normalizes visual, motor, and acoustic feature vectors against
 * normative research population baselines and creates the 21-D fused vector.
 */

import {
  AcousticFeatures,
  FacialFeatures,
  MotorFeatures,
  MultimodalFeatureVector,
} from '../types';

export interface NormativeDistribution {
  mean: number;
  std: number;
  minClinicalNormal: number;
  maxClinicalNormal: number;
  unit: string;
  label: string;
  modality: 'facial' | 'motor' | 'audio';
  higherIsRiskier: boolean;
}

/**
 * Normative reference distribution statistics derived from published clinical
 * motor speech, facial biomechanics, and kinematic research benchmarks.
 */
export const NORMATIVE_BENCHMARKS: Record<keyof MultimodalFeatureVector, NormativeDistribution> = {
  // Visual features
  facial_asymmetry_index: {
    mean: 4.8,
    std: 1.6,
    minClinicalNormal: 1.5,
    maxClinicalNormal: 8.5,
    unit: '%',
    label: 'Facial Asymmetry Index (FAI)',
    modality: 'facial',
    higherIsRiskier: true,
  },
  mouth_corner_asymmetry: {
    mean: 0.05,
    std: 0.025,
    minClinicalNormal: 0.01,
    maxClinicalNormal: 0.12,
    unit: 'ratio',
    label: 'Oral Commissure Asymmetry',
    modality: 'facial',
    higherIsRiskier: true,
  },
  eye_region_asymmetry: {
    mean: 0.045,
    std: 0.02,
    minClinicalNormal: 0.01,
    maxClinicalNormal: 0.10,
    unit: 'ratio',
    label: 'Palpebral / Eye Symmetry Deviation',
    modality: 'facial',
    higherIsRiskier: true,
  },
  eyebrow_movement_symmetry: {
    mean: 0.92,
    std: 0.06,
    minClinicalNormal: 0.80,
    maxClinicalNormal: 1.0,
    unit: 'index',
    label: 'Frontalis / Eyebrow Elevation Symmetry',
    modality: 'facial',
    higherIsRiskier: false,
  },
  lip_mobility_symmetry: {
    mean: 0.94,
    std: 0.05,
    minClinicalNormal: 0.82,
    maxClinicalNormal: 1.0,
    unit: 'index',
    label: 'Lip Mobility & Smile Symmetry',
    modality: 'facial',
    higherIsRiskier: false,
  },
  temporal_facial_consistency: {
    mean: 0.045,
    std: 0.025,
    minClinicalNormal: 0.01,
    maxClinicalNormal: 0.11,
    unit: 'variance',
    label: 'Temporal Facial Movement Variability',
    modality: 'facial',
    higherIsRiskier: true,
  },
  facial_motion_range: {
    mean: 14.5,
    std: 3.2,
    minClinicalNormal: 8.0,
    maxClinicalNormal: 24.0,
    unit: 'mm',
    label: 'Voluntary Facial Motion Range',
    modality: 'facial',
    higherIsRiskier: false,
  },

  // Motor features
  dominant_motion_frequency: {
    mean: 1.4,
    std: 0.8,
    minClinicalNormal: 0.5,
    maxClinicalNormal: 3.2,
    unit: 'Hz',
    label: 'Dominant Motor Frequency',
    modality: 'motor',
    higherIsRiskier: true, // frequencies in 4-7Hz indicate kinetic tremor
  },
  oscillation_amplitude: {
    mean: 2.2,
    std: 1.1,
    minClinicalNormal: 0.5,
    maxClinicalNormal: 5.0,
    unit: 'mm',
    label: 'Kinematic Oscillation Amplitude',
    modality: 'motor',
    higherIsRiskier: true,
  },
  movement_smoothness_sparc: {
    mean: -1.45,
    std: 0.35,
    minClinicalNormal: -2.2,
    maxClinicalNormal: -0.8,
    unit: 'SPARC',
    label: 'Spectral Arc Length (Smoothness)',
    modality: 'motor',
    higherIsRiskier: false, // more negative = jerkier movement
  },
  motion_variability: {
    mean: 0.12,
    std: 0.05,
    minClinicalNormal: 0.04,
    maxClinicalNormal: 0.24,
    unit: 'CV',
    label: 'Velocity Coefficient of Variation',
    modality: 'motor',
    higherIsRiskier: true,
  },
  peak_velocity: {
    mean: 0.95,
    std: 0.28,
    minClinicalNormal: 0.45,
    maxClinicalNormal: 1.6,
    unit: 'm/s',
    label: 'Peak Voluntary Arm Velocity',
    modality: 'motor',
    higherIsRiskier: false,
  },
  spectral_energy_ratio: {
    mean: 0.08,
    std: 0.04,
    minClinicalNormal: 0.01,
    maxClinicalNormal: 0.18,
    unit: 'ratio',
    label: 'Tremor-Band Energy Ratio (4-7 Hz)',
    modality: 'motor',
    higherIsRiskier: true,
  },

  // Audio features
  mean_f0_hz: {
    mean: 165.0,
    std: 38.0,
    minClinicalNormal: 90.0,
    maxClinicalNormal: 240.0,
    unit: 'Hz',
    label: 'Mean Fundamental Frequency (F0)',
    modality: 'audio',
    higherIsRiskier: false,
  },
  pitch_variability_st: {
    mean: 2.3,
    std: 0.7,
    minClinicalNormal: 1.2,
    maxClinicalNormal: 3.8,
    unit: 'semitones',
    label: 'Pitch Prosodic Variability',
    modality: 'audio',
    higherIsRiskier: false, // reduced variability (monotone) is riskier
  },
  jitter_percent: {
    mean: 0.58,
    std: 0.22,
    minClinicalNormal: 0.1,
    maxClinicalNormal: 1.04, // clinical MDVP norm < 1.04%
    unit: '%',
    label: 'Vocal Frequency Perturbation (Jitter)',
    modality: 'audio',
    higherIsRiskier: true,
  },
  shimmer_percent: {
    mean: 2.1,
    std: 0.65,
    minClinicalNormal: 0.5,
    maxClinicalNormal: 3.81, // clinical MDVP norm < 3.81%
    unit: '%',
    label: 'Vocal Amplitude Perturbation (Shimmer)',
    modality: 'audio',
    higherIsRiskier: true,
  },
  zero_crossing_rate: {
    mean: 0.075,
    std: 0.02,
    minClinicalNormal: 0.03,
    maxClinicalNormal: 0.13,
    unit: 'rate',
    label: 'Acoustic Zero-Crossing Rate',
    modality: 'audio',
    higherIsRiskier: true,
  },
  spectral_centroid_hz: {
    mean: 1850,
    std: 320,
    minClinicalNormal: 1200,
    maxClinicalNormal: 2600,
    unit: 'Hz',
    label: 'Acoustic Spectral Centroid',
    modality: 'audio',
    higherIsRiskier: false,
  },
  spectral_flux: {
    mean: 0.15,
    std: 0.06,
    minClinicalNormal: 0.05,
    maxClinicalNormal: 0.32,
    unit: 'flux',
    label: 'Spectral Flux Dynamics',
    modality: 'audio',
    higherIsRiskier: false,
  },
  energy_rms: {
    mean: 0.068,
    std: 0.024,
    minClinicalNormal: 0.025,
    maxClinicalNormal: 0.14,
    unit: 'RMS',
    label: 'Vocal Energy Amplitude',
    modality: 'audio',
    higherIsRiskier: false,
  },
};

/**
 * Fuse individual modalities into single 21-element MultimodalFeatureVector
 */
export function fuseMultimodalFeatures(
  facial: FacialFeatures,
  motor: MotorFeatures,
  audio: AcousticFeatures
): MultimodalFeatureVector {
  return {
    facial_asymmetry_index: facial.facialAsymmetryIndex,
    mouth_corner_asymmetry: facial.mouthCornerAsymmetry,
    eye_region_asymmetry: facial.eyeRegionAsymmetry,
    eyebrow_movement_symmetry: facial.eyebrowMovementSymmetry,
    lip_mobility_symmetry: facial.lipMobilitySymmetry,
    temporal_facial_consistency: facial.temporalFacialConsistency,
    facial_motion_range: facial.maxFacialDisplacement,

    dominant_motion_frequency: motor.dominantMotionFrequencyHz,
    oscillation_amplitude: motor.oscillationAmplitude,
    movement_smoothness_sparc: motor.movementSmoothnessSparc,
    motion_variability: motor.motionVariability,
    peak_velocity: motor.peakVelocity,
    spectral_energy_ratio: motor.spectralEnergyRatio,

    mean_f0_hz: audio.meanF0Hz,
    pitch_variability_st: audio.pitchVariabilitySemitones,
    jitter_percent: audio.jitterPercent,
    shimmer_percent: audio.shimmerPercent,
    zero_crossing_rate: audio.zeroCrossingRate,
    spectral_centroid_hz: audio.spectralCentroidHz,
    spectral_flux: audio.spectralFlux,
    energy_rms: audio.energyRms,
  };
}

/**
 * Computes Z-score normalized vector for distance metrics and models
 */
export function normalizeFeatureVector(vector: MultimodalFeatureVector): Record<string, number> {
  const normalized: Record<string, number> = {};
  for (const key of Object.keys(vector) as (keyof MultimodalFeatureVector)[]) {
    const val = vector[key];
    const bench = NORMATIVE_BENCHMARKS[key];
    if (bench) {
      normalized[key] = (val - bench.mean) / bench.std;
    } else {
      normalized[key] = 0;
    }
  }
  return normalized;
}
