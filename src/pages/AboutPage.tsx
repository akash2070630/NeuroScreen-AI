/**
 * NeuroScreen AI - About & Academic Research Page
 * Project overview, research goals, team principles, limitations, and citations.
 */

import React from 'react';
import { BookOpen, FileCheck, Info, ShieldAlert, Users } from 'lucide-react';
import { DisclaimerNotice } from '../components/DisclaimerNotice';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 font-semibold block">
          Academic Research Initiative
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          About NeuroScreen AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          An open academic research prototype exploring multimodal smartphone sensing for preliminary neuromuscular risk screening and explainable AI referral support.
        </p>
      </div>

      <DisclaimerNotice />

      {/* Research Mission */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base font-semibold text-slate-900">
          Research Mission &amp; Clinical Background
        </h2>
        <p>
          Neuromuscular and neurodegenerative conditions frequently manifest with subtle, insidious early signs across motor control, facial symmetry, and vocal tract dynamics. In underserved and remote communities, access to specialized movement disorder neurologists, speech-language pathologists, and neuromuscular clinics can involve delays of several months.
        </p>
        <p>
          NeuroScreen AI investigates whether standard smartphone cameras and microphones can execute a non-invasive 15-second standardized assessment protocol to identify measurable signal deviations. By pairing gradient boosted ensemble models with exact TreeSHAP feature attributions, the platform aims to provide transparent, interpretable evidence that patients and clinicians can discuss collaboratively.
        </p>
      </div>

      {/* Explicit Scientific Boundaries & Anti-Hype Commitments */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="flex items-center gap-2 text-rose-700">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-base font-semibold text-slate-900">
            Scientific Rigor &amp; Non-Diagnostic Scope
          </h2>
        </div>
        <p>
          To maintain strict scientific and clinical integrity, NeuroScreen AI adheres to the following commitments:
        </p>
        <div className="space-y-2 pt-1 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <strong>No Diagnostic Claims:</strong> NeuroScreen AI never claims to diagnose Parkinson&rsquo;s disease, stroke, Bell&rsquo;s palsy, ALS, essential tremor, or any neurological condition. Diagnosis requires comprehensive in-person clinical examinations, imaging (MRI/CT), and electromyography (EMG).
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <strong>No Fabricated Accuracy Statistics:</strong> We do not publish unverified marketing percentages (such as &ldquo;98% accurate&rdquo;). Current evaluations are designated as: <em>&ldquo;Research prototype — model requires validated clinical datasets for clinical evaluation.&rdquo;</em>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <strong>Strict Participant-Level Splitting:</strong> All validation protocols enforce subject-isolated partitioning (GroupKFold) to prevent cross-participant data leakage.
          </div>
        </div>
      </div>

      {/* Key Limitations */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base font-semibold text-slate-900">
          Known Limitations
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
          <li><strong>Environmental Lighting:</strong> Asymmetric shadows or direct glare can bias mid-sagittal facial landmark coordinates.</li>
          <li><strong>Smartphone Mic Quality:</strong> Variations in hardware frequency response, automatic gain control (AGC), and ambient noise can affect acoustic jitter and shimmer calculations.</li>
          <li><strong>Demographic Representation:</strong> Research models require balanced training cohorts across diverse age groups, gender expressions, and ethnic facial morphology before any clinical deployment.</li>
        </ul>
      </div>

      {/* Research Citations */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3 text-2xs text-slate-600 font-mono">
        <h3 className="font-semibold text-slate-800 uppercase tracking-wider text-xs">
          Scientific References
        </h3>
        <ol className="list-decimal pl-4 space-y-1.5">
          <li>Lundberg, S. M., et al. (2020). <em>From local explanations to global understanding with explainable AI for trees</em>. Nature Machine Intelligence, 2(1), 56-67.</li>
          <li>Balasubramanian, S., et al. (2015). <em>On the analysis of movement smoothness</em>. Journal of NeuroEngineering and Rehabilitation, 12(1), 1-11.</li>
          <li>Boersma, P. (1993). <em>Accurate short-term analysis of the fundamental frequency and the harmonics-to-noise ratio of a sampled sound</em>. Institute of Phonetic Sciences, 17, 97-110.</li>
          <li>Bandini, A., et al. (2017). <em>Analysis of facial gestures in Parkinson&rsquo;s disease and amyotrophic lateral sclerosis</em>. IEEE Trans. Neural Systems and Rehabilitation Engineering, 25(8), 1205-1215.</li>
        </ol>
      </div>
    </div>
  );
};
