/**
 * NeuroScreen AI - Type Definitions
 * Multimodal Neuromuscular Risk Screening and Explainable AI Platform
 */

export type PageView =
  | 'home'
  | 'screening'
  | 'recording'
  | 'processing'
  | 'results'
  | 'methodology'
  | 'privacy'
  | 'about';

export type ScreeningPhase =
  | 1 // Phase 1: Resting Face (2s)
  | 2 // Phase 2: Smile (2s)
  | 3 // Phase 3: Raise Eyebrows (2s)
  | 4 // Phase 4: Close and Open Eyes (2s)
  | 5 // Phase 5: Simple Arm Movement (3s)
  | 6; // Phase 6: Speech Sample (4s)

export interface ProtocolPhaseInfo {
  phase: ScreeningPhase;
  name: string;
  durationSec: number;
  instruction: string;
  details: string;
  targetFeatures: string[];
}

export interface Point2D {
  x: number;
  y: number;
  z?: number;
}

export interface LandmarkPair {
  left: Point2D;
  right: Point2D;
  name: string;
}

export interface FacialFeatures {
  facialAsymmetryIndex: number; // FAI: 0 - 100%
  mouthCornerAsymmetry: number; // normalized asymmetry
  eyeRegionAsymmetry: number; // normalized asymmetry
  eyebrowMovementSymmetry: number; // 0 - 1 (1 is perfect symmetry)
  lipMobilitySymmetry: number; // 0 - 1
  temporalFacialConsistency: number; // variance over time
  maxFacialDisplacement: number; // mm / normalized
}

export interface MotorFeatures {
  dominantMotionFrequencyHz: number; // from FFT (e.g. 3-8 Hz)
  oscillationAmplitude: number; // mm / normalized
  movementSmoothnessSparc: number; // Spectral Arc Length (dimensionless)
  motionVariability: number; // standard deviation of velocity
  peakVelocity: number; // normalized
  spectralEnergyRatio: number; // ratio of 4-7Hz tremor band power to total power
  temporalConsistency: number; // 0 - 1
}

export interface AcousticFeatures {
  meanF0Hz: number; // Fundamental frequency in Hz (norm: 85-255 Hz)
  pitchVariabilitySemitones: number; // F0 standard deviation in semitones
  jitterPercent: number; // cycle-to-cycle perturbation (norm: < 1.04%)
  shimmerPercent: number; // amplitude perturbation quotient (norm: < 3.8%)
  zeroCrossingRate: number; // voicing / noise ratio
  spectralCentroidHz: number; // brightness / resonance
  spectralFlux: number; // rate of spectral change
  energyRms: number; // root mean square volume
  speechDurationSec: number; // total duration of speech sample
  phonationRatio: number; // voiced vs unvoiced time
}

export interface MultimodalFeatureVector {
  // Visual features
  facial_asymmetry_index: number;
  mouth_corner_asymmetry: number;
  eye_region_asymmetry: number;
  eyebrow_movement_symmetry: number;
  lip_mobility_symmetry: number;
  temporal_facial_consistency: number;
  facial_motion_range: number;

  // Motor features
  dominant_motion_frequency: number;
  oscillation_amplitude: number;
  movement_smoothness_sparc: number;
  motion_variability: number;
  peak_velocity: number;
  spectral_energy_ratio: number;

  // Audio features
  mean_f0_hz: number;
  pitch_variability_st: number;
  jitter_percent: number;
  shimmer_percent: number;
  zero_crossing_rate: number;
  spectral_centroid_hz: number;
  spectral_flux: number;
  energy_rms: number;
}

export type RiskTier = 'low' | 'moderate' | 'elevated';

export interface ShapContribution {
  featureName: string;
  featureKey: keyof MultimodalFeatureVector;
  modality: 'facial' | 'motor' | 'audio';
  featureValue: number;
  normativeMean: number;
  normativeStd: number;
  shapValue: number; // log-odds attribution phi_i
  relativeImpact: 'low' | 'moderate' | 'elevated' | 'protective';
  clinicalInterpretation: string;
}

export interface ScreeningReport {
  screeningId: string;
  timestamp: string;
  riskTier: RiskTier;
  riskScorePercent: number; // calibrated probability 0 - 100
  confidenceInterval: [number, number]; // e.g. [76, 88]
  modelMetadata: {
    modelName: string;
    modelVersion: string;
    featureVersion: string;
    engineType: string;
  };
  facialFeatures: FacialFeatures;
  motorFeatures: MotorFeatures;
  acousticFeatures: AcousticFeatures;
  multimodalVector: MultimodalFeatureVector;
  shapContributions: ShapContribution[];
  baseExpectedValue: number;
  finalLogOdds: number;
  recommendations: string[];
  protocolCompliance: {
    durationValid: boolean;
    faceDetectedFrames: number;
    poseDetectedFrames: number;
    audioTrackPresent: boolean;
    overallQuality: 'optimal' | 'acceptable' | 'suboptimal';
    qualityNotes: string[];
  };
}

export interface PresetResearchSample {
  id: string;
  label: string;
  category: 'normative' | 'facial_asymmetry' | 'kinetic_instability' | 'vocal_dysphonia';
  description: string;
  subjectProfile: string;
  syntheticVector: MultimodalFeatureVector;
  facial: FacialFeatures;
  motor: MotorFeatures;
  audio: AcousticFeatures;
}
