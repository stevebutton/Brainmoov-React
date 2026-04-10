import { X } from 'lucide-react';
import { technicalServices } from '../data/index';
import { useAssets } from '../context/AssetContext';

export default function ProcessDetailSection({ showBanner, hoveredProcessStep, setHoveredProcessStep, selectedProcessVideo, setSelectedProcessVideo, onNavigate, onTreatmentFinderClick }) {
  const { assets } = useAssets();

  return (
    <div className="w-full h-full relative">


      <div className="relative z-10 px-16" style={{ paddingTop: '390px' }}>
        <p className="text-lg mb-10 text-center max-w-4xl mx-auto text-white/70">
          Our comprehensive five-step approach to neurological rehabilitation:
        </p>

        {/* Timeline row */}
        <div className="flex items-center">
          {technicalServices.map((service, index) => {
            const isLast = index === technicalServices.length - 1;
            const isVideoShowing = selectedProcessVideo === service.id;

            return (
              <div key={service.id} className={`flex items-center ${!isLast ? 'flex-1' : ''}`}>

                {/* Node */}
                <div
                  className="relative flex items-center gap-3 cursor-pointer group flex-shrink-0"
                  onMouseEnter={() => setHoveredProcessStep(service.id)}
                  onMouseLeave={() => setHoveredProcessStep(null)}
                  onClick={() => setSelectedProcessVideo(service.id)}
                >
                  {/* Video panel — above */}
                  {isVideoShowing && (
                    <div
                      className="absolute left-0 rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                      style={{
                        bottom: 'calc(100% + 16px)',
                        width: '300px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        animation: 'slideInDown 0.6s ease-out forwards',
                        zIndex: 30
                      }}
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-light text-white">{service.title}</h4>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProcessVideo(null); }}
                            className="text-white/70 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div
                          className="rounded-lg overflow-hidden relative"
                          style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
                        >
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute inset-0 flex items-end justify-start p-3">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                              <svg className="w-5 h-5 flex-shrink-0" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                              <p className="text-xs font-medium text-white">Step {index + 1} — Video Overview</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#F26219]/50 group-hover:bg-[#F26219] flex items-center justify-center font-bold text-xl text-white flex-shrink-0 transition-colors">
                    {index + 1}
                  </div>

                  {/* Label */}
                  <span className={`text-sm font-semibold leading-tight transition-colors ${hoveredProcessStep === service.id ? 'text-white' : 'text-white/70'}`} style={{ maxWidth: '80px' }}>
                    {service.title}
                  </span>

                  {/* Hover description panel — below */}
                  {hoveredProcessStep === service.id && (
                    <div
                      className="absolute left-0 top-full mt-3 rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                      style={{
                        width: '240px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        animation: 'slideInDown 0.4s ease-out forwards',
                        zIndex: 20
                      }}
                    >
                      <div className="p-6">
                        <p className="text-xs font-semibold mb-3 text-white">
                          {service.id === 'assessment' && 'The Foundation of Your Journey'}
                          {service.id === 'neurological' && 'Understanding Your Unique Profile'}
                          {service.id === 'treatment' && 'Your Personalized Path Forward'}
                          {service.id === 'monitoring' && 'Tracking Your Transformation'}
                          {service.id === 'followup' && 'Sustaining Your Success'}
                        </p>
                        <p className="text-xs leading-tight text-white/70">
                          {service.id === 'assessment' && 'Comprehensive evaluation of your neurological health, medical history, and specific concerns to establish baseline function.'}
                          {service.id === 'neurological' && 'Advanced diagnostic testing to identify specific areas of dysfunction and create a detailed neurological profile.'}
                          {service.id === 'treatment' && 'Development of a personalized treatment protocol tailored to your unique neurological needs and goals.'}
                          {service.id === 'monitoring' && 'Regular assessment and adjustment of treatment protocols to ensure optimal outcomes and continued improvement.'}
                          {service.id === 'followup' && 'Ongoing support and maintenance protocols to ensure lasting results and prevent regression.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex-1 mx-4" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
