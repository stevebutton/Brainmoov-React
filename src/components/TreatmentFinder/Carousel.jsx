import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Activity, Target, Brain, Zap, Heart, Clipboard, FileText, TrendingUp } from 'lucide-react';
import { getRecommendations } from '../../utils/recommendations';
import { useAssets } from '../../context/AssetContext';

const carouselTechnicalServices = [
  { id: 'assessment', title: 'Initial Assessment', icon: Clipboard },
  { id: 'neurological', title: 'Neurological Testing', icon: Activity },
  { id: 'treatment', title: 'Treatment Planning', icon: FileText },
  { id: 'monitoring', title: 'Progress Monitoring', icon: TrendingUp },
  { id: 'followup', title: 'Follow-up Care', icon: Heart }
];

const allTechnologies = [
  { id: 'gyrostim', title: 'Gyrostim', icon: Activity, description: 'Advanced vestibular stimulation for balance and spatial awareness' },
  { id: 'vibramoov', title: 'Vibramoov', icon: Activity, description: 'Proprioceptive stimulation technology for body awareness' },
  { id: 'force-platform', title: 'Force Platform', icon: Target, description: 'Precise balance assessment and fall prevention analysis' },
  { id: 'interactive-metronome', title: 'Interactive Metronome', icon: Activity, description: 'Brain timing and rhythm training for focus and coordination' },
  { id: 'tova', title: 'TOVA', icon: Brain, description: 'Attention and focus assessment technology' },
  { id: 'vng', title: 'VNG', icon: Activity, description: 'Oculomotor function and visual tracking analysis' },
  { id: 'brainport', title: 'Brainport', icon: Activity, description: 'Sensory substitution technology for enhanced awareness' },
  { id: 'neurofeedback', title: 'NeuroFeedBack', icon: Zap, description: 'Real-time brain activity monitoring and training' }
];

function generateCarouselSlides(questionnaireAnswers, recommendations) {
  const slides = [];

  slides.push({
    type: 'welcome',
    title: 'Your Personalized BrainMoove Journey',
    subtitle: `Tailored for ${questionnaireAnswers.audience === 'child' ? 'children and teens' : questionnaireAnswers.audience === 'senior' ? 'seniors' : 'adults'}`,
    content: `We've created a personalized walkthrough based on your responses.`
  });

  slides.push({
    type: 'situation',
    title: 'Your Situation',
    items: [
      {
        label: 'Focus Area',
        value: questionnaireAnswers.reason === 'diagnosed' ? 'Diagnosed condition support' :
               questionnaireAnswers.reason === 'symptoms' ? 'Symptom investigation' :
               questionnaireAnswers.reason === 'prevention' ? 'Prevention' : 'Recovery'
      },
      { label: 'Concerns', value: recommendations.symptomsText || 'General wellness' },
      { label: 'Goals', value: recommendations.goalsText || 'Improved function' }
    ]
  });

  recommendations.recommendedServices.forEach((serviceId, index) => {
    const service = carouselTechnicalServices.find(s => s.id === serviceId);
    if (service) {
      slides.push({
        type: 'service',
        title: service.title,
        icon: service.icon,
        subtitle: `Step ${index + 1} in your treatment journey`,
        description: serviceId === 'assessment' ? 'Comprehensive evaluation to understand your unique neurological profile.' :
                     serviceId === 'neurological' ? 'Advanced diagnostic testing using our technology suite.' :
                     serviceId === 'treatment' ? 'Customized protocol for your symptoms and goals.' :
                     serviceId === 'monitoring' ? 'Regular reassessment to track progress.' :
                     'Ongoing support to sustain improvements.'
      });
    }
  });

  recommendations.recommendedTechnologies.forEach(techId => {
    const tech = allTechnologies.find(t => t.id === techId);
    if (tech) {
      slides.push({
        type: 'technology',
        title: tech.title,
        icon: tech.icon,
        subtitle: 'Advanced rehabilitation technology',
        description: tech.description
      });
    }
  });

  slides.push({
    type: 'timeline',
    title: 'Your Treatment Timeline',
    subtitle: 'Typical journey',
    phases: [
      { week: 'Week 1', activity: 'Assessment', description: 'Comprehensive evaluation' },
      { week: 'Weeks 2-3', activity: 'Testing', description: 'Technology-based analysis' },
      { week: 'Week 4', activity: 'Planning', description: 'Protocol development' },
      { week: 'Weeks 5-12', activity: 'Treatment', description: 'Regular sessions' },
      { week: 'Week 13+', activity: 'Maintenance', description: 'Ongoing support' }
    ]
  });

  slides.push({
    type: 'cta',
    title: 'Ready to Begin?',
    subtitle: recommendations.primaryMessage,
    summary: `Our suggested approach includes ${recommendations.recommendedServices.length} services and ${recommendations.recommendedTechnologies.length} technologies. You'll discuss your approach in detail in consultation with our team.`
  });

  return slides;
}

export default function Carousel({
  show,
  onClose,
  currentSlide,
  setCurrentSlide,
  questionnaireAnswers
}) {
  const { assets } = useAssets();
  if (!show) return null;

  const recommendations = getRecommendations(questionnaireAnswers);
  const carouselSlides = generateCarouselSlides(questionnaireAnswers, recommendations);
  const currentSlideData = carouselSlides[currentSlide];
  const totalSlides = carouselSlides.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full mx-4"
        style={{ maxWidth: '900px', maxHeight: '90vh' }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>Your Personalized Journey</h2>
              <p className="text-sm text-purple-100">Slide {currentSlide + 1} of {totalSlides}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" style={{ stroke: '#ffffff' }} />
            </button>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {currentSlideData.type === 'welcome' && (
            <div className="text-center py-8">
              <img
                src={assets.logo}
                alt="BrainMoove Logo"
                className="mx-auto mb-6"
                style={{ width: '150px', height: '107px', objectFit: 'contain' }}
              />
              <h3 className="text-3xl font-bold text-slate-800 mb-3">{currentSlideData.title}</h3>
              <p className="text-lg text-purple-600 mb-4 font-semibold">{currentSlideData.subtitle}</p>
              <p className="text-slate-700 max-w-2xl mx-auto text-lg">{currentSlideData.content}</p>
            </div>
          )}

          {currentSlideData.type === 'situation' && (
            <div className="py-6">
              <div className="text-center mb-8">
                <img
                  src={assets.logo}
                  alt="BrainMoove Logo"
                  className="mx-auto mb-4"
                  style={{ width: '120px', height: '85px', objectFit: 'contain' }}
                />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSlideData.title}</h3>
              </div>
              <div className="space-y-4 max-w-xl mx-auto">
                {currentSlideData.items.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5">
                    <div className="text-sm font-bold text-blue-800 mb-1">{item.label}</div>
                    <div className="text-slate-800 text-lg">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSlideData.type === 'service' && (
            <div className="py-4">
              <div className="text-center mb-6">
                <img
                  src={assets.logo}
                  alt="BrainMoove Logo"
                  className="mx-auto mb-4"
                  style={{ width: '100px', height: '71px', objectFit: 'contain' }}
                />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSlideData.title}</h3>
                <p className="text-purple-600 font-semibold">{currentSlideData.subtitle}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12 mb-6 text-center border-2 border-slate-300">
                <div className="text-5xl mb-3">🎥</div>
                <p className="text-slate-700 font-bold mb-2 text-lg">Specialist Video Explanation</p>
                <p className="text-slate-600 mb-4">Raphaël Royer explains {currentSlideData.title.toLowerCase()}</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <p className="text-slate-700 text-lg mb-4 leading-relaxed">{currentSlideData.description}</p>
              </div>
            </div>
          )}

          {currentSlideData.type === 'technology' && (
            <div className="py-4">
              <div className="text-center mb-6">
                <img
                  src={assets.logo}
                  alt="BrainMoove Logo"
                  className="mx-auto mb-4"
                  style={{ width: '100px', height: '71px', objectFit: 'contain' }}
                />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSlideData.title}</h3>
                <p className="text-purple-600 font-semibold">{currentSlideData.subtitle}</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-12 mb-6 text-center border-2 border-cyan-300">
                <div className="text-5xl mb-3">🎬</div>
                <p className="text-slate-700 font-bold mb-2 text-lg">Technology Demonstration</p>
                <p className="text-slate-600 mb-4">See {currentSlideData.title} in action</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <p className="text-slate-700 text-lg mb-4 leading-relaxed">{currentSlideData.description}</p>
              </div>
            </div>
          )}

          {currentSlideData.type === 'timeline' && (
            <div className="py-4">
              <div className="text-center mb-8">
                <img
                  src={assets.logo}
                  alt="BrainMoove Logo"
                  className="mx-auto mb-4"
                  style={{ width: '120px', height: '85px', objectFit: 'contain' }}
                />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSlideData.title}</h3>
                <p className="text-slate-600">{currentSlideData.subtitle}</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  {currentSlideData.phases.map((phase, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {idx + 1}
                      </div>
                      <div className="flex-1 bg-white border-2 border-slate-200 rounded-xl p-4">
                        <div className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wide">{phase.week}</div>
                        <div className="font-bold text-slate-800 text-lg mb-1">{phase.activity}</div>
                        <div className="text-slate-600">{phase.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSlideData.type === 'cta' && (
            <div className="text-center py-8">
              <img
                src={assets.logo}
                alt="BrainMoove Logo"
                className="mx-auto mb-6"
                style={{ width: '150px', height: '107px', objectFit: 'contain' }}
              />
              <h3 className="text-3xl font-bold text-slate-800 mb-4">{currentSlideData.title}</h3>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 mb-6 max-w-2xl mx-auto">
                <h4 className="text-xl font-bold text-slate-800 mb-2">{currentSlideData.subtitle}</h4>
                <p className="text-slate-700 text-lg">{currentSlideData.summary}</p>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    onClose();
                    alert('Consultation booking coming soon!');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-6 rounded-xl border-2 border-slate-300"
                >
                  Return to Summary
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t-2 border-slate-200 bg-slate-50 rounded-b-3xl">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              currentSlide === 0 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-white hover:shadow'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlide ? 'bg-purple-600 w-8 h-3' : 'bg-slate-300 hover:bg-slate-400 w-3 h-3'
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              currentSlide === totalSlides - 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-white hover:shadow'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
