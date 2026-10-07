/**
 * NeuroScreen AI - Research Footer
 * Clean academic and research attribution without mechanical slop.
 */

import React from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Project Info */}
          <div className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-white tracking-tight block">
              NeuroScreen AI
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Multimodal Smartphone-Based Neuromuscular Risk Screening and Explainable AI Platform. An academic and biomedical ML research prototype for non-invasive risk stratification.
            </p>
            <p className="text-slate-500 text-2xs pt-1">
              Research Prototype · Not a medical diagnostic device · Do not use for emergency decisions.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('screening')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Screening Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Methodology & Math
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy & Data Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Research
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical & Ethics Notice */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              Safety & Ethics
            </span>
            <p className="text-slate-400 text-2xs leading-relaxed">
              NeuroScreen AI adheres to zero permanent storage of biometric video recordings. All signal feature extraction is executed securely in local memory.
            </p>
            <div className="pt-2 text-2xs text-slate-500">
              Engine Version: v0.1.0-alpha<br />
              Schema: Multimodal 21-D Feature Vector
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} NeuroScreen AI Research Collective. Academic Prototype.</p>
          <p>Evaluation pending validated clinical datasets for diagnostic certification.</p>
        </div>
      </div>
    </footer>
  );
};
