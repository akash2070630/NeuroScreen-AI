/**
 * NeuroScreen AI - Home Page
 * Academic research landing page introducing multimodal neuromuscular screening.
 */

import React from 'react';
import { ArrowRight, Brain, Eye, Hand, Mic, ShieldAlert, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { DisclaimerNotice } from '../components/DisclaimerNotice';
import heroImg from '../assets/images/hero_biomedical_sensor_1791338766934.jpg';
import faceImg from '../assets/images/facial_biomechanics_study_1791338780382.jpg';
import motorImg from '../assets/images/neuromotor_tremor_tracking_1791338794193.jpg';

interface HomePageProps {
  onStartScreening: () => void;
  onNavigateToMethodology: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartScreening,
  onNavigateToMethodology,
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 font-semibold block">
                Biomedical Machine Learning & Computer Vision Research
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                NeuroScreen AI
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700">
                Multimodal AI-assisted neuromuscular risk screening
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              NeuroScreen AI analyzes facial movement, motor movement, and speech characteristics from a short smartphone recording to identify patterns that may warrant professional evaluation.
            </p>

            {/* Core 4 Pillar Badges (unboxed typographic metadata) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Smartphone className="w-4 h-4 text-cyan-700" /> Non-invasive
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Eye className="w-4 h-4 text-cyan-700" /> Smartphone-based
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Brain className="w-4 h-4 text-cyan-700" /> Multimodal analysis
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Sparkles className="w-4 h-4 text-cyan-700" /> Explainable AI (SHAP)
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartScreening}
                className="px-6 py-3 text-sm font-semibold text-white bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 rounded-md transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Start Screening</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToMethodology}
                className="px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                Explore Methodology & Math
              </button>
            </div>
          </div>

          {/* Hero Clinical Asset Imagery */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-16/10 shadow-sm bg-slate-100">
              <img
                src={heroImg}
                alt="Smartphone biomedical sensor screening setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 text-white">
                <p className="text-2xs font-mono uppercase tracking-wider text-cyan-300">
                  Standardized 15-Second Recording Protocol
                </p>
                <p className="text-xs text-slate-200">
                  Simultaneous visual, kinematic, and acoustic signal synchronization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Safety Disclaimer Banner */}
      <DisclaimerNotice />

      {/* 3 Core Analytical Modalities */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
            Multimodal Feature Extraction
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Tri-Modal Biomechanical & Acoustic Profiling
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Standard smartphone sensors capture 21 engineered signals across three physiological domains, without requiring specialized medical hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Facial Biomechanics */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col">
            <div className="aspect-4/3 relative bg-slate-100 border-b border-slate-100">
              <img
                src={faceImg}
                alt="Facial biomechanics landmark symmetry vectors"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-cyan-800 text-xs font-semibold mb-1">
                  <Eye className="w-4 h-4" />
                  <span>Facial Biomechanics</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Facial Asymmetry Index (FAI)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Frame-by-frame mid-sagittal plane comparison tracking oral commissure excursion, eyebrow frontalis elevation, and palpebral fissure bilateral symmetry.
                </p>
              </div>
              <ul className="text-2xs text-slate-500 space-y-1 font-mono border-t border-slate-100 pt-3">
                <li>· Mid-sagittal orthogonal projection</li>
                <li>· Oral commissure bilateral ratio</li>
                <li>· Voluntary smile excursion stability</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Motor Kinematics */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col">
            <div className="aspect-4/3 relative bg-slate-100 border-b border-slate-100">
              <img
                src={motorImg}
                alt="Neuromotor tremor kinematics and trajectory tracking"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-cyan-800 text-xs font-semibold mb-1">
                  <Hand className="w-4 h-4" />
                  <span>Motor Kinematics</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Kinematic FFT & SPARC Smoothness
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Fast Fourier Transform decomposes upper-limb trajectory signals into frequency spectra, measuring tremor band power (3.5–7.5 Hz) and trajectory smoothness.
                </p>
              </div>
              <ul className="text-2xs text-slate-500 space-y-1 font-mono border-t border-slate-100 pt-3">
                <li>· Fast Fourier Transform (FFT) power spectra</li>
                <li>· Spectral Arc Length (SPARC) smoothness</li>
                <li>· Peak velocity coefficient of variation</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Acoustic Speech */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col">
            <div className="aspect-4/3 relative bg-slate-900 border-b border-slate-100 flex items-center justify-center p-6 text-center text-cyan-400">
              <div className="space-y-2">
                <Mic className="w-10 h-10 mx-auto text-cyan-400" />
                <span className="text-xs font-mono text-cyan-200 block">
                  PCM Waveform &amp; Vocal Spectrum
                </span>
                <span className="text-2xs font-mono text-slate-400 block">
                  Autocorrelation F0 · Jitter &middot; Shimmer
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-cyan-800 text-xs font-semibold mb-1">
                  <Mic className="w-4 h-4" />
                  <span>Acoustic Speech Analysis</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Vocal Perturbation & Prosody
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Extracts fundamental frequency (F0), cycle-to-cycle frequency perturbation (Jitter %), amplitude perturbation (Shimmer %), and pitch variability during sentence reading.
                </p>
              </div>
              <ul className="text-2xs text-slate-500 space-y-1 font-mono border-t border-slate-100 pt-3">
                <li>· Autocorrelation pitch extraction (F0)</li>
                <li>· Cycle perturbation quotient (Jitter/Shimmer)</li>
                <li>· Prosodic pitch variability in semitones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End Workflow */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
            Core Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Standardized Screening & Explainability Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            How multimodal smartphone data is processed into an explainable risk stratification report.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <span className="font-mono text-2xs text-cyan-800 font-semibold block">01. INGESTION</span>
            <h4 className="font-semibold text-slate-900 text-sm">15s Recording Protocol</h4>
            <p className="text-slate-600 leading-relaxed">
              Guided 6-phase capture: resting face, smile, eyebrow raise, eye blink, arm movement, and sentence reading.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <span className="font-mono text-2xs text-cyan-800 font-semibold block">02. SIGNAL EXTRACTION</span>
            <h4 className="font-semibold text-slate-900 text-sm">Vision &amp; Audio Processing</h4>
            <p className="text-slate-600 leading-relaxed">
              Calculates FAI facial symmetry, kinematic FFT frequency power, and acoustic vocal perturbation quotients.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <span className="font-mono text-2xs text-cyan-800 font-semibold block">03. MULTIMODAL ML</span>
            <h4 className="font-semibold text-slate-900 text-sm">Gradient Boosted Ensemble</h4>
            <p className="text-slate-600 leading-relaxed">
              20 calibrated regression trees score the 21-D fused vector with logistic sigmoid link to estimate screening risk.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <span className="font-mono text-2xs text-cyan-800 font-semibold block">04. EXPLAINABLE AI</span>
            <h4 className="font-semibold text-slate-900 text-sm">TreeSHAP &amp; Referral</h4>
            <p className="text-slate-600 leading-relaxed">
              Decomposes model log-odds into exact feature attributions and generates tailored medical referral recommendations.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onStartScreening}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-md transition-colors shadow-xs cursor-pointer"
          >
            Start Standardized Protocol
          </button>
        </div>
      </section>
    </div>
  );
};
