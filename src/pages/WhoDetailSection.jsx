import { ChevronRight } from 'lucide-react';
import { audiences } from '../data/index';

const audienceImages = {
  children: 'https://framerusercontent.com/images/1kzm2w4SmI20T5ugoisbV7JxY.jpg?width=350&height=420',
  adults: 'https://framerusercontent.com/images/hwxkNDC6wxuUHZln1kGU1ylHJM.jpg?width=350&height=420',
  seniors: 'https://framerusercontent.com/images/wpNelmVvH594ymTUxhtidiYsNZg.jpg?width=350&height=420',
};

const audienceDesc = {
  children: 'Specialized programs for infants, toddlers, and children addressing developmental challenges and optimizing neurological growth.',
  adults: 'Comprehensive care for adults and athletes focused on performance optimization, injury recovery, and cognitive enhancement.',
  seniors: 'Targeted interventions for seniors to maintain cognitive function, mobility, and overall neurological health.',
};

export default function WhoDetailSection({ showBanner, hoveredAudience, setHoveredAudience, onNavigate }) {
  return (
    <div className="w-full h-full relative">
      <div className="p-12" style={{paddingTop: '170px'}}>
        <div className="flex justify-center gap-2.5">
          {audiences.map((audience) => {
            const isHovered = hoveredAudience === audience.id;
            return (
              <div
                key={audience.id}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                onMouseEnter={() => setHoveredAudience(audience.id)}
                onMouseLeave={() => setHoveredAudience(null)}
                onClick={() => onNavigate(audience.id)}
                style={{
                  width: '295px',
                  height: '340px',
                  backgroundImage: `url(${audienceImages[audience.id]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-400"
                  style={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.1)' }}
                />

                {/* Title — centered at rest, animates up on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    top: '50%',
                    transform: isHovered ? 'translateY(calc(-50% - 70px))' : 'translateY(-50%)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <h3 className="text-2xl font-semibold text-left text-white leading-tight">{audience.title}</h3>
                </div>

                {/* Description — fades in on hover */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    right: '24px',
                    top: 'calc(50% - 24px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.15s',
                  }}
                >
                  <div className="w-8 h-px bg-white/40 mb-3" />
                  <p className="text-sm text-white/80 leading-snug mb-4">{audienceDesc[audience.id]}</p>
                  <button
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 hover:underline"
                    onClick={(e) => { e.stopPropagation(); onNavigate(audience.id); }}
                  >
                    <span>Explore programs</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-lg mt-8 text-center text-white/70">
          Select an audience to explore our specialized programs
        </p>
      </div>
    </div>
  );
}
