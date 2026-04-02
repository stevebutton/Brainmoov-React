import Banner from '../components/Banner';
import { machines } from '../data/index';

export default function AboutInfrastructureSection({ showBanner, shouldAnimateBanner, selectedMachine, setSelectedMachine, onNavigate, onTreatmentFinderClick }) {
  return (
    <div className="w-full h-full relative bg-[#0f0f0f]">
      <Banner
        title="Our Infrastructure"
        showBanner={showBanner}
        shouldAnimate={shouldAnimateBanner}
        onLogoClick={() => onNavigate('intro')}
        onNavigate={onNavigate}
        showTreatmentFinder={true}
        onTreatmentFinderClick={onTreatmentFinderClick}
      />

      {/* Sub-navigation menu */}
      <div className="absolute left-0 right-0 bg-[#111111] border-b border-white/10 shadow-sm z-10" style={{top: '100px', height: '50px'}}>
        <div className="flex items-center justify-center h-full gap-8 px-8">
          <button onClick={() => onNavigate('about')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">What is BrainMoove?</button>
          <button onClick={() => onNavigate('about-philosophy')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Philosophy</button>
          <button onClick={() => onNavigate('about-objectives')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Objectives</button>
          <button onClick={() => onNavigate('about-team')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">Our Team</button>
          <button onClick={() => onNavigate('about-infrastructure')} className="text-sm font-semibold text-white underline hover:opacity-70 transition-opacity">Our Infrastructure</button>
          <button onClick={() => onNavigate('about-history')} className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-all">History</button>
        </div>
      </div>

      {/* Machine Selection Buttons */}
      <div className="absolute left-0 right-0 z-10" style={{top: '150px', height: '60px'}}>
        <div className="flex items-center justify-center h-full gap-4 px-12">
          {machines.map((machine, index) => (
            <button
              key={index}
              onClick={() => setSelectedMachine(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMachine === index
                  ? 'bg-[#F26219] text-white shadow-lg'
                  : 'bg-[#1a1a1a] text-white/70 hover:bg-[#222222]'
              }`}
            >
              {machine.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8 p-12" style={{paddingTop: '230px', height: '100%'}}>
        {/* Left: Content Panel */}
        <div style={{width: '50%'}}>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">{machines[selectedMachine].title}</h2>
            <p className="text-lg leading-relaxed text-white/70">
              {machines[selectedMachine].description}
            </p>
          </div>
        </div>

        {/* Right: Video placeholder */}
        <div style={{width: '50%'}}>
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-xl overflow-hidden" style={{height: '500px'}}>
            <div className="w-full h-full flex items-center justify-center text-white/50">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 text-white">{selectedMachine + 1}</div>
                <div className="text-2xl font-semibold text-white">{machines[selectedMachine].title}</div>
                <div className="text-lg mt-2 text-white/50">Video Overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
