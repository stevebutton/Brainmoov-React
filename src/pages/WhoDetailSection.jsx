import { ChevronRight } from 'lucide-react';
import { audiences } from '../data/index';

const audienceImages = {
  children: 'https://framerusercontent.com/images/1kzm2w4SmI20T5ugoisbV7JxY.jpg?width=350&height=420',
  adults: 'https://framerusercontent.com/images/hwxkNDC6wxuUHZln1kGU1ylHJM.jpg?width=350&height=420',
  seniors: 'https://framerusercontent.com/images/wpNelmVvH594ymTUxhtidiYsNZg.jpg?width=350&height=420',
};

export default function WhoDetailSection({ showBanner, hoveredAudience, setHoveredAudience, onNavigate }) {
  return (
    <div className="w-full h-full relative">

      <div className="p-12" style={{paddingTop: '170px'}}>
        <p className="text-lg mb-8 max-w-3xl text-white/70">
          Select an audience to explore our specialized programs:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {audiences.map((audience) => {
            return (
              <div
                key={audience.id}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
                onMouseEnter={() => setHoveredAudience(audience.id)}
                onMouseLeave={() => setHoveredAudience(null)}
                style={{ width: '295px' }}
              >
                {/* Background image with title overlay */}
                <div
                  className="relative cursor-pointer"
                  style={{
                    height: '240px',
                    backgroundImage: `url(${audienceImages[audience.id]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                  }}
                  onClick={() => onNavigate(audience.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                    <h3 className="text-lg font-semibold leading-tight text-white">{audience.title}</h3>
                  </div>
                </div>

                {/* Hover panel */}
                {hoveredAudience === audience.id && (
                  <div
                    className="overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      animation: 'slideInDownWithBg 0.6s ease-in forwards',
                      opacity: 0
                    }}
                  >
                    <div className="p-6 border-t border-white/10">
                      <p className="leading-snug mb-4 text-sm text-white/70">
                        {audience.id === 'children' && 'Specialized programs for infants, toddlers, and children addressing developmental challenges and optimizing neurological growth.'}
                        {audience.id === 'adults' && 'Comprehensive care for adults and athletes focused on performance optimization, injury recovery, and cognitive enhancement.'}
                        {audience.id === 'seniors' && 'Targeted interventions for seniors to maintain cognitive function, mobility, and overall neurological health.'}
                      </p>
                      <button
                        onClick={() => onNavigate(audience.id)}
                        className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
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
