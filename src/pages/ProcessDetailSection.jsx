import { useState } from 'react';
import { X } from 'lucide-react';
import { technicalServices } from '../data/index';

const descriptions = {
  assessment: 'Comprehensive evaluation of your neurological health, medical history, and specific concerns to establish baseline function.',
  neurological: 'Advanced diagnostic testing to identify specific areas of dysfunction and create a detailed neurological profile.',
  treatment: 'Development of a personalized treatment protocol tailored to your unique neurological needs and goals.',
  monitoring: 'Regular assessment and adjustment of treatment protocols to ensure optimal outcomes and continued improvement.',
  followup: 'Ongoing support and maintenance protocols to ensure lasting results and prevent regression.',
};

export default function ProcessDetailSection({ onNavigate, isExiting }) {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="w-full h-full relative">
      <div className="relative z-10 flex flex-col items-center px-8" style={{ paddingTop: '100px' }}>
        <div className="w-full max-w-6xl flex flex-col gap-4">

          {/* Intro Panel */}
          <div
            className="rounded-2xl border border-white/20 shadow-2xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.30)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '24px 36px',
              animation: isExiting
                ? 'slideOutDown 0.5s ease-in 0.25s both'
                : 'introPanelUp 2s cubic-bezier(0.4, 0, 0.2, 1) 0s both',
            }}
          >
            <div className="flex items-center" style={{ gap: '0' }}>
              <div style={{ width: '50%', paddingRight: '32px' }}>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '52px', lineHeight: 1.0, textAlign: 'right' }} className="text-slate-900">
                  Our<br />
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>Treatment Process</span>
                </h2>
              </div>
              <div style={{ width: '50%', paddingLeft: '32px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Our structured five-step process ensures every patient receives a thorough assessment, precise diagnosis, and a personalized treatment plan. We continuously monitor progress and adapt protocols to achieve optimal outcomes. From initial evaluation through to long-term follow-up, we are committed to lasting neurological health.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2.5">
            {technicalServices.map((service, index) => {
              const isHovered = hoveredPanel === service.id;
              const isVideoOpen = selectedVideo === service.id;
              const words = service.title.split(' ');
              const prefix = words.slice(0, -1).join(' ');
              const italicPart = words[words.length - 1];
              const delay = 0.3 + index * 0.15;

              return (
                <div
                  key={service.id}
                  className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl cursor-pointer"
                  onMouseEnter={() => { if (!isVideoOpen) setHoveredPanel(service.id); }}
                  onMouseLeave={() => setHoveredPanel(null)}
                  onClick={() => { if (!isVideoOpen) setSelectedVideo(service.id); }}
                  style={{
                    width: '235px',
                    height: '340px',
                    backgroundColor: isHovered || isVideoOpen ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    scale: isVideoOpen ? '1.1' : '1',
                    zIndex: isVideoOpen ? 10 : 1,
                    transition: 'background-color 0.4s ease, scale 0.3s ease',
                    animation: isExiting
                      ? `slideOutDown 0.5s ease-in ${(technicalServices.length - 1 - index) * 0.05}s both`
                      : `introPanelUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
                  }}
                >

                  {/* VIDEO STATE */}
                  {isVideoOpen && (
                    <div className="absolute inset-0 flex flex-col" style={{ animation: 'fadeInPanel 0.3s ease-out both' }}>
                      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
                        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '15px', color: '#1e293b' }}>
                          {service.title}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); }}
                          className="text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1 relative overflow-hidden mx-3 mb-3 rounded-xl">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          <source src="https://framerusercontent.com/assets/INsc3G5K2Tv80wdTWEjcLPSHR0.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/20" />
<div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                            <p className="text-xs font-medium text-white">Step {index + 1} — Video Overview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEFAULT / HOVER STATE */}
                  {!isVideoOpen && (
                    <>
                      {/* Numbered circle + title — centered at rest, moves up on hover */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '24px',
                          right: '24px',
                          top: '50%',
                          transform: isHovered ? 'translateY(calc(-50% - 90px))' : 'translateY(-50%)',
                          transition: 'transform 0.4s ease',
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#F26219]/70 flex items-center justify-center font-bold text-lg text-white mb-3">
                          {index + 1}
                        </div>
                        <h2
                          style={{ fontFamily: "'Instrument Serif', serif", fontSize: '36px', lineHeight: 1.0 }}
                          className="text-left text-slate-900"
                        >
                          {prefix}<br />
                          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#2C97BE' }}>
                            {italicPart}
                          </span>
                        </h2>
                      </div>

                      {/* Description + watch button — fades in on hover */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '24px',
                          right: '24px',
                          top: 'calc(50% - 24px)',
                          opacity: isHovered ? 1 : 0,
                          transition: 'opacity 0.3s ease 0.15s',
                        }}
                      >
                        <p className="text-sm text-slate-700 leading-snug mb-4">{descriptions[service.id]}</p>
                        <button
                          className="text-sm font-medium text-[#F26219] flex items-center gap-1.5 hover:underline"
                          onClick={(e) => { e.stopPropagation(); setSelectedVideo(service.id); }}
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="#F26219" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>Watch video</span>
                        </button>
                      </div>
                    </>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
