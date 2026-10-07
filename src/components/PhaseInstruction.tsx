/**
 * NeuroScreen AI - Recording Phase Prompter
 * Guides the user through the 6 standardized recording phases:
 * 1. Resting Face
 * 2. Smile
 * 3. Raise Eyebrows
 * 4. Close and Open Eyes
 * 5. Simple Arm Movement
 * 6. Speech Sample ("Today is a beautiful day and I am feeling well.")
 */

import React from 'react';
import { ProtocolPhaseInfo, ScreeningPhase } from '../types';
import { Eye, Hand, MessageSquare, Smile, User, Volume2 } from 'lucide-react';

export const PROTOCOL_PHASES: ProtocolPhaseInfo[] = [
  {
    phase: 1,
    name: 'Phase 1: Resting Face',
    durationSec: 2,
    instruction: 'Look straight at the camera with a neutral, relaxed expression.',
    details: 'Keep head still and relax facial muscles to establish baseline facial symmetry.',
    targetFeatures: ['Neutral Mid-sagittal Symmetry', 'Resting Palpebral Fissures'],
  },
  {
    phase: 2,
    name: 'Phase 2: Smile',
    durationSec: 2,
    instruction: 'Show a full, natural smile showing your teeth if comfortable.',
    details: 'Tests voluntary bilateral contraction of the zygomaticus major and risorius muscles.',
    targetFeatures: ['Oral Commissure Excursion', 'Nasolabial Fold Bilateral Depth'],
  },
  {
    phase: 3,
    name: 'Phase 3: Raise Eyebrows',
    durationSec: 2,
    instruction: 'Raise both eyebrows high toward your forehead.',
    details: 'Tests bilateral frontalis muscle elevation and forehead crease symmetry.',
    targetFeatures: ['Frontalis Elevation Symmetry', 'Superciliary Displacement'],
  },
  {
    phase: 4,
    name: 'Phase 4: Close & Open Eyes',
    durationSec: 2,
    instruction: 'Gently close both eyes firmly, then open them wide.',
    details: 'Tests orbicularis oculi muscle closure strength and symmetry.',
    targetFeatures: ['Orbicularis Oculi Symmetry', 'Palpebral Closure Completeness'],
  },
  {
    phase: 5,
    name: 'Phase 5: Arm Movement',
    durationSec: 3,
    instruction: 'Raise your right arm forward and hold steady or tap your fingers.',
    details: 'Monitors upper-extremity kinetic stability, postural oscillation, and SPARC smoothness.',
    targetFeatures: ['Tremor Band FFT (3-8 Hz)', 'Kinematic SPARC Smoothness', 'Velocity CV'],
  },
  {
    phase: 6,
    name: 'Phase 6: Speech Sample',
    durationSec: 4,
    instruction: 'Say clearly: "Today is a beautiful day and I am feeling well."',
    details: 'Captures vocal acoustic resonance, pitch variability, jitter, and shimmer.',
    targetFeatures: ['F0 Fundamental Pitch', 'Cycle Jitter & Shimmer', 'Spectral Centroid'],
  },
];

interface PhaseInstructionProps {
  currentPhase: ScreeningPhase;
  phaseElapsedSec: number;
  totalElapsedSec: number;
  isRecording: boolean;
}

export const PhaseInstruction: React.FC<PhaseInstructionProps> = ({
  currentPhase,
  phaseElapsedSec,
  totalElapsedSec,
  isRecording,
}) => {
  const activeInfo = PROTOCOL_PHASES.find((p) => p.phase === currentPhase) || PROTOCOL_PHASES[0];
  const progressPercent = Math.min(100, (phaseElapsedSec / activeInfo.durationSec) * 100);

  const getPhaseIcon = (phase: ScreeningPhase) => {
    switch (phase) {
      case 1:
        return <User className="w-5 h-5 text-cyan-700" />;
      case 2:
        return <Smile className="w-5 h-5 text-cyan-700" />;
      case 3:
      case 4:
        return <Eye className="w-5 h-5 text-cyan-700" />;
      case 5:
        return <Hand className="w-5 h-5 text-cyan-700" />;
      case 6:
        return <Volume2 className="w-5 h-5 text-cyan-700" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {getPhaseIcon(currentPhase)}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {activeInfo.name}
            </h3>
            <span className="text-xs text-slate-500">
              Step {currentPhase} of 6 · Standardized 15-second protocol
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 block">Total Protocol Time</span>
          <span className="text-base font-mono font-semibold text-slate-800 tabular-nums">
            {totalElapsedSec.toFixed(1)}s / 15.0s
          </span>
        </div>
      </div>

      {/* Main instruction box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-md p-4 mb-4">
        <p className="text-base sm:text-lg font-medium text-slate-900 mb-1">
          {activeInfo.instruction}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          {activeInfo.details}
        </p>

        {currentPhase === 6 && (
          <div className="mt-3 p-3 bg-cyan-50/70 border border-cyan-200/80 rounded text-cyan-950 font-medium text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>&ldquo;Today is a beautiful day and I am feeling well.&rdquo;</span>
          </div>
        )}
      </div>

      {/* Progress countdown for this phase */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500 font-mono">
          <span>Phase duration</span>
          <span>
            {phaseElapsedSec.toFixed(1)}s / {activeInfo.durationSec}s
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-cyan-700 h-full transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tracked features info */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-700">Target metrics:</span>
        {activeInfo.targetFeatures.map((feat, idx) => (
          <span key={idx}>
            {feat}
            {idx < activeInfo.targetFeatures.length - 1 && <span className="mx-1 text-slate-300">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
};
