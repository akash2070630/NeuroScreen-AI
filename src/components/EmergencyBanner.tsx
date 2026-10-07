/**
 * NeuroScreen AI - Emergency Safety Interceptor
 * Alerts users regarding acute neurological symptoms (e.g. acute stroke)
 * and directs immediate contact with local emergency medical services.
 */

import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 text-xs text-rose-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Emergency Safety Warning:</strong> If you or someone else is experiencing sudden facial drooping, sudden arm weakness, or sudden speech difficulty, do not use this app.
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="font-semibold underline hover:text-rose-950 cursor-pointer whitespace-nowrap ml-auto sm:ml-0"
          >
            Review Urgent Symptoms
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-rose-200 p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-md text-rose-700">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Urgent Neurological Warning (FAST Criteria)
                </h3>
                <p className="text-xs text-slate-500">
                  Critical medical screening safeguard
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-700 mb-6">
              <p className="font-medium text-rose-900 bg-rose-50 p-3 rounded-md border border-rose-100">
                These symptoms may require urgent medical attention. Do not rely on this prototype. Contact your local emergency medical service immediately.
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">F — Face:</span> Does one side of the face droop when smiling?
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">A — Arms:</span> Does one arm drift downward when raising both arms?
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">S — Speech:</span> Is speech slurred, strange, or difficult to produce?
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">T — Time:</span> If any of these sudden symptoms occur, time is critical. Seek emergency care immediately.
                </div>
              </div>

              <p className="text-xs text-slate-500 italic pt-1">
                NeuroScreen AI is designed solely for non-urgent research and elective risk stratification. Never delay emergency medical attention for automated processing.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                I Understand — No Acute Symptoms
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
