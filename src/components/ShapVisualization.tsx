/**
 * NeuroScreen AI - Explainable AI (SHAP) Visualizer
 * Renders feature attribution waterfall and bar charts showing
 * which biometric signals pushed the screening risk higher or lower.
 */

import React, { useState } from 'react';
import { ShapContribution } from '../types';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, HelpCircle, Info } from 'lucide-react';

interface ShapVisualizationProps {
  contributions: ShapContribution[];
  baseExpectedValue: number;
  finalLogOdds: number;
}

export const ShapVisualization: React.FC<ShapVisualizationProps> = ({
  contributions,
  baseExpectedValue,
  finalLogOdds,
}) => {
  const [viewMode, setViewMode] = useState<'bar' | 'table'>('bar');
  const [selectedModality, setSelectedModality] = useState<'all' | 'facial' | 'motor' | 'audio'>('all');

  const filteredContributions =
    selectedModality === 'all'
      ? contributions
      : contributions.filter((c) => c.modality === selectedModality);

  // Find max absolute SHAP value for scaling bars
  const maxAbsShap = Math.max(
    0.05,
    ...contributions.map((c) => Math.abs(c.shapValue))
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 space-y-6 shadow-xs">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Explainable AI: Feature Attribution (TreeSHAP)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quantifies the exact mathematical contribution of each signal toward the final screening index.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2">
          {/* Modality Filter */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md text-xs">
            <button
              onClick={() => setSelectedModality('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedModality === 'all'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setSelectedModality('facial')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedModality === 'facial'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facial
            </button>
            <button
              onClick={() => setSelectedModality('motor')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedModality === 'motor'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Motor
            </button>
            <button
              onClick={() => setSelectedModality('audio')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedModality === 'audio'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Speech
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md text-xs">
            <button
              onClick={() => setViewMode('bar')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'bar'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 font-medium shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Detail Table
            </button>
          </div>
        </div>
      </div>

      {/* Math Explanation Header */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-700 shrink-0" />
          <span>
            <strong>Shapley Additive Explanation:</strong> Base Prior ({baseExpectedValue.toFixed(2)}) + &Sigma; &Phi;<sub>i</sub> = Model Log-Odds ({finalLogOdds.toFixed(2)})
          </span>
        </div>
        <div className="flex items-center gap-3 text-2xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-xs inline-block" /> Elevated Deviation (&Phi; &gt; 0)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs inline-block" /> Normative / Typical (&Phi; &le; 0)
          </span>
        </div>
      </div>

      {/* Bar Chart View */}
      {viewMode === 'bar' ? (
        <div className="space-y-3.5">
          {filteredContributions.slice(0, 10).map((item, idx) => {
            const isRiskIncreasing = item.shapValue > 0;
            const barWidthPercent = Math.min(100, (Math.abs(item.shapValue) / maxAbsShap) * 100);

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate max-w-md">
                    <span className="font-medium text-slate-800 truncate">
                      {item.featureName}
                    </span>
                    <span className="text-slate-400 capitalize text-2xs">
                      ({item.modality})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-2xs">
                    <span className="text-slate-500">
                      Value: <strong className="text-slate-700">{item.featureValue.toFixed(2)}</strong> (Norm: {item.normativeMean.toFixed(1)})
                    </span>
                    <span
                      className={`font-semibold tabular-nums ${
                        isRiskIncreasing ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      {item.shapValue > 0 ? `+${item.shapValue.toFixed(3)}` : item.shapValue.toFixed(3)}
                    </span>
                  </div>
                </div>

                {/* Bi-directional Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                  {isRiskIncreasing ? (
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  ) : (
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300 ml-auto"
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  )}
                </div>

                <p className="text-2xs text-slate-500 leading-tight">
                  {item.clinicalInterpretation}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-2xs uppercase">
                <th className="py-2.5 px-3">Biometric Signal</th>
                <th className="py-2.5 px-3">Modality</th>
                <th className="py-2.5 px-3 text-right">Measured</th>
                <th className="py-2.5 px-3 text-right">Reference Baseline</th>
                <th className="py-2.5 px-3 text-right">SHAP (&Phi;)</th>
                <th className="py-2.5 px-3">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-2xs tabular-nums">
              {filteredContributions.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-800 text-xs">
                    {c.featureName}
                  </td>
                  <td className="py-2.5 px-3 capitalize text-slate-500 font-sans">
                    {c.modality}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">
                    {c.featureValue.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500">
                    {c.normativeMean.toFixed(2)} &plusmn; {c.normativeStd.toFixed(2)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-semibold ${
                      c.shapValue > 0 ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {c.shapValue > 0 ? `+${c.shapValue.toFixed(3)}` : c.shapValue.toFixed(3)}
                  </td>
                  <td className="py-2.5 px-3 font-sans capitalize text-slate-600">
                    {c.relativeImpact === 'elevated' && (
                      <span className="text-rose-700 font-medium">Elevated</span>
                    )}
                    {c.relativeImpact === 'moderate' && (
                      <span className="text-amber-700 font-medium">Moderate</span>
                    )}
                    {c.relativeImpact === 'protective' && (
                      <span className="text-emerald-700 font-medium">Typical / Normal</span>
                    )}
                    {c.relativeImpact === 'low' && (
                      <span className="text-slate-500">Low</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
