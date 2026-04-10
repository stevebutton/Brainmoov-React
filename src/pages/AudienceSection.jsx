import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { technicalServices } from '../data/index';
import { useAssets } from '../context/AssetContext';

export default function AudienceSection({
  audience,
  showBanner,
  videoPlaying,
  toggleVideo,
  selectedService,
  selectedTechService,
  isClosingCards,
  isClosingVideo,
  isFirstVideoOpen,
  lastTechService,
  showSubmenu,
  carouselIndex,
  setCarouselIndex,
  onServiceSelect,
  onTechServiceSelect,
  onCarouselPrev,
  onCarouselNext,
  onNavigate
}) {
  const { assets } = useAssets();
  const Icon = audience.icon;
  const isPlaying = videoPlaying[audience.id];

  return (
    <div className="w-full h-full relative">
      {/* Background (transparent — video renders behind at app level) */}
      <div className="absolute inset-0">
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <div className="text-center z-10 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="w-16 h-16 border-4 border-[#F26219] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-white text-lg mb-2 font-semibold">Video Playing: {audience.videoTitle}</p>
              <button
                onClick={() => toggleVideo(audience.id)}
                className="mt-2 text-[#F26219] hover:text-[#d4521a] underline text-sm font-medium"
              >
                Pause Video
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Section Title - Right Side */}
      <div
        className="absolute"
        style={{ top: '139px', left: '304px', right: '48px', zIndex: 20 }}
      >
        <h2 className="text-3xl font-light text-white leading-tight">{audience.title}</h2>
      </div>

      {/* Intro Text Overlay */}
      <div
        className={`absolute transition-opacity duration-700 ${
          (selectedService || selectedTechService) ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          top: '150px', left: 'calc(50% - 340px)', width: '680px', zIndex: 15,
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div className="p-10">
          <h3 className="text-4xl font-bold mb-6 text-left text-white">
            {audience.title} Services
          </h3>
          <p className="text-xl leading-relaxed text-left text-white/70">
            {audience.intro}
          </p>
          <p className="mt-8 text-lg font-medium text-left text-white">
            Select a service to learn more
          </p>
        </div>
      </div>


      {/* Floating Content */}
      <div className={`absolute inset-0 z-10 flex ${(selectedService || selectedTechService) ? 'pb-20' : 'pb-8'}`} style={{paddingTop: '100px'}}>
        {/* Left Side - Service Menu */}
        {/* "our services" label - aligned with title */}
        <div
          className={`absolute px-8 z-20 ${showSubmenu ? 'animate-submenu-in' : ''}`}
          style={{
            top: '144px',
            width: '304px',
            opacity: showSubmenu ? undefined : 0,
            transform: showSubmenu ? undefined : 'translateY(-100px)'
          }}
        >
          <h3 className="text-xl font-bold text-white text-right">our services</h3>
        </div>

        {/* Buttons - vertically centered with carousel panel */}
        <div
          className={`absolute flex flex-col justify-center px-8 z-20 w-auto ${showSubmenu ? 'animate-submenu-in' : ''}`}
          style={{
            top: '200px',
            bottom: '100px',
            opacity: showSubmenu ? undefined : 0,
            transform: showSubmenu ? undefined : 'translateY(-100px)'
          }}
        >
          <div className="flex flex-col gap-2 items-end">
            {audience.services.map((service) => {
              const ServiceIcon = service.icon;
              const isSelected = selectedService?.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => onServiceSelect(service)}
                  className={`group relative backdrop-blur-xl rounded-2xl p-3 transition-all hover:scale-105 border-2 flex items-center justify-between gap-3 w-[240px] shadow-lg ${
                    isSelected
                      ? 'bg-[#F26219]/20 border-[#F26219]/50 shadow-2xl'
                      : 'bg-black/30 border-white/10 hover:bg-black/50 hover:border-white/20 hover:shadow-xl'
                  }`}
                >
                  <h4 className={`flex-1 text-xs font-semibold text-right leading-tight ${
                    isSelected ? 'text-white' : 'text-white/70'
                  }`}>{service.title}</h4>
                  <ServiceIcon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isSelected ? 'text-[#F26219]' : 'text-white/50 group-hover:text-[#F26219]'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Carousel Panel */}
        {(selectedService || isClosingCards) && (
          <div
            className="absolute z-10"
            style={{
              left: '300px',
              top: '200px',
              width: '340px',
              bottom: '100px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isClosingCards
                ? 'slideOutDown 2s ease-out forwards'
                : 'fadeInPanel 0.5s ease-out forwards'
            }}
          >
            <div className="h-full flex flex-col">
              {/* Carousel Content */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="h-full flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {selectedService.cards.map((card, idx) => (
                    <div key={idx} className="min-w-full h-full flex flex-col">
                      <div
                        className="p-6 flex-1 overflow-auto"
                      >
                        <h4
                          key={`service-${idx}-${selectedService.title}`}
                          className="text-lg font-light mb-1 animate-fade-slide-up leading-none text-white"
                        >
                          {selectedService.title}
                        </h4>
                        <div className="text-white/40 text-xs mb-4">
                          {carouselIndex + 1} / {selectedService.cards.length}
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

                {/* Navigation Arrows */}
                {carouselIndex > 0 && (
                  <button
                    onClick={onCarouselPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg border border-white/20 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                )}
                {carouselIndex < selectedService.cards.length - 1 && (
                  <button
                    onClick={onCarouselNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg border border-white/20 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 py-3">
                {selectedService.cards.map((_, idx) => (
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

        {/* Footer Bar */}
        {(selectedService || selectedTechService) && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-white z-20"
            style={{
              height: '80px',
              animation: 'slideInUp 0.4s ease-out forwards',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="h-full flex items-center">
              <div className="flex items-center justify-end" style={{width: '304px', paddingRight: '32px'}}>
                <h3 className="text-xl font-bold text-slate-900 whitespace-nowrap">our treatment process</h3>
              </div>
              <div className="self-stretch flex items-stretch">
                {technicalServices.map((techService, index) => {
                  const isSelected = selectedTechService?.id === techService.id;
                  return (
                    <button
                      key={techService.id}
                      onClick={() => onTechServiceSelect(techService)}
                      className={`group flex items-center gap-3 px-6 border transition-colors justify-center ${
                        isSelected
                          ? 'bg-[#F26219] border-[#F26219]'
                          : 'bg-white border-black/10 hover:bg-black hover:border-black'
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-[#F26219]/50 group-hover:bg-[#F26219] flex items-center justify-center text-base font-bold text-white flex-shrink-0 transition-colors">{index + 1}</span>
                      <span className={`text-sm font-semibold text-left transition-colors ${isSelected ? 'text-white' : 'text-slate-800 group-hover:text-white'}`}>{techService.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Video Panel */}
        {(selectedTechService || isClosingVideo) && (
          <div
            key={selectedTechService?.id || 'closing'}
            className="absolute overflow-hidden"
            style={{
              right: '48px',
              top: '200px',
              width: '340px',
              bottom: '100px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isClosingVideo
                ? 'slideOutToRight 1.5s ease-out forwards'
                : 'slideInDown 0.6s ease-out forwards',
              zIndex: 15
            }}
          >
            <div className="h-full flex flex-col p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-light leading-none text-white">
                  {isClosingVideo ? lastTechService?.title : selectedTechService?.title}
                </h4>
                <button
                  onClick={() => onTechServiceSelect(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
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
                    <p className="text-xs font-medium text-white">
                      {isClosingVideo ? lastTechService?.title : selectedTechService?.title} — Video Overview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
