import Banner from '../components/Banner';

export default function AboutPhilosophySection({ showBanner, shouldAnimateBanner, onNavigate }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Banner
        title="Our Philosophy"
        showBanner={showBanner}
        shouldAnimate={shouldAnimateBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
      />

      <div className="absolute left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-white/60 shadow-sm z-10" style={{top: '100px', height: '50px'}}>
        <div className="flex items-center justify-center h-full gap-8 px-8">
          <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">What is BrainMoove?</button>
          <button onClick={() => onNavigate('about-philosophy')} className="text-sm font-semibold underline hover:opacity-70 transition-opacity">Our Philosophy</button>
          <button onClick={() => onNavigate('about-objectives')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Objectives</button>
          <button onClick={() => onNavigate('about-team')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Team</button>
          <button onClick={() => onNavigate('about-infrastructure')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Infrastructure</button>
          <button onClick={() => onNavigate('about-history')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">History</button>
        </div>
      </div>

      <div className="p-12" style={{paddingTop: '170px'}}>
        <div style={{width: '35%'}}>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/80 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg leading-relaxed mb-4">
              [Detailed content about BrainMoove's philosophy will go here...]
            </p>
            <p className="text-lg leading-relaxed">
              Our approach bridges cutting-edge neuroscience with compassionate care, focusing on the root causes of neurological dysfunction rather than just symptoms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
