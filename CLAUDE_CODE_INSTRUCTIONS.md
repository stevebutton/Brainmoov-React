# Instructions for Claude Code

## 🎯 Task: Extract Components from HTML to React

You have a working prototype in `REFERENCE-original-implementation.html` (247KB, single file with React via CDN). Your job is to convert this to a proper modular React project.

## 📋 Step-by-Step Extraction Plan

### Step 1: Understand the Current Structure

The HTML file contains:
- ~3,625 lines of code
- One large `RehabCenterInterface` component
- Multiple nested components defined inline
- State management with React hooks
- Tailwind CSS classes throughout

**Key state variables to preserve:**
```javascript
const [currentPage, setCurrentPage] = useState('home')
const [showQuestionnaire, setShowQuestionnaire] = useState(false)
const [questionnaireStep, setQuestionnaireStep] = useState(0)
const [showCarousel, setShowCarousel] = useState(false)
const [currentSlide, setCurrentSlide] = useState(0)
// ... and many more
```

### Step 2: Extract Icon Components First

**Location in HTML:** Lines ~150-400 (after the main component declaration)

Create `src/components/icons/` with these files:
- `X.jsx` - Close icon
- `ChevronRight.jsx`
- `ChevronLeft.jsx`
- `ChevronDown.jsx`  
- `Users.jsx`
- `Activity.jsx`
- `Zap.jsx`
- `Brain.jsx`
- `Sparkles.jsx`
- `Eye.jsx` - VNG display icon
- `Clipboard.jsx`
- `FileText.jsx`
- `TrendingUp.jsx`
- `Disc.jsx`
- `Download.jsx`
- `Calendar.jsx`

**Pattern for each icon:**
```javascript
export default function IconName({ className }) {
  return (
    <svg className={className} /* svg props */>
      {/* paths */}
    </svg>
  )
}
```

### Step 3: Extract Banner Component

**Search for:** "Banner with page title, menu, and treatment finder button"

Create `src/components/Banner.jsx`:
```javascript
export default function Banner({ 
  currentPage, 
  setCurrentPage, 
  aboutSubsection,
  setShowQuestionnaire 
}) {
  // Extract the banner JSX and logic
}
```

### Step 4: Extract Treatment Finder System

This is the most complex part. Create folder structure:

```
src/components/TreatmentFinder/
├── index.jsx              # Main container
├── LandingPage.jsx        # Step 0
├── Questionnaire.jsx      # Steps 1-4
├── Results.jsx            # Step 5
├── Carousel.jsx           # Guided tour
└── utils.js               # Recommendation engine
```

**Key functions to extract:**

1. **Recommendation Engine** → `utils.js`
```javascript
export function getRecommendations(answers) {
  // Extract the symptom→technology mapping
  // Extract the reason→service mapping
  // Return: { recommendedServices, recommendedTechnologies, primaryMessage }
}
```

2. **Carousel Slide Generator** → `Carousel.jsx`
```javascript
function generateCarouselSlides(questionnaireAnswers) {
  // Creates 6-10 slides based on answers
  // Returns array of slide objects
}
```

**Search patterns:**
- Landing page: `questionnaireStep === 0`
- Questions: `questionnaireStep === 1` through `questionnaireStep === 4`
- Results: `questionnaireStep === 5`
- Carousel: `showCarousel && (() =>`

### Step 5: Extract Page Components

Create `src/pages/` with these files:

**HomePage.jsx**
- Search for: `currentPage === 'home'`
- Extract the 4 main buttons layout

**WhatIsBrainMoove.jsx**
- Search for: `currentPage === 'what-is-brainmoove'`
- Includes 5 pillars + 5 subsections
- Complex subsection navigation

**WhoWeTreat.jsx**
- Search for: `currentPage === 'who-we-treat'`
- Three audience cards

**WhatWeTreat.jsx**
- Search for: `currentPage === 'what-we-treat'`
- 5-column layout

**TreatmentProcess.jsx**
- Search for: `currentPage === 'our-infrastructure'`
- 5 process steps with hover/click

### Step 6: Extract Infrastructure Carousel

Create `src/components/InfrastructureCarousel.jsx`

**Search for:** "Infrastructure carousel with 9 machines"

This component handles:
- 9 technology buttons
- Split-panel display
- Video placeholders
- Machine descriptions

### Step 7: Create Main App.jsx

```javascript
import { useState } from 'react'
import Banner from './components/Banner'
import TreatmentFinder from './components/TreatmentFinder'
import HomePage from './pages/HomePage'
import WhatIsBrainMoove from './pages/WhatIsBrainMoove'
// ... import other pages

export default function App() {
  // Move all state from RehabCenterInterface here
  const [currentPage, setCurrentPage] = useState('home')
  // ... all other state variables
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Logo */}
      <div className="fixed bottom-4 left-4 z-50">
        <img src="/assets/logo.jpg" />
      </div>
      
      {/* Banner (conditionally rendered) */}
      {currentPage !== 'home' && (
        <Banner currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      
      {/* Page routing */}
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'what-is-brainmoove' && <WhatIsBrainMoove />}
      {/* ... other pages */}
      
      {/* Treatment Finder Modal */}
      {showQuestionnaire && (
        <TreatmentFinder 
          show={showQuestionnaire}
          onClose={() => setShowQuestionnaire(false)}
        />
      )}
      
      {/* About Prototype Modal */}
      {/* ... other modals */}
    </div>
  )
}
```

## 🔍 Search Patterns to Help Extraction

Use these patterns to find code sections:

```javascript
// Finding specific components
/currentPage === 'home'/
/currentPage === 'what-is-brainmoove'/
/questionnaireStep === 0/
/showCarousel && \(\(\) =>/

// Finding state declarations
/const \[.*useState/

// Finding icon definitions
/function (.*?)\({ className }\)/
```

## ⚠️ Important Implementation Notes

### 1. Storage API
The Treatment Finder uses a custom storage API:
```javascript
await window.storage.set('key', value)
await window.storage.get('key')
```
**Keep this as-is** - it's provided by the artifact environment.

### 2. Transitions
CSS-based transitions, not React Router:
```javascript
// Page changes trigger CSS transitions
setCurrentPage('new-page')
// The transition is handled by CSS classes
```

### 3. Carousel Slide Generation
The carousel dynamically generates 6-10 slides based on questionnaire answers:
- Welcome slide (always)
- Situation slide (always)
- 2-5 service slides (based on reason)
- 2-6 technology slides (based on symptoms)
- Timeline slide (always)
- CTA slide (always)

### 4. Prop Drilling vs Context
For now, **use prop drilling**. The structure is:
```
App
├─ Banner (needs: currentPage, setCurrentPage, setShowQuestionnaire)
├─ Pages (need: setCurrentPage, setState functions)
└─ Modals (need: show, onClose, state setters)
```

Consider Context API later if prop drilling becomes unwieldy.

## ✅ Testing Each Component

After extracting each component:

1. **Import it into App.jsx**
2. **Test in browser** - `npm run dev`
3. **Verify all interactions work**
4. **Check console for errors**
5. **Ensure styling looks identical**

## 📊 Progress Tracking

Create a checklist as you go:

- [ ] Icon components extracted (16 icons)
- [ ] Banner component extracted
- [ ] HomePage extracted
- [ ] WhatIsBrainMoove extracted
- [ ] WhoWeTreat extracted
- [ ] WhatWeTreat extracted
- [ ] TreatmentProcess extracted
- [ ] Infrastructure Carousel extracted
- [ ] Treatment Finder - Landing Page
- [ ] Treatment Finder - Questionnaire
- [ ] Treatment Finder - Results
- [ ] Treatment Finder - Carousel
- [ ] Treatment Finder - Utils/Recommendation Engine
- [ ] About Prototype Modal
- [ ] All state properly lifted to App
- [ ] All interactions working
- [ ] No console errors
- [ ] Styling matches original

## 🎨 Styling Notes

**Keep all Tailwind classes as-is:**
- Glassmorphism: `bg-white/10 backdrop-blur-md`
- Gradients: `bg-gradient-to-r from-purple-600 to-blue-600`
- Transitions: `transition-all duration-300 ease-in-out`
- Hover effects: `hover:scale-105 hover:bg-white/20`

**Color palette:**
- Background: `bg-black`
- Text: `text-white` or `text-slate-X00`
- Accents: Purple (`purple-600`) and Blue (`blue-600`)
- Glassmorphism overlays: `bg-white/10`

## 🚀 Quick Start Command

```bash
npm install
npm run dev
```

Browser should open to `http://localhost:3000`

## 💡 Tips for Success

1. **Extract incrementally** - Don't try to do everything at once
2. **Test frequently** - Check in browser after each component
3. **Keep the HTML file open** - Reference it constantly
4. **Preserve all className strings** - Styling is critical
5. **Maintain state structure** - Don't change useState declarations
6. **Copy comments** - They provide context

## 📝 File Reference

- `REFERENCE-original-implementation.html` - The source of truth (247KB)
- `README.md` - Project overview and structure
- This file - Detailed extraction instructions

Good luck! The hardest parts are:
1. Treatment Finder (most complex state)
2. WhatIsBrainMoove (subsection navigation)
3. Infrastructure Carousel (complex interactions)

Take your time and test thoroughly after each extraction.
