import Banner from '../components/Banner';
import { machines } from '../data/index';

export default function AboutInfrastructureSection({ showBanner, shouldAnimateBanner, selectedMachine, setSelectedMachine, onNavigate, onTreatmentFinderClick }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
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
      <div className="absolute left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-white/60 shadow-sm z-10" style={{top: '100px', height: '50px'}}>
        <div className="flex items-center justify-center h-full gap-8 px-8">
          <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">What is BrainMoove?</button>
          <button onClick={() => onNavigate('about-philosophy')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Philosophy</button>
          <button onClick={() => onNavigate('about-objectives')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Objectives</button>
          <button onClick={() => onNavigate('about-team')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">Our Team</button>
          <button onClick={() => onNavigate('about-infrastructure')} className="text-sm font-semibold underline hover:opacity-70 transition-opacity">Our Infrastructure</button>
          <button onClick={() => onNavigate('about-history')} className="text-sm font-medium hover:underline hover:opacity-70 transition-opacity">History</button>
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
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-sm text-slate-800 hover:bg-white/80'
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
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/80 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{machines[selectedMachine].title}</h2>
            <p className="text-lg leading-relaxed">
              {machines[selectedMachine].description}
            </p>
          </div>
        </div>

        {/* Right: Video placeholder */}
        <div style={{width: '50%'}}>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/80 shadow-xl overflow-hidden" style={{height: '500px'}}>
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">{selectedMachine + 1}</div>
                <div className="text-2xl font-semibold">{machines[selectedMachine].title}</div>
                <div className="text-lg mt-2 text-slate-500">Video Overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
