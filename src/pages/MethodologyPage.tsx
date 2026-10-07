/**
 * NeuroScreen AI - Methodology & Scientific Mathematics Page
 * Mathematical equations, signal processing formulas, GBDT architecture,
 * and TreeSHAP explainability formulations.
 */

import React from 'react';
import { BookOpen, Brain, Eye, Hand, Mic, Sparkles } from 'lucide-react';
import { DisclaimerNotice } from '../components/DisclaimerNotice';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-10">
      {/* Page Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 font-semibold block">
          Technical &amp; Biomedical Mathematics
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Methodology &amp; Algorithmic Foundations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Comprehensive formulations of the computer vision landmark comparison, kinematic FFT spectral decomposition, acoustic voice perturbation algorithms, and TreeSHAP feature attribution engine.
        </p>
      </div>

      <DisclaimerNotice compact />

      {/* Section 1: Facial Biomechanics & FAI */}
      <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-800">
          <Eye className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-900">
            01. Facial Asymmetry Index (FAI) &amp; Mid-Sagittal Orthogonal Projection
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Facial landmarks are extracted per frame using a dense 468-point mesh. A mid-sagittal reference axis L<sub>mid</sub> is constructed connecting the glabella/nasion landmark p<sub>glabella</sub> to the subnasale p<sub>subnasale</sub>.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 font-mono text-xs text-slate-800 space-y-2">
          <div className="font-semibold text-slate-900">
            Orthogonal Distance to Mid-Sagittal Axis:
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            d(p) = |(p - p_nas) &times; (p_sub - p_nas)| / ||p_sub - p_nas||
          </div>

          <div className="font-semibold text-slate-900 pt-2">
            Facial Asymmetry Index (FAI):
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            FAI = (100 / N) &times; &Sigma; [ |d(p_L,i) - d(p_R,i)| / (d(p_L,i) + d(p_R,i) + &epsilon;) ]
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Where p<sub>L,i</sub> and p<sub>R,i</sub> denote corresponding symmetric anatomical landmarks (e.g., exocanthion, endocanthion, oral commissures). This formulation is invariant to uniform scale, head rotation, and distance to camera.
        </p>
      </section>

      {/* Section 2: Kinematic Motor Analysis & FFT */}
      <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-800">
          <Hand className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-900">
            02. Upper-Limb Kinematics, FFT Spectral Energy &amp; SPARC Smoothness
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Upper-extremity movement during Phase 5 is tracked at 30 FPS. Trajectory displacement signals y[n] are decomposed into frequency spectra via Discrete Fourier Transform (DFT / FFT):
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 font-mono text-xs text-slate-800 space-y-2">
          <div className="font-semibold text-slate-900">
            Fast Fourier Transform &amp; Tremor Band Power:
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            X(f) = &Sigma; y[n] &middot; e^(-j 2&pi; f n / N), &nbsp;&nbsp; P(f) = |X(f)|&sup2;
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            Tremor Energy Ratio = &int;[3.5Hz to 7.5Hz] P(f) df / &int;[0.5Hz to 15Hz] P(f) df
          </div>

          <div className="font-semibold text-slate-900 pt-2">
            Spectral Arc Length (SPARC) Smoothness Metric:
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            SPARC = -&int;[0 to &omega;_c] &radic;[ (1 / &omega;_c)&sup2; + (dV(&omega;) / d&omega;)&sup2; ] d&omega;
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          V(&omega;) is the normalized Fourier magnitude spectrum of the velocity profile. Higher SPARC values (closer to zero) indicate smooth single-peaked voluntary trajectories; lower negative values quantify submovement fragmentation.
        </p>
      </section>

      {/* Section 3: Acoustic Voice Processing */}
      <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-800">
          <Mic className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-900">
            03. Acoustic Voice Perturbation &amp; Prosodic Analysis
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The audio stream from the standardized phonation task (&ldquo;Today is a beautiful day and I am feeling well&rdquo;) is processed using normalized autocorrelation (ACF) to extract fundamental frequency (F0) periods T<sub>i</sub>:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 font-mono text-xs text-slate-800 space-y-2">
          <div className="font-semibold text-slate-900">
            Cycle-to-Cycle Vocal Jitter (Frequency Perturbation %):
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            Jitter (%) = [ (1 / (K - 1)) &times; &Sigma; |T_i - T_(i+1)| ] / [ (1 / K) &times; &Sigma; T_i ] &times; 100%
          </div>

          <div className="font-semibold text-slate-900 pt-2">
            Cycle-to-Cycle Vocal Shimmer (Amplitude Perturbation %):
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            Shimmer (%) = [ (1 / (K - 1)) &times; &Sigma; |A_i - A_(i+1)| ] / [ (1 / K) &times; &Sigma; A_i ] &times; 100%
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Clinical Multi-Dimensional Voice Program (MDVP) thresholds define normative thresholds: Jitter &lt; 1.04% and Shimmer &lt; 3.81%. Perturbations exceeding these thresholds indicate micro-instabilities in vocal fold oscillation.
        </p>
      </section>

      {/* Section 4: Machine Learning & Explainable AI (TreeSHAP) */}
      <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-800">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-900">
            04. GBDT Ensemble Architecture &amp; TreeSHAP Feature Attribution
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The 21-D fused feature vector is evaluated by an ensemble of 20 calibrated regression decision trees. Final risk classification is produced via the logistic sigmoid link function:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 font-mono text-xs text-slate-800 space-y-2">
          <div className="font-semibold text-slate-900">
            Ensemble Margin &amp; Calibrated Risk Probability:
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            y_hat(x) = base_margin + &Sigma; f_m(x), &nbsp;&nbsp; P(Elevated Risk) = 1 / (1 + e^(-y_hat(x)))
          </div>

          <div className="font-semibold text-slate-900 pt-2">
            Exact TreeSHAP Additivity Property (Lundberg et al.):
          </div>
          <div className="bg-white p-3 rounded border border-slate-200/70 overflow-x-auto text-cyan-950 font-semibold">
            &Sigma; &phi;_i(x) = y_hat(x) - E[y_hat(X)]
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          TreeSHAP guarantees that the sum of local feature attributions &phi;<sub>i</sub> exactly equals the difference between the model output and the expected baseline output, providing strict mathematical fidelity without approximation noise.
        </p>
      </section>

      {/* Section 5: Data Leakage Prevention */}
      <section className="bg-slate-50 rounded-lg border border-slate-200 p-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Data Leakage Prevention: Participant-Level Group Splitting
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          When training biomedical machine learning models, multiple recordings from the same individual exhibit shared vocal timbre, facial morphology, and baseline movement styles. Splitting samples randomly across train and test sets leads to severe data leakage and artificially inflated metrics.
        </p>
        <p className="text-xs text-slate-700 font-medium leading-relaxed">
          NeuroScreen AI mandates GroupKFold cross-validation split strictly by Participant ID (<code>participant_id</code>), ensuring that zero subjects in the test fold have ever been seen by the model during training.
        </p>
      </section>
    </div>
  );
};
