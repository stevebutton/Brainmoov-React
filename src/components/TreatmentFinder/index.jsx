import { X, ChevronRight, Users } from 'lucide-react';
import { technicalServices } from '../../data/index';
import { getRecommendations } from '../../utils/recommendations';
import { Activity, Target, Brain, Zap } from 'lucide-react';
import { useAssets } from '../../context/AssetContext';

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

export default function TreatmentFinder({
  show,
  onClose,
  questionnaireStep,
  setQuestionnaireStep,
  questionnaireAnswers,
  setQuestionnaireAnswers,
  onStartCarousel,
  onReset
}) {
  const { assets } = useAssets();
  if (!show) return null;

  const handleDownload = (recommendations) => {
    const results = `
BRAINMOOVE TREATMENT RECOMMENDATIONS

Age Group: ${questionnaireAnswers.audience}
Reason: ${questionnaireAnswers.reason}
Symptoms: ${questionnaireAnswers.symptoms.join(', ')}
Goals: ${questionnaireAnswers.goals.join(', ')}

RECOMMENDATION: ${recommendations.primaryMessage}

Recommended Services:
${recommendations.recommendedServices.map(s => technicalServices.find(t => t.id === s)?.title).join('\n')}

Recommended Technologies:
${recommendations.recommendedTechnologies.join('\n')}
`;
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brainmoove-recommendations.txt';
    a.click();
  };

  const handleEmail = () => {
    const email = prompt('Enter your email address:');
    if (email) {
      alert(`Results would be sent to ${email}\n\n(Email functionality coming soon - for now, please use Download Results)`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-[#111111] rounded-3xl shadow-2xl max-w-2xl w-full mx-4"
        style={{
          animation: 'slideInDown 0.3s ease-out forwards',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Treatment Finder</h2>
              <p className="text-blue-100 text-sm mt-1">Find the right care for your needs</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicator - Only show when tour has started */}
          {questionnaireStep > 0 && (
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm text-blue-100">Step {questionnaireStep} of 5</span>
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(questionnaireStep / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Step 0: Landing Page */}
          {questionnaireStep === 0 && (
            <div className="text-center py-6">
              <img
                src={assets.logo}
                alt="BrainMoove Logo"
                className="mx-auto mb-6"
                style={{ width: '150px', height: '107px', objectFit: 'contain' }}
              />
              <h2 className="text-3xl font-bold text-white mb-3">BrainMoove: a personalised tour</h2>
              <p className="text-xl text-white/70 mb-6">
                treatments right for you
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Answer 4 questions about your situation. We'll show you which services and technologies
                apply to your needs, with videos and a treatment timeline.
              </p>

              <div className="bg-[#1a1a1a] border-2 border-white/10 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <h3 className="font-bold text-white mb-6 text-xl">What you'll see:</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📋</div>
                    <div>
                      <div className="font-bold text-white text-lg">Treatment Plan</div>
                      <div className="text-white/70">Services and technologies based on your responses</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎥</div>
                    <div>
                      <div className="font-bold text-white text-lg">Video Explanations</div>
                      <div className="text-white/70">Specialists explain each service</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🔬</div>
                    <div>
                      <div className="font-bold text-white text-lg">Technology Demonstrations</div>
                      <div className="text-white/70">How the equipment works</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📅</div>
                    <div>
                      <div className="font-bold text-white text-lg">Treatment Timeline</div>
                      <div className="text-white/70">Week-by-week overview</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-white/50 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  <span>2 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">❓</span>
                  <span>4 questions</span>
                </div>
              </div>

              <button
                onClick={() => setQuestionnaireStep(1)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-12 py-5 rounded-xl transition-all hover:scale-105 text-xl shadow-lg"
              >
                Start the Tour →
              </button>

              {/* Disclaimer */}
              <div className="mt-8 bg-[#1a1a1a] border border-white/10 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-xs text-white/50 leading-relaxed">
                  <strong>Note:</strong> This tool helps you understand available treatment options and is the first step toward a focused conversation with our team.
                  Results are not a diagnosis or binding commitment.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Audience */}
          {questionnaireStep === 1 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Who is this treatment for?</h3>
              <p className="text-white/70 mb-6">Select the age group that best applies</p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, audience: 'child' });
                    setQuestionnaireStep(2);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-6 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F26219]/20 group-hover:bg-[#F26219] rounded-full p-3 transition-colors">
                      <Users className="w-6 h-6 text-[#F26219] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Child or Teen (0-17 years)</div>
                      <div className="text-sm text-white/70">Developmental support and early intervention</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, audience: 'adult' });
                    setQuestionnaireStep(2);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-6 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F26219]/20 group-hover:bg-[#F26219] rounded-full p-3 transition-colors">
                      <Users className="w-6 h-6 text-[#F26219] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Adult (18-64 years)</div>
                      <div className="text-sm text-white/70">Recovery, optimization, and symptom management</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, audience: 'senior' });
                    setQuestionnaireStep(2);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-6 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F26219]/20 group-hover:bg-[#F26219] rounded-full p-3 transition-colors">
                      <Users className="w-6 h-6 text-[#F26219] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Senior (65+ years)</div>
                      <div className="text-sm text-white/70">Healthy aging and fall prevention</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Reason */}
          {questionnaireStep === 2 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What brings you here today?</h3>
              <p className="text-white/70 mb-6">Select the option that best describes your situation</p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, reason: 'diagnosed' });
                    setQuestionnaireStep(3);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-5 transition-all text-left"
                >
                  <div className="font-semibold text-white mb-1">📋 I have a diagnosed condition</div>
                  <div className="text-sm text-white/70">You've received a medical diagnosis</div>
                </button>

                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, reason: 'symptoms' });
                    setQuestionnaireStep(3);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-5 transition-all text-left"
                >
                  <div className="font-semibold text-white mb-1">🔍 I have symptoms but no diagnosis</div>
                  <div className="text-sm text-white/70">Experiencing issues without clear answers</div>
                </button>

                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, reason: 'prevention' });
                    setQuestionnaireStep(3);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-5 transition-all text-left"
                >
                  <div className="font-semibold text-white mb-1">💪 Prevention and optimization</div>
                  <div className="text-sm text-white/70">Proactive health and performance</div>
                </button>

                <button
                  onClick={() => {
                    setQuestionnaireAnswers({ ...questionnaireAnswers, reason: 'injury' });
                    setQuestionnaireStep(3);
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 hover:border-[#F26219]/50 rounded-xl p-5 transition-all text-left"
                >
                  <div className="font-semibold text-white mb-1">⚡ Post-injury recovery</div>
                  <div className="text-sm text-white/70">Recovering from brain or head injury</div>
                </button>
              </div>

              <button
                onClick={() => setQuestionnaireStep(1)}
                className="mt-6 text-white/50 hover:text-white font-medium flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>
            </div>
          )}

          {/* Step 3: Symptoms */}
          {questionnaireStep === 3 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What symptoms or challenges are you experiencing?</h3>
              <p className="text-white/70 mb-6">Select all that apply (you can choose multiple)</p>

              <div className="space-y-2">
                {[
                  { id: 'attention', label: 'Attention or focus difficulties', icon: '🎯' },
                  { id: 'balance', label: 'Balance or dizziness issues', icon: '⚖️' },
                  { id: 'coordination', label: 'Coordination challenges', icon: '🤸' },
                  { id: 'memory', label: 'Memory problems', icon: '🧠' },
                  { id: 'sensory', label: 'Sensory sensitivities', icon: '👂' },
                  { id: 'headaches', label: 'Chronic headaches or migraines', icon: '😣' },
                  { id: 'tremors', label: 'Tremors or involuntary movements', icon: '🤲' },
                  { id: 'reading', label: 'Reading or visual processing issues', icon: '👁️' },
                  { id: 'motor', label: 'Fine or gross motor skill challenges', icon: '✋' }
                ].map(symptom => (
                  <label
                    key={symptom.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      questionnaireAnswers.symptoms.includes(symptom.id)
                        ? 'bg-[#F26219]/10 border-[#F26219]'
                        : 'bg-[#1a1a1a] border-white/10 hover:border-[#F26219]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={questionnaireAnswers.symptoms.includes(symptom.id)}
                      onChange={(e) => {
                        const newSymptoms = e.target.checked
                          ? [...questionnaireAnswers.symptoms, symptom.id]
                          : questionnaireAnswers.symptoms.filter(s => s !== symptom.id);
                        setQuestionnaireAnswers({ ...questionnaireAnswers, symptoms: newSymptoms });
                      }}
                      className="w-5 h-5"
                    />
                    <span className="text-xl">{symptom.icon}</span>
                    <span className="text-white">{symptom.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setQuestionnaireStep(2)}
                  className="text-white/50 hover:text-white font-medium flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <button
                  onClick={() => setQuestionnaireStep(4)}
                  className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-1"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {questionnaireStep === 4 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What are your primary goals?</h3>
              <p className="text-white/70 mb-6">Select all that apply</p>

              <div className="space-y-2">
                {[
                  { id: 'restore', label: 'Restore normal function', icon: '🔄' },
                  { id: 'manage', label: 'Manage symptoms effectively', icon: '💊' },
                  { id: 'improve', label: 'Improve quality of life', icon: '😊' },
                  { id: 'perform', label: 'Optimize performance', icon: '🚀' },
                  { id: 'prevent', label: 'Prevent decline or injury', icon: '🛡️' },
                  { id: 'independence', label: 'Maintain independence', icon: '🦾' }
                ].map(goal => (
                  <label
                    key={goal.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      questionnaireAnswers.goals.includes(goal.id)
                        ? 'bg-[#F26219]/10 border-[#F26219]'
                        : 'bg-[#1a1a1a] border-white/10 hover:border-[#F26219]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={questionnaireAnswers.goals.includes(goal.id)}
                      onChange={(e) => {
                        const newGoals = e.target.checked
                          ? [...questionnaireAnswers.goals, goal.id]
                          : questionnaireAnswers.goals.filter(g => g !== goal.id);
                        setQuestionnaireAnswers({ ...questionnaireAnswers, goals: newGoals });
                      }}
                      className="w-5 h-5"
                    />
                    <span className="text-xl">{goal.icon}</span>
                    <span className="text-white">{goal.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setQuestionnaireStep(3)}
                  className="text-white/50 hover:text-white font-medium flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <button
                  onClick={() => setQuestionnaireStep(5)}
                  className="bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-1"
                >
                  See My Results
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Results */}
          {questionnaireStep === 5 && (() => {
            const recommendations = getRecommendations(questionnaireAnswers);
            return (
              <div>
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Personalized Treatment Plan</h3>
                  <p className="text-white/70">Based on your responses, here's what we recommend</p>
                </div>

                {/* Primary Recommendation */}
                <div className="bg-[#1a1a1a] border-2 border-white/10 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-white mb-2">{recommendations.primaryMessage}</h4>
                  <p className="text-white/70">
                    A comprehensive {recommendations.audienceNote} program addressing {recommendations.symptomsText} with focus on {recommendations.goalsText}.
                  </p>
                </div>

                {/* Recommended Services */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3">Recommended Services:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendations.recommendedServices.map(serviceId => {
                      const service = technicalServices.find(s => s.id === serviceId);
                      if (!service) return null;
                      const ServiceIcon = service.icon;
                      return (
                        <div key={serviceId} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 flex items-center gap-3">
                          <div className="bg-[#F26219]/20 rounded-full p-2">
                            <ServiceIcon className="w-5 h-5 text-[#F26219]" />
                          </div>
                          <span className="text-sm font-medium text-white">{service.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommended Technologies */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3">Recommended Technologies:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendations.recommendedTechnologies.map(techId => {
                      const tech = machinesData.find(m => m.id === techId);
                      if (!tech) return null;
                      const TechIcon = tech.icon;
                      return (
                        <div key={techId} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 flex items-center gap-3">
                          <div className="bg-[#F26219]/20 rounded-full p-2">
                            <TechIcon className="w-5 h-5 text-[#F26219]" />
                          </div>
                          <span className="text-sm font-medium text-white">{tech.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Why These Recommendations */}
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-white mb-2 text-sm">Why these recommendations?</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Based on your {questionnaireAnswers.audience === 'child' ? "child's" : questionnaireAnswers.audience === 'senior' ? 'senior' : ''} symptoms and goals,
                    this combination of services and technologies provides comprehensive support. Our {recommendations.audienceNote} protocols
                    are specifically designed to address the challenges you described.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-[#1a1a1a] border-l-4 border-[#F26219] rounded-lg p-4 mb-6">
                  <p className="text-sm text-white/70 leading-relaxed">
                    <strong className="text-[#F26219]">Important:</strong> These recommendations help you understand your options and prepare for a meaningful conversation with our specialists.
                    They are not a diagnosis or binding commitment. Your personalized treatment plan will be developed during your consultation.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onStartCarousel}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Take the Guided Tour
                  </button>

                  <button
                    onClick={() => alert('Consultation booking system coming soon! For now, please call us directly.')}
                    className="w-full bg-[#F26219] hover:bg-[#d4521a] text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105"
                  >
                    📅 Book Free Consultation
                  </button>

                  <button
                    onClick={() => handleDownload(recommendations)}
                    className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    💾 Download Results
                  </button>

                  <button
                    onClick={handleEmail}
                    className="w-full bg-[#1a1a1a] hover:bg-[#222222] border-2 border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    📧 Email Results to Me
                  </button>
                </div>

                <button
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="w-full mt-4 text-white/50 hover:text-white font-medium"
                >
                  ← Start Over
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
