import { useAssets } from '../context/AssetContext';

export default function Banner({ title, subtitle = null, showBanner, onLogoClick, onNavigate, shouldAnimate = true, showTreatmentFinder = false, onTreatmentFinderClick = null, showTitle = true }) {
  const { assets } = useAssets();
  return (
    <div
      className="absolute top-0 left-0 right-0 bg-white text-slate-900 z-20"
      style={{
        height: '112px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center justify-end h-full pr-8">
        {/* Navigation pills — right aligned */}
        {onNavigate && (
          <div className="flex gap-2">
            {[
              ['about', 'What is BrainMoove?'],
              ['who-detail', 'Who We Treat'],
              ['what-detail', 'What We Treat'],
              ['about-infrastructure', 'Our Infrastructure'],
              ['process-detail', 'Our Treatment Process'],
            ].map(([section, label]) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className="text-sm font-semibold text-white transition-all whitespace-nowrap flex items-center px-5 hover:opacity-80"
                style={{ height: '56px', borderRadius: '30px', backgroundColor: '#2C97BE' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Treatment Finder button */}
        {showTreatmentFinder && onTreatmentFinderClick && (
          <button
            onClick={onTreatmentFinderClick}
            className="flex items-center gap-2 bg-[#F26219] hover:bg-[#d4521a] rounded-xl px-4 py-2 transition-all hover:scale-105 shadow-md ml-3"
          >
            <div className="rounded-full p-1.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{stroke: '#ffffff'}}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <span className="text-sm font-semibold text-white whitespace-nowrap">Treatment Finder</span>
          </button>
        )}
      </div>
    </div>
  );
}
