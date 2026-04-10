import { ChevronLeft, ChevronRight } from 'lucide-react';
import { machines } from '../data/index';
import { useAssets } from '../context/AssetContext';

export default function AboutInfrastructureSection({
  showBanner,
  selectedMachine,
  setSelectedMachine,
  carouselIndex,
  setCarouselIndex,
  onCarouselPrev,
  onCarouselNext,
  onNavigate
}) {
  const { assets } = useAssets();
  const machine = selectedMachine !== null ? machines[selectedMachine] : null;

  return (
    <div className="w-full h-full relative">

      {/* Section Title */}
      <div className="absolute" style={{ top: '139px', left: '304px', right: '48px', zIndex: 20 }}>
        <h2 className="text-3xl font-light text-white leading-tight">Our Infrastructure</h2>
      </div>

      {/* Left label */}
      <div className="absolute px-8 z-20" style={{ top: '144px', width: '304px' }}>
        <h3 className="text-xl font-light text-white text-right">our equipment</h3>
      </div>

      {/* Left buttons */}
      <div
        className="absolute flex flex-col justify-center px-8 z-20"
        style={{ top: '200px', bottom: '80px' }}
      >
        <div className="flex flex-col gap-2 items-end">
          {machines.map((m, index) => {
            const isSelected = selectedMachine === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedMachine(index)}
                className={`group relative backdrop-blur-xl rounded-2xl p-3 transition-all hover:scale-105 border-2 flex items-center justify-end gap-3 w-[240px] shadow-lg ${
                  isSelected
                    ? 'bg-[#F26219]/20 border-[#F26219]/50 shadow-2xl'
                    : 'bg-black/30 border-white/10 hover:bg-black/50 hover:border-white/20 hover:shadow-xl'
                }`}
              >
                <h4 className={`text-xs font-semibold text-right leading-tight ${
                  isSelected ? 'text-white' : 'text-white/70'
                }`}>{m.title}</h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel Panel */}
      {machine && (
        <div
          className="absolute z-10"
          style={{
            left: '300px',
            top: '200px',
            width: '340px',
            bottom: '80px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            animation: 'fadeInPanel 0.5s ease-out forwards'
          }}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <div
                className="h-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {machine.cards.map((card, idx) => (
                  <div key={idx} className="min-w-full h-full flex flex-col">
                    <div className="p-6 flex-1 overflow-auto">
                      <h4
                        key={`machine-${idx}-${machine.title}`}
                        className="text-lg font-light mb-1 animate-fade-slide-up leading-none text-white"
                      >
                        {machine.title}
                      </h4>
                      <div className="text-white/40 text-xs mb-4">
                        {carouselIndex + 1} / {machine.cards.length}
                      </div>
                      <h5
                        key={`title-${idx}-${carouselIndex}`}
                        className="text-base font-semibold text-[#F26219] mb-2 animate-fade-in"
                      >
                        {card.title}
                      </h5>
                      <p
                        key={`desc-${idx}-${carouselIndex}`}
                        className="text-white/70 text-sm leading-relaxed animate-fade-in-delay"
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {carouselIndex > 0 && (
                <button
                  onClick={onCarouselPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg border border-white/20 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
              )}
              {carouselIndex < machine.cards.length - 1 && (
                <button
                  onClick={onCarouselNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg border border-white/20 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            <div className="flex justify-center gap-1.5 py-3">
              {machine.cards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`rounded-full transition-all ${
                    idx === carouselIndex
                      ? 'w-5 h-1.5 bg-[#F26219]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Panel */}
      {machine && (
        <div
          className="absolute overflow-hidden"
          style={{
            right: '48px',
            top: '200px',
            width: '340px',
            bottom: '80px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            animation: 'fadeInPanel 0.5s ease-out forwards',
            zIndex: 15
          }}
        >
          <div className="h-full flex flex-col p-5">
            <div className="mb-3">
              <h4 className="text-lg font-light leading-none text-white">{machine.title}</h4>
            </div>
            <div
              className="flex-1 rounded-lg overflow-hidden relative"
              style={{ backgroundImage: `url(${assets['interview-bg']})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-end justify-start p-3">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="text-xs font-medium text-white">{machine.title} — Video Overview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
