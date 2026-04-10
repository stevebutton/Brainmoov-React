import { machines } from '../data/index';
import { useAssets } from '../context/AssetContext';

export default function AboutInfrastructureSection({ showBanner, shouldAnimateBanner, selectedMachine, setSelectedMachine, onNavigate, onTreatmentFinderClick }) {
  const { assets } = useAssets();

  return (
    <div className="w-full h-full relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets['infrastructure-bg'] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&h=800&fit=crop&q=80'})` }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />


      {/* Section Title */}
      <div className="absolute" style={{ top: '112px', left: '48px', zIndex: 20 }}>
        <h2 className="text-3xl font-bold text-white leading-tight">Our Infrastructure</h2>
      </div>

      {/* Horizontal machine buttons */}
      <div
        className="absolute z-20"
        style={{
          top: '152px', left: '48px', right: '48px', height: '50px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          overflow: 'hidden',
        }}
      >
        <div className="flex h-full divide-x divide-white/10">
          {machines.map((machine, index) => (
            <button
              key={index}
              onClick={() => setSelectedMachine(index)}
              className={`group flex-1 flex items-center justify-center gap-2 transition-colors ${
                selectedMachine === index ? 'bg-[#F26219]/20' : 'hover:bg-black/30'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-[#F26219]/50 group-hover:bg-[#F26219] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 transition-colors">
                {index + 1}
              </span>
              <span className={`text-xs font-semibold leading-tight text-left transition-colors ${
                selectedMachine === index ? 'text-white' : 'text-white/70 group-hover:text-white'
              }`}>
                {machine.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content panels */}
      <div className="absolute z-10" style={{ top: '216px', left: '48px', right: '48px', bottom: '20px', display: 'flex', gap: '12px' }}>

        {/* Description Panel */}
        <div
          style={{
            width: '440px',
            flexShrink: 0,
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div className="p-6 h-full overflow-auto">
            <h4 className="font-bold mb-4 text-white leading-none" style={{ fontSize: '1.6rem' }}>
              {machines[selectedMachine].title}
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {machines[selectedMachine].description}
            </p>
          </div>
        </div>

        {/* Video Panel */}
        <div
          style={{
            flex: 1,
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#F26219]/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="text-white/70 text-sm font-semibold">{machines[selectedMachine].title}</p>
              <p className="text-white/40 text-xs mt-1">Video Overview</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
