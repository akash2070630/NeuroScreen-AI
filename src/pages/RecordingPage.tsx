/**
 * NeuroScreen AI - Recording Page
 * Hosts the live standardized 15-second multi-phase camera recorder
 * or file upload with seamless transition to telemetry processing.
 */

import React, { useState } from 'react';
import { Camera, FileVideo, HardDriveUpload, RefreshCw } from 'lucide-react';
import { VideoRecorder } from '../components/VideoRecorder';
import { VideoUploader } from '../components/VideoUploader';
import { AcousticFeatures, FacialFeatures, MotorFeatures, PresetResearchSample } from '../types';
import { PRESET_RESEARCH_SAMPLES } from '../services/presetSamples';

interface RecordingPageProps {
  initialMode?: 'camera' | 'upload';
  onCaptureComplete: (data: {
    facial: FacialFeatures;
    motor: MotorFeatures;
    audio: AcousticFeatures;
  }) => void;
  onCancel: () => void;
  onSelectPreset: (preset: PresetResearchSample) => void;
}

export const RecordingPage: React.FC<RecordingPageProps> = ({
  initialMode = 'camera',
  onCaptureComplete,
  onCancel,
  onSelectPreset,
}) => {
  const [activeMode, setActiveMode] = useState<'camera' | 'upload'>(initialMode);

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
            Phase 01–06 Signal Acquisition
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            15-Second Standardized Recording
          </h1>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveMode('camera')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeMode === 'camera'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera &amp; Mic</span>
          </button>
          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardDriveUpload className="w-3.5 h-3.5" />
            <span>Upload Existing Video</span>
          </button>
        </div>
      </div>

      {/* Main capture component */}
      {activeMode === 'camera' ? (
        <VideoRecorder
          onRecordingComplete={({ facial, motor, audio }) => {
            onCaptureComplete({ facial, motor, audio });
          }}
          onCancel={onCancel}
        />
      ) : (
        <VideoUploader
          onUploadSuccess={({ facial, motor, audio }) => {
            onCaptureComplete({ facial, motor, audio });
          }}
          onCancel={onCancel}
        />
      )}

      {/* Quick Benchmark Preset Fallback Drawer */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-slate-600 font-medium">
            Need an instant test sample? Select a calibrated research benchmark:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_RESEARCH_SAMPLES.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectPreset(s)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 transition-colors cursor-pointer text-2xs font-medium"
              >
                {s.label.split(' ')[0]} Profile
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
