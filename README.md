# BrainMoove Interface - React Project

Functional Brain Rehabilitation Center digital interface prototype.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will start at `http://localhost:3000`

## 📁 Project Structure

```
brainmoove-interface/
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── index.html             # HTML entry point
├── src/
│   ├── main.jsx           # React entry point
│   ├── index.css          # Global styles with Tailwind
│   ├── App.jsx            # Main application component
│   ├── components/        # Reusable components
│   │   ├── Banner.jsx
│   │   ├── TreatmentFinder/
│   │   │   ├── index.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Questionnaire.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Carousel.jsx
│   │   ├── InfrastructureCarousel.jsx
│   │   ├── ProcessSteps.jsx
│   │   └── icons/         # Icon components
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── WhatIsBrainMoove.jsx
│   │   ├── WhoWeTreat.jsx
│   │   ├── WhatWeTreat.jsx
│   │   └── TreatmentProcess.jsx
│   └── utils/             # Utility functions
│       └── recommendations.js
└── public/                # Static assets
    └── assets/
        └── logo.jpg
```

## 🔄 Migration Status

**Current State:** Project structure is set up with configuration files.

**Next Steps for Claude Code:**

### 1. Extract Components from HTML File

The current implementation is in a single HTML file (`rehab-center-interface.html`). This needs to be split into modular React components.

**Priority Components to Extract:**

- **src/App.jsx** - Main component with routing logic and state management
- **src/components/Banner.jsx** - Navigation banner component
- **src/components/TreatmentFinder/** - Complete Treatment Finder system:
  - LandingPage.jsx (Step 0)
  - Questionnaire.jsx (Steps 1-4)
  - Results.jsx (Step 5)
  - Carousel.jsx (Guided tour)
- **src/components/InfrastructureCarousel.jsx** - 9-machine carousel
- **src/components/ProcessSteps.jsx** - 5-step treatment process
- **src/components/icons/** - All icon components (Activity, Zap, Brain, etc.)
- **src/pages/** - HomePage, WhatIsBrainMoove, WhoWeTreat, WhatWeTreat, TreatmentProcess

### 2. State Management

Current state is managed with React hooks. Consider:
- Keep useState for now (works well)
- Add Context API if state sharing becomes complex
- Consider Zustand for more complex state later

### 3. Recommendation Engine

Extract the Treatment Finder logic into:
- `src/utils/recommendations.js` - Symptom→Technology mapping, Reason→Service mapping

### 4. Assets

Place the BrainMoove logo in:
- `public/assets/logo.jpg`
- Reference as: `/assets/logo.jpg`

## 🎨 Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Glassmorphism theme** - Already implemented
- All styles are inline Tailwind classes

## 📦 Dependencies

### Core
- React 18.3.1
- React DOM 18.3.1
- Lucide React (icons)

### Build Tools
- Vite 5.x (fast build tool)
- Tailwind CSS 3.4
- PostCSS & Autoprefixer

## 🛠️ Development Notes

### Component Extraction Guidelines

When extracting components from the HTML file:

1. **Preserve all state logic** - useState, useEffect hooks
2. **Keep prop drilling minimal** - Use composition
3. **Maintain existing transitions** - All dissolve/slide animations
4. **Preserve storage API** - Treatment Finder uses window.storage
5. **Keep navigation logic** - Page transitions work

### Key Features to Preserve

- ✅ Treatment Finder questionnaire (4 questions + landing page)
- ✅ Personalized carousel with dynamic slide generation
- ✅ Infrastructure carousel (9 technologies)
- ✅ Process steps with hover/click interactions
- ✅ About sections with smooth transitions
- ✅ Banner navigation system
- ✅ All modal interactions

### CSS Patterns

The project uses these Tailwind patterns:
- Glassmorphism: `bg-white/10 backdrop-blur-md`
- Gradients: `bg-gradient-to-r from-purple-600 to-blue-600`
- Transitions: `transition-all duration-300`
- Hover states: `hover:scale-105`

## 📝 Current HTML Reference

The complete working implementation is in `rehab-center-interface.html`. Use this as the source of truth when extracting components.

**Important Implementation Details:**

1. **Treatment Finder Storage**: Uses persistent storage API
   ```javascript
   await window.storage.set('key', value);
   await window.storage.get('key');
   ```

2. **Page Transitions**: Uses CSS transitions, not React Router
   ```javascript
   setCurrentPage('newPage');
   // Transitions handled by CSS
   ```

3. **Carousel Navigation**: Dynamic slide generation
   ```javascript
   const generateCarouselSlides = () => {
     // Creates 6-10 slides based on questionnaire answers
   }
   ```

## 🎯 Recommended Workflow for Claude Code

1. **Phase 1: Core Structure**
   - Extract App.jsx with main state
   - Create page components (HomePage, etc.)
   - Set up basic routing/navigation

2. **Phase 2: Major Components**
   - Extract Treatment Finder (most complex)
   - Extract Infrastructure Carousel
   - Extract Process Steps

3. **Phase 3: Polish**
   - Extract all icon components
   - Clean up imports
   - Optimize performance
   - Add PropTypes or TypeScript

## 🚧 Known Considerations

- No router currently (uses state-based page switching)
- Consider adding React Router for URL support
- Storage API is custom - may need backend integration later
- All video content currently uses placeholders

## 📞 Support

For questions about the original prototype structure, refer to:
- `brainmoove-prototype-walkthrough.docx` - Complete documentation
- `treatment-finder-guide.docx` - Treatment Finder detailed guide

## 🔐 License

Proprietary - BrainMoove Client Project
