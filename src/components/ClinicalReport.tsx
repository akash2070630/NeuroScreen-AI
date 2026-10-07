/**
 * NeuroScreen AI - Clinical Screening Report Component
 * Professional academic & research summary with SHAP explanations,
 * recommendations, and printable / JSON export capabilities.
 */

import React from 'react';
import { ScreeningReport } from '../types';
import { AlertCircle, CheckCircle, Download, FileText, Printer, ShieldAlert } from 'lucide-react';
import { ShapVisualization } from './ShapVisualization';
import { FeatureBreakdownCard } from './FeatureBreakdownCard';

interface ClinicalReportProps {
  report: ScreeningReport;
  onNewScreening: () => void;
}

export const ClinicalReport: React.FC<ClinicalReportProps> = ({
  report,
  onNewScreening,
}) => {
  const getRiskBadge = (tier: 'low' | 'moderate' | 'elevated') => {
    switch (tier) {
      case 'low':
        return {
          title: 'LOW SCREENING RISK INDICATION',
          border: 'border-emerald-200',
          bg: 'bg-emerald-50/70',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100 text-emerald-800',
          icon: <CheckCircle className="w-5 h-5 text-emerald-700" />,
        };
      case 'moderate':
        return {
          title: 'MODERATE SCREENING RISK INDICATION',
          border: 'border-amber-200',
          bg: 'bg-amber-50/70',
          text: 'text-amber-900',
          badgeBg: 'bg-amber-100 text-amber-800',
          icon: <AlertCircle className="w-5 h-5 text-amber-700" />,
        };
      case 'elevated':
        return {
          title: 'ELEVATED SCREENING RISK INDICATION',
          border: 'border-rose-200',
          bg: 'bg-rose-50/70',
          text: 'text-rose-900',
          badgeBg: 'bg-rose-100 text-rose-800',
          icon: <AlertCircle className="w-5 h-5 text-rose-700" />,
        };
    }
  };

  const badge = getRiskBadge(report.riskTier);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${report.screeningId}_research_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top action ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <div>
          <span className="text-xs text-slate-500 font-mono">
            SCREENING RECORD ID: {report.screeningId}
          </span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-mono">
            {new Date(report.timestamp).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Clinical PDF</span>
          </button>
          <button
            onClick={onNewScreening}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-cyan-700 hover:bg-cyan-800 rounded-md transition-colors cursor-pointer shadow-2xs"
          >
            New Screening
          </button>
        </div>
      </div>

      {/* Main Screening Result Summary Card */}
      <div className={`rounded-lg border ${badge.border} ${badge.bg} p-6 shadow-xs`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              {badge.icon}
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {badge.title}
              </h2>
            </div>

            <div className="p-3.5 bg-white/80 rounded-md border border-slate-200/60 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong>IMPORTANT INTERPRETATION:</strong> &ldquo;This result indicates that the analyzed recording contains movement, facial, or speech characteristics that differ from the patterns learned by the research model. It does NOT mean that you have a neurological disease.&rdquo;
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              NeuroScreen AI provides non-invasive preliminary feature extraction across facial asymmetry, voluntary upper-limb motor kinematics, and vocal speech acoustics. It does not replace medical judgment.
            </p>
          </div>

          {/* Quantitative Metric Readout */}
          <div className="bg-white p-4 rounded-md border border-slate-200 shrink-0 min-w-[220px] text-right space-y-3">
            <div>
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400 block">
                Model Calibrated Risk Index
              </span>
              <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                <span className="text-3xl font-mono font-bold text-slate-900 tabular-nums">
                  {report.riskScorePercent}
                </span>
                <span className="text-sm font-mono text-slate-500">%</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2 text-2xs font-mono text-slate-500">
              <span>95% CI: </span>
              <span className="font-semibold text-slate-700">
                [{report.confidenceInterval[0]}% – {report.confidenceInterval[1]}%]
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2 text-2xs text-slate-500 text-left">
              <span>Status: </span>
              <span className="font-medium text-slate-700 capitalize">
                {report.riskTier} Risk Classification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-slate-900">
          Professional Clinical Recommendations & Next Steps
        </h3>

        <div className="space-y-2.5">
          {report.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 p-3 bg-slate-50 rounded-md border border-slate-200/80 leading-relaxed"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-700 mt-2 shrink-0" />
              <p>{rec}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-md text-xs text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Consultation Notice:</strong> Do not initiate, stop, or change any medical therapy or medication based on this tool. Present this screening summary to a qualified physician for clinical examination.
          </p>
        </div>
      </div>

      {/* Explainable AI: SHAP Visualization */}
      <ShapVisualization
        contributions={report.shapContributions}
        baseExpectedValue={report.baseExpectedValue}
        finalLogOdds={report.finalLogOdds}
      />

      {/* Multimodal Feature Measurements Breakdown */}
      <FeatureBreakdownCard
        facial={report.facialFeatures}
        motor={report.motorFeatures}
        audio={report.acousticFeatures}
      />

      {/* Protocol Compliance & Governance Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
          System Provenance & Protocol Audit
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-1">
          <div>
            <span className="text-slate-400 block text-2xs">ENGINE IDENTIFIER</span>
            <span className="text-slate-800 font-medium">{report.modelMetadata.modelName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-2xs">VERSION & BUILD</span>
            <span className="text-slate-800 font-medium">v{report.modelMetadata.modelVersion}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-2xs">FEATURE SCHEMA</span>
            <span className="text-slate-800 font-medium">Schema v{report.modelMetadata.featureVersion}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-2xs">PROTOCOL QUALITY</span>
            <span className="text-emerald-700 font-medium uppercase">
              {report.protocolCompliance.overallQuality}
            </span>
          </div>
        </div>

        <div className="text-2xs text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
          <span>Tracked Face Frames: {report.protocolCompliance.faceDetectedFrames}</span>
          <span>Pose Kinematic Frames: {report.protocolCompliance.poseDetectedFrames}</span>
          <span>Acoustic Channel: Active</span>
        </div>
      </div>
    </div>
  );
};
