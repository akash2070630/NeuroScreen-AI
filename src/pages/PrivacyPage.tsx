/**
 * NeuroScreen AI - Privacy & Data Governance Page
 * Clear documentation of local-first processing, zero raw video storage,
 * and ethical biometric governance.
 */

import React from 'react';
import { CheckCircle2, Lock, Shield, ShieldCheck, UserX } from 'lucide-react';
import { DisclaimerNotice } from '../components/DisclaimerNotice';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 font-semibold block">
          Ethics &amp; Data Protection
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Privacy Policy &amp; Data Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          NeuroScreen AI is engineered with a strict local-first data architecture. We prioritize privacy, data minimization, and biometric integrity.
        </p>
      </div>

      <DisclaimerNotice compact />

      {/* Core Privacy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="p-2 bg-cyan-50 text-cyan-800 rounded-md w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Zero Permanent Video Storage
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Raw camera video frames are processed ephemerally in device RAM for facial landmark calculation and immediately discarded. No video streams are saved to permanent disk or central cloud databases.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="p-2 bg-cyan-50 text-cyan-800 rounded-md w-fit">
            <UserX className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Zero Collection of PII
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not collect names, phone numbers, home addresses, government identifiers (e.g. Aadhaar, SSN), or email addresses. Screenings use anonymous randomized session identifiers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="p-2 bg-cyan-50 text-cyan-800 rounded-md w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Local In-Memory Audio Extraction
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Acoustic features (F0, Jitter, Shimmer, RMS) are extracted locally using the browser AudioContext. Raw voice recordings are never logged or transmitted to third-party endpoints.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-900">
            1. What Data is Processed?
          </h3>
          <p>
            During the standardized 15-second protocol, the system temporarily processes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
            <li>Facial landmark geometric coordinates (mid-sagittal distances, oral commissures).</li>
            <li>Kinematic wrist displacement coordinates over time.</li>
            <li>Acoustic waveform PCM audio buffers during the spoken sentence phase.</li>
          </ul>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <h3 className="text-base font-semibold text-slate-900">
            2. Third-Party Upload Governance
          </h3>
          <p>
            Users must not record or upload audio/video files of other individuals without explicit informed consent. All uploads must represent either the user themselves or authorized research subjects participating in approved IRB studies.
          </p>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <h3 className="text-base font-semibold text-slate-900">
            3. Data Retention &amp; Session Lifecycle
          </h3>
          <p>
            All extracted mathematical arrays exist only for the duration of the browser tab. Refreshing or closing the tab completely clears all in-memory matrices, feature vectors, and generated reports.
          </p>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <h3 className="text-base font-semibold text-slate-900">
            4. Research Dataset Ethics
          </h3>
          <p>
            Any future model retraining relies exclusively on ethically collected, de-identified, open-access biomedical repositories (e.g. PhysioNet, mPower, Toronto Neuroface, Voice Icaro) under appropriate academic data use agreements.
          </p>
        </div>
      </div>
    </div>
  );
};
