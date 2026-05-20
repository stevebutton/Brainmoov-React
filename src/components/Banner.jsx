import { createPortal } from 'react-dom';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';

export default function Banner({ title, subtitle = null, showBanner, onLogoClick, onNavigate, shouldAnimate = true, showTreatmentFinder = false, onTreatmentFinderClick = null, showTitle = true }) {
  const { assets } = useAssets();
  const { content } = useContent();
  const ss = content?.siteSettings;

  const navItems = [
    ['intro',              ss?.navHome           || 'Home'],
    ['who-detail',         ss?.navWho            || 'Who We Work With'],
    ['what-detail',        ss?.navWhat           || 'What We Treat'],
    ['about-infrastructure', ss?.navInfrastructure || 'Our Infrastructure'],
    ['process-detail',     ss?.navProcess        || 'Our Treatment Process'],
  ];

  const portalNav = onNavigate ? createPortal(
    <div
      style={{
        position: 'fixed',
        top: 'calc(50vh - 360px * var(--scale, 1))',
        left: 0,
        right: 0,
        height: 'calc(112px * var(--scale, 1))',
        display: 'flex',
        alignItems: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 'calc(28px * var(--scale, 1))',
          marginLeft: 'calc(50vw - 680px * var(--scale, 1))',
          pointerEvents: 'auto',
        }}
      >
        {navItems.map(([section, label]) => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            style={{
              height: 'calc(56px * var(--scale, 1))',
              borderRadius: 'calc(30px * var(--scale, 1))',
              backgroundColor: '#2C97BE',
              color: '#ffffff',
              fontSize: 'calc(14px * var(--scale, 1))',
              fontWeight: 600,
              padding: '0 calc(20px * var(--scale, 1))',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {portalNav}
      <div
        className="absolute top-0 left-0 right-0 z-20"
        style={{ height: '112px', background: 'none' }}
      >
        <div className="flex items-center justify-end h-full pr-8">
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
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                {ss?.navTreatmentFinder || 'Treatment Finder'}
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
