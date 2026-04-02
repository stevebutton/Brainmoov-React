import Banner from '../components/Banner';

export default function AboutHistorySection({ showBanner, shouldAnimateBanner, onNavigate }) {
  return (
    <div className="w-full h-full relative bg-[#0f0f0f]">
      <Banner
        title="History of BrainMoove"
        showBanner={showBanner}
        shouldAnimate={shouldAnimateBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
      />

      <div className="absolute left-0 right-0 bg-[#111111] border-b border-white/10 shadow-sm z-10" style={{top: '100px', height: '50px'}}>
        <div className="flex items-center justify-center h-full gap-8 px-8">
          <button onClick={() => onNavigate('about')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">What is BrainMoove?</button>
          <button onClick={() => onNavigate('about-philosophy')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Philosophy</button>
          <button onClick={() => onNavigate('about-objectives')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Objectives</button>
          <button onClick={() => onNavigate('about-team')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Team</button>
          <button onClick={() => onNavigate('about-infrastructure')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Infrastructure</button>
          <button onClick={() => onNavigate('about-history')} className="text-sm font-semibold text-white underline hover:opacity-70 transition-opacity">History</button>
        </div>
      </div>

      <div className="p-12" style={{paddingTop: '170px'}}>
        <div style={{width: '35%'}}>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">History of BrainMoove</h2>
            <p className="text-lg leading-relaxed mb-4 text-white/70">
              [Detailed content about BrainMoove's history will go here...]
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              Discover our journey from inception to becoming a leading center for functional neurology and neurological rehabilitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
