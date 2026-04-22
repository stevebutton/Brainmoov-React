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

export default function WhatDetailSection({ showBanner, onNavigate }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="w-full h-full relative">
      <div className="p-12" style={{ paddingTop: '170px' }}>
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
                  animation: `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
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

        <p
          className="text-lg mt-8 text-center text-white/70"
          style={{ animation: 'introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both' }}
        >
          Explore conditions by category
        </p>
      </div>
    </div>
  );
}
