import { ChevronRight } from 'lucide-react';
import Banner from '../components/Banner';
import { audiences } from '../data/index';

export default function WhoDetailSection({ showBanner, hoveredAudience, setHoveredAudience, onNavigate }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Banner
        title="Who We Treat"
        showBanner={showBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
      />

      <div className="p-12" style={{paddingTop: '120px'}}>
        <p className="text-lg mb-8 max-w-3xl">
          Select an audience to explore our specialized programs:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.id}
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredAudience(audience.id)}
                onMouseLeave={() => setHoveredAudience(null)}
                style={{ width: '295px' }}
              >
                <div
                  className="bg-white/40 backdrop-blur-xl px-8 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer"
                  onClick={() => onNavigate(audience.id)}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Icon className="w-8 h-8 transition-colors flex-shrink-0" />
                    <h3 className="text-lg font-semibold">{audience.title}</h3>
                  </div>
                </div>

                {hoveredAudience === audience.id && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-6 border-t border-white/40">
                      <p className="leading-snug mb-4">
                        {audience.id === 'children' && 'Specialized programs for infants, toddlers, and children addressing developmental challenges and optimizing neurological growth.'}
                        {audience.id === 'adults' && 'Comprehensive care for adults and athletes focused on performance optimization, injury recovery, and cognitive enhancement.'}
                        {audience.id === 'seniors' && 'Targeted interventions for seniors to maintain cognitive function, mobility, and overall neurological health.'}
                      </p>
                      <button
                        onClick={() => onNavigate(audience.id)}
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
                      >
                        <span>Explore programs</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
