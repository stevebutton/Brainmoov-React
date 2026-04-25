import { ChevronLeft, ChevronRight } from 'lucide-react';
import { machines } from '../data/index';

// machines[0] is the section intro — buttons start from machines[1]
const introMachine = machines[0];
const equipmentList = machines.slice(1);

const equipmentImages = {
  'Gyrostim':              'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/gyrostim.jpg',
  'Vibramoov':             'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/vibramoove.jpg.jpg',
  'Force Platform':        'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/force-platform.jpg.jpg',
  'Interactive Metronome': 'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/interactive-metronome.jpg',
  'TOVA':                  'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/TOVA.jpg',
  'VNG':                   'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/VNG.jpg',
  'Brainport':             'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/brainport.jpg',
  'NeuroFeedBack':         'https://raw.githubusercontent.com/stevebutton/Brainmoov-React/main/src/neurofeedback.jpg',
};

const fallbackImage = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=500&fit=crop&q=80';

export default function AboutInfrastructureSection({
  showBanner,
  isExiting,
  selectedMachine,
  setSelectedMachine,
  isClosingInfraVideo,
  lastMachine,
  carouselIndex,
  setCarouselIndex,
  onCarouselPrev,
  onCarouselNext,
  onNavigate
}) {
  // selectedMachine === 0 means intro state; > 0 means a specific item
  const machine = selectedMachine > 0 ? machines[selectedMachine] : null;
  const isIntro = selectedMachine === 0 || selectedMachine === null;
  const displayMachine = isClosingInfraVideo ? machines[lastMachine] : machine;

  return (
    <div className="w-full h-full relative">

      {/* Main Panel — always visible */}
      <div
        className="absolute z-10"
        style={{
          left: '96px',
          top: '100px',
          width: '624px',
          bottom: '28px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.30)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          animation: isExiting ? 'slideOutDown 0.5s ease-in both' : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both'
        }}
      >
        <div className="h-full flex flex-col">

          {/* Top: Section Title */}
          <div className="px-5 pt-3 pb-2 border-b border-black/10 flex-shrink-0" style={{ animation: 'introTitleFromLeft 2s cubic-bezier(0.4, 0, 0.2, 1) 2s both' }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: isIntro ? '60px' : '32px', lineHeight: 1, transition: 'font-size 0.5s ease-out' }} className="text-slate-900 text-right">
              Our <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>Infrastructure</span>
            </h2>
          </div>

          {/* Body: Two Columns */}
          <div className="flex flex-1 overflow-hidden">

            {/* Left Column: Equipment Buttons (intro item excluded) */}
            <div className="flex flex-col gap-2 p-4 items-stretch overflow-y-auto flex-shrink-0" style={{ width: '240px', animation: 'introButtonsUp 1s ease-out 5s both' }}>
              <p className="text-xs font-light text-slate-500 text-right mb-1">Our Equipment</p>
              {equipmentList.map((m, i) => {
                const originalIndex = i + 1;
                const isSelected = selectedMachine === originalIndex;
                return (
                  <button
                    key={originalIndex}
                    onClick={() => setSelectedMachine(originalIndex)}
                    className={`group rounded-xl px-4 py-2.5 transition-all flex items-center justify-end backdrop-blur-sm ${
                      isSelected ? 'bg-[#F26219]/70' : 'bg-black/40 hover:bg-black/55'
                    }`}
                  >
                    <h4 className="text-xs font-semibold text-right leading-tight text-white">{m.title}</h4>
                  </button>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col overflow-hidden border-l border-black/10" style={{ animation: 'introTextRise 1s ease-out 4s both' }}>

              {/* Intro state */}
              {isIntro && (
                <div className="flex-1 flex flex-col p-5 overflow-auto">
                  <h4
                    className="mb-3 text-right"
                    style={{ fontFamily: "'Instrument Serif', serif", fontSize: '28px', color: '#000', lineHeight: 1.1 }}
                  >
                    <span style={{ fontStyle: 'italic', color: '#2C97BE' }}>Infrastructure</span>
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed text-right flex-1">
                    {introMachine.cards[0].description}
                  </p>
                  <p className="text-xs text-slate-400 text-right mt-3">Select equipment to learn more</p>
                </div>
              )}

              {/* Machine selected state */}
              {!isIntro && machine && (
                <>
                  <div className="flex-1 relative overflow-hidden">
                    <div
                      className="h-full flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                    >
                      {machine.cards.map((card, idx) => (
                        <div key={idx} className="min-w-full h-full flex flex-col">
                          <div className="p-5 flex-1 overflow-y-auto overflow-x-hidden">
                            <h4
                              key={`machine-${idx}-${machine.title}`}
                              className="mb-1 animate-slide-in-right-blur text-right"
                              style={{ fontFamily: "'Instrument Serif', serif", fontSize: '42px', color: '#000', lineHeight: 1.0 }}
                            >
                              {machine.title}
                            </h4>
                            <div className="text-slate-400 text-xs mb-3 text-right">
                              {carouselIndex + 1} / {machine.cards.length}
                            </div>
                            <h5
                              key={`title-${idx}-${carouselIndex}`}
                              className="mb-2 animate-fade-in text-right"
                              style={{ fontFamily: "'Instrument Serif', serif", fontSize: '24px', color: '#000', lineHeight: 1.2 }}
                            >
                              {card.title}
                            </h5>
                            <p
                              key={`desc-${idx}-${carouselIndex}`}
                              className="text-slate-700 text-sm leading-relaxed animate-fade-in-delay text-right"
                            >
                              {card.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom bar: prev | dots | next */}
                  <div className="flex items-center justify-between px-3 py-3 border-t border-black/10 flex-shrink-0">
                    <button
                      onClick={onCarouselPrev}
                      disabled={carouselIndex === 0}
                      className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <div className="flex justify-center gap-1.5">
                      {machine.cards.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`rounded-full transition-all ${
                            idx === carouselIndex
                              ? 'w-5 h-1.5 bg-[#F26219]'
                              : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={onCarouselNext}
                      disabled={carouselIndex >= machine.cards.length - 1}
                      className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex >= machine.cards.length - 1 ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Video Panel — shown when a machine is selected or closing */}
      {(!isIntro || isClosingInfraVideo) && <div
        key={isClosingInfraVideo ? 'closing' : machine?.title}
        className="absolute overflow-hidden"
        style={{
          right: '88px',
          top: '100px',
          width: '415px',
          bottom: '28px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.30)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          animation: isExiting || isClosingInfraVideo ? 'slideOutDown 2s ease-in forwards' : 'slideInFromRight 3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          zIndex: 15
        }}
      >
        <div className="h-full relative" style={{ padding: '10px' }}>
          <div className="absolute rounded-xl overflow-hidden" style={{ inset: '10px' }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `url(${equipmentImages[displayMachine?.title] || fallbackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-end justify-start p-4">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-xl px-5 py-3">
                <svg className="w-7 h-7 flex-shrink-0" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <p className="text-base font-semibold text-white">
                  {displayMachine?.title} — Video Overview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>}

    </div>
  );
}
