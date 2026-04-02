import { ChevronRight } from 'lucide-react';
import { useAssets } from '../context/AssetContext';

export default function IntroPage({ showNav, hoveredSection, setHoveredSection, onNavigate }) {
  const { assets } = useAssets();
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="pt-8 pb-6">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <div className="animate-fade-in bg-white/40 backdrop-blur-xl rounded-3xl p-4 border border-white/60 shadow-2xl inline-block">
              <img src={assets.logo} alt="BrainMoov Logo" className="mx-auto" style={{width: '113px', height: '80px'}} />
              <h1 className="text-3xl font-bold text-slate-800 mt-2">
                Functional Brain<br/>Rehabilitation Center
              </h1>
            </div>
          </div>
        </div>

        {/* Four Main Buttons */}
        <div className={`flex-1 flex flex-col items-center justify-start px-8 pt-4 transform transition-all duration-1000 ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="w-full max-w-6xl">
            <div className="flex justify-center gap-2.5 items-start">
              {/* Button 1: What is BrainMoove */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredSection('about')}
                onMouseLeave={() => setHoveredSection(null)}
                style={{ width: '295px' }}
              >
                <div
                  className="bg-white/40 backdrop-blur-xl px-8 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer"
                  onClick={() => onNavigate('about')}
                >
                  <h2 className="text-lg font-bold text-center">What is BrainMoove?</h2>
                </div>

                {hoveredSection === 'about' && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-6 border-t border-white/40">
                      <p className="leading-snug mb-4">
                        A specialized rehabilitation center bridging neuroscience and clinical care through evidence-based functional neurology.
                        We restore and optimize brain function across all ages with targeted, non-invasive interventions.
                      </p>
                      <button
                        onClick={() => onNavigate('about')}
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
                      >
                        <span>Find out more</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Button 2: Who We Treat */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredSection('who')}
                onMouseLeave={() => setHoveredSection(null)}
                style={{ width: '295px' }}
              >
                <div
                  className="bg-white/40 backdrop-blur-xl px-8 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer"
                  onClick={() => onNavigate('who-detail')}
                >
                  <h2 className="text-lg font-bold text-center">Who We Treat</h2>
                </div>

                {hoveredSection === 'who' && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-6 border-t border-white/40">
                      <p className="leading-snug mb-4">
                        Specialized care for children and infants facing developmental challenges, adults and athletes
                        seeking performance optimization, and seniors maintaining cognitive function. Programs address
                        unique neurological needs at each life stage.
                      </p>
                      <button
                        onClick={() => onNavigate('who-detail')}
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
                      >
                        <span>Find out more</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Button 3: What We Treat */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredSection('what')}
                onMouseLeave={() => setHoveredSection(null)}
                style={{ width: '295px' }}
              >
                <div
                  className="bg-white/40 backdrop-blur-xl px-8 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer"
                  onClick={() => onNavigate('what-detail')}
                >
                  <h2 className="text-lg font-bold text-center">What We Treat</h2>
                </div>

                {hoveredSection === 'what' && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-6 border-t border-white/40">
                      <p className="leading-snug mb-4">
                        Neurodevelopmental challenges like ADHD and autism, acquired brain injuries including concussions
                        and TBI, neurological diseases such as Parkinson's and MS, plus performance enhancement goals.
                        Personalized interventions restore optimal brain function.
                      </p>
                      <button
                        onClick={() => onNavigate('what-detail')}
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
                      >
                        <span>Find out more</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Button 4: Our Treatment Process */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/60 shadow-2xl"
                onMouseEnter={() => setHoveredSection('process')}
                onMouseLeave={() => setHoveredSection(null)}
                style={{ width: '295px' }}
              >
                <div
                  className="bg-white/40 backdrop-blur-xl px-8 py-6 transition-all duration-300 hover:bg-white/60 cursor-pointer"
                  onClick={() => onNavigate('process-detail')}
                >
                  <h2 className="text-lg font-bold text-center">Our Treatment Process</h2>
                </div>

                {hoveredSection === 'process' && (
                  <div
                    className="bg-white/95 backdrop-blur-xl overflow-hidden"
                    style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
                  >
                    <div className="p-6 border-t border-white/40">
                      <p className="leading-snug mb-4">
                        Begins with in-depth assessment and advanced neurological testing to identify dysfunction.
                        We develop personalized treatment plans, monitor progress throughout, and provide ongoing
                        follow-up care for lasting results.
                      </p>
                      <button
                        onClick={() => onNavigate('process-detail')}
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
                      >
                        <span>Find out more</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
