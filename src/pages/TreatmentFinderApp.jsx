import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Users, Activity, Target, Brain, Zap, Heart, Clipboard, FileText, TrendingUp } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { technicalServices } from '../data/index';
import { getRecommendations } from '../utils/recommendations';

// ─── Data ────────────────────────────────────────────────────────────────────

const machinesData = [
  { id: 'gyrostim', title: 'Gyrostim', icon: Activity },
  { id: 'vibramoov', title: 'Vibramoov', icon: Activity },
  { id: 'force-platform', title: 'Force Platform', icon: Target },
  { id: 'interactive-metronome', title: 'Interactive Metronome', icon: Activity },
  { id: 'tova', title: 'TOVA', icon: Brain },
  { id: 'vng', title: 'VNG', icon: Activity },
  { id: 'brainport', title: 'Brainport', icon: Activity },
  { id: 'neurofeedback', title: 'NeuroFeedBack', icon: Zap }
];

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

const audienceMap = { child: 'children', adult: 'adults', senior: 'seniors' };

function generateCarouselSlides(answers, recommendations) {
  const slides = [];
  slides.push({
    type: 'welcome',
    title: 'Your Personalized BrainMoove Journey',
    subtitle: `Tailored for ${answers.audience === 'child' ? 'children and teens' : answers.audience === 'senior' ? 'seniors' : 'adults'}`,
    content: `We've created a personalized walkthrough based on your responses.`
  });
  slides.push({
    type: 'situation',
    title: 'Your Situation',
    items: [
      { label: 'Focus Area', value: answers.reason === 'diagnosed' ? 'Diagnosed condition support' : answers.reason === 'symptoms' ? 'Symptom investigation' : answers.reason === 'prevention' ? 'Prevention' : 'Recovery' },
      { label: 'Concerns', value: recommendations.symptomsText || 'General wellness' },
      { label: 'Goals', value: recommendations.goalsText || 'Improved function' }
    ]
  });
  recommendations.recommendedServices.forEach((serviceId, index) => {
    const service = carouselTechnicalServices.find(s => s.id === serviceId);
    if (service) slides.push({
      type: 'service', title: service.title, icon: service.icon,
      subtitle: `Step ${index + 1} in your treatment journey`,
      description: serviceId === 'assessment' ? 'Comprehensive evaluation to understand your unique neurological profile.' :
                   serviceId === 'neurological' ? 'Advanced diagnostic testing using our technology suite.' :
                   serviceId === 'treatment' ? 'Customized protocol for your symptoms and goals.' :
                   serviceId === 'monitoring' ? 'Regular reassessment to track progress.' :
                   'Ongoing support to sustain improvements.'
    });
  });
  recommendations.recommendedTechnologies.forEach(techId => {
    const tech = allTechnologies.find(t => t.id === techId);
    if (tech) slides.push({ type: 'technology', title: tech.title, icon: tech.icon, subtitle: 'Advanced rehabilitation technology', description: tech.description });
  });
  slides.push({
    type: 'timeline', title: 'Your Treatment Timeline', subtitle: 'Typical journey',
    phases: [
      { week: 'Week 1', activity: 'Assessment', description: 'Comprehensive evaluation' },
      { week: 'Weeks 2–3', activity: 'Testing', description: 'Technology-based analysis' },
      { week: 'Week 4', activity: 'Planning', description: 'Protocol development' },
      { week: 'Weeks 5–12', activity: 'Treatment', description: 'Regular sessions' },
      { week: 'Week 13+', activity: 'Maintenance', description: 'Ongoing support' }
    ]
  });
  slides.push({
    type: 'cta', title: 'Ready to Begin?', subtitle: recommendations.primaryMessage,
    summary: `Our suggested approach includes ${recommendations.recommendedServices.length} services and ${recommendations.recommendedTechnologies.length} technologies.`
  });
  return slides;
}

// ─── Shared button style ──────────────────────────────────────────────────────

const optionBtn = 'w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-5 transition-all text-left';

// ─── Main component ───────────────────────────────────────────────────────────

export default function TreatmentFinderApp() {
  const { assets } = useAssets();
  const [phase, setPhase] = useState('questionnaire'); // 'questionnaire' | 'carousel'
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ audience: null, reason: null, symptoms: [], goals: [] });
  const [currentSlide, setCurrentSlide] = useState(0);

  // ── BroadcastChannel ────────────────────────────────────────────────────────
  useEffect(() => {
    const channel = new BroadcastChannel('brainmoove');

    // Listen for messages from the main app
    channel.onmessage = (e) => {
      if (e.data?.type === 'brainmoove:section') {
        // Main app changed section — could pre-select audience here if desired
      }
    };

    return () => channel.close();
  }, []);

  // Broadcast when user reaches results
  useEffect(() => {
    if (step === 5 && answers.audience) {
      const channel = new BroadcastChannel('brainmoove');
      channel.postMessage({
        type: 'tf:audienceSelected',
        audience: audienceMap[answers.audience],
        answers
      });
      channel.close();
    }
  }, [step, answers.audience]);

  const handleDownload = (recommendations) => {
    const text = `BRAINMOOVE TREATMENT RECOMMENDATIONS\n\nAge Group: ${answers.audience}\nReason: ${answers.reason}\nSymptoms: ${answers.symptoms.join(', ')}\nGoals: ${answers.goals.join(', ')}\n\nRECOMMENDATION: ${recommendations.primaryMessage}\n\nRecommended Services:\n${recommendations.recommendedServices.map(s => technicalServices.find(t => t.id === s)?.title).join('\n')}\n\nRecommended Technologies:\n${recommendations.recommendedTechnologies.join('\n')}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = 'brainmoove-recommendations.txt';
    a.click();
  };

  const reset = () => {
    setPhase('questionnaire');
    setStep(0);
    setAnswers({ audience: null, reason: null, symptoms: [], goals: [] });
    setCurrentSlide(0);
  };

  // ── Carousel phase ──────────────────────────────────────────────────────────
  if (phase === 'carousel') {
    const recommendations = getRecommendations(answers);
    const slides = generateCarouselSlides(answers, recommendations);
    const slide = slides[currentSlide];
    const total = slides.length;

    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        {/* Header */}
        <div className="bg-[#111111] border-b border-white/10 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white">Your Personalized Journey</div>
              <div className="text-xs text-white/50">Slide {currentSlide + 1} of {total}</div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-[#F26219] h-1.5 rounded-full transition-all duration-300" style={{ width: `${((currentSlide + 1) / total) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Slide content */}
        <div className="max-w-2xl mx-auto px-6 py-10">
          {slide.type === 'welcome' && (
            <div className="text-center py-8">
              <img src={assets.logo} alt="BrainMoove" className="mx-auto mb-6" style={{ width: '140px', height: '100px', objectFit: 'contain' }} />
              <h2 className="text-3xl font-bold text-white mb-3">{slide.title}</h2>
              <p className="text-lg text-[#F26219] font-semibold mb-4">{slide.subtitle}</p>
              <p className="text-white/70 text-lg">{slide.content}</p>
            </div>
          )}

          {slide.type === 'situation' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{slide.title}</h2>
              <div className="space-y-4">
                {slide.items.map((item, idx) => (
                  <div key={idx} className="bg-[#1a1a1a] border-2 border-white/10 rounded-xl p-5">
                    <div className="text-xs font-bold text-[#F26219] mb-1 uppercase tracking-wide">{item.label}</div>
                    <div className="text-white text-lg">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(slide.type === 'service' || slide.type === 'technology') && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">{slide.title}</h2>
              <p className="text-[#F26219] font-semibold text-center mb-6">{slide.subtitle}</p>
              <div className="bg-[#1a1a1a] rounded-2xl p-10 mb-6 text-center border-2 border-white/10">
                <div className="text-5xl mb-3">{slide.type === 'service' ? '🎥' : '🎬'}</div>
                <p className="text-white font-bold mb-2">{slide.type === 'service' ? 'Specialist Video Explanation' : 'Technology Demonstration'}</p>
                <p className="text-white/50 text-sm">Video coming soon</p>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">{slide.description}</p>
            </div>
          )}

          {slide.type === 'timeline' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">{slide.title}</h2>
              <p className="text-white/50 text-center mb-8">{slide.subtitle}</p>
              <div className="space-y-4">
                {slide.phases.map((phase, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#F26219]/20 rounded-full flex items-center justify-center font-bold text-[#F26219] flex-shrink-0">{idx + 1}</div>
                    <div className="flex-1 bg-[#1a1a1a] border-2 border-white/10 rounded-xl p-4">
                      <div className="text-xs font-bold text-[#F26219] mb-1 uppercase tracking-wide">{phase.week}</div>
                      <div className="font-bold text-white mb-1">{phase.activity}</div>
                      <div className="text-white/70 text-sm">{phase.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'cta' && (
            <div className="text-center py-8">
              <img src={assets.logo} alt="BrainMoove" className="mx-auto mb-6" style={{ width: '140px', height: '100px', objectFit: 'contain' }} />
              <h2 className="text-3xl font-bold text-white mb-4">{slide.title}</h2>
              <div className="bg-[#1a1a1a] border-2 border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{slide.subtitle}</h3>
                <p className="text-white/70">{slide.summary}</p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                <button onClick={() => alert('Consultation booking coming soon!')} className="w-full bg-[#F26219] hover:bg-[#d4521a] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" /> Book Free Consultation
                </button>
                <button onClick={reset} className="w-full bg-[#1a1a1a] hover:bg-[#222222] text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/10">
                  ← Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Nav footer */}
        <div className="sticky bottom-0 bg-[#111111] border-t border-white/10">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${currentSlide === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:bg-white/10'}`}>
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)}
                  className={`rounded-full transition-all ${idx === currentSlide ? 'w-6 h-2.5 bg-[#F26219]' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`} />
              ))}
            </div>
            <button onClick={() => setCurrentSlide(Math.min(total - 1, currentSlide + 1))} disabled={currentSlide === total - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${currentSlide === total - 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:bg-white/10'}`}>
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Questionnaire phase ─────────────────────────────────────────────────────
  const recommendations = step === 5 ? getRecommendations(answers) : null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header — progress only, hidden on landing and results */}
      {step > 0 && step < 5 && (
        <div className="bg-[#111111] border-b border-white/10 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="text-xs text-white/50 mb-1">Step {step} of 4</div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-[#F26219] h-1.5 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Step 0 — Landing */}
        {step === 0 && (
          <div className="text-center py-6">
            <img src={assets.logo} alt="BrainMoove" className="mx-auto mb-6" style={{ width: '150px', height: '107px', objectFit: 'contain' }} />
            <h2 className="text-3xl font-bold text-white mb-3">BrainMoove: a personalised tour</h2>
            <p className="text-xl text-white/70 mb-6">treatments right for you</p>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Answer 4 questions about your situation. We'll show you which services and technologies apply to your needs, with videos and a treatment timeline.
            </p>
            <div className="bg-[#1a1a1a] border-2 border-white/10 rounded-2xl p-8 mb-8 text-left">
              <h3 className="font-bold text-white mb-5 text-lg">What you'll see:</h3>
              <div className="space-y-4">
                {[['📋', 'Treatment Plan', 'Services and technologies based on your responses'], ['🎥', 'Video Explanations', 'Specialists explain each service'], ['🔬', 'Technology Demonstrations', 'How the equipment works'], ['📅', 'Treatment Timeline', 'Week-by-week overview']].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="text-2xl">{icon}</span>
                    <div><div className="font-bold text-white">{title}</div><div className="text-white/70 text-sm">{desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-white/50 mb-8">
              <span>⏱️ 2 minutes</span>
              <span>❓ 4 questions</span>
            </div>
            <button onClick={() => setStep(1)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-bold px-12 py-5 rounded-xl transition-all hover:scale-105 text-xl shadow-lg">
              Start the Tour →
            </button>
            <div className="mt-8 bg-[#1a1a1a] border border-white/10 rounded-lg p-4">
              <p className="text-xs text-white/50 leading-relaxed">
                <strong>Note:</strong> This tool helps you understand available treatment options and is the first step toward a focused conversation with our team. Results are not a diagnosis or binding commitment.
              </p>
            </div>
          </div>
        )}

        {/* Step 1 — Audience */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Who is this treatment for?</h3>
            <p className="text-white/70 mb-6">Select the age group that best applies</p>
            <div className="space-y-3">
              {[['child', 'Child or Teen (0–17 years)', 'Developmental support and early intervention'], ['adult', 'Adult (18–64 years)', 'Recovery, optimization, and symptom management'], ['senior', 'Senior (65+ years)', 'Healthy aging and fall prevention']].map(([id, label, desc]) => (
                <button key={id} onClick={() => { setAnswers({ ...answers, audience: id }); setStep(2); }} className={optionBtn}>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F26219]/20 group-hover:bg-[#F26219] rounded-full p-3"><Users className="w-5 h-5 text-[#F26219]" /></div>
                    <div><div className="font-semibold text-white">{label}</div><div className="text-sm text-white/70">{desc}</div></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Reason */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">What brings you here today?</h3>
            <p className="text-white/70 mb-6">Select the option that best describes your situation</p>
            <div className="space-y-3">
              {[['diagnosed', '📋 I have a diagnosed condition', "You've received a medical diagnosis"], ['symptoms', '🔍 I have symptoms but no diagnosis', 'Experiencing issues without clear answers'], ['prevention', '💪 Prevention and optimization', 'Proactive health and performance'], ['injury', '⚡ Post-injury recovery', 'Recovering from brain or head injury']].map(([id, label, desc]) => (
                <button key={id} onClick={() => { setAnswers({ ...answers, reason: id }); setStep(3); }} className={optionBtn}>
                  <div className="font-semibold text-white mb-1">{label}</div>
                  <div className="text-sm text-white/70">{desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-white/50 hover:text-white font-medium flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>
        )}

        {/* Step 3 — Symptoms */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">What symptoms or challenges are you experiencing?</h3>
            <p className="text-white/70 mb-6">Select all that apply</p>
            <div className="space-y-2">
              {[['attention', '🎯', 'Attention or focus difficulties'], ['balance', '⚖️', 'Balance or dizziness issues'], ['coordination', '🤸', 'Coordination challenges'], ['memory', '🧠', 'Memory problems'], ['sensory', '👂', 'Sensory sensitivities'], ['headaches', '😣', 'Chronic headaches or migraines'], ['tremors', '🤲', 'Tremors or involuntary movements'], ['reading', '👁️', 'Reading or visual processing issues'], ['motor', '✋', 'Fine or gross motor skill challenges']].map(([id, icon, label]) => (
                <label key={id} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${answers.symptoms.includes(id) ? 'bg-[#F26219]/10 border-[#F26219]' : 'bg-[#1a1a1a] border-white/10 hover:border-[#F26219]/50'}`}>
                  <input type="checkbox" checked={answers.symptoms.includes(id)}
                    onChange={(e) => setAnswers({ ...answers, symptoms: e.target.checked ? [...answers.symptoms, id] : answers.symptoms.filter(s => s !== id) })}
                    className="w-5 h-5" />
                  <span className="text-xl">{icon}</span>
                  <span className="text-white">{label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setStep(2)} className="text-white/50 hover:text-white font-medium flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
              <button onClick={() => setStep(4)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-1">Continue <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 4 — Goals */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-2">What are your primary goals?</h3>
            <p className="text-white/70 mb-6">Select all that apply</p>
            <div className="space-y-2">
              {[['restore', '🔄', 'Restore normal function'], ['manage', '💊', 'Manage symptoms effectively'], ['improve', '😊', 'Improve quality of life'], ['perform', '🚀', 'Optimize performance'], ['prevent', '🛡️', 'Prevent decline or injury'], ['independence', '🦾', 'Maintain independence']].map(([id, icon, label]) => (
                <label key={id} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${answers.goals.includes(id) ? 'bg-[#F26219]/10 border-[#F26219]' : 'bg-[#1a1a1a] border-white/10 hover:border-[#F26219]/50'}`}>
                  <input type="checkbox" checked={answers.goals.includes(id)}
                    onChange={(e) => setAnswers({ ...answers, goals: e.target.checked ? [...answers.goals, id] : answers.goals.filter(g => g !== id) })}
                    className="w-5 h-5" />
                  <span className="text-xl">{icon}</span>
                  <span className="text-white">{label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setStep(3)} className="text-white/50 hover:text-white font-medium flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
              <button onClick={() => setStep(5)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-1">See My Results <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 5 — Results */}
        {step === 5 && recommendations && (
          <div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-2">Your Personalized Treatment Plan</h3>
              <p className="text-white/70">Based on your responses, here's what we recommend</p>
            </div>

            <div className="bg-[#1a1a1a] border-2 border-white/10 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-white mb-2">{recommendations.primaryMessage}</h4>
              <p className="text-white/70">A comprehensive {recommendations.audienceNote} program addressing {recommendations.symptomsText} with focus on {recommendations.goalsText}.</p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-white mb-3">Recommended Services:</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.recommendedServices.map(serviceId => {
                  const service = technicalServices.find(s => s.id === serviceId);
                  if (!service) return null;
                  const Icon = service.icon;
                  return (
                    <div key={serviceId} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-[#F26219]/20 rounded-full p-2"><Icon className="w-4 h-4 text-[#F26219]" /></div>
                      <span className="text-sm font-medium text-white">{service.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-white mb-3">Recommended Technologies:</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.recommendedTechnologies.map(techId => {
                  const tech = machinesData.find(m => m.id === techId);
                  if (!tech) return null;
                  const Icon = tech.icon;
                  return (
                    <div key={techId} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-[#F26219]/20 rounded-full p-2"><Icon className="w-4 h-4 text-[#F26219]" /></div>
                      <span className="text-sm font-medium text-white">{tech.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#1a1a1a] border-l-4 border-[#F26219] rounded-lg p-4 mb-6">
              <p className="text-sm text-white/70 leading-relaxed">
                <strong className="text-[#F26219]">Important:</strong> These recommendations help you understand your options and prepare for a meaningful conversation with our specialists. They are not a diagnosis or binding commitment.
              </p>
            </div>

            <div className="space-y-3">
              <button onClick={() => { setPhase('carousel'); setCurrentSlide(0); }}
                className="w-full bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="white" /></svg>
                Take the Guided Tour
              </button>
              <button onClick={() => alert('Consultation booking coming soon!')}
                className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 text-white font-semibold px-6 py-4 rounded-xl transition-all">
                📅 Book Free Consultation
              </button>
              <button onClick={() => handleDownload(recommendations)}
                className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                💾 Download Results
              </button>
            </div>

            <button onClick={reset} className="w-full mt-4 text-white/50 hover:text-white font-medium">← Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
}
