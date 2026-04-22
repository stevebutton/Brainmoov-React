import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const panels = [
  {
    id: 'about',
    prefix: 'What is ',
    italicPart: 'BrainMoove?',
    nav: 'about',
    desc: 'A specialized rehabilitation center bridging neuroscience and clinical care through evidence-based functional neurology. We restore and optimize brain function across all ages with targeted, non-invasive interventions.'
  },
  {
    id: 'who',
    prefix: 'Who ',
    italicPart: 'We Treat',
    nav: 'who-detail',
    desc: 'Specialized care for children and infants facing developmental challenges, adults and athletes seeking performance optimization, and seniors maintaining cognitive function.'
  },
  {
    id: 'what',
    prefix: 'What ',
    italicPart: 'We Treat',
    nav: 'what-detail',
    desc: 'Neurodevelopmental challenges like ADHD and autism, acquired brain injuries including concussions and TBI, neurological diseases such as Parkinson\'s and MS, plus performance enhancement goals.'
  },
  {
    id: 'infrastructure',
    prefix: 'Our ',
    italicPart: 'Infrastructure',
    nav: 'about-infrastructure',
    desc: 'State-of-the-art technology and equipment supporting our functional neurology approach, including advanced diagnostic and therapeutic devices for precise, targeted neurological intervention.'
  },
  {
    id: 'process',
    prefix: 'Our ',
    italicPart: 'Treatment Process',
    nav: 'process-detail',
    desc: 'Begins with in-depth assessment and advanced neurological testing to identify dysfunction. We develop personalized treatment plans, monitor progress throughout, and provide ongoing follow-up care for lasting results.'
  },
];

export default function IntroPage({ showNav, isActive, hoveredSection, setHoveredSection, onNavigate }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isActive) setExiting(false);
  }, [isActive]);

  const handleNavigate = (nav) => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onNavigate(nav), 650);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative z-10 h-full flex items-center justify-center px-8" style={{ paddingTop: '80px' }}>
        <div className="w-full max-w-6xl">
          <div
            className="text-center mb-8"
            style={{ animation: exiting
              ? 'introTitleExitUp 0.4s ease-in both'
              : 'introTitleFromTop 2s cubic-bezier(0.4, 0, 0.2, 1) 9s both'
            }}
          >
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '72px', lineHeight: 1.0, color: '#1e293b', textShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
              Explore{' '}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                Brain-Moove
              </span>
            </h1>
          </div>
          <div className="flex justify-center gap-2.5">
            {panels.map((panel, index) => {
              const isHovered = hoveredSection === panel.id;
              const delay = 3 + index; // 3s, 4s, 5s, 6s, 7s
              return (
                <div
                  key={panel.id}
                  className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                  onMouseEnter={() => setHoveredSection(panel.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => handleNavigate(panel.nav)}
                  style={{
                    width: '235px',
                    height: '340px',
                    backgroundColor: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'background-color 0.4s ease',
                    animation: exiting
                      ? `slideOutDown 0.5s ease-in ${(panels.length - 1 - index) * 0.05}s both`
                      : `introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                  }}
                >
                  {/* Title — centers at rest, animates up on hover */}
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
                      {panel.prefix.trim()}<br />
                      <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                        {panel.italicPart}
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
                    <p className="text-sm text-slate-700 leading-snug mb-4">{panel.desc}</p>
                    <button
                      className="text-sm font-medium text-[#F26219] flex items-center gap-1 hover:underline"
                      onClick={(e) => { e.stopPropagation(); handleNavigate(panel.nav); }}
                    >
                      <span>Find out more</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
