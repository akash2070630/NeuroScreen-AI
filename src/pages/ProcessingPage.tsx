/**
 * NeuroScreen AI - Telemetry Processing Pipeline Page
 * Renders real-time telemetry log and progression across the 6 extraction stages:
 * Video decode -> Landmark extraction -> Kinematics -> Audio -> Fusion -> GBDT + TreeSHAP.
 */

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, Cpu, Eye, Hand, Mic, Sparkles } from 'lucide-react';
import { AcousticFeatures, FacialFeatures, MotorFeatures, ScreeningReport } from '../types';
import { generateScreeningReport } from '../services/screeningService';

interface ProcessingPageProps {
  inputData: {
    facial: FacialFeatures;
    motor: MotorFeatures;
    audio: AcousticFeatures;
  };
  onComplete: (report: ScreeningReport) => void;
}

interface PipelineStep {
  id: string;
  name: string;
  detail: string;
  icon: React.ReactNode;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'decode',
    name: 'Signal Ingestion & Stream Synchronization',
    detail: 'Separating 30 FPS video frames and 44.1 kHz PCM audio buffer.',
    icon: <Activity className="w-4 h-4 text-cyan-700" />,
  },
  {
    id: 'face',
    name: 'Facial Landmark & Mid-sagittal Symmetry Analysis',
    detail: 'Projecting symmetric landmark pairs orthogonal to glabella-subnasale axis to derive FAI.',
    icon: <Eye className="w-4 h-4 text-cyan-700" />,
  },
  {
    id: 'motor',
    name: 'Motor Kinematics & FFT Frequency Decomposition',
    detail: 'Executing 1D FFT on wrist trajectory; measuring 3.5–7.5 Hz tremor band power & SPARC.',
    icon: <Hand className="w-4 h-4 text-cyan-700" />,
  },
  {
    id: 'audio',
    name: 'Acoustic Voice Perturbation & Prosody Extraction',
    detail: 'Computing autocorrelation F0, MDVP cycle-to-cycle Jitter %, Shimmer %, and spectral centroid.',
    icon: <Mic className="w-4 h-4 text-cyan-700" />,
  },
  {
    id: 'fusion',
    name: 'Multimodal 21-D Feature Fusion & Normalization',
    detail: 'Z-score normalizing visual, motor, and acoustic signals against normative research baselines.',
    icon: <Cpu className="w-4 h-4 text-cyan-700" />,
  },
  {
    id: 'shap',
    name: 'GBDT Ensemble Inference & TreeSHAP Attribution',
    detail: 'Traversing 20 calibrated regression trees to compute log-odds and exact Shapley feature values.',
    icon: <Sparkles className="w-4 h-4 text-cyan-700" />,
  },
];

export const ProcessingPage: React.FC<ProcessingPageProps> = ({
  inputData,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'Initializing multimodal signal processing runtime...',
  ]);

  useEffect(() => {
    const stepDuration = 550; // ms per step for clean responsive review

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next < PIPELINE_STEPS.length) {
          const step = PIPELINE_STEPS[next];
          setTelemetryLogs((logs) => [
            ...logs,
            `[STAGE ${next + 1}/6] ${step.name}: ${step.detail}`,
          ]);
          return next;
        } else {
          clearInterval(timer);
          // Finalize and generate full screening report
          setTimeout(() => {
            const finalReport = generateScreeningReport(
              inputData.facial,
              inputData.motor,
              inputData.audio
            );
            onComplete(finalReport);
          }, 300);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inputData, onComplete]);

  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + 1) / PIPELINE_STEPS.length) * 100)
  );

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      {/* Telemetry Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 font-semibold block">
          Telemetry &amp; Feature Extraction Pipeline
        </span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Processing Biometric Signals
        </h1>
        <p className="text-xs text-slate-500">
          Executing real-time computer vision, signal FFT, acoustic signal processing, and TreeSHAP explainability.
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-600 font-semibold">
            Stage {Math.min(currentStepIndex + 1, 6)} of 6
          </span>
          <span className="text-cyan-800 font-bold tabular-nums">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-cyan-700 h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 shadow-xs">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`p-4 flex items-start gap-3.5 transition-colors ${
                isCurrent ? 'bg-cyan-50/50' : 'bg-white'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-700 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-50" />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs sm:text-sm font-semibold ${
                      isCurrent
                        ? 'text-cyan-950'
                        : isDone
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.name}
                  </h4>
                  <span className="text-2xs font-mono text-slate-400">
                    {isDone ? 'COMPLETED' : isCurrent ? 'EXECUTING' : 'QUEUED'}
                  </span>
                </div>
                <p className="text-2xs sm:text-xs text-slate-500 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Telemetry Terminal Log */}
      <div className="bg-slate-950 text-slate-300 rounded-lg p-4 font-mono text-2xs space-y-1.5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
          <span className="uppercase text-3xs tracking-wider">Live Processing Console</span>
          <span className="text-emerald-400 text-3xs">● ACTIVE</span>
        </div>
        <div className="space-y-1 max-h-36 overflow-y-auto pr-2">
          {telemetryLogs.map((log, i) => (
            <div key={i} className="text-slate-300">
              <span className="text-slate-600 select-none mr-2">&gt;</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
