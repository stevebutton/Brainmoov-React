import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';
import { machines as fallbackMachines } from '../data/index';

const GAP = 16;
const DEFAULT_W = 350;
const EXPANDED_W = 550;
const COLLAPSED_W = 250;
const CARD_H = 350;
const PANEL_H = Math.round(CARD_H * 0.5);

export default function EmbedInfrastructureGrid() {
  const { content } = useContent();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const allMachines = content?.machines || fallbackMachines;
  const introMachine = allMachines[0];
  const instruments = allMachines.slice(1, 8); // 7 instruments

  // 3 rows × 3 slots. Slot IDs: 'intro', 0–6, 'empty'
  const rows = [
    ['intro', 0, 1],
    [2, 3, 4],
    [5, 6, 'empty'],
  ];

  const getWidth = (slotId, rowSlots) => {
    const hoveredInRow = rowSlots.includes(hoveredId);
    const activeInRow = rowSlots.includes(activeId);
    if (activeId === slotId) return EXPANDED_W;
    if (activeInRow) return COLLAPSED_W;
    if (!hoveredInRow) return DEFAULT_W;
    return hoveredId === slotId ? EXPANDED_W : COLLAPSED_W;
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActiveId(null);
  };

  let animIdx = 0;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 0',
      background: 'white',
    }}>
      <style>{`
        @keyframes gridCardIn {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
        {rows.map((rowSlots, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: `${GAP}px` }}>
            {rowSlots.map((slotId) => {
              const delay = `${animIdx++ * 0.08}s`;

              // ── Intro panel ──
              if (slotId === 'intro') {
                return (
                  <div
                    key="intro"
                    style={{
                      width: `${getWidth('intro', rowSlots)}px`,
                      height: `${CARD_H}px`,
                      borderRadius: '20px',
                      background: 'white',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      animation: `gridCardIn 2s cubic-bezier(0.4,0,0.2,1) ${delay} both`,
                      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                      flexShrink: 0,
                      padding: '32px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      overflow: 'hidden',
                    }}
                  >
                    {introMachine && (
                      <>
                        <h2 style={{
                          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                          fontSize: '36px', lineHeight: 1.05, color: '#2C97BE',
                          marginBottom: '12px',
                        }}>
                          {introMachine.title}
                        </h2>
                        {introMachine.overview && (
                          <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px', lineHeight: 1.7, color: '#475569',
                          }}>
                            {introMachine.overview}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                );
              }

              // ── Empty slot ──
              if (slotId === 'empty') {
                return (
                  <div
                    key="empty"
                    style={{
                      width: `${getWidth('empty', rowSlots)}px`,
                      height: `${CARD_H}px`,
                      flexShrink: 0,
                      animation: `gridCardIn 2s cubic-bezier(0.4,0,0.2,1) ${delay} both`,
                      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                );
              }

              // ── Instrument card ──
              const machine = instruments[slotId];
              if (!machine) return null;
              const isHovered = hoveredId === slotId;
              const isActive = activeId === slotId;

              return (
                <div
                  key={slotId}
                  style={{ animation: `gridCardIn 2s cubic-bezier(0.4,0,0.2,1) ${delay} both`, flexShrink: 0 }}
                >
                  <div
                    style={{
                      width: `${getWidth(slotId, rowSlots)}px`,
                      height: `${CARD_H}px`,
                      borderRadius: '20px',
                      background: machine.imageUrl ? 'none' : 'linear-gradient(135deg, #2C97BE 0%, #1a6e8e 100%)',
                      overflow: 'hidden',
                      cursor: isActive ? 'default' : 'pointer',
                      position: 'relative',
                      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
                      boxShadow: (isHovered || isActive)
                        ? '0 20px 60px rgba(0,0,0,0.25)'
                        : '0 8px 24px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={() => {
                      if (activeId !== null && activeId !== slotId) setActiveId(null);
                      setHoveredId(slotId);
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => !isActive && setActiveId(slotId)}
                  >
                    {/* Background image */}
                    {machine.imageUrl && (
                      <div style={{
                        position: 'absolute', top: 0, left: '50%',
                        width: `${EXPANDED_W}px`, height: '100%',
                        backgroundImage: `url(${machine.imageUrl})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transform: (isHovered || isActive)
                          ? 'translateX(-50%) scale(1.08)'
                          : 'translateX(-50%) scale(1)',
                        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    )}

                    {/* Gradient overlay */}
                    {machine.imageUrl && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)',
                      }} />
                    )}

                    {/* Title + overview */}
                    <div style={{
                      position: 'absolute',
                      left: '24px', right: '24px',
                      bottom: isActive ? `${PANEL_H + 16}px` : '28px',
                      transform: isHovered && !isActive ? 'translateY(-70px)' : 'translateY(0)',
                      transition: 'bottom 0.45s cubic-bezier(0.4,0,0.2,1) 0.05s, transform 0.4s ease',
                      zIndex: 2,
                    }}>
                      <h2 style={{
                        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                        fontSize: '32px', lineHeight: 1.05, color: '#ffffff',
                        wordBreak: 'break-word', overflowWrap: 'break-word',
                      }}>
                        {machine.title}
                      </h2>

                      {machine.overview && (
                        <p style={{
                          position: 'absolute',
                          top: 'calc(100% + 12px)',
                          left: 0, right: 0,
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '17px', lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.85)',
                          opacity: isHovered && !isActive ? 1 : 0,
                          transition: 'opacity 0.35s ease 0.2s',
                        }}>
                          {machine.overview}
                        </p>
                      )}
                    </div>

                    {/* Blue content panel */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: `${PANEL_H}px`,
                      backgroundColor: '#2C97BE',
                      transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
                      zIndex: 3,
                      display: 'flex', flexDirection: 'column',
                      padding: '20px 28px 14px',
                    }}>
                      <div style={{
                        flex: 1, overflowY: 'auto',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(40px)',
                        transition: 'opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s',
                      }}>
                        {machine.content
                          ? <RichText value={machine.content} className="text-white/90 text-base leading-relaxed" />
                          : machine.overview
                            ? <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>{machine.overview}</p>
                            : <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>Content coming soon.</p>
                        }
                      </div>
                      <div style={{
                        flexShrink: 0, paddingTop: '10px', textAlign: 'right',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.3s ease 0.45s',
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
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
