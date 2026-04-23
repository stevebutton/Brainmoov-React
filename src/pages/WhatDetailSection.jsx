import { useState } from 'react';
import { Activity, Zap, Brain, Sparkles } from 'lucide-react';
import { conditionsData } from '../data/index';

const categoryIcons = [Activity, Zap, Brain, Sparkles];

const titleParts = [
  { prefix: 'Neurodevelopmental', italic: 'Challenges' },
  { prefix: 'Acquired Brain', italic: 'Injuries' },
  { prefix: 'Neurological', italic: 'Diseases & Disorders' },
  { prefix: 'Health &', italic: 'Performance Wishes' },
];

export default function WhatDetailSection({ showBanner, isExiting, onNavigate }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col items-center gap-4 px-12" style={{ paddingTop: '100px' }}>

        {/* Intro Panel */}
        <div
          className="rounded-2xl border border-white/20 shadow-2xl"
          style={{
            width: '1210px',
            backgroundColor: 'rgba(255,255,255,0.30)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px 36px',
            animation: isExiting
              ? 'slideOutDown 0.5s ease-in 0.15s both'
              : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
          }}
        >
          <div className="flex items-center" style={{ gap: '0' }}>
            <div style={{ width: '50%', paddingRight: '32px' }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '52px', lineHeight: 1.0, textAlign: 'right' }} className="text-slate-900">
                What<br />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>We Treat</span>
              </h2>
            </div>
            <div style={{ width: '50%', paddingLeft: '32px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
              <p className="text-slate-700 text-sm leading-relaxed">
                BrainMoove addresses a broad range of neurological and developmental conditions across all ages. From neurodevelopmental challenges and acquired brain injuries to neurological diseases and performance goals, our evidence-based interventions target the root causes of dysfunction. Each condition is approached with precision, using advanced diagnostics to guide personalized treatment.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2.5">
          {conditionsData.map((category, idx) => {
            const isHovered = hoveredCategory === idx;
            const Icon = categoryIcons[idx];
            const { prefix, italic } = titleParts[idx];
            const delay = 0.3 + idx * 0.15;

            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-default"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  width: '295px',
                  height: '340px',
                  backgroundColor: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'background-color 0.4s ease',
                  animation: isExiting
                    ? `slideOutDown 0.5s ease-in ${(conditionsData.length - 1 - idx) * 0.05}s both`
                    : `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                }}
              >
                {/* Icon + Title — centered at rest, moves up on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    top: '50%',
                    transform: isHovered ? 'translateY(calc(-50% - 90px))' : 'translateY(-50%)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <Icon className="w-8 h-8 text-slate-600 mb-3" />
                  <h2
                    style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', lineHeight: 1.0 }}
                    className="text-left text-slate-900"
                  >
                    {prefix}<br />
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                      {italic}
                    </span>
                  </h2>
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
                  <div className="space-y-1">
                    {category.conditions.map((condition, cidx) => (
                      <div key={cidx} className="flex items-start">
                        <span className="text-[#F26219] mr-2 text-xs mt-0.5 flex-shrink-0">•</span>
                        <span className="text-xs text-slate-700 leading-tight">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
