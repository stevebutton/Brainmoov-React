import { useAssets } from '../context/AssetContext';

export default function Banner({ title, subtitle = null, showBanner, onLogoClick, onNavigate, shouldAnimate = true, showTreatmentFinder = false, onTreatmentFinderClick = null }) {
  const { assets } = useAssets();
  return (
    <div
      className={`absolute top-0 left-0 right-0 bg-white backdrop-blur-2xl text-slate-800 px-8 z-20 ${showBanner && shouldAnimate ? 'animate-banner-in' : ''}`}
      style={{
        height: '100px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        opacity: showBanner ? 1 : 0,
        transform: showBanner ? 'translateY(0)' : 'translateY(-100%)',
        transition: shouldAnimate ? undefined : 'none'
      }}
    >
      <div className="flex items-start justify-between h-full pt-2">
        {/* Left - Clickable Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity group flex-shrink-0"
        >
          <img
            src={assets.logo}
            alt="BrainMoov Logo"
            className="group-hover:scale-110 transition-transform"
            style={{width: '113px', height: '80px', objectFit: 'contain'}}
          />
        </button>

        {/* Center - Title and Navigation */}
        <div className="flex-1 flex flex-col items-start" style={{paddingTop: '14px', paddingLeft: '20px'}}>
          {/* Section Title */}
          <div key={title} className="animate-fade-slide-down">
            <h2 className="text-3xl font-bold whitespace-nowrap">{title}</h2>
          </div>

          {/* Navigation Menu - Below Title */}
          {onNavigate && (
            <div className="flex gap-6 mt-1">
              <button
                onClick={() => onNavigate('about')}
                className="text-sm font-medium hover:underline transition-all"
              >
                What is BrainMoove?
              </button>
              <button
                onClick={() => onNavigate('who-detail')}
                className="text-sm font-medium hover:underline transition-all"
              >
                Who We Treat
              </button>
              <button
                onClick={() => onNavigate('what-detail')}
                className="text-sm font-medium hover:underline transition-all"
              >
                What We Treat
              </button>
              <button
                onClick={() => onNavigate('process-detail')}
                className="text-sm font-medium hover:underline transition-all"
              >
                Our Treatment Process
              </button>
            </div>
          )}
        </div>

        {/* Right - Subtitle or Treatment Finder Button */}
        <div className="flex items-start gap-3 flex-shrink-0" style={{paddingTop: '14px'}}>
          {showTreatmentFinder && onTreatmentFinderClick ? (
            <button
              onClick={onTreatmentFinderClick}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 hover:from-purple-200 hover:via-blue-200 hover:to-cyan-200 border border-blue-300 rounded-xl px-4 py-2 transition-all hover:scale-105 shadow-md"
            >
              <div className="bg-blue-600 rounded-full p-1.5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{stroke: '#ffffff'}}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">Treatment Finder</span>
            </button>
          ) : subtitle ? (
            <div key={subtitle} className="animate-fade-slide-right">
              <h2 className="text-3xl font-bold uppercase">{subtitle}</h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
