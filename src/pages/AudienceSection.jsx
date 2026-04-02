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
            <div className="text-center z-10 bg-white/50 backdrop-blur-xl border-2 border-white/80 rounded-2xl p-8 shadow-2xl">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-slate-800 text-lg mb-2 font-semibold">Video Playing: {audience.videoTitle}</p>
              <button
                onClick={() => toggleVideo(audience.id)}
                className="mt-2 text-blue-600 hover:text-blue-700 underline text-sm font-medium"
              >
                Pause Video
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40"></div>

      {/* Intro Text Overlay */}
      <div
        className={`absolute transition-opacity duration-700 ${
          (selectedService || selectedTechService) ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{top: '150px', left: '150px', right: 'auto', maxWidth: '800px', zIndex: 15}}
      >
        <div className="px-12">
          <div className="bg-white/40 backdrop-blur-2xl border-2 border-white/60 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-4xl font-bold mb-6 text-left">
              {audience.title} Services
            </h3>
            <p className="text-xl leading-relaxed text-left">
              {audience.intro}
            </p>
            <p className="mt-8 text-lg font-medium text-left">
              Select a service to learn more
            </p>
          </div>
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
      <div className={`absolute inset-0 z-10 flex ${(selectedService || selectedTechService) ? 'pb-16' : 'pb-8'}`} style={{paddingTop: '100px'}}>
        {/* Left Side - Service Menu */}
        <div
          className={`px-8 py-6 overflow-auto relative z-20 w-auto ${showSubmenu ? 'animate-submenu-in' : ''}`}
          style={{
            opacity: showSubmenu ? undefined : 0,
            transform: showSubmenu ? undefined : 'translateY(-100px)'
          }}
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">our services</h3>
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
                      ? 'bg-white/60 border-white/80 shadow-2xl'
                      : 'bg-white/40 border-white/60 hover:bg-white/50 hover:border-white/70 hover:shadow-xl'
                  }`}
                >
                  <ServiceIcon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isSelected ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'
                  }`} />
                  <h4 className={`text-xs font-semibold text-left leading-tight ${
                    isSelected ? 'text-slate-900' : 'text-slate-700'
                  }`}>{service.title}</h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Carousel Panel */}
        {(selectedService || isClosingCards) && (
          <div
            className="absolute left-[200px] bottom-20 w-[400px] z-10"
            style={{
              top: '100px',
              animation: isClosingCards
                ? 'slideOutDown 2s ease-out forwards'
                : 'slideInDown 0.5s ease-out forwards'
            }}
          >
            <div className="h-full bg-white/40 backdrop-blur-2xl shadow-2xl border-l-2 border-white/60 flex flex-col">
              {/* Header */}
              <div className="pt-6 pb-4 px-6 border-b border-white/40">
                <h4
                  key={selectedService.title}
                  className="font-bold mb-1 animate-fade-slide-up leading-none"
                  style={{fontSize: '2rem'}}
                >
                  {selectedService.title}
                </h4>
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <span>{carouselIndex + 1} / {selectedService.cards.length}</span>
                </div>
              </div>

              {/* Carousel Content */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="h-full flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {selectedService.cards.map((card, idx) => (
                    <div key={idx} className="min-w-full h-full p-5 flex flex-col">
                      <div
                        className="bg-white/70 border-2 border-white/80 rounded-xl p-5 flex-1 overflow-auto shadow-xl ml-5"
                        style={{backdropFilter: 'blur(48px)'}}
                      >
                        <h5
                          key={`title-${idx}-${carouselIndex}`}
                          className="text-lg font-bold text-slate-800 mb-3 animate-fade-in"
                        >
                          {card.title}
                        </h5>
                        <p
                          key={`desc-${idx}-${carouselIndex}`}
                          className="text-slate-700 text-sm leading-relaxed animate-fade-in-delay"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-lg border-2 border-white/80 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                  >
                    <ChevronLeft className="w-4 h-4 text-blue-600" />
                  </button>
                )}
                {carouselIndex < selectedService.cards.length - 1 && (
                  <button
                    onClick={onCarouselNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-lg border-2 border-white/80 p-1.5 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 p-3 border-t border-white/40">
                {selectedService.cards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`rounded-full transition-all ${
                      idx === carouselIndex
                        ? 'w-5 h-1.5 bg-blue-600'
                        : 'w-1.5 h-1.5 bg-slate-400 hover:bg-slate-600'
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
            className="absolute bottom-0 left-0 right-0 bg-white backdrop-blur-2xl z-20"
            style={{
              animation: 'slideInUp 0.4s ease-out forwards',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="px-8 py-3 flex items-center gap-6">
              <button
                onClick={() => onNavigate('about-infrastructure')}
                className="flex items-center gap-2 backdrop-blur-lg rounded-lg px-6 py-2 transition-all hover:scale-105 border shadow-md bg-white/50 hover:bg-white/70 border-white/60"
              >
                <span className="text-xs font-medium text-slate-800">Our Infrastructure</span>
                <Building2 className="w-4 h-4 text-blue-600" />
              </button>

              <h4 className="text-xs font-semibold text-slate-700 whitespace-nowrap">our treatment process</h4>
              <div className="flex justify-start gap-2 flex-1">
                {technicalServices.map((techService) => {
                  const TechIcon = techService.icon;
                  const isSelected = selectedTechService?.id === techService.id;
                  return (
                    <button
                      key={techService.id}
                      onClick={() => onTechServiceSelect(techService)}
                      className={`flex items-center gap-2 backdrop-blur-lg rounded-lg px-6 py-2 transition-all hover:scale-105 border shadow-md flex-1 justify-center ${
                        isSelected
                          ? 'bg-white/70 border-white/80 shadow-xl'
                          : 'bg-white/50 hover:bg-white/70 border-white/60'
                      }`}
                    >
                      <TechIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-slate-800">{techService.title}</span>
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
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-white shadow-2xl border-l-2 border-white/60"
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
              <div className="bg-white/40 backdrop-blur-2xl border-b-2 border-white/60 py-4 px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const techService = isClosingVideo ? lastTechService : selectedTechService;
                      const TechIcon = techService?.icon;
                      return TechIcon ? <TechIcon className="w-6 h-6 text-blue-600" /> : null;
                    })()}
                    <h3 className="text-xl font-bold text-slate-800">
                      {isClosingVideo ? lastTechService?.title : selectedTechService?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onTechServiceSelect(null)}
                    className="bg-white/50 hover:bg-white/70 backdrop-blur-lg px-4 py-2 rounded-lg transition-all border border-white/60 text-slate-800 font-medium text-sm"
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
                  <div className="bg-white/50 backdrop-blur-lg border border-white/60 rounded-xl p-4 shadow-lg flex items-center gap-4">
                    <svg className="w-10 h-10 flex-shrink-0" fill="rgb(71, 85, 105)" stroke="none" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <div className="flex flex-col">
                      <p className="text-base font-semibold">
                        {isClosingVideo ? lastTechService?.title : selectedTechService?.title}
                      </p>
                      <p className="text-base font-semibold">
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
