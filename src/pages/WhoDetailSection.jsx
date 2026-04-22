import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { audiences } from '../data/index';

const audienceDesc = {
  children: 'Specialized programs for infants, toddlers, and children addressing developmental challenges and optimizing neurological growth.',
  adults: 'Comprehensive care for adults and athletes focused on performance optimization, injury recovery, and cognitive enhancement.',
  seniors: 'Targeted interventions for seniors to maintain cognitive function, mobility, and overall neurological health.',
};

export default function WhoDetailSection({ showBanner, hoveredAudience, setHoveredAudience, onNavigate }) {
  const [exiting, setExiting] = useState(false);

  const handleNavigate = (nav) => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onNavigate(nav), 650);
  };

  return (
    <div className="w-full h-full relative">
      <div className="p-12" style={{ paddingTop: '170px' }}>
        <div className="flex justify-center gap-2.5">
          {audiences.map((audience, index) => {
            const isHovered = hoveredAudience === audience.id;
            const programmeName = audience.title.startsWith('Programme ')
              ? audience.title.slice('Programme '.length)
              : audience.title;
            const delay = 0.3 + index * 0.2;
            return (
              <div
                key={audience.id}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                onMouseEnter={() => setHoveredAudience(audience.id)}
                onMouseLeave={() => setHoveredAudience(null)}
                onClick={() => handleNavigate(audience.id)}
                style={{
                  width: '295px',
                  height: '340px',
                  backgroundColor: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'background-color 0.4s ease',
                  animation: exiting
                    ? `slideOutDown 0.5s ease-in ${(audiences.length - 1 - index) * 0.05}s both`
                    : `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                }}
              >
                {/* Title — centered at rest, animates up on hover */}
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
                  <h2
                    style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', lineHeight: 1.0 }}
                    className="text-left text-slate-900"
                  >
                    Programme<br />
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                      {programmeName}
                    </span>
                  </h2>
                </div>

                {/* Description — fades in on hover */}
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
                  <p className="text-sm text-slate-700 leading-snug mb-4">{audienceDesc[audience.id]}</p>
                  <button
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 hover:underline"
                    onClick={(e) => { e.stopPropagation(); handleNavigate(audience.id); }}
                  >
                    <span>Explore programs</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p
          className="text-lg mt-8 text-center text-white/70"
          style={{
            animation: exiting
              ? 'introTitleExitUp 0.4s ease-in both'
              : `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both`,
          }}
        >
          Select an audience to explore our specialized programs
        </p>
      </div>
    </div>
  );
}
