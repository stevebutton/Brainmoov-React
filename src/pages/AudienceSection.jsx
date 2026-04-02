import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import Banner from '../components/Banner';
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
      {/* Video Background */}
      <div
        className="absolute inset-0 bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${audience.backgroundImage})` }}
      >
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

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

      {/* Intro Text Overlay */}
      <div
        className={`absolute transition-opacity duration-700 ${
          (selectedService || selectedTechService) ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          top: '150px', left: '150px', right: 'auto', maxWidth: '680px', zIndex: 15,
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

      {/* Banner */}
      <Banner
        title={audience.title}
        subtitle={selectedTechService?.title}
        showBanner={showBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
      />

      {/* Floating Content */}
      <div className={`absolute inset-0 z-10 flex ${(selectedService || selectedTechService) ? 'pb-20' : 'pb-8'}`} style={{paddingTop: '100px'}}>
        {/* Left Side - Service Menu */}
        <div
          className={`px-8 pb-6 overflow-auto relative z-20 w-auto ${showSubmenu ? 'animate-submenu-in' : ''}`}
          style={{
            paddingTop: '44px',
            opacity: showSubmenu ? undefined : 0,
            transform: showSubmenu ? undefined : 'translateY(-100px)'
          }}
        >
          <h3 className="text-xl font-bold text-white mb-4">our services</h3>
          <div className="flex flex-col gap-2">
            {audience.services.map((service) => {
              const ServiceIcon = service.icon;
              const isSelected = selectedService?.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => onServiceSelect(service)}
                  className={`group relative backdrop-blur-xl rounded-lg p-3 transition-all hover:scale-105 border-2 flex items-center gap-3 w-[160px] shadow-lg ${
                    isSelected
                      ? 'bg-[#F26219]/20 border-[#F26219]/50 shadow-2xl'
                      : 'bg-[#1a1a1a] border-white/10 hover:bg-[#222222] hover:border-white/20 hover:shadow-xl'
                  }`}
                >
                  <ServiceIcon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isSelected ? 'text-[#F26219]' : 'text-white/50 group-hover:text-[#F26219]'
                  }`} />
                  <h4 className={`text-xs font-semibold text-left leading-tight ${
                    isSelected ? 'text-white' : 'text-white/70'
                  }`}>{service.title}</h4>
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
              left: '220px',
              top: '120px',
              width: '360px',
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
                          className="font-bold mb-1 animate-fade-slide-up leading-none text-white"
                          style={{fontSize: '1.6rem'}}
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
            <div className="px-8 h-full flex items-center gap-6">
              <button
                onClick={() => onNavigate('about-infrastructure')}
                className="flex items-center gap-2 rounded-lg px-6 py-2 transition-all hover:scale-105 border shadow-sm bg-white hover:bg-slate-50 border-slate-200"
              >
                <span className="text-xs font-medium text-slate-800">Our Infrastructure</span>
                <Building2 className="w-4 h-4 text-[#F26219]" />
              </button>

              <h4 className="text-xs font-semibold text-slate-500 whitespace-nowrap">our treatment process</h4>
              <div className="flex justify-start gap-2 flex-1">
                {technicalServices.map((techService) => {
                  const TechIcon = techService.icon;
                  const isSelected = selectedTechService?.id === techService.id;
                  return (
                    <button
                      key={techService.id}
                      onClick={() => onTechServiceSelect(techService)}
                      className={`flex items-center gap-2 rounded-lg px-6 py-2 transition-all hover:scale-105 border shadow-sm flex-1 justify-center ${
                        isSelected
                          ? 'bg-[#F26219] border-[#F26219] text-white'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <TechIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#F26219]'}`} />
                      <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-slate-800'}`}>{techService.title}</span>
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
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#111111] shadow-2xl border-l-2 border-white/10"
            style={{
              animation: isClosingVideo
                ? 'slideOutToRight 1.5s ease-out forwards'
                : isFirstVideoOpen
                  ? 'slideInFromRight 2s ease-out forwards'
                  : 'dissolveIn 1s ease-out forwards',
              zIndex: 15
            }}
          >
            <div className="h-full flex flex-col">
              {/* Video Panel Header */}
              <div className="bg-[#1a1a1a] border-b-2 border-white/10 py-4 px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const techService = isClosingVideo ? lastTechService : selectedTechService;
                      const TechIcon = techService?.icon;
                      return TechIcon ? <TechIcon className="w-6 h-6 text-[#F26219]" /> : null;
                    })()}
                    <h3 className="text-xl font-bold text-white">
                      {isClosingVideo ? lastTechService?.title : selectedTechService?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onTechServiceSelect(null)}
                    className="bg-[#2a2a2a] hover:bg-[#333333] px-4 py-2 rounded-lg transition-all border border-white/10 text-white font-medium text-sm"
                  >
                    Close ✕
                  </button>
                </div>
              </div>

              {/* Video Content Area */}
              <div
                className="flex-1 flex items-center justify-center bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${assets['interview-bg']})`
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute left-0 right-0 flex justify-center z-10 px-8" style={{bottom: '82px'}}>
                  <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg flex items-center gap-4">
                    <svg className="w-10 h-10 flex-shrink-0" fill="#ffffff" stroke="none" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <div className="flex flex-col">
                      <p className="text-base font-semibold text-white">
                        {isClosingVideo ? lastTechService?.title : selectedTechService?.title}
                      </p>
                      <p className="text-base font-semibold text-white">
                        Video Interview describing Process
                      </p>
                    </div>
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
