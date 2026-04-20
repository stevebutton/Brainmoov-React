# BrainMoove React Project

## Stack
- React 18.3, Vite 5, Tailwind CSS 3.4, Lucide React
- `npm run dev` → http://localhost:3000

## Source of Truth
`REFERENCE-original-implementation.html` — original 247KB single-file HTML prototype (~3625 lines). All components were extracted from this file.

## Project Structure

```
src/
├── App.jsx                          # Root — all state, routing, transitions
├── main.jsx
├── index.css
├── context/
│   └── AssetContext.jsx             # Runtime asset/image management
├── components/
│   ├── Banner.jsx                   # Persistent top nav overlay
│   └── TreatmentFinder/
│       ├── index.jsx                # Questionnaire modal
│       └── Carousel.jsx             # Personalized journey carousel
├── pages/
│   ├── IntroPage.jsx                # Landing / home screen
│   ├── AudienceSection.jsx          # children / adults / seniors views
│   ├── AboutSection.jsx             # About landing
│   ├── AboutPhilosophySection.jsx
│   ├── AboutObjectivesSection.jsx
│   ├── AboutTeamSection.jsx
│   ├── AboutInfrastructureSection.jsx
│   ├── AboutHistorySection.jsx
│   ├── WhoDetailSection.jsx
│   ├── WhatDetailSection.jsx
│   ├── ProcessDetailSection.jsx
│   ├── TreatmentFinderApp.jsx
│   └── AssetManager.jsx
└── utils/
    └── recommendations.js
```

## Architecture

### Routing
- State-based via `currentView` in App.jsx (not React Router)
- Valid sections: `intro`, `children`, `adults`, `seniors`, `about`, `about-philosophy`, `about-objectives`, `about-team`, `about-infrastructure`, `about-history`, `who-detail`, `what-detail`, `process-detail`
- URL param `?section=X` sets initial view

### Transitions
- CSS keyframe animations: `slideUpFromBottom`, `slideDownToBottom` (2s), `dissolveIn/Out` (0.5s for about→about)
- `previousView` tracked to render both outgoing and incoming panels simultaneously
- Banner is a persistent overlay (not part of page components)

### Communication
- **BroadcastChannel** (`brainmoove`): Treatment Finder → Main App (audience selection after questionnaire)
- **postMessage**: Framer ↔ React bidirectional navigation (`brainmoove:navigate` in, `brainmoove:sectionChange` out)

### Asset Management
- `AssetContext` provides a runtime asset map (allows images to be swapped without code changes)
- Audience background images fall back to hardcoded URLs if not in asset map

### State (all in App.jsx)
- `currentView` / `previousView` — routing
- `transitioning` / `slideDirection` — animation control
- `selectedService` / `selectedTechService` — cards/video panel state
- `selectedMachine` / `infraCarouselIndex` — infrastructure section
- `showQuestionnaire` / `showCarousel` — Treatment Finder modals
- `questionnaireStep` / `questionnaireAnswers` — questionnaire state
- `showBanner` / `shouldAnimateBanner` / `showSubmenu` — banner timing

## Key Patterns
- Prop drilling (intentional — Context API only used for assets)
- Components receive `onNavigate` callback for view changes
- Videos autoplay/loop/muted inline (background atmosphere)
- Glassmorphism: `bg-white/10 backdrop-blur-md`
- Color palette: black bg, white text, purple-600/blue-600 accents
