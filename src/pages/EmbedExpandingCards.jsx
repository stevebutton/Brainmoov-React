import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

const GAP = 16;
const DEFAULT_W = 400;
const EXPANDED_W = 600;
const COLLAPSED_W = 300;
const CARD_H = 500;
const PANEL_H = CARD_H * 0.5; // blue panel = 50% card height

const FALLBACK_CARDS = [
  { id: 1, title: 'Programme One',   subtitle: 'Who We Work With', description: 'Overview text appears here on hover.', intro: null, image: null },
  { id: 2, title: 'Programme Two',   subtitle: 'Who We Work With', description: 'Overview text appears here on hover.', intro: null, image: null },
  { id: 3, title: 'Programme Three', subtitle: 'Who We Work With', description: 'Overview text appears here on hover.', intro: null, image: null },
];

export default function EmbedExpandingCards() {
  const { content } = useContent();
  const [hoveredId, setHoveredId]   = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Read from audiences in fixed order: children → adults → seniors
  const audiences = content?.audiences || [];
  const AUDIENCE_ORDER = ['children', 'adults', 'seniors'];
  const audienceMap = {};
  audiences.forEach(a => { audienceMap[a.id] = a; });
  const ordered = AUDIENCE_ORDER.map(id => audienceMap[id]).filter(Boolean);
  const cards = ordered.length >= 1
    ? ordered.map((a, i) => ({
        id: i + 1,
        title: a.title,
        subtitle: 'Who We Work With',
        description: a.overview || '',
        intro: a.intro || null,
        image: a.backgroundImage || null,
      }))
    : FALLBACK_CARDS;

  const getWidth = (id) => {
    if (activeId === id) return EXPANDED_W;
    if (activeId !== null) return COLLAPSED_W;
    if (hoveredId === null) return DEFAULT_W;
    return hoveredId === id ? EXPANDED_W : COLLAPSED_W;
  };

  const handleCardClick = (id) => {
    if (activeId === id) return;
    setActiveId(id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActiveId(null);
  };

  return (
    <div style={{ width: '100%', minHeight: `${CARD_H + 80}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0', background: 'white' }}>
      <style>{`
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ display: 'flex', gap: `${GAP}px` }}>
        {cards.map(card => {
          const isExpanded = hoveredId === card.id && activeId === null;
          const isActive   = activeId === card.id;

          return (
            <div
              key={card.id}
              style={{
                width: `${getWidth(card.id)}px`,
                height: `${CARD_H}px`,
                borderRadius: '20px',
                background: card.image ? 'none' : 'linear-gradient(135deg, #2C97BE 0%, #1a6e8e 100%)',
                animation: `cardSlideIn 2s cubic-bezier(0.4, 0, 0.2, 1) ${(card.id - 1) * 0.2}s both`,
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                overflow: 'hidden',
                cursor: isActive ? 'default' : 'pointer',
                position: 'relative',
                flexShrink: 0,
                boxShadow: (isExpanded || isActive)
                  ? '0 20px 60px rgba(0,0,0,0.25)'
                  : '0 8px 24px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={() => !isActive && setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Background image */}
              {card.image && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  width: `${EXPANDED_W}px`, height: '100%',
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: (isExpanded || isActive)
                    ? 'translateX(-50%) scale(1.1)'
                    : 'translateX(-50%) scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
              )}

              {/* Gradient overlay */}
              {card.image && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)',
                }} />
              )}

              {/* ── TITLE (floats above blue panel when active, lifts on hover) ── */}
              <div style={{
                position: 'absolute',
                left: '28px', right: '28px',
                bottom: isActive ? `${PANEL_H + 20}px` : '50px',
                transform: isExpanded && !isActive ? 'translateY(-90px)' : 'translateY(0)',
                transition: 'bottom 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.05s, transform 0.4s ease',
                zIndex: 2,
              }}>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                  marginBottom: '6px', whiteSpace: 'nowrap',
                  opacity: (isExpanded || isActive) ? 1 : 0,
                  transform: (isExpanded || isActive) ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s',
                }}>
                  {card.subtitle}
                </p>
                <h2 style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                  fontSize: '52px', lineHeight: 1.05, color: '#ffffff',
                  wordBreak: 'break-word', overflowWrap: 'break-word',
                }}>
                  {card.title}
                </h2>

                {/* Overview — appears below title as it lifts on hover */}
                {card.description && (
                  <p style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: 0,
                    width: `${EXPANDED_W / 2}px`,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '17px', lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.85)',
                    opacity: isExpanded && !isActive ? 1 : 0,
                    transition: 'opacity 0.35s ease 0.3s',
                  }}>
                    {card.description}
                  </p>
                )}
              </div>

              {/* ── BLUE SLIDESHOW PANEL ── */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: `${PANEL_H}px`,
                backgroundColor: '#2C97BE',
                transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0s',
                zIndex: 3,
                display: 'flex', flexDirection: 'column',
                padding: '24px 68px 16px 28px',
              }}>

                {/* Content — slides in from right */}
                <div style={{
                  flex: 1, overflowY: 'auto',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(40px)',
                  transition: 'opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s',
                }}>
                  {card.intro
                    ? <RichText value={card.intro} className="text-white/90 text-base leading-relaxed" />
                    : <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>Content coming soon.</p>
                  }
                </div>

                {/* Close button */}
                <div style={{
                  flexShrink: 0, paddingTop: '12px', textAlign: 'right',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.3s ease 0.45s, transform 0.3s ease 0.45s',
                }}>
                  <button
                    onClick={handleClose}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    close
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
