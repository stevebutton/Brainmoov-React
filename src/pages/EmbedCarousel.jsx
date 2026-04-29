import { useState, useRef } from 'react';
import { Activity, Zap, Brain, Sparkles, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

const PANEL_W = 400;
const PANEL_H = 500;
const GAP = 40;
const STEP = PANEL_W + GAP;

const categoryIcons = [Activity, Zap, Brain, Sparkles, Activity, Zap, Brain, Sparkles, Activity, Zap];

const conditionIds = [
  'what-neurovisuel', 'what-visio-spatial', 'what-rythmicite', 'what-attention',
  'what-lacher-prise', 'what-schema-corporel', 'what-vestibulaire',
  'what-memorisation', 'what-fonctions-exec', 'what-equilibre',
];

const titlesFallback = [
  'Neurovisuel', 'Visio spatial', 'Travail de la Rythmicité',
  "Travail de l'attention et de la concentration", 'Travail du lâcher prise',
  'Perception du schéma corporel et locomoteur et de la tonicité axiale',
  'Travail vestibulaire', 'Travail de mémorisation',
  'Entraînement des fonctions exécutives',
  "Entraînement des fonctions et de l'équilibre Autonomique",
];

export default function EmbedCarousel() {
  const { content } = useContent();
  const cmsConditions = content?.conditions || [];
  const conditionMap = {};
  cmsConditions.forEach(c => { conditionMap[c.id] = c; });

  const panels = conditionIds.map((id, i) => {
    const cms = conditionMap[id];
    return {
      id,
      category: cms?.panelTitle || cms?.title || titlesFallback[i],
      description: cms?.panelDescription || null,
      intro: cms?.intro || null,
      image: cms?.panelImage || null,
    };
  });

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [flippedIdx, setFlippedIdx] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0, moved: false, panelIdx: -1 });

  const maxOffset = (panels.length - 1) * STEP;
  const currentIndex = Math.round(offset / STEP);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  const snapTo = (index) => {
    setOffset(Math.max(0, Math.min(panels.length - 1, index)) * STEP);
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    const panelEl = e.target.closest('[data-panel-idx]');
    const panelIdx = panelEl ? parseInt(panelEl.dataset.panelIdx) : -1;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offset, moved: false, panelIdx };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    const delta = dragRef.current.startX - e.clientX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    setOffset(Math.max(0, Math.min(maxOffset, dragRef.current.startOffset + delta)));
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    const { moved, panelIdx } = dragRef.current;
    dragRef.current.active = false;
    setIsDragging(false);
    snapTo(Math.round(offset / STEP));
    if (!moved && panelIdx >= 0) {
      setFlippedIdx(prev => prev === panelIdx ? null : panelIdx);
    }
  };

  const FACE_H = PANEL_H - 32;

  return (
    <div style={{ width: '100%', background: 'white' }}>

      {/* Track */}
      <div
        style={{ position: 'relative', cursor: isDragging ? 'grabbing' : 'grab', clipPath: 'inset(-80px 0)', height: `${PANEL_H + 32}px`, overflow: 'hidden' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          style={{
            display: 'flex', gap: `${GAP}px`, height: `${PANEL_H}px`,
            padding: '40px 0 16px 0',
            transform: `translateX(calc(48px - ${offset}px))`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            userSelect: 'none',
          }}
        >
          {panels.map((panel, idx) => {
            const isHovered = hoveredIdx === idx;
            const isFlipped = flippedIdx === idx;
            const Icon = categoryIcons[idx];

            return (
              <div
                key={idx}
                data-panel-idx={idx}
                style={{ flexShrink: 0, width: `${PANEL_W}px`, height: `${FACE_H}px`, cursor: 'pointer', perspective: '1200px' }}
                onMouseEnter={() => !dragRef.current.active && !isFlipped && setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Flip container */}
                <div style={{
                  width: '100%', height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  scale: isHovered ? '1.1' : '1',
                  transitionProperty: 'transform, scale',
                  transitionDuration: '0.6s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), ease',
                }}>

                  {/* FRONT FACE */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: panel.image ? 'none' : 'blur(12px)',
                    WebkitBackdropFilter: panel.image ? 'none' : 'blur(12px)',
                    transition: 'background-color 0.3s ease',
                    ...(panel.image && {
                      backgroundImage: `url(${panel.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }),
                  }}>
                    {panel.image && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)',
                      }} />
                    )}

                    {/* Icon + title */}
                    <div style={{
                      position: 'absolute', left: '20px', right: '20px', bottom: '40px',
                      transform: isHovered ? 'translateY(-60px)' : 'translateY(0)',
                      transition: 'transform 0.4s ease',
                    }}>
                      <Icon
                        style={{ width: '28px', height: '28px', marginBottom: '10px' }}
                        className={panel.image ? 'text-white/80' : 'text-slate-500'}
                      />
                      <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontStyle: 'italic', fontSize: '42px', lineHeight: 1.0,
                        color: panel.image ? '#ffffff' : '#2C97BE',
                      }}>
                        {panel.category}
                      </h2>

                      {panel.description && (
                        <p style={{
                          position: 'absolute', top: 'calc(100% + 12px)', left: 0, right: 0,
                          fontSize: '15px', lineHeight: 1.5,
                          opacity: isHovered ? 1 : 0,
                          transition: 'opacity 0.3s ease 0.15s',
                          color: panel.image ? 'rgba(255,255,255,0.9)' : '#475569',
                        }}>
                          {panel.description}
                        </p>
                      )}
                    </div>

                    {/* Tap hint */}
                    <div style={{
                      position: 'absolute', bottom: '14px', right: '16px',
                      opacity: isHovered ? 0.5 : 0,
                      transition: 'opacity 0.3s ease',
                      fontSize: '11px', color: panel.image ? 'white' : '#64748b',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      tap to learn more
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#2C97BE',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    {/* Back header */}
                    <div style={{ padding: '28px 28px 16px', borderBottom: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                      <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontStyle: 'italic', fontSize: '32px', lineHeight: 1.0,
                        color: '#ffffff',
                      }}>
                        {panel.category}
                      </h2>
                    </div>

                    {/* Intro text */}
                    <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto' }}>
                      {panel.intro
                        ? <RichText value={panel.intro} className="text-white/90 text-sm leading-relaxed" />
                        : <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6 }}>No description available.</p>
                      }
                    </div>

                    {/* Flip back button */}
                    <div style={{ padding: '12px 28px 20px', flexShrink: 0 }}>
                      <button
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          color: 'rgba(255,255,255,0.7)', fontSize: '12px', cursor: 'pointer',
                          background: 'none', border: 'none', padding: 0,
                        }}
                      >
                        <RotateCcw style={{ width: '14px', height: '14px' }} />
                        tap to flip back
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows below track */}
      <div style={{
        width: '400px', maxWidth: '100%', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        padding: '16px 8px 8px',
      }}>
        <button
          onClick={() => snapTo(currentIndex - 1)}
          style={{
            width: '48px', height: '48px',
            opacity: canPrev ? 1 : 0, pointerEvents: canPrev ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', background: 'rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer',
          }}
        >
          <ChevronLeft style={{ width: '28px', height: '28px', color: '#334155' }} />
        </button>
        <button
          onClick={() => snapTo(currentIndex + 1)}
          style={{
            width: '48px', height: '48px',
            opacity: canNext ? 1 : 0, pointerEvents: canNext ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', background: 'rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer',
          }}
        >
          <ChevronRight style={{ width: '28px', height: '28px', color: '#334155' }} />
        </button>
      </div>

    </div>
  );
}
