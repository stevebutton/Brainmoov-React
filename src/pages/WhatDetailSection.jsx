import { Activity, Zap, Brain, Sparkles } from 'lucide-react';
import Banner from '../components/Banner';
import { conditionsData } from '../data/index';

export default function WhatDetailSection({ showBanner, hoveredCategory, setHoveredCategory, onNavigate, onTreatmentFinderClick }) {
  const categoryIcons = [Activity, Zap, Brain, Sparkles];

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Banner
        title="What We Treat"
        showBanner={showBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
      />

      <div className="p-12" style={{paddingTop: '120px'}}>
        <p className="text-lg mb-8 text-center max-w-4xl mx-auto">
          Explore conditions by category:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {conditionsData.map((category, idx) => {
            const Icon = categoryIcons[idx];
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ width: '220px' }}
              >
                <div className="bg-white/40 backdrop-blur-xl px-6 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" style={{stroke: '#ffffff'}} />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-base font-semibold text-center leading-tight">{category.category}</h3>
                  </div>
                </div>

                {hoveredCategory === idx && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-4 border-t border-white/40">
                      <div className="space-y-1.5 max-h-80 overflow-y-auto">
                        {category.conditions.map((condition, cidx) => (
                          <div key={cidx} className="flex items-start">
                            <span className="text-blue-500 mr-2 text-xs mt-0.5">•</span>
                            <span className="text-xs text-slate-700 leading-tight">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 5th Column: Treatment Finder */}
          <div
            className="relative rounded-2xl border border-white/60 shadow-2xl cursor-pointer overflow-hidden"
            style={{ width: '220px' }}
            onClick={onTreatmentFinderClick}
          >
            <div className="bg-gradient-to-br from-purple-100/80 via-blue-100/80 to-cyan-100/80 backdrop-blur-xl px-6 py-6 transition-all duration-300 hover:from-purple-200/80 hover:via-blue-200/80 hover:to-cyan-200/80">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{stroke: '#ffffff'}}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight">Not Sure Where to Start?</h3>
                <p className="text-slate-800 text-sm font-semibold text-center mt-2">Start Treatment Finder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
