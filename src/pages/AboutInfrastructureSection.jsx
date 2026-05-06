import { useState, useEffect, useRef } from 'react';
import { machines as fallbackMachines } from '../data/index';
import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

const GAP = 16;
const DEFAULT_W = 150;
const SIDE_ROW_EXPANDED_W = 194; // rows with empty: 300-GAP-COLLAPSED_W
const EXPANDED_W = 270;          // full row: 450/250*150
const COLLAPSED_W = 90;
const CARD_H = 150;

const fallbackImage = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=500&fit=crop&q=80';

export default function AboutInfrastructureSection({
  showBanner,
  isExiting,
  selectedMachine,
  setSelectedMachine,
  isClosingInfraVideo,
  lastMachine,
  carouselIndex,
  setCarouselIndex,
  onCarouselPrev,
  onCarouselNext,
  onNavigate
}) {
  const { content } = useContent();
  const machines = content?.machines || fallbackMachines;

  const introMachine = machines[0];
  const instruments = machines.slice(1, 8); // up to 7 instruments

  const isIntro = selectedMachine === 0 || selectedMachine === null;
  const machine = selectedMachine > 0 ? machines[selectedMachine] : null;

  // displayIdx lags behind selectedMachine during image panel exit animation
  const [displayIdx, setDisplayIdx] = useState(selectedMachine ?? 0);
  const [panelExiting, setPanelExiting] = useState(false);
  const exitTimer = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (selectedMachine === displayIdx) return;
    clearTimeout(exitTimer.current);

    if (displayIdx > 0) {
      setPanelExiting(true);
      exitTimer.current = setTimeout(() => {
        setDisplayIdx(selectedMachine ?? 0);
        setPanelExiting(false);
      }, 450);
    } else {
      setDisplayIdx(selectedMachine ?? 0);
    }

    return () => clearTimeout(exitTimer.current);
  }, [selectedMachine]);

  const displayMachine = displayIdx > 0 ? machines[displayIdx] : null;
  const showPanel = displayIdx > 0;

  // Row 1: empty + 2 cards, Row 2: 3 cards, Row 3: empty + 2 cards
  const rows = [
    ['empty', 0, 1],
    [2, 3, 4],
    ['empty', 5, 6],
  ];

  const getWidth = (slotId, rowSlots) => {
    if (slotId === 'empty') return DEFAULT_W;

    const hasEmpty = rowSlots.includes('empty');
    const expandedW = hasEmpty ? SIDE_ROW_EXPANDED_W : EXPANDED_W;

    const instrInRow = rowSlots.filter(s => s !== 'empty');
    const hoveredInRow = instrInRow.includes(hoveredId);
    if (!hoveredInRow) return DEFAULT_W;
    return hoveredId === slotId ? expandedW : COLLAPSED_W;
  };

  let animIdx = 0;

  return (
    <div className="w-full h-full relative">

      {/* Grid container — left:10px */}
      <div
        style={{
          position: 'absolute',
          left: '10px',
          top: '150px',
          width: '482px',
          bottom: '28px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
          {rows.map((rowSlots, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: `${GAP}px` }}>
              {rowSlots.map((slotId) => {
                const delay = `${animIdx++ * 0.08}s`;
                const cardAnim = `gridCardIn 2s cubic-bezier(0.4,0,0.2,1) ${delay} both`;

                // ── Empty slot ──
                if (slotId === 'empty') {
                  return (
                    <div
                      key={`empty-${rowIdx}`}
                      style={{
                        width: `${DEFAULT_W}px`,
                        height: `${CARD_H}px`,
                        flexShrink: 0,
                      }}
                    />
                  );
                }

                // ── Instrument card ──
                const instr = instruments[slotId];
                if (!instr) return null;
                const isHovered = hoveredId === slotId;
                const originalIndex = slotId + 1; // instruments[0] = machines[1]
                const isSelected = selectedMachine === originalIndex;

                return (
                  <div
                    key={slotId}
                    style={{ animation: cardAnim, flexShrink: 0 }}
                  >
                    <div
                      style={{
                        width: `${getWidth(slotId, rowSlots)}px`,
                        height: `${CARD_H}px`,
                        borderRadius: '20px',
                        background: instr.imageUrl ? 'none' : 'linear-gradient(135deg, #2C97BE 0%, #1a6e8e 100%)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
                        boxShadow: (isHovered || isSelected)
                          ? '0 20px 60px rgba(0,0,0,0.25)'
                          : '0 8px 24px rgba(0,0,0,0.15)',
                        outline: isSelected ? '2px solid rgba(255,255,255,0.6)' : 'none',
                        outlineOffset: '-2px',
                      }}
                      onMouseEnter={() => setHoveredId(slotId)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedMachine(originalIndex)}
                    >
                      {/* Background image */}
                      {instr.imageUrl && (
                        <div style={{
                          position: 'absolute', top: 0, left: '50%',
                          width: `${EXPANDED_W}px`, height: '100%',
                          backgroundImage: `url(${instr.imageUrl})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          transform: isHovered ? 'translateX(-50%) scale(1.08)' : 'translateX(-50%) scale(1)',
                          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                        }} />
                      )}

                      {/* Gradient overlay */}
                      {instr.imageUrl && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
                        }} />
                      )}

                      {/* Selected tint */}
                      {isSelected && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,151,190,0.18)' }} />
                      )}

                      {/* Title + overview (hover lift) */}
                      <div style={{
                        position: 'absolute',
                        left: '14px', right: '14px',
                        bottom: '16px',
                        transform: isHovered ? 'translateY(-55px)' : 'translateY(0)',
                        transition: 'transform 0.4s ease',
                        zIndex: 2,
                      }}>
                        <h2 style={{
                          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                          fontSize: '22px', lineHeight: 1.05, color: '#ffffff',
                          wordBreak: 'break-word', overflowWrap: 'break-word',
                          margin: 0,
                        }}>
                          {instr.title}
                        </h2>

                        {instr.overview && (
                          <p style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0, right: 0,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '11px', lineHeight: 1.5,
                            color: 'rgba(255,255,255,0.85)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.35s ease 0.2s',
                            margin: 0,
                          }}>
                            {instr.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Glass text panel — right of grid, floats over video panel */}
      <div
        style={{
          position: 'absolute',
          left: '558px',
          top: '150px',
          width: '336px',
          bottom: '128px',
          zIndex: 20,
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.3)',
          backgroundColor: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          animation: isExiting ? 'slideOutDown 0.5s ease-in both' : 'gridCardIn 2s cubic-bezier(0.4,0,0.2,1) 0.6s both',
        }}
      >
        {isIntro ? (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '28px',
              lineHeight: 1.1,
              color: '#000',
              margin: 0,
            }}>
              Our <span style={{ color: '#2C97BE' }}>Infrastructure</span>
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'rgba(0,0,0,0.7)',
              margin: 0,
            }}>
              {introMachine?.overview}
            </p>
          </div>
        ) : machine ? (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '24px',
              lineHeight: 1.1,
              color: '#000',
              margin: 0,
              flexShrink: 0,
            }}>
              {machine.title}
            </h3>
            {machine.overview && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'rgba(0,0,0,0.65)',
                margin: 0,
                flexShrink: 0,
              }}>
                {machine.overview}
              </p>
            )}
            {machine.content && (
              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}>
                <RichText value={machine.content} />
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Image panel — shown when a machine is selected */}
      {showPanel && (
        <div
          key={displayIdx}
          className="absolute overflow-hidden"
          style={{
            left: '508px',
            right: '60px',
            top: '100px',
            bottom: '28px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255,255,255,0.30)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            animation: (panelExiting || isExiting)
              ? 'slideOutDown 0.45s ease-in forwards'
              : 'slideInFromRight 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            zIndex: 15,
          }}
        >
          <div className="h-full relative" style={{ padding: '10px' }}>
            <div className="absolute rounded-xl overflow-hidden" style={{ inset: '10px' }}>
              <div className="absolute inset-0" style={{
                backgroundImage: `url(${displayMachine?.imageUrl || fallbackImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-end justify-start p-4">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-xl px-5 py-3">
                  <svg className="w-7 h-7 flex-shrink-0" fill="#F26219" stroke="none" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="text-base font-semibold text-white">
                    {displayMachine?.title} — Video Overview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
