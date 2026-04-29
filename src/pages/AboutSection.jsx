import { useState } from 'react';
import { ChevronRight, Lightbulb, Target, Users, Building2, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const panelDefaults = [
  {
    id: 'philosophy',
    prefix: 'Our',
    italic: 'Philosophy',
    icon: Lightbulb,
    nav: 'about-philosophy',
    desc: 'Our approach bridges cutting-edge neuroscience with compassionate care, focusing on the root causes of neurological dysfunction rather than just symptoms.',
  },
  {
    id: 'objectives',
    prefix: 'Our',
    italic: 'Objectives',
    icon: Target,
    nav: 'about-objectives',
    desc: 'We aim to restore optimal brain function and improve quality of life through evidence-based interventions, empowering individuals to reach their full potential.',
  },
  {
    id: 'team',
    prefix: 'Our',
    italic: 'Team',
    icon: Users,
    nav: 'about-team',
    desc: 'Meet our dedicated professionals who bring expertise in functional neurology, clinical care, and patient support to deliver exceptional outcomes.',
  },
  {
    id: 'infrastructure',
    prefix: 'Our',
    italic: 'Infrastructure',
    icon: Building2,
    nav: 'about-infrastructure',
    desc: 'Our state-of-the-art facility features specialized equipment and therapeutic spaces designed to support comprehensive neurological rehabilitation.',
  },
  {
    id: 'history',
    prefix: 'History of',
    italic: 'BrainMoove',
    icon: Clock,
    nav: 'about-history',
    desc: 'Discover our journey from inception to becoming a leading center for functional neurology and neurological rehabilitation.',
  },
];

export default function AboutSection({ showBanner, isExiting: isExitingProp, onNavigate }) {
  const { content } = useContent();
  const ss = content?.siteSettings;
  const aboutContent = content?.aboutContent;
  const btnLearnMore = ss?.btnLearnMore || 'Learn more';

  const [hoveredSection, setHoveredSection] = useState(null);
  const [exiting, setExiting] = useState(false);

  const shouldExit = exiting || isExitingProp;

  const handleNavigate = (nav) => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onNavigate(nav), 650);
  };

  // Merge CMS landing panel data with local non-CMS data (icons, nav routes)
  const panels = panelDefaults.map(p => {
    const cmsPanel = aboutContent?.landingPanels?.find(cp => cp.id === p.id);
    return {
      ...p,
      prefix: cmsPanel?.prefix || p.prefix,
      italic: cmsPanel?.italic || p.italic,
      desc: cmsPanel?.description || p.desc,
    };
  });

  return (
    <div className="w-full h-full relative">
      <div className="relative z-10 h-full flex items-center justify-center px-8" style={{ paddingTop: '80px' }}>
        <div className="w-full max-w-6xl">
          <div className="flex justify-center gap-2.5">
            {panels.map((panel, index) => {
              const isHovered = hoveredSection === panel.id;
              const Icon = panel.icon;
              const delay = 0.3 + index * 0.15;

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
                    animation: shouldExit
                      ? `slideOutDown 0.5s ease-in ${(panels.length - 1 - index) * 0.05}s both`
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
                      {panel.prefix}<br />
                      <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                        {panel.italic}
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
                      <span>{btnLearnMore}</span>
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
