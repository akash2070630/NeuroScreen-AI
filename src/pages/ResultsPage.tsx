/**
 * NeuroScreen AI - Results Page
 * Presents the final ScreeningReport with clinical safety notices and referral guidance.
 */

import React from 'react';
import { ScreeningReport } from '../types';
import { ClinicalReport } from '../components/ClinicalReport';
import { DisclaimerNotice } from '../components/DisclaimerNotice';

interface ResultsPageProps {
  report: ScreeningReport | null;
  onNewScreening: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  report,
  onNewScreening,
}) => {
  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Active Screening Report</h2>
        <p className="text-xs text-slate-500">
          Please complete the 15-second recording or select a research benchmark sample to generate a report.
        </p>
        <button
          onClick={onNewScreening}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-md transition-colors cursor-pointer"
        >
          Initiate New Screening
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-6">
      <DisclaimerNotice compact />
      <ClinicalReport report={report} onNewScreening={onNewScreening} />
    </div>
  );
};
