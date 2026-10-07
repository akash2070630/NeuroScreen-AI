/**
 * NeuroScreen AI - Top Navigation Bar
 * Follows strict 3-Zone Top Bar Contract:
 * [Brand wordmark] - [Text nav links] - [Primary action]
 */

import React from 'react';
import { PageView } from '../types';

interface TopBarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onStartScreening: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  onNavigate,
  onStartScreening,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-cyan-800 transition-colors">
            NeuroScreen AI
          </span>
        </button>

        {/* Zone 2: Navigation Links (Text with clean hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-cyan-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('screening')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'screening' || currentPage === 'recording' || currentPage === 'processing' || currentPage === 'results'
                ? 'text-cyan-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Screening
          </button>
          <button
            onClick={() => onNavigate('methodology')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'methodology'
                ? 'text-cyan-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'privacy'
                ? 'text-cyan-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Privacy & Ethics
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'about'
                ? 'text-cyan-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartScreening}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 rounded-md transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            Start Screening
          </button>
        </div>
      </div>
    </header>
  );
};
