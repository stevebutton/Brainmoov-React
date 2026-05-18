import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Activity, Zap, Brain, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

const PANEL_W = 295;
const GAP = 10;
const STEP = PANEL_W + GAP;

const categoryIcons = [Activity, Zap, Brain, Sparkles, Activity, Zap, Brain, Sparkles, Activity, Zap];

const conditionIds = [
  'what-neurovisuel', 'what-visio-spatial', 'what-rythmicite', 'what-attention',
  'what-lacher-prise', 'what-schema-corporel', 'what-vestibulaire',
  'what-memorisation', 'what-fonctions-exec', 'what-equilibre',
];

// Fallback titles used only when CMS conditions are not yet populated
const titlePartsFallback = [
  'Neurovisuel',
  'Visio spatial',
  'Travail de la Rythmicité',
  "Travail de l'attention et de la concentration",
  'Travail du lâcher prise',
  'Perception du schéma corporel et locomoteur et de la tonicité axiale',
  'Travail vestibulaire',
  'Travail de mémorisation',
  'Entraînement des fonctions exécutives',
  "Entraînement des fonctions et de l'équilibre Autonomique",
];

// Canvas geometry (must match index.css #root dimensions)
const CANVAS_W = 1280;
const CANVAS_H = 720;
// Vertical position of carousel within the canvas (paddingTop + intro panel height + gap)
const CAROUSEL_TOP = 268;
const CAROUSEL_H = 340;

const WHAT_INTRO_FALLBACK = 'BrainMoove addresses a broad range of neurological and developmental conditions across all ages. From neurodevelopmental challenges and acquired brain injuries to neurological diseases and performance goals, our evidence-based interventions target the root causes of dysfunction. Each condition is approached with precision, using advanced diagnostics to guide personalized treatment.';

export default function WhatDetailSection({ showBanner, isExiting, onNavigate }) {
  const { content } = useContent();
  const wts = content?.whatSection;
  const whatHeading = wts?.heading || 'What';
  const whatHeadingItalic = wts?.headingItalic || 'We Treat';
  const whatIntro = wts?.intro || WHAT_INTRO_FALLBACK;

  // Build panels from CMS conditions (ordered by `order` field), falling back to hardcoded data
  const cmsConditions = content?.conditions || [];
  const conditionMap = {}
  cmsConditions.forEach(c => { conditionMap[c.id] = c })

  const allPanels = conditionIds.map((id, i) => {
    const cms = conditionMap[id]
    return {
      id,
      category: cms?.panelTitle || cms?.title || titlePartsFallback[i],
      description: cms?.panelDescription || null,
      image: cms?.panelImage || null,
    }
  })

  const titleParts = allPanels.map(p => p.category);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0, moved: false });

  const maxOffset = (allPanels.length - 1) * STEP;
  const currentIndex = Math.round(offset / STEP);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  const snapTo = (index) => {
    setOffset(Math.max(0, Math.min(allPanels.length - 1, index)) * STEP);
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    // Record which panel was pressed before pointer capture redirects events
    const panelEl = e.target.closest('[data-panel-idx]');
    const panelIdx = panelEl ? parseInt(panelEl.dataset.panelIdx) : -1;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offset, moved: false, panelIdx };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    // e.clientX is in viewport pixels; offset is in canvas pixels — divide by scale
    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
    const delta = (dragRef.current.startX - e.clientX) / scale;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    setOffset(Math.max(0, Math.min(maxOffset, dragRef.current.startOffset + delta)));
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    const { moved, panelIdx } = dragRef.current;
    dragRef.current.active = false;
    setIsDragging(false);
    snapTo(Math.round(offset / STEP));
    // Treat as a tap/click if no significant drag movement
    if (!moved && panelIdx >= 0) {
      onNavigate(conditionIds[panelIdx]);
    }
  };

  // Portal carousel: rendered into document.body so it escapes #root's overflow:hidden.
  // Positioned using --scale so it aligns precisely with the canvas.
  const portalCarousel = createPortal(
    <div
      style={{
        position: 'fixed',
        // Align top with where the carousel sits inside the canvas
        top: `calc(50vh + (${CAROUSEL_TOP - CANVAS_H / 2}px) * var(--scale, 1))`,
        left: 0,
        right: 0,
        height: `calc(${CAROUSEL_H}px * var(--scale, 1))`,
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      {/* Prev arrow */}
      <button
        onClick={() => snapTo(currentIndex - 1)}
        style={{
          position: 'absolute',
          left: `calc(50vw - ${CANVAS_W / 2 - 8}px * var(--scale, 1))`,
          top: `calc(100% + 12px * var(--scale, 1))`,
          zIndex: 10,
          opacity: canPrev ? 1 : 0,
          pointerEvents: canPrev ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          width: `calc(32px * var(--scale, 1))`,
          height: `calc(32px * var(--scale, 1))`,
        }}
        className="rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-md flex items-center justify-center hover:bg-white/90 transition-colors"
      >
        <ChevronLeft style={{ width: `calc(16px * var(--scale, 1))`, height: `calc(16px * var(--scale, 1))` }} className="text-slate-700" />
      </button>

      {/* Track — spans full viewport width, panels bleed past canvas edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: isDragging ? 'grabbing' : 'grab',
          // clip horizontally only — vertical overflow allows hover scale to show without clipping
          clipPath: 'inset(-1000px 0)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          style={{
            display: 'flex',
            gap: `calc(${GAP}px * var(--scale, 1))`,
            // Single transform handles both centering (35px inside canvas left edge) and scroll offset
            transform: `translateX(calc(50vw - ${CANVAS_W / 2 - 35 + offset}px * var(--scale, 1)))`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            userSelect: 'none',
            height: '100%',
          }}
        >
          {allPanels.map((panel, idx) => {
            const isHovered = hoveredCategory === idx;
            const Icon = categoryIcons[idx];
            const title = titleParts[idx];
            const { image, description } = panel;

            return (
              // Outer: owns layout size + stagger animation (transform via keyframes)
              <div
                key={idx}
                data-panel-idx={idx}
                className="flex-shrink-0"
                onMouseEnter={() => !dragRef.current.active && setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ cursor: 'pointer',
                  width: `calc(${PANEL_W}px * var(--scale, 1))`,
                  height: '100%',
                  zIndex: isHovered ? 2 : 1,
                  animation: isExiting
                    ? `slideOutDown 0.5s ease-in ${Math.min(idx, 3) * 0.05}s both`
                    : `introPanelUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + idx * 0.08}s both`,
                }}
              >
                {/* Inner: hover scale lives here — separate element so scale doesn't conflict with animation transform */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)',
                    backdropFilter: image ? 'none' : 'blur(16px)',
                    WebkitBackdropFilter: image ? 'none' : 'blur(16px)',
                    scale: isHovered ? '1.1' : '1',
                    transition: 'background-color 0.4s ease, scale 0.3s ease',
                    ...(image && {
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }),
                  }}
                >
                  {/* Gradient overlay when image is present */}
                  {image && <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)' }} />}
                  {/* Icon + Title — bottom anchored, slides up on hover */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(24px * var(--scale, 1))`,
                      right: `calc(24px * var(--scale, 1))`,
                      bottom: `calc(50px * var(--scale, 1))`,
                      transform: isHovered ? `translateY(calc(-70px * var(--scale, 1)))` : 'translateY(0)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    <Icon style={{ width: `calc(32px * var(--scale, 1))`, height: `calc(32px * var(--scale, 1))`, marginBottom: `calc(12px * var(--scale, 1))` }} className={image ? 'text-white/80' : 'text-slate-600'} />
                    <h2
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontStyle: 'italic',
                        fontSize: `calc(36px * var(--scale, 1))`,
                        lineHeight: 1.0,
                        color: image ? '#ffffff' : '#2C97BE',
                      }}
                      className="text-left"
                    >
                      {title}
                    </h2>

                    {/* Description — absolutely positioned below the title so it doesn't affect the container's height */}
                    {description && (
                      <p
                        style={{
                          position: 'absolute',
                          top: `calc(100% + 14px * var(--scale, 1))`,
                          left: 0,
                          right: 0,
                          fontSize: `calc(12px * var(--scale, 1))`,
                          lineHeight: 1.5,
                          opacity: isHovered ? 1 : 0,
                          transition: 'opacity 0.3s ease 0.15s',
                        }}
                        className={image ? 'text-white/90' : 'text-slate-700'}
                      >
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next arrow */}
      <button
        onClick={() => snapTo(currentIndex + 1)}
        style={{
          position: 'absolute',
          right: `calc(50vw - ${CANVAS_W / 2 - 8}px * var(--scale, 1))`,
          top: `calc(100% + 12px * var(--scale, 1))`,
          zIndex: 10,
          opacity: canNext ? 1 : 0,
          pointerEvents: canNext ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          width: `calc(32px * var(--scale, 1))`,
          height: `calc(32px * var(--scale, 1))`,
        }}
        className="rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-md flex items-center justify-center hover:bg-white/90 transition-colors"
      >
        <ChevronRight style={{ width: `calc(16px * var(--scale, 1))`, height: `calc(16px * var(--scale, 1))` }} className="text-slate-700" />
      </button>
    </div>,
    document.body
  );

  return (
    <div className="w-full h-full relative">

      {/* Intro Panel */}
      <div className="flex flex-col items-center gap-4 px-12" style={{ paddingTop: '100px', position: 'relative', zIndex: 1 }}>
        <div
          className="rounded-2xl border border-white/20 shadow-2xl"
          style={{
            width: 'fit-content',
            backgroundColor: 'rgba(255,255,255,0.30)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px 36px',
            animation: isExiting
              ? 'slideOutDown 0.5s ease-in 0.15s both'
              : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
          }}
        >
          <div className="flex items-center">
            <div style={{ paddingRight: '32px', flexShrink: 0 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '52px', lineHeight: 1.0, textAlign: 'right', whiteSpace: 'nowrap' }} className="text-slate-900">
                {whatHeading}<br />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>{whatHeadingItalic}</span>
              </h2>
            </div>
            <div style={{ width: '460px', paddingLeft: '32px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
              <RichText value={whatIntro} className="text-slate-700 text-sm leading-relaxed" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder to reserve vertical space where the portal carousel renders */}
      <div style={{ height: `${CAROUSEL_H}px`, marginTop: '16px' }} />

      {/* Portal carousel — rendered outside #root */}
      {portalCarousel}
    </div>
  );
}
