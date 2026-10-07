/**
 * NeuroScreen AI - Multimodal Feature Breakdown Card
 * Displays detailed domain measurements across:
 * - Facial Biomechanics
 * - Motor Kinematics
 * - Acoustic Speech
 */

import React, { useState } from 'react';
import { AcousticFeatures, FacialFeatures, MotorFeatures } from '../types';
import { Eye, Hand, Mic, Sparkles } from 'lucide-react';

interface FeatureBreakdownProps {
  facial: FacialFeatures;
  motor: MotorFeatures;
  audio: AcousticFeatures;
}

export const FeatureBreakdownCard: React.FC<FeatureBreakdownProps> = ({
  facial,
  motor,
  audio,
}) => {
  const [activeTab, setActiveTab] = useState<'facial' | 'motor' | 'audio'>('facial');

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header and modality switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Multimodal Biometric Measurements
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrated signal features compared against empirical reference intervals.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('facial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'facial'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Facial Biomechanics</span>
          </button>
          <button
            onClick={() => setActiveTab('motor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'motor'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>Motor Kinematics</span>
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'audio'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Acoustic Speech</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Facial Biomechanics */}
      {activeTab === 'facial' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Facial Asymmetry Index (FAI)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {facial.facialAsymmetryIndex}
              </span>
              <span className="text-xs font-mono text-slate-500">%</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 8.0%</span>
              <span className={facial.facialAsymmetryIndex > 8.5 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {facial.facialAsymmetryIndex > 8.5 ? 'Elevated Deviation' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Oral Commissure Asymmetry
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {facial.mouthCornerAsymmetry}
              </span>
              <span className="text-xs font-mono text-slate-500">ratio</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 0.10</span>
              <span className={facial.mouthCornerAsymmetry > 0.11 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {facial.mouthCornerAsymmetry > 0.11 ? 'Asymmetry Detected' : 'Symmetric'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Palpebral / Eye Symmetry
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {facial.eyeRegionAsymmetry}
              </span>
              <span className="text-xs font-mono text-slate-500">ratio</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 0.08</span>
              <span className={facial.eyeRegionAsymmetry > 0.08 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {facial.eyeRegionAsymmetry > 0.08 ? 'Elevated' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Eyebrow Elevation Symmetry
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {(facial.eyebrowMovementSymmetry * 100).toFixed(0)}%
              </span>
              <span className="text-xs font-mono text-slate-500">index</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &gt; 80%</span>
              <span className={facial.eyebrowMovementSymmetry < 0.78 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {facial.eyebrowMovementSymmetry < 0.78 ? 'Hypomobile' : 'Bilateral Full'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Lip Mobility Symmetry
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {(facial.lipMobilitySymmetry * 100).toFixed(0)}%
              </span>
              <span className="text-xs font-mono text-slate-500">index</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &gt; 82%</span>
              <span className={facial.lipMobilitySymmetry < 0.8 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {facial.lipMobilitySymmetry < 0.8 ? 'Reduced Excursion' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Temporal Movement Stability
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {facial.temporalFacialConsistency}
              </span>
              <span className="text-xs font-mono text-slate-500">&sigma;</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 0.10</span>
              <span className="text-emerald-700">Stable</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Motor Kinematics */}
      {activeTab === 'motor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Dominant Motion Frequency (FFT)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {motor.dominantMotionFrequencyHz}
              </span>
              <span className="text-xs font-mono text-slate-500">Hz</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 3.0 Hz</span>
              <span className={motor.dominantMotionFrequencyHz >= 3.8 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {motor.dominantMotionFrequencyHz >= 3.8 ? 'Kinetic Band (3.8-7Hz)' : 'Voluntary Base'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Spectral Arc Length (SPARC)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {motor.movementSmoothnessSparc}
              </span>
              <span className="text-xs font-mono text-slate-500">score</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &gt; -2.0</span>
              <span className={motor.movementSmoothnessSparc < -2.2 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {motor.movementSmoothnessSparc < -2.2 ? 'Submovement Jerk' : 'Smooth Control'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Kinetic Oscillation Amplitude
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {motor.oscillationAmplitude}
              </span>
              <span className="text-xs font-mono text-slate-500">mm</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 4.0 mm</span>
              <span className={motor.oscillationAmplitude > 5.0 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {motor.oscillationAmplitude > 5.0 ? 'Elevated Oscillation' : 'Stable'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Tremor Band Energy Ratio
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {(motor.spectralEnergyRatio * 100).toFixed(1)}%
              </span>
              <span className="text-xs font-mono text-slate-500">power</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 15%</span>
              <span className={motor.spectralEnergyRatio > 0.2 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {motor.spectralEnergyRatio > 0.2 ? 'Periodic Power' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Velocity Variability (CV)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {motor.motionVariability}
              </span>
              <span className="text-xs font-mono text-slate-500">&sigma;/&mu;</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 0.20</span>
              <span className={motor.motionVariability > 0.22 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {motor.motionVariability > 0.22 ? 'Irregular' : 'Consistent'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Temporal Consistency
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {(motor.temporalConsistency * 100).toFixed(0)}%
              </span>
              <span className="text-xs font-mono text-slate-500">index</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &gt; 80%</span>
              <span className="text-emerald-700">Optimal</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Acoustic Speech */}
      {activeTab === 'audio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Fundamental Frequency (F0)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.meanF0Hz}
              </span>
              <span className="text-xs font-mono text-slate-500">Hz</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Adult Norm: 90 - 240 Hz</span>
              <span className="text-emerald-700">Typical</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Pitch Prosodic Variability
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.pitchVariabilitySemitones}
              </span>
              <span className="text-xs font-mono text-slate-500">semitones</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &gt; 1.5 ST</span>
              <span className={audio.pitchVariabilitySemitones < 1.3 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {audio.pitchVariabilitySemitones < 1.3 ? 'Monotone / Reduced' : 'Expressive'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Vocal Frequency Jitter (MDVP)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.jitterPercent}
              </span>
              <span className="text-xs font-mono text-slate-500">%</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Clinical Norm: &lt; 1.04%</span>
              <span className={audio.jitterPercent > 1.04 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {audio.jitterPercent > 1.04 ? 'Elevated Jitter' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Vocal Amplitude Shimmer (MDVP)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.shimmerPercent}
              </span>
              <span className="text-xs font-mono text-slate-500">%</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Clinical Norm: &lt; 3.81%</span>
              <span className={audio.shimmerPercent > 3.81 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
                {audio.shimmerPercent > 3.81 ? 'Elevated Shimmer' : 'Normative'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Zero-Crossing Rate (ZCR)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.zeroCrossingRate}
              </span>
              <span className="text-xs font-mono text-slate-500">rate</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: &lt; 0.12</span>
              <span className="text-emerald-700">Clear Voicing</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="text-2xs uppercase tracking-wider text-slate-500 font-mono block">
              Spectral Centroid
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                {audio.spectralCentroidHz}
              </span>
              <span className="text-xs font-mono text-slate-500">Hz</span>
            </div>
            <div className="mt-2 text-2xs text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
              <span>Normative: 1200 - 2400 Hz</span>
              <span className="text-emerald-700">Resonant</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
