import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { audiences as fallbackAudiences } from '../data/index';
import { useContent } from '../context/ContentContext';

const audienceVideos = {
  children: 'https://framerusercontent.com/assets/wSKTeQyQLgySCMfbAchVND2dc.mp4',
  adults:   'https://framerusercontent.com/assets/6DlsHzgTbazutorOKu2u5gnDSs.mp4',
  seniors:  'https://framerusercontent.com/assets/FXAA0gfnA0kdEQcK6o8RD6WoUk.mp4',
};

const audienceDesc = {
  children: 'Specialized programs for infants, toddlers, and children addressing developmental challenges and optimizing neurological growth.',
  adults: 'Comprehensive care for adults and athletes focused on performance optimization, injury recovery, and cognitive enhancement.',
  seniors: 'Targeted interventions for seniors to maintain cognitive function, mobility, and overall neurological health.',
};

export default function WhoDetailSection({ showBanner, isExiting: isExitingProp, onNavigate }) {
  const { content } = useContent();
  const audiences = content?.audiences || fallbackAudiences;
  const [exiting, setExiting] = useState(false);
  const [hoveredAudience, setHoveredAudience] = useState(null);

  const shouldExit = exiting || isExitingProp;

  const handleNavigate = (nav) => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onNavigate(nav), 650);
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col items-center gap-4 px-12" style={{ paddingTop: '100px' }}>

        {/* Intro Panel */}
        <div
          className="rounded-2xl border border-white/20 shadow-2xl"
          style={{
            width: '905px',
            backgroundColor: 'rgba(255,255,255,0.30)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px 36px',
            animation: shouldExit
              ? 'slideOutDown 0.5s ease-in 0.15s both'
              : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
          }}
        >
          <div className="flex items-center" style={{ gap: '0' }}>
            <div style={{ width: '50%', paddingRight: '32px' }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '52px', lineHeight: 1.0, textAlign: 'right' }} className="text-slate-900">
                Who We<br />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>Work With</span>
              </h2>
            </div>
            <div style={{ width: '50%', paddingLeft: '32px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
              <p className="text-slate-700 text-sm leading-relaxed">
                BrainMoove provides specialized neurological rehabilitation for patients at every stage of life. Our evidence-based programs address a wide spectrum of developmental, acquired, and age-related neurological conditions. Each treatment plan is tailored to the individual's unique neurological profile, goals, and stage of life.
              </p>
            </div>
          </div>
        </div>

        {/* Audience Panels */}
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
                  animation: shouldExit
                    ? `slideOutDown 0.5s ease-in ${(audiences.length - 1 - index) * 0.05}s both`
                    : `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                }}
              >
                {/* Background video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  <source src={audienceVideos[audience.id]} type="video/mp4" />
                </video>

                {/* Title — bottom-aligned at rest, animates up on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    bottom: '24px',
                    transform: isHovered ? 'translateY(-200px)' : 'translateY(0)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '36px',
                      lineHeight: 1.0,
                      color: isHovered ? '#1e293b' : '#ffffff',
                      transition: 'color 0.4s ease',
                    }}
                    className="text-left"
                  >
                    Programme<br />
                    <span style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      color: isHovered ? '#2C97BE' : '#ffffff',
                      transition: 'color 0.4s ease',
                    }}>
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

      </div>
    </div>
  );
}
