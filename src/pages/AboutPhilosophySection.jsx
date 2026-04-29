import { useContent } from '../context/ContentContext';
import RichText from '../components/RichText';

export default function AboutPhilosophySection({ showBanner, shouldAnimateBanner, onNavigate }) {
  const { content } = useContent();
  const about = content?.aboutContent;

  const tabs = [
    { key: 'tabWhatIs',       fallback: 'What is BrainMoove?', nav: 'about' },
    { key: 'tabPhilosophy',   fallback: 'Our Philosophy',       nav: 'about-philosophy' },
    { key: 'tabObjectives',   fallback: 'Our Objectives',       nav: 'about-objectives' },
    { key: 'tabTeam',         fallback: 'Our Team',             nav: 'about-team' },
    { key: 'tabInfrastructure', fallback: 'Our Infrastructure', nav: 'about-infrastructure' },
    { key: 'tabHistory',      fallback: 'History',              nav: 'about-history' },
  ];

  const heading = about?.philosophy?.heading || 'Our Philosophy';
  const body = about?.philosophy?.body;

  return (
    <div className="w-full h-full relative">

      <div className="absolute left-0 right-0 border-b border-white/20 shadow-sm z-10" style={{top: '150px', height: '50px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'}}>
        <div className="flex items-center justify-center h-full gap-8 px-8">
          {tabs.map(t => (
            <button
              key={t.nav}
              onClick={() => onNavigate(t.nav)}
              className={`text-sm transition-all ${t.nav === 'about-philosophy' ? 'font-semibold text-white underline hover:opacity-70' : 'font-medium text-white/70 hover:text-white hover:underline'}`}
            >
              {about?.[t.key] || t.fallback}
            </button>
          ))}
        </div>
      </div>

      <div className="p-12" style={{paddingTop: '220px'}}>
        <div style={{width: '35%'}}>
          <div className="rounded-2xl p-8 border border-white/20 shadow-xl" style={{backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'}}>
            <h2 className="text-2xl font-light mb-6 text-white">{heading}</h2>
            {body
              ? <RichText value={body} className="text-lg leading-relaxed text-white/70" />
              : (
                <>
                  <p className="text-lg leading-relaxed mb-4 text-white/70">
                    [Detailed content about BrainMoove's philosophy will go here...]
                  </p>
                  <p className="text-lg leading-relaxed text-white/70">
                    Our approach bridges cutting-edge neuroscience with compassionate care, focusing on the root causes of neurological dysfunction rather than just symptoms.
                  </p>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
