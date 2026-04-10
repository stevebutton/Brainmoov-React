import { ChevronRight } from 'lucide-react';
import { Lightbulb, Target, Users, Building2, Clock } from 'lucide-react';

export default function AboutSection({ showBanner, hoveredSection, setHoveredSection, onNavigate }) {
  return (
    <div className="w-full h-full relative bg-[#0f0f0f]">

      <div className="p-12" style={{paddingTop: '170px'}}>
        <p className="text-lg mb-8 text-center max-w-4xl mx-auto text-white/70">
          Explore different aspects of BrainMoove:
        </p>

        <div className="flex justify-center gap-2.5 items-start">
          {/* Button 1: Our Philosophy */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onMouseEnter={() => setHoveredSection('philosophy')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{ width: '220px' }}
          >
            <div
              className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer"
              onClick={() => onNavigate('about-philosophy')}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <Lightbulb className="w-10 h-10" style={{stroke: '#ffffff'}} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">Our Philosophy</h3>
              </div>
            </div>

            {hoveredSection === 'philosophy' && (
              <div
                className="bg-[#1a1a1a] overflow-hidden"
                style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
              >
                <div className="p-6 border-t border-white/5">
                  <p className="text-sm leading-snug mb-4 text-white/70">
                    Our approach bridges cutting-edge neuroscience with compassionate care, focusing on the root causes of neurological dysfunction rather than just symptoms.
                  </p>
                  <button
                    onClick={() => onNavigate('about-philosophy')}
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button 2: Our Objectives */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onMouseEnter={() => setHoveredSection('objectives')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{ width: '220px' }}
          >
            <div
              className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer"
              onClick={() => onNavigate('about-objectives')}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <Target className="w-10 h-10" style={{stroke: '#ffffff'}} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">Our Objectives</h3>
              </div>
            </div>

            {hoveredSection === 'objectives' && (
              <div
                className="bg-[#1a1a1a] overflow-hidden"
                style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
              >
                <div className="p-6 border-t border-white/5">
                  <p className="text-sm leading-snug mb-4 text-white/70">
                    We aim to restore optimal brain function and improve quality of life through evidence-based interventions, empowering individuals to reach their full potential.
                  </p>
                  <button
                    onClick={() => onNavigate('about-objectives')}
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button 3: Our Team */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onMouseEnter={() => setHoveredSection('team')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{ width: '220px' }}
          >
            <div
              className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer"
              onClick={() => onNavigate('about-team')}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <Users className="w-10 h-10" style={{stroke: '#ffffff'}} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">Our Team</h3>
              </div>
            </div>

            {hoveredSection === 'team' && (
              <div
                className="bg-[#1a1a1a] overflow-hidden"
                style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
              >
                <div className="p-6 border-t border-white/5">
                  <p className="text-sm leading-snug mb-4 text-white/70">
                    Meet our dedicated professionals who bring expertise in functional neurology, clinical care, and patient support to deliver exceptional outcomes.
                  </p>
                  <button
                    onClick={() => onNavigate('about-team')}
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button 4: Our Infrastructure */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onMouseEnter={() => setHoveredSection('infrastructure')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{ width: '220px' }}
          >
            <div
              className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer"
              onClick={() => onNavigate('about-infrastructure')}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <Building2 className="w-10 h-10" style={{stroke: '#ffffff'}} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">Our Infrastructure</h3>
              </div>
            </div>

            {hoveredSection === 'infrastructure' && (
              <div
                className="bg-[#1a1a1a] overflow-hidden"
                style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
              >
                <div className="p-6 border-t border-white/5">
                  <p className="text-sm leading-snug mb-4 text-white/70">
                    Our state-of-the-art facility features specialized equipment and therapeutic spaces designed to support comprehensive neurological rehabilitation.
                  </p>
                  <button
                    onClick={() => onNavigate('about-infrastructure')}
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button 5: History of BrainMoove */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onMouseEnter={() => setHoveredSection('history')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{ width: '220px' }}
          >
            <div
              className="bg-[#1a1a1a] px-6 py-6 transition-all duration-300 hover:bg-[#222222] cursor-pointer"
              onClick={() => onNavigate('about-history')}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <Clock className="w-10 h-10" style={{stroke: '#ffffff'}} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-base font-semibold text-center leading-tight text-white">History of BrainMoove</h3>
              </div>
            </div>

            {hoveredSection === 'history' && (
              <div
                className="bg-[#1a1a1a] overflow-hidden"
                style={{ animation: 'slideInDownWithBg 0.6s ease-in forwards', opacity: 0 }}
              >
                <div className="p-6 border-t border-white/5">
                  <p className="text-sm leading-snug mb-4 text-white/70">
                    Discover our journey from inception to becoming a leading center for functional neurology and neurological rehabilitation.
                  </p>
                  <button
                    onClick={() => onNavigate('about-history')}
                    className="text-sm font-medium text-[#F26219] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
