import { Activity, Zap, Brain, Sparkles } from 'lucide-react';
import { conditionsData } from '../data/index';

const categoryIcons = [Activity, Zap, Brain, Sparkles];

export default function WhatDetailSection({ showBanner, hoveredCategory, setHoveredCategory, onNavigate, onTreatmentFinderClick }) {
  return (
    <div className="w-full h-full relative">
      <div className="p-12" style={{paddingTop: '170px'}}>

        <div className="flex justify-center gap-2.5">
          {conditionsData.map((category, idx) => {
            const isHovered = hoveredCategory === idx;
            const Icon = categoryIcons[idx];
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  width: '295px',
                  height: '340px',
                  backgroundColor: isHovered ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'background-color 0.4s ease',
                }}
              >
                {/* Title — centered at rest, animates up on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    top: '50%',
                    transform: isHovered ? 'translateY(calc(-50% - 70px))' : 'translateY(-50%)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-2xl font-semibold text-left text-white leading-tight">{category.category}</h3>
                </div>

                {/* Conditions list — fades in on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    top: 'calc(50% - 24px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.15s',
                  }}
                >
                  <div className="w-8 h-px bg-white/40 mb-3" />
                  <div className="space-y-1">
                    {category.conditions.map((condition, cidx) => (
                      <div key={cidx} className="flex items-start">
                        <span className="text-[#F26219] mr-2 text-xs mt-0.5">•</span>
                        <span className="text-xs text-white/80 leading-tight">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-lg mt-8 text-center text-white/70">
          Explore conditions by category
        </p>
      </div>
    </div>
  );
}
