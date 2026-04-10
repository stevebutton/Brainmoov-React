import { Activity, Zap, Brain, Sparkles } from 'lucide-react';
import { conditionsData } from '../data/index';

export default function WhatDetailSection({ showBanner, hoveredCategory, setHoveredCategory, onNavigate, onTreatmentFinderClick }) {
  const categoryIcons = [Activity, Zap, Brain, Sparkles];

  return (
    <div className="w-full h-full relative bg-[#0f0f0f]">

      <div className="p-12" style={{paddingTop: '170px'}}>
        <p className="text-lg mb-8 text-center max-w-4xl mx-auto text-white/70">
          Explore conditions by category:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {conditionsData.map((category, idx) => {
            const Icon = categoryIcons[idx];
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ width: '220px' }}
              >
                <div className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" style={{stroke: '#ffffff'}} />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-base font-semibold text-center leading-tight text-white">{category.category}</h3>
                  </div>
                </div>

                {hoveredCategory === idx && (
                  <div
                    className="bg-[#1a1a1a] overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-4 border-t border-white/5">
                      <div className="space-y-1.5 max-h-80 overflow-y-auto">
                        {category.conditions.map((condition, cidx) => (
                          <div key={cidx} className="flex items-start">
                            <span className="text-[#F26219] mr-2 text-xs mt-0.5">•</span>
                            <span className="text-xs text-white/70 leading-tight">{condition}</span>
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
            className="relative rounded-2xl border border-white/10 shadow-2xl cursor-pointer overflow-hidden"
            style={{ width: '220px' }}
            onClick={onTreatmentFinderClick}
          >
            <div className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222]">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-[#F26219] text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{stroke: '#ffffff'}}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">Not Sure Where to Start?</h3>
                <p className="text-white/70 text-sm font-semibold text-center mt-2">Start Treatment Finder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
