import { ChevronRight } from 'lucide-react';

const panels = [
  {
    id: 'about',
    title: 'What is BrainMoove?',
    nav: 'about',
    desc: 'A specialized rehabilitation center bridging neuroscience and clinical care through evidence-based functional neurology. We restore and optimize brain function across all ages with targeted, non-invasive interventions.'
  },
  {
    id: 'who',
    title: 'Who We Treat',
    nav: 'who-detail',
    desc: 'Specialized care for children and infants facing developmental challenges, adults and athletes seeking performance optimization, and seniors maintaining cognitive function.'
  },
  {
    id: 'what',
    title: 'What We Treat',
    nav: 'what-detail',
    desc: 'Neurodevelopmental challenges like ADHD and autism, acquired brain injuries including concussions and TBI, neurological diseases such as Parkinson\'s and MS, plus performance enhancement goals.'
  },
  {
    id: 'infrastructure',
    title: 'Our Infrastructure',
    nav: 'about-infrastructure',
    desc: 'State-of-the-art technology and equipment supporting our functional neurology approach, including advanced diagnostic and therapeutic devices for precise, targeted neurological intervention.'
  },
  {
    id: 'process',
    title: 'Our Treatment Process',
    nav: 'process-detail',
    desc: 'Begins with in-depth assessment and advanced neurological testing to identify dysfunction. We develop personalized treatment plans, monitor progress throughout, and provide ongoing follow-up care for lasting results.'
  },
];

export default function IntroPage({ showNav, hoveredSection, setHoveredSection, onNavigate }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative z-10 h-full flex items-center justify-center px-8" style={{paddingTop: '80px'}}>
        <div
          className={`w-full max-w-6xl transform transition-all duration-1000 ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex justify-center gap-2.5">
            {panels.map((panel) => {
              const isHovered = hoveredSection === panel.id;
              return (
                <div
                  key={panel.id}
                  className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                  onMouseEnter={() => setHoveredSection(panel.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => onNavigate(panel.nav)}
                  style={{
                    width: '235px',
                    height: '340px',
                    backgroundColor: isHovered ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'background-color 0.4s ease',
                  }}
                >
                  {/* Title — centers at rest, animates up on hover */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '32px',
                      right: '32px',
                      top: '50%',
                      transform: isHovered ? 'translateY(calc(-50% - 70px))' : 'translateY(-50%)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    <h2 className="text-2xl font-bold text-left text-white leading-none">{panel.title}</h2>
                  </div>

                  {/* Description — fades in on hover */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '32px',
                      right: '32px',
                      top: 'calc(50% - 24px)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.3s ease 0.15s',
                    }}
                  >
                    <p className="text-sm text-white/70 leading-snug mb-4">{panel.desc}</p>
                    <button
                      className="text-sm font-medium text-[#F26219] flex items-center gap-1 hover:underline"
                      onClick={(e) => { e.stopPropagation(); onNavigate(panel.nav); }}
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
