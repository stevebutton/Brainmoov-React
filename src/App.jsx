import { useState, useEffect, useRef } from 'react';
import { Heart, Brain, Activity, Sparkles, Target, Zap, Shield, Users } from 'lucide-react';
import { useAssets } from './context/AssetContext';
import IntroPage from './pages/IntroPage';
import AboutSection from './pages/AboutSection';
import AboutPhilosophySection from './pages/AboutPhilosophySection';
import AboutObjectivesSection from './pages/AboutObjectivesSection';
import AboutTeamSection from './pages/AboutTeamSection';
import AboutInfrastructureSection from './pages/AboutInfrastructureSection';
import AboutHistorySection from './pages/AboutHistorySection';
import WhoDetailSection from './pages/WhoDetailSection';
import WhatDetailSection from './pages/WhatDetailSection';
import ProcessDetailSection from './pages/ProcessDetailSection';
import AudienceSection from './pages/AudienceSection';
import TreatmentFinder from './components/TreatmentFinder/index';
import Carousel from './components/TreatmentFinder/Carousel';

const audiences = [
  {
    id: 'children',
    title: 'PROGRAMME ENFANTS & NOURRISSONS',
    icon: Heart,
    color: 'from-blue-500 to-cyan-500',
    intro: 'We specialize in helping children overcome developmental challenges and reach their full potential. Our evidence-based functional neurology approach addresses the root causes of learning, attention, and coordination difficulties, providing your child with the foundation they need to thrive academically, socially, and physically.',
    backgroundImage: 'https://raw.githubusercontent.com/stevebutton/brainmoove-prototype/main/gfx/DSC_1906.jpg',
    services: [
      {
        id: 'dcd',
        title: 'Developmental Coordination',
        icon: Sparkles,
        cards: [
          { title: 'Assessment', description: "We conduct comprehensive evaluations to identify specific coordination challenges through standardized testing and functional movement analysis. Our detailed assessment helps us understand your child's unique needs and create a targeted treatment plan." },
          { title: 'Motor Skills Training', description: 'Through engaging activities and exercises, we help children develop better body awareness and movement control. Our programs focus on building fundamental motor patterns that translate to improved daily function.' },
          { title: 'Vestibular Integration', description: 'We address the balance and spatial orientation challenges that often accompany coordination disorders. Our vestibular therapy helps children develop better equilibrium and body positioning awareness.' }
        ]
      },
      {
        id: 'adhd',
        title: 'ADHD & Focus Enhancement',
        icon: Target,
        cards: [
          { title: 'Attention Training', description: 'Using evidence-based neurological techniques, we help improve sustained attention and reduce distractibility. Our programs target the specific brain networks involved in focus and concentration.' },
          { title: 'Executive Function', description: 'We work on developing better planning, organization, and impulse control through targeted exercises. These skills are essential for academic success and daily life management.' },
          { title: 'Sensory Regulation', description: 'Many children with ADHD also struggle with sensory processing. We address these challenges to help create optimal conditions for focus and learning.' }
        ]
      },
      {
        id: 'learning',
        title: 'Learning Disability Support',
        icon: Brain,
        cards: [
          { title: 'Neurological Assessment', description: 'We identify the specific brain-based factors contributing to learning challenges through comprehensive testing. This helps us understand whether difficulties stem from processing, memory, or other neurological factors.' },
          { title: 'Cognitive Enhancement', description: 'Our programs target specific cognitive skills like working memory, processing speed, and visual-spatial abilities. We use evidence-based techniques to strengthen these foundational learning skills.' },
          { title: 'Integration Therapy', description: 'We help children develop better connections between different brain systems to support learning. This includes visual-motor integration and sensory-cognitive processing.' }
        ]
      },
      {
        id: 'sensory',
        title: 'Sensory Processing',
        icon: Zap,
        cards: [
          { title: 'Sensory Evaluation', description: 'We assess how your child processes and responds to sensory information from their environment. This includes evaluation of touch, sound, movement, and visual processing.' },
          { title: 'Desensitization', description: 'For children with sensory sensitivities, we provide graduated exposure therapy to help reduce defensive responses. Our gentle approach helps children become more comfortable with various sensory experiences.' },
          { title: 'Sensory Integration', description: 'We help children learn to organize and process sensory information more effectively through therapeutic activities. This leads to improved behavior, attention, and functional skills.' }
        ]
      },
      {
        id: 'vestibular',
        title: 'Pediatric Vestibular',
        icon: Activity,
        cards: [
          { title: 'Balance Assessment', description: "We evaluate your child's vestibular system function and balance abilities through specialized testing. This helps us identify the source of dizziness, balance problems, or coordination issues." },
          { title: 'Gaze Stabilization', description: 'We work on improving eye movement control and visual stability during head movements. This is crucial for reading, sports, and navigating busy environments.' },
          { title: 'Balance Training', description: 'Through progressive exercises, we help children develop better balance and spatial orientation. Our programs are designed to be engaging while building essential vestibular function.' }
        ]
      }
    ],
    videoTitle: 'Helping Young Minds Thrive'
  },
  {
    id: 'adults',
    title: 'PROGRAMME ADULTES & SPORTIFS',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    intro: "Life doesn't stop for neurological challenges. Whether you're recovering from a concussion, managing chronic pain, or dealing with balance issues, our functional neurology approach helps restore your quality of life. We focus on understanding and treating the underlying neurological dysfunction to help you return to the activities and relationships that matter most.",
    backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1280&h=800&fit=crop&q=80',
    services: [
      {
        id: 'concussion',
        title: 'Post-Concussion Syndrome',
        icon: Shield,
        cards: [
          { title: 'Comprehensive Evaluation', description: 'We conduct thorough assessments of cognitive, vestibular, and visual function to identify all areas affected by your concussion. This comprehensive approach ensures we address all aspects of your recovery.' },
          { title: 'Symptom Management', description: 'We provide targeted interventions for headaches, dizziness, light sensitivity, and cognitive fog. Our multi-modal approach addresses the complex nature of post-concussion symptoms.' },
          { title: 'Return to Activity', description: 'We guide you through a safe, progressive return to work, exercise, and daily activities. Our protocols are based on the latest concussion research and individualized to your recovery timeline.' }
        ]
      },
      {
        id: 'migraine',
        title: 'Migraine Management',
        icon: Zap,
        cards: [
          { title: 'Neurological Assessment', description: 'We identify the specific neurological factors contributing to your migraines through detailed evaluation. This includes assessment of vestibular function, visual processing, and autonomic regulation.' },
          { title: 'Trigger Identification', description: 'We help you understand and manage the various triggers that may be contributing to your migraines. This includes sensory, postural, and lifestyle factors that can be modified.' },
          { title: 'Preventive Treatment', description: 'Our functional neurology approach focuses on reducing migraine frequency and severity through targeted exercises and lifestyle modifications. We address the underlying neurological dysfunction rather than just managing symptoms.' }
        ]
      },
      {
        id: 'balance',
        title: 'Balance & Vestibular',
        icon: Activity,
        cards: [
          { title: 'Vestibular Testing', description: 'We use specialized assessments to identify the source of your dizziness or balance problems. This helps us determine whether issues are peripheral, central, or mixed in nature.' },
          { title: 'Gaze Stabilization', description: 'We provide exercises to improve your ability to maintain clear vision during head movements. This is essential for reducing dizziness and improving confidence in movement.' },
          { title: 'Balance Retraining', description: 'Through progressive exercises, we help restore your balance and reduce fall risk. Our programs address both static and dynamic balance in various environmental conditions.' }
        ]
      },
      {
        id: 'pain',
        title: 'Chronic Pain',
        icon: Target,
        cards: [
          { title: 'Pain Neuroscience', description: 'We help you understand the neurological basis of chronic pain and how the nervous system can be retrained. This education is a crucial first step in recovery.' },
          { title: 'Neurological Rehabilitation', description: 'We address the neurological dysfunction that may be perpetuating your pain through targeted exercises and therapies. This includes work on sensory processing and motor control.' },
          { title: 'Functional Restoration', description: 'Our goal is to help you return to meaningful activities while managing pain. We focus on gradual, progressive increases in function and quality of life.' }
        ]
      },
      {
        id: 'injury',
        title: 'Injury Recovery',
        icon: Users,
        cards: [
          { title: 'Functional Assessment', description: 'We evaluate how your injury has affected neurological function, including movement patterns and sensory processing. This comprehensive view guides effective treatment.' },
          { title: 'Neuromotor Retraining', description: 'We help restore proper movement patterns and motor control through functional neurology techniques. This addresses compensation patterns that may have developed after injury.' },
          { title: 'Return to Work', description: 'We provide targeted rehabilitation to help you safely return to your occupational demands. Our programs are tailored to the specific physical and cognitive requirements of your job.' }
        ]
      }
    ],
    videoTitle: 'Restoring Function & Quality of Life'
  },
  {
    id: 'seniors',
    title: 'PROGRAMME SENIORS',
    icon: Activity,
    color: 'from-green-500 to-emerald-500',
    intro: "Aging well means maintaining your independence, confidence, and engagement with life. Our specialized programs help you stay active, reduce fall risk, and manage age-related neurological changes. We combine the latest neuroscience with compassionate care to help you maintain the lifestyle you've earned.",
    backgroundImage: 'https://images.unsplash.com/photo-1573881611865-ba68e90df6c3?w=1280&h=800&fit=crop&q=80',
    services: [
      {
        id: 'falls',
        title: 'Fall Prevention',
        icon: Shield,
        cards: [
          { title: 'Risk Assessment', description: 'We conduct comprehensive evaluations to identify your specific fall risk factors. This includes testing balance, gait, strength, vision, and vestibular function to create a complete picture.' },
          { title: 'Balance Training', description: 'Through evidence-based exercises, we work to improve your balance and stability in various conditions. Our programs are progressive and tailored to your current abilities.' },
          { title: 'Environmental Modifications', description: 'We provide recommendations for home and lifestyle modifications to reduce fall risk. This includes both physical changes and behavioral strategies to maintain safety and independence.' }
        ]
      },
      {
        id: 'stroke',
        title: 'Post-Stroke Recovery',
        icon: Brain,
        cards: [
          { title: 'Neurological Recovery', description: 'We use functional neurology principles to promote brain plasticity and recovery after stroke. Our approach targets specific neurological deficits to maximize functional improvement.' },
          { title: 'Movement Restoration', description: 'We work on recovering movement patterns and reducing compensatory strategies. This includes addressing both gross motor function and fine motor control.' },
          { title: 'Cognitive Rehabilitation', description: 'Many stroke survivors experience cognitive challenges. We provide targeted interventions for attention, memory, and executive function to support overall recovery.' }
        ]
      },
      {
        id: 'parkinsons',
        title: "Parkinson's Management",
        icon: Activity,
        cards: [
          { title: 'Movement Therapy', description: "We provide specialized exercises to address the movement challenges of Parkinson's disease. This includes work on initiation, amplitude, and coordination of movements." },
          { title: 'Gait Training', description: 'We focus on improving walking patterns, reducing freezing episodes, and maintaining mobility. Our evidence-based programs help maintain independence in mobility.' },
          { title: 'Balance & Posture', description: "We address the postural instability and balance challenges that accompany Parkinson's. This helps reduce fall risk and maintain confidence in movement." }
        ]
      },
      {
        id: 'cognitive',
        title: 'Cognitive Enhancement',
        icon: Sparkles,
        cards: [
          { title: 'Memory Training', description: 'We provide targeted exercises to help maintain and improve memory function. Our programs address different types of memory including working memory and long-term recall.' },
          { title: 'Processing Speed', description: 'We work on maintaining quick thinking and mental agility through cognitive exercises. This helps with daily tasks that require rapid information processing.' },
          { title: 'Executive Function', description: 'We help maintain skills like planning, organization, and problem-solving. These higher-level cognitive abilities are essential for independent living and quality of life.' }
        ]
      },
      {
        id: 'age-balance',
        title: 'Age-Related Balance',
        icon: Target,
        cards: [
          { title: 'Vestibular Assessment', description: 'We evaluate age-related changes in vestibular function that may be affecting your balance. This helps us understand and address the specific nature of your balance challenges.' },
          { title: 'Multi-Sensory Integration', description: 'We work on improving how your brain integrates information from vision, vestibular, and proprioceptive systems. This comprehensive approach improves overall balance confidence.' },
          { title: 'Functional Balance', description: 'We practice balance in real-world contexts including uneven surfaces, dim lighting, and dual-task situations. This prepares you for the actual challenges you face in daily life.' }
        ]
      }
    ],
    videoTitle: 'Promoting Independence & Well-Being'
  }
];

const VALID_SECTIONS = new Set([
  'intro', 'children', 'adults', 'seniors',
  'about', 'about-philosophy', 'about-objectives', 'about-team', 'about-infrastructure', 'about-history',
  'who-detail', 'what-detail', 'process-detail'
]);

function getInitialView() {
  const section = new URLSearchParams(window.location.search).get('section');
  return VALID_SECTIONS.has(section) ? section : 'intro';
}

export default function App() {
  const { assets } = useAssets();
  const [currentView, setCurrentView] = useState(getInitialView);
  const [showNav, setShowNav] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState({});
  const [transitioning, setTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('in');
  const [selectedService, setSelectedService] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedTechService, setSelectedTechService] = useState(null);
  const [isFirstVideoOpen, setIsFirstVideoOpen] = useState(true);
  const [isClosingVideo, setIsClosingVideo] = useState(false);
  const [isClosingCards, setIsClosingCards] = useState(false);
  const [lastTechService, setLastTechService] = useState(null);
  const [previousView, setPreviousView] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [shouldAnimateBanner, setShouldAnimateBanner] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({
    audience: null,
    reason: null,
    symptoms: [],
    goals: [],
    experience: null
  });
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredAudience, setHoveredAudience] = useState(null);
  const [hoveredProcessStep, setHoveredProcessStep] = useState(null);
  const [selectedProcessVideo, setSelectedProcessVideo] = useState(null);

  // Keep a ref to handleViewChange so the message listener never goes stale
  const navigateRef = useRef(null);
  useEffect(() => { navigateRef.current = handleViewChange; });

  // Inbound: Framer → React  (postMessage from parent page)
  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === 'brainmoove:navigate' && VALID_SECTIONS.has(event.data.section)) {
        navigateRef.current?.(event.data.section);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (currentView === 'intro') {
      const timer = setTimeout(() => setShowNav(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView !== 'intro' && currentView !== null) {
      if (currentView === 'about-infrastructure') {
        setSelectedMachine(0);
      }

      const aboutSubsections = ['about-philosophy', 'about-objectives', 'about-team', 'about-infrastructure', 'about-history'];
      const isCurrentAboutSub = aboutSubsections.includes(currentView);
      const isPreviousAboutSub = aboutSubsections.includes(previousView);
      const isAboutToAboutTransition = isCurrentAboutSub && isPreviousAboutSub;

      if (isAboutToAboutTransition) {
        setShouldAnimateBanner(false);
        setShowBanner(true);
      } else {
        setShouldAnimateBanner(true);
        setShowBanner(false);
        setShowSubmenu(false);

        const bannerTimer = setTimeout(() => {
          setShowBanner(true);
        }, 1000);

        const submenuTimer = setTimeout(() => {
          setShowSubmenu(true);
        }, 2000);

        return () => {
          clearTimeout(bannerTimer);
          clearTimeout(submenuTimer);
        };
      }
    }
  }, [currentView, previousView]);

  const handleViewChange = (newView) => {
    // Outbound: React → Framer  (notify parent page of section change)
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'brainmoove:sectionChange', section: newView }, '*');
    }

    const hasVideoOpen = selectedTechService !== null;
    const hasCardsOpen = selectedService !== null;

    if (hasVideoOpen || hasCardsOpen) {
      const viewToTransitionFrom = currentView;

      if (newView === 'intro') {
        setPreviousView(viewToTransitionFrom);
        setShowNav(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSlideDirection('out');
            setTransitioning(true);
          });
        });
      } else {
        setPreviousView(viewToTransitionFrom);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSlideDirection('out');
            setTransitioning(true);
          });
        });
      }

      if (hasVideoOpen) {
        setIsClosingVideo(true);
      }
      if (hasCardsOpen) {
        setIsClosingCards(true);
      }

      const maxAnimationTime = hasVideoOpen ? 1500 : 2000;

      setTimeout(() => {
        setSelectedService(null);
        setSelectedTechService(null);
        setIsClosingVideo(false);
        setIsClosingCards(false);
      }, maxAnimationTime);

      setTimeout(() => {
        if (newView === 'intro') {
          setCurrentView(newView);
          setSlideDirection('in');
          setCarouselIndex(0);
          setIsFirstVideoOpen(true);
          setTransitioning(false);
          setPreviousView(null);
        } else {
          setCurrentView(newView);
          setSlideDirection('from-bottom');
          setCarouselIndex(0);
          setIsFirstVideoOpen(true);
          setPreviousView(null);
          setTimeout(() => {
            setTransitioning(false);
          }, 50);
        }
      }, 2000);

      return;
    }

    if (currentView === 'intro') {
      setCurrentView(newView);
      setSlideDirection('from-bottom');
      setCarouselIndex(0);
      setIsFirstVideoOpen(true);
      setSelectedService(null);
      setSelectedTechService(null);
      setShowNav(false);
      setTransitioning(false);
    } else if (newView === 'intro') {
      setPreviousView(currentView);
      setShowNav(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideDirection('out');
          setTransitioning(true);
        });
      });

      setTimeout(() => {
        setCurrentView(newView);
        setSlideDirection('in');
        setCarouselIndex(0);
        setIsFirstVideoOpen(true);
        setSelectedService(null);
        setSelectedTechService(null);
        setTransitioning(false);
        setPreviousView(null);
      }, 2000);
    } else {
      const aboutSubsections = ['about-philosophy', 'about-objectives', 'about-team', 'about-infrastructure', 'about-history'];
      const isCurrentAboutSub = aboutSubsections.includes(currentView);
      const isNewAboutSub = aboutSubsections.includes(newView);
      const isAboutToAboutTransition = isCurrentAboutSub && isNewAboutSub;

      if (isAboutToAboutTransition) {
        setPreviousView(currentView);
        setCurrentView(newView);
        setSlideDirection(null);
        setTransitioning(true);

        setTimeout(() => {
          setPreviousView(null);
          setTransitioning(false);
        }, 500);
      } else {
        setPreviousView(currentView);
        setSlideDirection('out');
        setTransitioning(true);

        setTimeout(() => {
          setCurrentView(newView);
          setSlideDirection('from-bottom');
          setCarouselIndex(0);
          setIsFirstVideoOpen(true);
          setSelectedService(null);
          setSelectedTechService(null);
          setPreviousView(null);

          setTimeout(() => {
            setTransitioning(false);
          }, 50);
        }, 2000);
      }
    }
  };

  const toggleVideo = (audienceId) => {
    setVideoPlaying(prev => ({
      ...prev,
      [audienceId]: !prev[audienceId]
    }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCarouselIndex(0);
    if (selectedTechService) {
      setTimeout(() => {
        setSelectedTechService(null);
      }, 2000);
    }
  };

  const handleTechServiceSelect = (techService) => {
    // Handle close (null passed from Close button)
    if (techService === null) {
      setIsClosingVideo(true);
      setLastTechService(selectedTechService);
      setTimeout(() => {
        setSelectedTechService(null);
        setIsClosingVideo(false);
        setIsFirstVideoOpen(true);
      }, 1500);
      return;
    }

    if (selectedTechService?.id === techService.id) {
      return;
    }

    if (selectedTechService !== null && isFirstVideoOpen) {
      setIsFirstVideoOpen(false);
    }

    setLastTechService(techService);
    setSelectedTechService(techService);
  };

  const handleCarouselPrev = () => {
    if (selectedService && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  const handleCarouselNext = () => {
    if (selectedService && carouselIndex < selectedService.cards.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  const resetQuestionnaire = () => {
    setQuestionnaireStep(1);
    setQuestionnaireAnswers({
      audience: null,
      reason: null,
      symptoms: [],
      goals: [],
      experience: null
    });
  };

  const handleTreatmentFinderClick = () => {
    setShowQuestionnaire(true);
    setQuestionnaireStep(0);
  };

  const detailSections = ['about', 'about-philosophy', 'about-objectives', 'about-team', 'about-infrastructure', 'about-history', 'who-detail', 'what-detail', 'process-detail'];
  const aboutSubsections = ['about-philosophy', 'about-objectives', 'about-team', 'about-infrastructure', 'about-history'];

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Intro screen - always visible, always rendered */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <IntroPage
          showNav={showNav}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
          onNavigate={handleViewChange}
        />
      </div>

      {/* Detail sections - slide over intro */}
      {detailSections.map(sectionView => {
        const shouldRender = currentView === sectionView || previousView === sectionView;
        if (!shouldRender) return null;

        const isCurrentAboutSub = aboutSubsections.includes(currentView);
        const isPreviousAboutSub = aboutSubsections.includes(previousView);
        const isAboutToAboutTransition = isCurrentAboutSub && isPreviousAboutSub;

        let animation = 'none';
        if (isAboutToAboutTransition && slideDirection !== 'out' && slideDirection !== 'from-bottom') {
          const isOutgoing = previousView === sectionView;
          const isIncoming = currentView === sectionView;
          if (isOutgoing) {
            animation = 'dissolveOut 0.5s ease-in-out forwards';
          } else if (isIncoming) {
            animation = 'dissolveIn 0.5s ease-in-out forwards';
          }
        } else if (!isAboutToAboutTransition) {
          const isSlidingOut = previousView === sectionView && slideDirection === 'out';
          const isSlidingIn = currentView === sectionView && slideDirection === 'from-bottom';
          if (isSlidingOut) {
            animation = 'slideDownToBottom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
          } else if (isSlidingIn) {
            animation = 'slideUpFromBottom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
          }
        }

        return (
          <div
            key={sectionView}
            className="absolute inset-0"
            style={{ zIndex: 10, animation, transform: 'translateY(0)' }}
          >
            {sectionView === 'about' && (
              <AboutSection
                showBanner={showBanner}
                hoveredSection={hoveredSection}
                setHoveredSection={setHoveredSection}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'about-philosophy' && (
              <AboutPhilosophySection
                showBanner={showBanner}
                shouldAnimateBanner={shouldAnimateBanner}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'about-objectives' && (
              <AboutObjectivesSection
                showBanner={showBanner}
                shouldAnimateBanner={shouldAnimateBanner}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'about-team' && (
              <AboutTeamSection
                showBanner={showBanner}
                shouldAnimateBanner={shouldAnimateBanner}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'about-infrastructure' && (
              <AboutInfrastructureSection
                showBanner={showBanner}
                shouldAnimateBanner={shouldAnimateBanner}
                selectedMachine={selectedMachine}
                setSelectedMachine={setSelectedMachine}
                onNavigate={handleViewChange}
                onTreatmentFinderClick={handleTreatmentFinderClick}
              />
            )}
            {sectionView === 'about-history' && (
              <AboutHistorySection
                showBanner={showBanner}
                shouldAnimateBanner={shouldAnimateBanner}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'who-detail' && (
              <WhoDetailSection
                showBanner={showBanner}
                hoveredAudience={hoveredAudience}
                setHoveredAudience={setHoveredAudience}
                onNavigate={handleViewChange}
              />
            )}
            {sectionView === 'what-detail' && (
              <WhatDetailSection
                showBanner={showBanner}
                hoveredCategory={hoveredCategory}
                setHoveredCategory={setHoveredCategory}
                onNavigate={handleViewChange}
                onTreatmentFinderClick={handleTreatmentFinderClick}
              />
            )}
            {sectionView === 'process-detail' && (
              <ProcessDetailSection
                showBanner={showBanner}
                hoveredProcessStep={hoveredProcessStep}
                setHoveredProcessStep={setHoveredProcessStep}
                selectedProcessVideo={selectedProcessVideo}
                setSelectedProcessVideo={setSelectedProcessVideo}
                onNavigate={handleViewChange}
                onTreatmentFinderClick={handleTreatmentFinderClick}
              />
            )}
          </div>
        );
      })}

      {/* Audience sections - slide over intro */}
      {audiences.map(audience => {
        const shouldRender = currentView === audience.id || previousView === audience.id;
        if (!shouldRender) return null;

        const isSlidingOut = previousView === audience.id && slideDirection === 'out';
        const isSlidingIn = slideDirection === 'from-bottom';
        const audienceWithBg = { ...audience, backgroundImage: assets[`${audience.id}-bg`] || audience.backgroundImage };

        return (
          <div
            key={audience.id}
            className="absolute inset-0"
            style={{
              zIndex: 10,
              animation: isSlidingOut ? 'slideDownToBottom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                         isSlidingIn ? 'slideUpFromBottom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                         'none',
              transform: 'translateY(0)'
            }}
          >
            <AudienceSection
              audience={audienceWithBg}
              showBanner={showBanner}
              videoPlaying={videoPlaying}
              toggleVideo={toggleVideo}
              selectedService={selectedService}
              selectedTechService={selectedTechService}
              isClosingCards={isClosingCards}
              isClosingVideo={isClosingVideo}
              isFirstVideoOpen={isFirstVideoOpen}
              lastTechService={lastTechService}
              showSubmenu={showSubmenu}
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
              onServiceSelect={handleServiceSelect}
              onTechServiceSelect={handleTechServiceSelect}
              onCarouselPrev={handleCarouselPrev}
              onCarouselNext={handleCarouselNext}
              onNavigate={handleViewChange}
            />
          </div>
        );
      })}

      {/* Treatment Finder Questionnaire Modal */}
      <TreatmentFinder
        show={showQuestionnaire}
        onClose={() => setShowQuestionnaire(false)}
        questionnaireStep={questionnaireStep}
        setQuestionnaireStep={setQuestionnaireStep}
        questionnaireAnswers={questionnaireAnswers}
        setQuestionnaireAnswers={setQuestionnaireAnswers}
        onStartCarousel={() => {
          setShowCarousel(true);
          setCurrentSlide(0);
        }}
        onReset={resetQuestionnaire}
      />

      {/* Personalized Journey Carousel Modal */}
      <Carousel
        show={showCarousel}
        onClose={() => {
          setShowCarousel(false);
          setCurrentSlide(0);
        }}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        questionnaireAnswers={questionnaireAnswers}
      />

    </div>
  );
}
