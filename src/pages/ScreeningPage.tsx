/**
 * NeuroScreen AI - Screening Preparation & Consent Page
 * Enforces mandatory ethical and research consent before biometric recording.
 * Zero collection of unnecessary PII.
 */

import React, { useState } from 'react';
import { ArrowRight, CheckSquare, Eye, FileText, Hand, Mic, ShieldAlert, Square, User, Video } from 'lucide-react';
import { DisclaimerNotice } from '../components/DisclaimerNotice';
import { PROTOCOL_PHASES } from '../components/PhaseInstruction';
import { PRESET_RESEARCH_SAMPLES } from '../services/presetSamples';
import { PresetResearchSample } from '../types';

interface ScreeningPageProps {
  onProceedToRecording: () => void;
  onProceedToUpload: () => void;
  onSelectPreset: (preset: PresetResearchSample) => void;
}

export const ScreeningPage: React.FC<ScreeningPageProps> = ({
  onProceedToRecording,
  onProceedToUpload,
  onSelectPreset,
}) => {
  // 5 Mandatory Informed Consent Items
  const [consentItems, setConsentItems] = useState({
    researchOnly: false,
    noDiagnosis: false,
    mayBeInaccurate: false,
    seekPhysician: false,
    emergencyRule: false,
  });

  const allConsented = Object.values(consentItems).every(Boolean);

  const toggleConsent = (key: keyof typeof consentItems) => {
    setConsentItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAllConsent = () => {
    setConsentItems({
      researchOnly: true,
      noDiagnosis: true,
      mayBeInaccurate: true,
      seekPhysician: true,
      emergencyRule: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Page Title */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
          Clinical Protocol Initiation
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Standardized Neuromuscular Screening Protocol
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Please review the 15-second guided recording steps and complete the mandatory research consent below.
        </p>
      </div>

      {/* Safety Notice */}
      <DisclaimerNotice />

      {/* Step 1: Protocol Overview */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Standardized 15-Second Recording Sequence
          </h2>
          <span className="text-xs font-mono text-cyan-800 font-medium">
            Total Duration: 15.0 seconds
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {PROTOCOL_PHASES.map((p) => (
            <div
              key={p.phase}
              className="p-3 bg-slate-50 rounded-md border border-slate-200/80 space-y-1.5"
            >
              <div className="flex items-center justify-between font-mono text-2xs text-slate-500">
                <span>PHASE 0{p.phase}</span>
                <span className="font-semibold text-slate-700">{p.durationSec}s</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-xs">
                {p.name.replace(/Phase \d: /, '')}
              </h3>
              <p className="text-slate-600 text-2xs leading-relaxed">
                {p.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Mandatory Informed Consent Checklist */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Mandatory Informed Research Consent
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              You must acknowledge all five statements before initiating the screening session.
            </p>
          </div>
          <button
            onClick={selectAllConsent}
            className="text-xs text-cyan-800 hover:text-cyan-900 underline font-medium cursor-pointer"
          >
            Acknowledge All
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <label className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={consentItems.researchOnly}
              onChange={() => toggleConsent('researchOnly')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500 cursor-pointer"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Academic Research Prototype:</strong> I understand that NeuroScreen AI is an academic and investigative research prototype, not an approved medical device.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={consentItems.noDiagnosis}
              onChange={() => toggleConsent('noDiagnosis')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500 cursor-pointer"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Not a Diagnostic Tool:</strong> I understand that this software does NOT diagnose Parkinson&rsquo;s disease, stroke, Bell&rsquo;s palsy, or any neurological disease.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={consentItems.mayBeInaccurate}
              onChange={() => toggleConsent('mayBeInaccurate')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500 cursor-pointer"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Potential Inaccuracy:</strong> I acknowledge that model predictions can be inaccurate due to camera angle, lighting variations, audio noise, or model limitations.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={consentItems.seekPhysician}
              onChange={() => toggleConsent('seekPhysician')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500 cursor-pointer"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Seek Professional Evaluation:</strong> I agree that if I experience persistent health concerns or movement symptoms, I will consult a licensed healthcare professional.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={consentItems.emergencyRule}
              onChange={() => toggleConsent('emergencyRule')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-500 cursor-pointer"
            />
            <span className="text-slate-700 leading-relaxed">
              <strong>Emergency Care Rule:</strong> I agree that acute or sudden symptoms (facial drooping, limb weakness, speech slurring) require immediate emergency medical services, not this application.
            </span>
          </label>
        </div>

        {/* Action Buttons to Proceed */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {allConsented ? (
              <span className="text-emerald-700 font-medium">
                Consent acknowledged. Select an entry method below.
              </span>
            ) : (
              <span>Please check all five boxes above to unlock recording.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onProceedToUpload}
              disabled={!allConsented}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
            >
              Upload Existing File
            </button>
            <button
              onClick={onProceedToRecording}
              disabled={!allConsented}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Open Camera Protocol</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 3: Research Benchmark Presets (For Evaluators & Researchers) */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Evaluation &amp; Research Benchmark Cohorts
            </h2>
            <p className="text-xs text-slate-500">
              Evaluate the ML pipeline and TreeSHAP explainability engine immediately using standardized research cohorts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {PRESET_RESEARCH_SAMPLES.map((sample) => (
            <div
              key={sample.id}
              className="p-3.5 bg-white rounded-md border border-slate-200/80 hover:border-cyan-600 transition-all shadow-2xs flex flex-col justify-between space-y-3 text-xs"
            >
              <div className="space-y-1">
                <span className="text-2xs font-mono text-cyan-800 uppercase block">
                  {sample.category.replace('_', ' ')}
                </span>
                <h3 className="font-semibold text-slate-900">
                  {sample.label}
                </h3>
                <p className="text-slate-600 text-2xs leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-2xs text-slate-400 font-mono">
                  {sample.subjectProfile}
                </span>
                <button
                  onClick={() => onSelectPreset(sample)}
                  className="px-2.5 py-1 text-2xs font-semibold text-cyan-800 hover:text-cyan-950 hover:bg-cyan-50 rounded transition-colors cursor-pointer"
                >
                  Load Cohort &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
