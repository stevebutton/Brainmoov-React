import { Heart, Brain, Activity, Sparkles, Target, Zap, Shield, Users } from 'lucide-react';

export const audiences = [
  {
    id: 'children',
    title: 'PROGRAMME ENFANTS & NOURRISSONS',
    icon: Heart,
    color: 'from-blue-500 to-cyan-500',
    intro: "We specialize in helping children overcome developmental challenges and reach their full potential. Our evidence-based functional neurology approach addresses the root causes of learning, attention, and coordination difficulties, providing your child with the foundation they need to thrive academically, socially, and physically.",
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

export const technicalServices = [
  { id: 'assessment', title: 'Initial Assessment', icon: Brain },
  { id: 'neurological', title: 'Neurological Testing', icon: Activity },
  { id: 'treatment', title: 'Treatment Planning', icon: Target },
  { id: 'monitoring', title: 'Progress Monitoring', icon: Sparkles },
  { id: 'followup', title: 'Follow-up Care', icon: Shield }
];

export const conditionsData = [
  {
    category: 'Neurodevelopmental Challenges',
    conditions: ["AD/HD", "Mild Autism", "Asperger's", "Dyslexia", "Dyspraxia", "Cerebral Palsy", "Sensory Processing Disorder", "Dysautonomia type POTS"]
  },
  {
    category: 'Acquired Brain Injuries',
    conditions: ["Concussion", "TBI", "Hypoxia", "Non-Fatal Drowning Injuries", "Birthing Injuries", "Post-Surgical Injuries", "Stroke Injuries"]
  },
  {
    category: 'Neurological Diseases & Disorders',
    conditions: ["Parkinson's Disease", "Essential Tremors", "Multiple Sclerosis", "Primary Headaches/Migraines", "Vestibular Disorders", "Early Dementias and Alzheimer's", "Dysexecutive Syndrome", "Cognitive Impairment", "Ataxia", "Dystonia"]
  },
  {
    category: 'Health & Performance Wishes',
    conditions: ["Sports Vision Training", "Performance Optimization", "Agility Training", "Cognitive Enhancement", "Graceful Aging", "Executive Performance", "Better Sleep", "Stress Management", "Improved Energy"]
  }
];

export const machines = [
  {
    title: "Technology and Equipment",
    description: "Functional neurology, indeed, sometimes requires in its general process using some high-technology devices, reliable and accurate."
  },
  {
    title: "Gyrostim",
    description: "Decades of clinical and laboratory research have demonstrated the physiological and neurological benefits resulting from an appropriate vestibular stimulation, one of the most important ones in the nervous system. Recent data tell us that accurate and targeted stimulations of the vestibular system can help some symptoms related to conditions as diverse as concussions, traumatic brain injuries, autism, Parkinson and Alzheimer diseases, cerebral palsy and several other neurological disorders."
  },
  {
    title: "Vibramoov",
    description: "The Vibramoov system applies Functional Proprioceptive Stimulation to preserve the sensory and motor functions of the patient even when movement is impossible. A number of electromechanical actuators are placed as shown in the adjacent images. Programmed sequences stimulate the nervous system with sensory information which is identical to that which occurs in normal movement."
  },
  {
    title: "Force Platform",
    description: "Fall incidents are the main causes of visits to the emergency department with a prevalence in the under-16 age group (football, hockey, gymnastics, etc.) and in the 65+ age group. They are common and dangerous, but predictable. Most of those at risk do not know it and are often asymptomatic until it is too late. Health experts are unanimous: routine tests, evaluation and treatment are absolutely necessary for the prevention of falls."
  },
  {
    title: "Interactive Metronome",
    description: "The interactive metronome is a treatment which improves the timing and speed of the messages between different areas of the brain. Thanks to the improvement of these two crucial aspects, the central nervous system becomes much more efficient and can considerably improve several malfunctions, like attention deficit disorder/hyperactivity, autism, dyslexia, impaired memory, motor skill disorders, cranial traumas, etc."
  },
  {
    title: "TOVA",
    description: "The overall balance (which can last between 1 and 2 hours) is complemented by the TOVA (Test of Variables of Attention). It is so far the only objective tool to quantify attention deficiency."
  },
  {
    title: "VNG",
    description: "The videonystagmography is a technique allowing a very accurate exploration of oculomotor functions. Via these, it is possible to obtain information both about the functioning of the vestibular system and the brain function. This device provides an aid in the diagnosis of neurological and psychiatric diseases, such as parkinsonian syndromes, multiple sclerosis, or reading disorders. The process is not painful, does not require the use of any drug and takes only a few minutes to be executed. The data collected by the practitioner provide invaluable input and are very useful in the development of the treatment plan."
  },
  {
    title: "Brainport",
    description: "The BrainPort is an improvement on the first visuotactile sensory substitution system created by Paul-Bach-Y-Rita in 1963. It is used at the center CRNFC in St-Malo as part of the rehabilitation of some balance disorders."
  },
  {
    title: "NeuroFeedBack",
    description: "Neurofeedback (NF), also called neurobiofeedback, is a type of biofeedback that uses real-time display of brain activity, notably via electroencephalography (EEG) and the measurement of slow brain waves. Visualizing this activity allows the patient to learn and self-regulate in managing certain emotions and improving concentration. This method is non-invasive and drug-free."
  }
];
