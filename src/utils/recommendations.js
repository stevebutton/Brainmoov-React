export function getRecommendations(answers) {
  const { audience, reason, symptoms, goals } = answers;
  let recommendedServices = [];
  let recommendedTechnologies = [];
  let primaryMessage = '';

  const symptomTechMap = {
    'balance': ['gyrostim', 'force-platform'],
    'coordination': ['gyrostim', 'interactive-metronome'],
    'attention': ['interactive-metronome', 'tova', 'neurofeedback'],
    'memory': ['neurofeedback', 'interactive-metronome'],
    'sensory': ['vibramoov', 'brainport'],
    'tremors': ['gyrostim', 'vng'],
    'headaches': ['vng', 'neurofeedback'],
    'reading': ['vng', 'interactive-metronome'],
    'motor': ['vibramoov', 'interactive-metronome']
  };

  const techSet = new Set();
  symptoms.forEach(symptom => {
    const techs = symptomTechMap[symptom] || [];
    techs.forEach(tech => techSet.add(tech));
  });
  recommendedTechnologies = Array.from(techSet).slice(0, 4);

  if (reason === 'diagnosed' || reason === 'symptoms') {
    recommendedServices = ['assessment', 'neurological', 'treatment', 'monitoring'];
    primaryMessage = 'Comprehensive Diagnostic and Treatment Program';
  } else if (reason === 'prevention') {
    recommendedServices = ['assessment', 'treatment', 'monitoring'];
    primaryMessage = 'Prevention and Optimization Program';
  } else if (reason === 'injury') {
    recommendedServices = ['assessment', 'neurological', 'treatment', 'monitoring', 'followup'];
    primaryMessage = 'Post-Injury Recovery Program';
  }

  let audienceNote = '';
  if (audience === 'child') {
    audienceNote = 'pediatric and developmental';
  } else if (audience === 'senior') {
    audienceNote = 'senior-focused and age-appropriate';
  } else {
    audienceNote = 'adult';
  }

  return {
    primaryMessage,
    audienceNote,
    recommendedServices: recommendedServices.slice(0, 4),
    recommendedTechnologies: recommendedTechnologies.length > 0 ? recommendedTechnologies : ['gyrostim', 'tova'],
    symptomsText: symptoms.join(', ') || 'general wellness',
    goalsText: goals.join(', ') || 'improved function'
  };
}
