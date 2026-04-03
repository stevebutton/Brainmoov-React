import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Users, Activity, Target, Brain, Zap, Heart, Clipboard, FileText, TrendingUp } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { technicalServices } from '../data/index';
import { getRecommendations } from '../utils/recommendations';

// ─── Data ────────────────────────────────────────────────────────────────────

const machinesData = [
  { id: 'gyrostim', title: 'Gyrostim', icon: Activity, description: 'Advanced vestibular stimulation for balance and spatial awareness' },
  { id: 'vibramoov', title: 'Vibramoov', icon: Activity, description: 'Proprioceptive stimulation for body awareness' },
  { id: 'force-platform', title: 'Force Platform', icon: Target, description: 'Precise balance assessment and fall prevention' },
  { id: 'interactive-metronome', title: 'Interactive Metronome', icon: Activity, description: 'Brain timing and rhythm training for focus' },
  { id: 'tova', title: 'TOVA', icon: Brain, description: 'Objective attention and focus assessment' },
  { id: 'vng', title: 'VNG', icon: Activity, description: 'Oculomotor and vestibular function analysis' },
  { id: 'brainport', title: 'Brainport', icon: Activity, description: 'Sensory substitution for enhanced awareness' },
  { id: 'neurofeedback', title: 'NeuroFeedBack', icon: Zap, description: 'Real-time brain activity monitoring and training' }
];

const carouselServices = [
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

// Welcome slide removed — results screen serves that purpose
function generateSlides(answers, recommendations) {
  const slides = [];

  slides.push({
    type: 'situation', title: 'Your Situation',
    items: [
      { label: 'Profile', value: answers.audience === 'child' ? 'Child or Teen' : answers.audience === 'senior' ? 'Senior' : 'Adult' },
      { label: 'Focus', value: answers.reason === 'diagnosed' ? 'Diagnosed condition' : answers.reason === 'symptoms' ? 'Symptom investigation' : answers.reason === 'prevention' ? 'Prevention & optimisation' : 'Post-injury recovery' },
      { label: 'Concerns', value: recommendations.symptomsText || 'General wellness' },
      { label: 'Goals', value: recommendations.goalsText || 'Improved function' }
    ]
  });

  recommendations.recommendedServices.forEach((id, i) => {
    const s = carouselServices.find(x => x.id === id);
    if (s) slides.push({
      type: 'service', title: s.title, icon: s.icon,
      subtitle: `Treatment step ${i + 1}`,
      description: id === 'assessment' ? 'Comprehensive evaluation to understand your unique neurological profile.' :
                   id === 'neurological' ? 'Advanced diagnostic testing using our technology suite.' :
                   id === 'treatment' ? 'Customised protocol for your symptoms and goals.' :
                   id === 'monitoring' ? 'Regular reassessment to track and optimise progress.' :
                   'Ongoing support to sustain long-term improvements.'
    });
  });

  recommendations.recommendedTechnologies.forEach(id => {
    const t = allTechnologies.find(x => x.id === id);
    if (t) slides.push({ type: 'technology', title: t.title, icon: t.icon, subtitle: 'Technology in your programme', description: t.description });
  });

  slides.push({
    type: 'timeline', title: 'Your Treatment Timeline',
    phases: [
      { week: 'Week 1', activity: 'Assessment', description: 'Comprehensive evaluation' },
      { week: 'Weeks 2–3', activity: 'Testing', description: 'Technology analysis' },
      { week: 'Week 4', activity: 'Planning', description: 'Protocol development' },
      { week: 'Weeks 5–12', activity: 'Treatment', description: 'Regular sessions' },
      { week: 'Week 13+', activity: 'Maintenance', description: 'Ongoing support' }
    ]
  });

  slides.push({
    type: 'cta', title: 'Ready to Begin?', subtitle: recommendations.primaryMessage,
    summary: `Your programme includes ${recommendations.recommendedServices.length} services and ${recommendations.recommendedTechnologies.length} technologies, tailored to your responses.`
  });

  return slides;
}

const card = 'bg-white rounded-xl border border-gray-200 hover:border-[#F26219] hover:bg-orange-50 transition-all cursor-pointer text-left w-full';
const cardSelected = 'bg-orange-50 border-[#F26219]';

// ─── Component ────────────────────────────────────────────────────────────────

export default function TreatmentFinderApp() {
  const { assets } = useAssets();
  const [phase, setPhase] = useState('questionnaire');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ audience: null, reason: null, symptoms: [], goals: [] });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const channel = new BroadcastChannel('brainmoove');
    channel.onmessage = () => {};
    return () => channel.close();
  }, []);

  useEffect(() => {
    if (step === 5 && answers.audience) {
      const channel = new BroadcastChannel('brainmoove');
      channel.postMessage({ type: 'tf:audienceSelected', audience: audienceMap[answers.audience], answers });
      channel.close();
    }
  }, [step, answers.audience]);

  const reset = () => { setPhase('questionnaire'); setStep(0); setAnswers({ audience: null, reason: null, symptoms: [], goals: [] }); setCurrentSlide(0); };

  // ── Carousel ────────────────────────────────────────────────────────────────
  if (phase === 'carousel') {
    const recommendations = getRecommendations(answers);
    const slides = generateSlides(answers, recommendations);
    const slide = slides[currentSlide];
    const total = slides.length;
    const isFirst = currentSlide === 0;
    const isLast = currentSlide === total - 1;

    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 flex-shrink-0">
          <div className="h-1.5 bg-[#F26219] transition-all duration-300" style={{ width: `${((currentSlide + 1) / total) * 100}%` }} />
        </div>

        {/* Slide content */}
        <div className="flex-1 overflow-y-auto">

          {/* Situation slide — centered */}
          {slide.type === 'situation' && (
            <div className="h-full flex flex-col items-center justify-center px-10 py-6">
              <p className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-3">Your Personalised Journey</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{slide.title}</h2>
              <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
                {slide.items.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                    <div className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-1.5">{item.label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service / Technology slides — video left, content right */}
          {(slide.type === 'service' || slide.type === 'technology') && (
            <div className="h-full flex">
              {/* Video — left 50% */}
              <div className="w-1/2 flex-shrink-0 bg-gray-100 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=500&fit=crop&q=80"
                  alt="Video placeholder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 ml-1" fill="#F26219" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white/70 text-xs uppercase tracking-widest">{slide.subtitle}</p>
                  <p className="text-white font-bold text-base">{slide.title}</p>
                </div>
              </div>

              {/* Content — right */}
              <div className="flex-1 flex flex-col justify-center px-8 py-8">
                <p className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-2">{slide.subtitle}</p>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{slide.title}</h2>
                <p className="text-slate-600 leading-relaxed text-base">{slide.description}</p>
              </div>
            </div>
          )}

          {/* Timeline slide — horizontal */}
          {slide.type === 'timeline' && (
            <div className="h-full flex flex-col items-center justify-center px-8 py-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{slide.title}</h2>
              <div className="flex items-start w-full">
                {slide.phases.map((phase, idx) => (
                  <div key={idx} className="flex items-start flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#F26219] flex items-center justify-center font-bold text-white text-base mb-2 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="text-xs font-bold text-[#F26219] uppercase tracking-wide mb-1 text-center">{phase.week}</div>
                      <div className="font-bold text-slate-900 text-center text-sm mb-0.5">{phase.activity}</div>
                      <div className="text-xs text-slate-500 text-center">{phase.description}</div>
                    </div>
                    {idx < slide.phases.length - 1 && (
                      <div className="flex-shrink-0" style={{ width: '24px', height: '2px', backgroundColor: '#e5e7eb', marginTop: '18px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA slide — fully centered */}
          {slide.type === 'cta' && (
            <div className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{slide.title}</h2>
              <p className="text-base text-[#F26219] font-semibold mb-4">{slide.subtitle}</p>
              <p className="text-slate-500 max-w-md mb-8 leading-relaxed text-sm">{slide.summary}</p>
              <button
                onClick={() => alert('Consultation booking coming soon!')}
                className="bg-[#F26219] hover:bg-[#d4521a] text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg flex items-center gap-3 mb-3"
              >
                <Calendar className="w-5 h-5" /> Book Your Free Consultation
              </button>
              <button onClick={reset} className="text-slate-400 hover:text-slate-600 font-medium mt-1 text-sm">← Start Over</button>
            </div>
          )}
        </div>

        {/* Nav footer */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={isFirst}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-slate-600 bg-gray-100 hover:bg-gray-200'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-1.5 items-center">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all ${idx === currentSlide ? 'w-6 h-2.5 bg-[#F26219]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`} />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(total - 1, currentSlide + 1))}
            disabled={isLast}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isLast ? 'text-gray-300 cursor-not-allowed' : 'bg-[#F26219] hover:bg-[#d4521a] text-white'}`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Questionnaire ───────────────────────────────────────────────────────────
  const recommendations = step === 5 ? getRecommendations(answers) : null;

  // Step 0 — Landing
  if (step === 0) {
    return (
      <div className="h-screen flex overflow-hidden">
        <div className="w-[300px] bg-[#F8F4F0] flex flex-col justify-center px-10 py-8 flex-shrink-0">
          <img src={assets.logo} alt="BrainMoove" style={{ width: '100px', height: '70px', objectFit: 'contain' }} className="mb-7" />
          <h1 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">Find the right treatment for you</h1>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">Answer 4 short questions. We'll match you with the services and technologies that fit your needs.</p>
          <div className="flex gap-4 text-xs text-slate-500 mb-7">
            <span>⏱ 2 minutes</span>
            <span className="text-slate-300">|</span>
            <span>❓ 4 questions</span>
          </div>
          <button onClick={() => setStep(1)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-bold px-6 py-3 rounded-xl text-base transition-all w-fit shadow-md">
            Start →
          </button>
        </div>
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">What you'll receive</p>
          <div className="space-y-4">
            {[['📋', 'Treatment Plan', 'Services and technologies matched to your responses'],
              ['🎥', 'Video Explanations', 'Specialists explain each recommended service'],
              ['🔬', 'Technology Demos', 'See how our equipment works'],
              ['📅', 'Treatment Timeline', 'A week-by-week overview of your journey']
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{icon}</span>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 pt-6 border-t border-gray-100">
            <p className="text-xs text-slate-400 leading-relaxed">Results are not a diagnosis — they help you prepare for a conversation with our team.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {step < 5 && (
        <div className="h-1.5 bg-gray-100 flex-shrink-0">
          <div className="h-1.5 bg-[#F26219] transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-10 py-6">

        {/* Step 1 */}
        {step === 1 && (
          <div className="max-w-md mx-auto">
            <div className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-3">Step 1 of 4</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5">Who is this treatment for?</h2>
            <p className="text-slate-500 text-sm mb-5">Select the age group that best applies</p>
            <div className="space-y-2">
              {[['child', 'Child or Teen', '0–17 years', 'Developmental support and early intervention'],
                ['adult', 'Adult', '18–64 years', 'Recovery, optimisation, and symptom management'],
                ['senior', 'Senior', '65+ years', 'Healthy ageing and fall prevention']
              ].map(([id, label, age, desc]) => (
                <button key={id} onClick={() => { setAnswers({ ...answers, audience: id }); setStep(2); }} className={`${card} p-4 flex items-center gap-4`}>
                  <div className="w-10 h-10 rounded-full bg-[#F26219]/10 flex items-center justify-center flex-shrink-0"><Users className="w-4 h-4 text-[#F26219]" /></div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{label} <span className="text-slate-400 font-normal text-xs ml-1">{age}</span></div>
                    <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <div className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-3">Step 2 of 4</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5">What brings you here?</h2>
            <p className="text-slate-500 text-sm mb-5">Select the option that best describes your situation</p>
            <div className="space-y-2">
              {[['diagnosed', '📋', 'I have a diagnosed condition', "You've received a medical diagnosis"],
                ['symptoms', '🔍', 'I have symptoms but no diagnosis', 'Experiencing issues without clear answers'],
                ['prevention', '💪', 'Prevention and optimisation', 'Proactive health and performance'],
                ['injury', '⚡', 'Post-injury recovery', 'Recovering from brain or head injury']
              ].map(([id, icon, label, desc]) => (
                <button key={id} onClick={() => { setAnswers({ ...answers, reason: id }); setStep(3); }} className={`${card} p-4 flex items-center gap-3`}>
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-4 text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"><ChevronLeft className="w-3 h-3" /> Back</button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="max-w-xl mx-auto">
            <div className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-3">Step 3 of 4</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5">What symptoms are you experiencing?</h2>
            <p className="text-slate-500 text-sm mb-5">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {[['attention', '🎯', 'Attention or focus difficulties'], ['balance', '⚖️', 'Balance or dizziness'], ['coordination', '🤸', 'Coordination challenges'], ['memory', '🧠', 'Memory problems'], ['sensory', '👂', 'Sensory sensitivities'], ['headaches', '😣', 'Headaches or migraines'], ['tremors', '🤲', 'Tremors or involuntary movements'], ['reading', '👁️', 'Reading or visual processing'], ['motor', '✋', 'Motor skill challenges']
              ].map(([id, icon, label]) => {
                const sel = answers.symptoms.includes(id);
                return (
                  <label key={id} className={`${card} ${sel ? cardSelected : ''} p-3 flex items-center gap-2.5`}>
                    <input type="checkbox" checked={sel} onChange={(e) => setAnswers({ ...answers, symptoms: e.target.checked ? [...answers.symptoms, id] : answers.symptoms.filter(s => s !== id) })} className="w-4 h-4 accent-[#F26219]" />
                    <span className="text-base">{icon}</span>
                    <span className="text-xs font-medium text-slate-800">{label}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"><ChevronLeft className="w-3 h-3" /> Back</button>
              <button onClick={() => setStep(4)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm">Continue <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="max-w-xl mx-auto">
            <div className="text-xs font-bold text-[#F26219] uppercase tracking-widest mb-3">Step 4 of 4</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5">What are your primary goals?</h2>
            <p className="text-slate-500 text-sm mb-5">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {[['restore', '🔄', 'Restore normal function'], ['manage', '💊', 'Manage symptoms'], ['improve', '😊', 'Improve quality of life'], ['perform', '🚀', 'Optimise performance'], ['prevent', '🛡️', 'Prevent decline or injury'], ['independence', '🦾', 'Maintain independence']
              ].map(([id, icon, label]) => {
                const sel = answers.goals.includes(id);
                return (
                  <label key={id} className={`${card} ${sel ? cardSelected : ''} p-3 flex items-center gap-2.5`}>
                    <input type="checkbox" checked={sel} onChange={(e) => setAnswers({ ...answers, goals: e.target.checked ? [...answers.goals, id] : answers.goals.filter(g => g !== id) })} className="w-4 h-4 accent-[#F26219]" />
                    <span className="text-base">{icon}</span>
                    <span className="text-xs font-medium text-slate-800">{label}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => setStep(3)} className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"><ChevronLeft className="w-3 h-3" /> Back</button>
              <button onClick={() => setStep(5)} className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm">See My Results <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 5 — Results */}
        {step === 5 && recommendations && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Personalised Treatment Plan</h2>
              <p className="text-slate-500 text-sm mb-1">{recommendations.primaryMessage}</p>
              <p className="text-slate-400 text-xs">A {recommendations.audienceNote} programme addressing {recommendations.symptomsText}</p>
            </div>

            {/* Recommendations grid */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recommended Services</h4>
                <div className="space-y-2">
                  {recommendations.recommendedServices.map(id => {
                    const s = technicalServices.find(x => x.id === id);
                    if (!s) return null;
                    const Icon = s.icon;
                    return (
                      <div key={id} className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F26219]/10 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-[#F26219]" /></div>
                        <span className="font-semibold text-slate-800 text-sm">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recommended Technologies</h4>
                <div className="space-y-2">
                  {recommendations.recommendedTechnologies.map(id => {
                    const t = machinesData.find(x => x.id === id);
                    if (!t) return null;
                    const Icon = t.icon;
                    return (
                      <div key={id} className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F26219]/10 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-[#F26219]" /></div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{t.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{t.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hero CTA — bottom */}
            <div className="flex flex-col items-center gap-3 pb-2">
              <button
                onClick={() => { setPhase('carousel'); setCurrentSlide(0); }}
                className="bg-[#F26219] hover:bg-[#d4521a] text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Take the Guided Tour
              </button>
              <button onClick={reset} className="text-slate-400 hover:text-slate-600 text-xs">← Start Over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
