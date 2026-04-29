import { ChevronLeft, ChevronRight, X, ChevronRight as DefaultServiceIcon } from 'lucide-react';
import { technicalServices as fallbackTechnicalServices } from '../data/index';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

export default function AudienceSection({
  audience,
  isExiting,
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
  const { content } = useContent();
  const technicalServices = content?.technicalServices || fallbackTechnicalServices;
  const ss = content?.siteSettings;
  const uiOurServices = ss?.uiOurServices || 'Our Services';
  const uiSelectService = ss?.uiSelectService || 'Select a service to learn more';
  const uiOurTreatmentProcess = ss?.uiOurTreatmentProcess || 'our treatment process';
  const btnPauseVideo = ss?.btnPauseVideo || 'Pause Video';

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
                {btnPauseVideo}
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Floating Content */}
      <div className={`absolute inset-0 z-10 flex ${(selectedService || selectedTechService) ? 'pb-20' : 'pb-8'}`} style={{paddingTop: '100px'}}>

        {/* Intro Panel — mounts when showSubmenu is true, triggering build animations */}
        {!(selectedService || isClosingCards) && showSubmenu && (
          <div
            className="absolute z-10"
            style={{
              left: '96px',
              top: '100px',
              width: '624px',
              bottom: '108px',
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

              {/* Top: Section Title — slides in left to right */}
              <div
                className="px-5 pt-4 pb-3 border-b border-black/10 flex-shrink-0"
                style={{ animation: 'introTitleFromLeft 2s cubic-bezier(0.4, 0, 0.2, 1) 2s both' }}
              >
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '60px', lineHeight: 1 }} className="text-slate-900 text-right">
                  {audience.title.startsWith('Programme ') ? (
                    <>Programme <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>{audience.title.slice('Programme '.length)}</span></>
                  ) : audience.title}
                </h2>
              </div>

              {/* Body: Two Columns */}
              <div className="flex flex-1 overflow-hidden">

                {/* Left Column: Service Buttons — slides up and fades in */}
                <div
                  className="flex flex-col gap-2 p-4 items-stretch overflow-y-auto flex-shrink-0"
                  style={{ width: '240px', animation: 'introButtonsUp 1s ease-out 5s both' }}
                >
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-xs text-slate-500 text-right mb-1">{uiOurServices}</p>
                  {audience.services.map((service) => {
                    const ServiceIcon = service.icon || DefaultServiceIcon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => onServiceSelect(service)}
                        className="group rounded-xl px-4 py-2.5 transition-all flex items-center justify-between gap-2 bg-black/40 backdrop-blur-sm hover:bg-black/55"
                      >
                        <h4 className="flex-1 text-xs font-semibold text-right leading-tight text-white">{service.title}</h4>
                        <ServiceIcon className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-[#F26219] transition-colors" />
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Intro Content — dissolves in with vertical rise */}
                <div
                  className="flex-1 flex flex-col overflow-hidden border-l border-black/10 p-5"
                  style={{ animation: 'introTextRise 1s ease-out 4s both' }}
                >
                  <h4
                    className="mb-3 text-right"
                    style={{ fontFamily: "'Instrument Serif', serif", fontSize: '28px', color: '#000', lineHeight: 1.1 }}
                  >
                    {audience.title.startsWith('Programme ') ? (
                      <span style={{ fontStyle: 'italic', color: '#2C97BE' }}>{audience.title.slice('Programme '.length)}</span>
                    ) : audience.title}
                  </h4>
                  <div className="text-slate-700 text-sm leading-relaxed text-right flex-1 overflow-auto">
                    <RichText value={audience.intro} />
                  </div>
                  <p className="text-xs text-slate-400 text-right mt-3">{uiSelectService}</p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Carousel Panel — shown when a service is selected */}
        {(selectedService || isClosingCards) && (
          <div
            className="absolute z-10"
            style={{
              left: '96px',
              top: '100px',
              width: '624px',
              bottom: '108px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.30)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isExiting || isClosingCards
                ? 'slideOutDown 0.5s ease-in both'
                : 'fadeInPanel 0.5s ease-out forwards'
            }}
          >
            <div className="h-full flex flex-col">

              {/* Top: Section Title — shrinks in from 60px to 32px on mount */}
              <div className="px-5 pt-3 pb-2 border-b border-black/10 flex-shrink-0">
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', lineHeight: 1, animation: isClosingCards ? 'none' : 'titleShrink 0.5s ease-out both' }} className="text-slate-900 text-right">
                  {audience.title.startsWith('Programme ') ? (
                    <>Programme <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>{audience.title.slice('Programme '.length)}</span></>
                  ) : audience.title}
                </h2>
              </div>

              {/* Body: Two Columns */}
              <div className="flex flex-1 overflow-hidden">

                {/* Left Column: Service Buttons */}
                <div className="flex flex-col gap-2 p-4 items-stretch overflow-y-auto flex-shrink-0" style={{ width: '240px' }}>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-xs text-slate-500 text-right mb-1">{uiOurServices}</p>
                  {audience.services.map((service) => {
                    const ServiceIcon = service.icon || DefaultServiceIcon;
                    const isSelected = selectedService
                      ? (service._key ? selectedService._key === service._key : selectedService.id === service.id)
                      : false;
                    return (
                      <button
                        key={service.id}
                        onClick={() => onServiceSelect(service)}
                        className={`group rounded-xl px-4 py-2.5 transition-all flex items-center justify-between gap-2 backdrop-blur-sm ${
                          isSelected ? 'bg-[#F26219]/70' : 'bg-black/40 hover:bg-black/55'
                        }`}
                      >
                        <h4 className="flex-1 text-xs font-semibold text-right leading-tight text-white">{service.title}</h4>
                        <ServiceIcon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isSelected ? 'text-white' : 'text-white/60 group-hover:text-[#F26219]'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Description or Card Carousel */}
                <div className="flex-1 flex flex-col overflow-hidden border-l border-black/10">
                  {selectedService.description?.length > 0 ? (
                    /* Rich-text description — shown when service has a description field */
                    <div className="p-5 flex-1 overflow-y-auto overflow-x-hidden">
                      <h4
                        className="mb-3 animate-slide-in-right-blur text-right"
                        style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', color: '#000', lineHeight: 1.0 }}
                      >
                        {selectedService.title}
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed text-right">
                        <RichText value={selectedService.description} />
                      </div>
                    </div>
                  ) : (
                    /* Card carousel — fallback for services that use the cards model */
                    <>
                      <div className="flex-1 relative overflow-hidden">
                        <div
                          className="h-full flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                        >
                          {(selectedService.cards || []).map((card, idx) => (
                            <div key={idx} className="min-w-full h-full flex flex-col">
                              <div className="p-5 flex-1 overflow-y-auto overflow-x-hidden">
                                <h4
                                  key={`service-${idx}-${selectedService.title}`}
                                  className="mb-1 animate-slide-in-right-blur text-right"
                                  style={{ fontFamily: "'Instrument Serif', serif", fontSize: '42px', color: '#000', lineHeight: 1.0 }}
                                >
                                  {selectedService.title}
                                </h4>
                                <div className="text-slate-400 text-xs mb-3 text-right">
                                  {carouselIndex + 1} / {selectedService.cards.length}
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
                      {(selectedService.cards?.length > 0) && (
                        <div className="flex items-center justify-between px-3 py-3 border-t border-black/10 flex-shrink-0">
                          <button
                            onClick={onCarouselPrev}
                            disabled={carouselIndex === 0}
                            className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                          >
                            <ChevronLeft className="w-4 h-4 text-slate-700" />
                          </button>
                          <div className="flex justify-center gap-1.5">
                            {selectedService.cards.map((_, idx) => (
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
                            disabled={carouselIndex >= selectedService.cards.length - 1}
                            className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex >= selectedService.cards.length - 1 ? 'opacity-20 cursor-not-allowed' : ''}`}
                          >
                            <ChevronRight className="w-4 h-4 text-slate-700" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

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
              animation: isExiting ? 'slideOutDown 0.5s ease-in forwards' : 'slideInUp 0.4s ease-out forwards',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="h-full flex items-center">
              <div className="flex items-center justify-end" style={{width: '304px', paddingRight: '32px'}}>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px' }} className="text-slate-900 whitespace-nowrap">{uiOurTreatmentProcess}</h3>
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
              left: '730px',
              top: '100px',
              width: '500px',
              bottom: '108px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isExiting || isClosingVideo
                ? 'slideOutDown 2s ease-in forwards'
                : 'slideInFromRight 3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              zIndex: 15
            }}
          >
            {/* Full-panel video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://framerusercontent.com/assets/INsc3G5K2Tv80wdTWEjcLPSHR0.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />

            {/* Close button */}
            <button
              onClick={() => onTechServiceSelect(null)}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Bottom overlay */}
            <div className="absolute inset-0 flex items-end justify-start p-4 z-10">
              <div
                className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-xl px-5 py-3"
                style={{ animation: isClosingVideo ? 'none' : 'slideInUp 2s ease-out 3s both' }}
              >
                <svg className="w-7 h-7 flex-shrink-0" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <p className="text-base font-semibold text-white">
                  {isClosingVideo ? lastTechService?.title : selectedTechService?.title} — Video Overview
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
