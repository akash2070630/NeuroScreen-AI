/**
 * NeuroScreen AI - Research Disclaimer Notice
 * Prominent medical safety disclaimer across screening pages.
 */

import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DisclaimerNoticeProps {
  compact?: boolean;
}

export const DisclaimerNotice: React.FC<DisclaimerNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-md p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Research Prototype:</strong> NeuroScreen AI is not a medical diagnostic device. It does not diagnose Parkinson’s disease, stroke, Bell’s palsy, or any condition. Results are for research and referral support only.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 sm:p-5 text-amber-950">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-md text-amber-800 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm">
          <h4 className="font-semibold text-amber-900">
            Mandatory Research & Safety Disclaimer
          </h4>
          <p className="text-amber-900/90 leading-relaxed">
            This prototype does not diagnose disease. Results are for research and screening support only and should not replace evaluation by a qualified healthcare professional.
          </p>
          <p className="text-amber-800/80 text-xs">
            The platform does not provide medical diagnoses, treatment plans, medication advice, or emergency triage. For any health concerns or symptoms, consult a licensed physician or specialist.
          </p>
        </div>
      </div>
    </div>
  );
};
