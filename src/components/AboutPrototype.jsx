import { X } from 'lucide-react';

export default function AboutPrototype({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-[#111111] rounded-3xl shadow-2xl max-w-4xl w-full mx-4"
        style={{
          animation: 'slideInDown 0.3s ease-out forwards',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-300 mb-1" style={{color: '#d1d5db'}}>BrainMoove Structural Prototype</div>
              <h2 className="text-2xl font-bold" style={{color: '#ffffff'}}>About This Prototype</h2>
              <p className="text-slate-300 text-sm mt-1" style={{color: '#d1d5db'}}>Structural demonstration of user experience</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="./brainmoove-prototype-walkthrough.docx"
                download="BrainMoove-Prototype-Walkthrough.docx"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                style={{color: '#ffffff'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{stroke: '#ffffff'}}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span style={{color: '#ffffff'}}>Download Full Documentation</span>
              </a>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" style={{stroke: '#ffffff'}} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto" style={{maxHeight: 'calc(90vh - 100px)'}}>
          {/* Important Notice */}
          <div className="bg-red-900/20 border-l-4 border-red-600 p-4 mb-6">
            <h3 className="font-bold text-red-400 mb-2">Important: What This Is</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              This is a <strong>STRUCTURAL PROTOTYPE</strong> demonstrating functionality, information architecture, and user journeys.
              The current visual implementation uses placeholder styling to illustrate the structure.
            </p>
          </div>

          {/* What Final Will Include */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">The Final Production Website Will Feature:</h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Full-screen photo backgrounds</span></li>
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Video backgrounds for immersive experience</span></li>
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Video interviews with BrainMoove specialists explaining services and treatments</span></li>
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Professional photography</span></li>
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Custom branded visual design</span></li>
              <li className="flex items-start"><span className="text-[#F26219] mr-2">•</span><span className="text-white/70">Motion graphics and transitions</span></li>
            </ul>
          </div>

          {/* What This Demonstrates */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">What This Prototype Demonstrates:</h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">Complete information architecture and navigation structure</span></li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">User flows and journey mapping</span></li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">Interactive features (Treatment Finder, technology carousel, process steps)</span></li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">Content organization and hierarchy</span></li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">Virtual facility walkthrough capability</span></li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-white/70">Strategic placement of calls-to-action</span></li>
            </ul>
          </div>

          {/* Key Objectives */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Key Objectives Validated:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-1">1. Virtual Facility Walkthrough</h4>
                <p className="text-sm text-white/70">
                  Reduces staff time spent on physical facility tours by providing comprehensive virtual walkthrough.
                  Visitors can familiarize themselves with technologies and processes before consultation,
                  making in-person meetings more focused and productive.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">2. Treatment Finder Decision Support</h4>
                <p className="text-sm text-white/70">
                  Helps visitors clarify available treatment options and what they may want to concentrate on
                  in follow-up conversations. Prepares both visitor and staff for more productive consultation discussions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">3. Audience Segmentation</h4>
                <p className="text-sm text-white/70">
                  Addresses unique needs of three distinct audiences (children, adults, seniors) within one cohesive site structure.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">4. Service Clarity</h4>
                <p className="text-sm text-white/70">
                  Communicates the five-step treatment process clearly through interactive elements and progressive disclosure.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-bold text-blue-300 mb-2">Next Phase</h3>
            <p className="text-sm text-blue-200/80 leading-relaxed">
              This prototype successfully validates the user experience and navigation structure.
              The next phase is <strong>professional visual design</strong> and <strong>multimedia content production</strong>,
              including photography, video interviews with specialists, and custom branding.
            </p>
          </div>

          {/* Status */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-sm text-white/50">
              <strong>Status:</strong> Structural prototype complete and ready for visual design phase
            </p>
            <p className="text-xs text-white/30 mt-1">Version 1.0 | February 12, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
