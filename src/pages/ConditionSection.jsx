import { ChevronLeft, ChevronRight, ChevronRight as DefaultServiceIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

export default function ConditionSection({
  condition,
  isExiting,
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
  onNavigate,
  allConditionIds,
}) {
  const { content } = useContent();
  const ss = content?.siteSettings;

  const conditionIdx = allConditionIds ? allConditionIds.indexOf(condition.id) : -1;
  const prevConditionId = conditionIdx > 0 ? allConditionIds[conditionIdx - 1] : null;
  const nextConditionId = conditionIdx >= 0 && conditionIdx < allConditionIds.length - 1 ? allConditionIds[conditionIdx + 1] : null;
  const uiApproaches = ss?.uiApproaches || 'Approches';
  const uiSelectApproach = ss?.uiSelectApproach || 'Sélectionnez une approche';

  return (
    <div className="w-full h-full relative">

      {/* Full-canvas background video */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 0,
          animation: isExiting ? 'dissolveOut 0.6s ease-in forwards' : 'dissolveIn 0.6s ease-out forwards',
          zIndex: 2,
        }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }}>
          <source src="http://brainmoove.flywheelsites.com/wp-content/uploads/2026/05/greenscreen_1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Content */}
      <div
        className="absolute inset-0 z-10 flex pb-8"
        style={{ paddingTop: '100px' }}
      >

        {/* Intro Panel — shown before a service is selected */}
        {!(selectedService || isClosingCards) && showSubmenu && (
          <>
          {/* Title above panel */}
          <div
            className="absolute z-10"
            style={{
              right: '580px',
              bottom: '326px',
              width: '600px',
              animation: isExiting
                ? 'slideOutDown 0.5s ease-in both'
                : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
            }}
          >
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '60px',
                fontStyle: 'italic',
                lineHeight: 0.95,
                color: '#ffffff',
                textAlign: 'right',
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
              }}
            >
              {condition.title}
            </h2>
          </div>

          <div
            className="absolute z-10"
            style={{
              right: '580px',
              top: '414px',
              width: '600px',
              bottom: '94px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.60)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isExiting
                ? 'slideOutDown 0.5s ease-in both'
                : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
            }}
          >
            <div className="h-full flex flex-col">

              {/* Intro content */}
              <div
                className="flex-1 flex flex-col overflow-hidden p-5"
                style={{ animation: 'introTextRise 1s ease-out 4s both' }}
              >
                <div className="text-slate-700 text-sm leading-relaxed text-right flex-1 overflow-auto">
                  <RichText value={condition.intro} />
                </div>
              </div>

            </div>
          </div>

          {/* Buttons row below panel */}
          <div
            className="absolute z-10 flex flex-col gap-2"
            style={{
              right: '580px',
              bottom: '28px',
              width: '600px',
              animation: isExiting
                ? 'slideOutDown 0.5s ease-in both'
                : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
            }}
          >
            {/* Buttons */}
            <div className="flex gap-2">
              {condition.services.map((service) => {
                const ServiceIcon = service.icon || DefaultServiceIcon;
                return (
                  <button
                    key={service.id}
                    onClick={() => onServiceSelect(service)}
                    className="group rounded-xl px-4 py-2.5 transition-all flex items-start gap-2 bg-black/40 backdrop-blur-sm hover:bg-black/55"
                    style={{ flex: 1 }}
                  >
                    <h4 className="flex-1 text-xs font-semibold leading-tight text-white">
                      {service.title}
                    </h4>
                    <ServiceIcon className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-[#F26219] transition-colors mt-0.5" />
                  </button>
                );
              })}
            </div>
            {/* Hint text */}
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '13px',
              color: '#ffffff',
              textAlign: 'center',
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap',
            }}>
              {uiSelectApproach}
            </p>
          </div>
          </>
        )}

        {/* Carousel Panel — shown when a service is selected */}
        {(selectedService || isClosingCards) && (
          <>
          {/* Title above panel */}
          <div
            className="absolute z-10"
            style={{
              right: '580px',
              bottom: '326px',
              width: '600px',
              animation: isExiting || isClosingCards
                ? 'slideOutDown 0.5s ease-in both'
                : 'fadeInPanel 0.5s ease-out forwards',
            }}
          >
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '60px',
                fontStyle: 'italic',
                lineHeight: 0.95,
                color: '#ffffff',
                textAlign: 'right',
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
              }}
            >
              {condition.title}
            </h2>
          </div>

          <div
            className="absolute z-10"
            style={{
              right: '580px',
              top: '414px',
              width: '600px',
              bottom: '94px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.60)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              animation: isExiting || isClosingCards
                ? 'slideOutDown 0.5s ease-in both'
                : 'fadeInPanel 0.5s ease-out forwards',
            }}
          >
            <div className="h-full flex flex-col">

              {/* Service content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedService.description?.length > 0 ? (
                  <div className="p-5 flex-1 overflow-y-auto overflow-x-hidden">
                    <h4
                      className="mb-3 animate-slide-in-right-blur text-right"
                      style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontStyle: 'italic', color: '#2C97BE', lineHeight: 1.0 }}
                    >
                      {selectedService.title}
                    </h4>
                    <div className="text-slate-700 text-sm leading-relaxed text-right">
                      <RichText value={selectedService.description} />
                    </div>
                  </div>
                ) : (
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
                                style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontStyle: 'italic', color: '#2C97BE', lineHeight: 1.0 }}
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
                        <button onClick={onCarouselPrev} disabled={carouselIndex === 0} className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}>
                          <ChevronLeft className="w-4 h-4 text-slate-700" />
                        </button>
                        <div className="flex justify-center gap-1.5">
                          {selectedService.cards.map((_, idx) => (
                            <button key={idx} onClick={() => setCarouselIndex(idx)} className={`rounded-full transition-all ${idx === carouselIndex ? 'w-5 h-1.5 bg-[#F26219]' : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'}`} />
                          ))}
                        </div>
                        <button onClick={onCarouselNext} disabled={carouselIndex >= selectedService.cards.length - 1} className={`bg-white/80 border border-black/10 p-1.5 rounded-full shadow hover:scale-110 transition-transform ${carouselIndex >= selectedService.cards.length - 1 ? 'opacity-20 cursor-not-allowed' : ''}`}>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Buttons row below panel */}
          <div
            className="absolute z-10 flex gap-2"
            style={{
              right: '580px',
              bottom: '28px',
              width: '600px',
              animation: isExiting || isClosingCards
                ? 'slideOutDown 0.5s ease-in both'
                : 'fadeInPanel 0.5s ease-out forwards',
            }}
          >
            {condition.services.map((service) => {
              const ServiceIcon = service.icon || DefaultServiceIcon;
              const isSelected = selectedService
                ? (service._key ? selectedService._key === service._key : selectedService.id === service.id)
                : false;
              return (
                <button
                  key={service.id}
                  onClick={() => onServiceSelect(service)}
                  className={`group rounded-xl px-4 py-2.5 transition-all flex items-start gap-2 backdrop-blur-sm ${
                    isSelected ? 'bg-[#F26219]/70' : 'bg-black/40 hover:bg-black/55'
                  }`}
                  style={{ flex: 1 }}
                >
                  <h4 className="flex-1 text-xs font-semibold leading-tight text-white">
                    {service.title}
                  </h4>
                  <ServiceIcon className={`w-4 h-4 flex-shrink-0 transition-colors mt-0.5 ${
                    isSelected ? 'text-white' : 'text-white/60 group-hover:text-[#F26219]'
                  }`} />
                </button>
              );
            })}
          </div>
          </>
        )}

      {/* Condition prev / next navigation — center left / right edges */}
      {onNavigate && (
        <>
          <button
            onClick={() => prevConditionId && onNavigate(prevConditionId)}
            className="absolute z-20 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-md flex items-center justify-center hover:bg-white/90 transition-colors"
            style={{ left: '12px', top: '520px', transform: 'translateY(-50%)', width: '52px', height: '52px', opacity: prevConditionId ? 1 : 0, pointerEvents: prevConditionId ? 'auto' : 'none', transition: 'opacity 0.3s ease, background-color 0.2s ease' }}
          >
            <ChevronLeft className="w-7 h-7 text-slate-700" />
          </button>
          <button
            onClick={() => nextConditionId && onNavigate(nextConditionId)}
            className="absolute z-20 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-md flex items-center justify-center hover:bg-white/90 transition-colors"
            style={{ right: '12px', top: '520px', transform: 'translateY(-50%)', width: '52px', height: '52px', opacity: nextConditionId ? 1 : 0, pointerEvents: nextConditionId ? 'auto' : 'none', transition: 'opacity 0.3s ease, background-color 0.2s ease' }}
          >
            <ChevronRight className="w-7 h-7 text-slate-700" />
          </button>
        </>
      )}

      </div>
    </div>
  );
}
