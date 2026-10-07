/**
 * NeuroScreen AI - Main Application Entrypoint
 * Multimodal Smartphone-Based Neuromuscular Risk Screening and Explainable AI Platform
 */

import React, { useState } from 'react';
import { PageView, PresetResearchSample, ScreeningReport } from './types';
import { TopBar } from './components/TopBar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ScreeningPage } from './pages/ScreeningPage';
import { RecordingPage } from './pages/RecordingPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';
import { generateScreeningReport } from './services/screeningService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [recordingMode, setRecordingMode] = useState<'camera' | 'upload'>('camera');
  const [processingInput, setProcessingInput] = useState<{
    facial: any;
    motor: any;
    audio: any;
  } | null>(null);
  const [activeReport, setActiveReport] = useState<ScreeningReport | null>(null);

  // Navigation handlers
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScreening = () => {
    setCurrentPage('screening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToRecording = () => {
    setRecordingMode('camera');
    setCurrentPage('recording');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToUpload = () => {
    setRecordingMode('upload');
    setCurrentPage('recording');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPreset = (preset: PresetResearchSample) => {
    // Populate processing directly with benchmark cohort
    setProcessingInput({
      facial: preset.facial,
      motor: preset.motor,
      audio: preset.audio,
    });
    setCurrentPage('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCaptureComplete = (data: {
    facial: any;
    motor: any;
    audio: any;
  }) => {
    setProcessingInput(data);
    setCurrentPage('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessingComplete = (report: ScreeningReport) => {
    setActiveReport(report);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewScreening = () => {
    setActiveReport(null);
    setProcessingInput(null);
    setCurrentPage('screening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Emergency safety warning at very top */}
      <EmergencyBanner />

      {/* Top Bar Navigation (Zone 1: Brand, Zone 2: 5 Links, Zone 3: Primary Action) */}
      <TopBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onStartScreening={handleStartScreening}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPage === 'home' && (
          <HomePage
            onStartScreening={handleStartScreening}
            onNavigateToMethodology={() => handleNavigate('methodology')}
          />
        )}

        {currentPage === 'screening' && (
          <ScreeningPage
            onProceedToRecording={handleProceedToRecording}
            onProceedToUpload={handleProceedToUpload}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentPage === 'recording' && (
          <RecordingPage
            initialMode={recordingMode}
            onCaptureComplete={handleCaptureComplete}
            onCancel={() => handleNavigate('screening')}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentPage === 'processing' && processingInput && (
          <ProcessingPage
            inputData={processingInput}
            onComplete={handleProcessingComplete}
          />
        )}

        {currentPage === 'results' && (
          <ResultsPage
            report={activeReport}
            onNewScreening={handleNewScreening}
          />
        )}

        {currentPage === 'methodology' && <MethodologyPage />}

        {currentPage === 'privacy' && <PrivacyPage />}

        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Academic Research Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
