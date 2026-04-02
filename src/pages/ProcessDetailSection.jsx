import { X } from 'lucide-react';
import Banner from '../components/Banner';
import { technicalServices } from '../data/index';

export default function ProcessDetailSection({ showBanner, hoveredProcessStep, setHoveredProcessStep, selectedProcessVideo, setSelectedProcessVideo, onNavigate, onTreatmentFinderClick }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Banner
        title="Our Treatment Process"
        showBanner={showBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
        showTreatmentFinder={true}
        onTreatmentFinderClick={onTreatmentFinderClick}
      />

      <div className="p-12" style={{paddingTop: '320px'}}>
        <p className="text-lg mb-8 text-center max-w-4xl mx-auto">
          Our comprehensive five-step approach to neurological rehabilitation:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {technicalServices.map((service, index) => {
            const Icon = service.icon;
            const isVideoShowing = selectedProcessVideo === service.id;

            return (
              <div
                key={service.id}
                className="relative"
                style={{ width: '220px' }}
              >
                {/* Video Panel - Appears above the box */}
                {isVideoShowing && (
                  <div
                    className="absolute left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 shadow-2xl overflow-hidden mb-4"
                    style={{
                      bottom: '100%',
                      marginBottom: '16px',
                      animation: 'slideInDown 0.6s ease-out forwards',
                      zIndex: 30
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold">{service.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProcessVideo(null);
                          }}
                          className="text-slate-600 hover:text-slate-800 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-slate-200 rounded-lg overflow-hidden" style={{height: '180px'}}>
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="rgb(71, 85, 105)" stroke="none" viewBox="0 0 24 24">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            <p className="text-sm font-medium">Video Overview</p>
                            <p className="text-xs mt-1">Step {index + 1}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Process Box */}
                <div
                  className="relative rounded-2xl border border-white/60 shadow-2xl cursor-pointer"
                  onMouseEnter={() => setHoveredProcessStep(service.id)}
                  onMouseLeave={() => setHoveredProcessStep(null)}
                  onClick={() => setSelectedProcessVideo(service.id)}
                >
                  <div className="bg-white/40 backdrop-blur-xl px-6 py-6 transition-all duration-300 hover:bg-white/60">
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-3xl">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Icon className="w-6 h-6 transition-colors flex-shrink-0" />
                      <h3 className="text-base font-semibold text-center leading-tight">{service.title}</h3>
                    </div>
                  </div>

                  {/* Hover Description Panel */}
                  {hoveredProcessStep === service.id && (
                    <div
                      className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 shadow-2xl overflow-hidden"
                      style={{ animation: 'slideInDown 0.4s ease-out forwards', zIndex: 20 }}
                    >
                      <div className="p-4">
                        <p className="text-xs font-semibold mb-2">
                          {service.id === 'assessment' && 'The Foundation of Your Journey'}
                          {service.id === 'neurological' && 'Understanding Your Unique Profile'}
                          {service.id === 'treatment' && 'Your Personalized Path Forward'}
                          {service.id === 'monitoring' && 'Tracking Your Transformation'}
                          {service.id === 'followup' && 'Sustaining Your Success'}
                        </p>
                        <p className="text-xs leading-tight">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
