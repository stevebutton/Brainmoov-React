import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const hardcodedPanels = [
  {
    id: 'who',
    prefix: 'Who We',
    italicPart: 'Work With',
    nav: 'who-detail',
    image: 'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/whoweworkwith.jpg',
    desc: 'Specialized care for children and infants facing developmental challenges, adults and athl'
  },
  {
    id: 'what',
    prefix: 'What ',
    italicPart: 'We Treat',
    nav: 'what-detail',
    image: 'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/whatwetreat.jpg',
    desc: 'Neurodevelopmental challenges like ADHD and autism, acquired brain injuries including conc'
  },
  {
    id: 'infrastructure',
    prefix: 'Our ',
    italicPart: 'Infrastructure',
    nav: 'about-infrastructure',
    image: 'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/ourinfrastructure.jpg',
    desc: 'State-of-the-art technology and equipment supporting our functional neurology approach, in'
  },
  {
    id: 'process',
    prefix: 'Our ',
    italicPart: 'Treatment Process',
    nav: 'process-detail',
    image: 'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/ourtreatmentprocess.jpg',
    desc: 'Begins with in-depth assessment and advanced neurological testing to identify dysfunction.'
  },
];

export default function IntroPage({ showNav, isActive, hoveredSection, setHoveredSection, onNavigate }) {
  const { content } = useContent();
  const panels = content?.introPanels || hardcodedPanels;
  const btnFindOutMore = content?.siteSettings?.btnFindOutMore || 'Find out more';
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
            style={{
              animation: exiting
                ? 'introTitleExitUp 0.4s ease-in both'
                : 'introTitleFromTop 2s cubic-bezier(0.4, 0, 0.2, 1) 1s both',
              background: 'radial-gradient(ellipse 70% 120% at 50% 50%, rgba(255,255,255,0.75) 0%, transparent 100%)',
              padding: '12px 40px',
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
                    width: '295px',
                    height: '340px',
                    backgroundColor: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'background-color 0.4s ease',
                    animation: exiting
                      ? `slideOutDown 0.5s ease-in ${(panels.length - 1 - index) * 0.05}s both`
                      : `introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                  }}
                >
                  {/* Background image */}
                  <img
                    src={panel.image}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isHovered ? 0 : 1,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                  {/* Dark overlay for text readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.4s ease',
                  }} />

                  {/* Title + description — bottom-anchored, description absolutely placed below */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '24px',
                      right: '24px',
                      bottom: '50px',
                      transform: isHovered ? 'translateY(-75px)' : 'translateY(0)',
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
                      {panel.prefix.trim()}<br />
                      <span style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontStyle: 'italic',
                        color: isHovered ? '#2C97BE' : '#ffffff',
                        transition: 'color 0.4s ease',
                      }}>
                        {panel.italicPart}
                      </span>
                    </h2>
                    {/* Description: absolutely positioned below title, out of flow so it doesn't affect bottom anchor */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '12px',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease 0.15s',
                      }}
                    >
                      <p className="text-sm text-slate-700 leading-snug mb-3">{panel.desc}</p>
                      <button
                        className="text-sm font-medium text-[#F26219] flex items-center gap-1 hover:underline"
                        onClick={(e) => { e.stopPropagation(); handleNavigate(panel.nav); }}
                      >
                        <span>{btnFindOutMore}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
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
