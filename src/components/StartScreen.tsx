import { FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import { GiStamper } from 'react-icons/gi';

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div
      className="min-h-screen md:h-screen w-full max-w-full desk-surface flex flex-col items-center justify-center relative overflow-y-auto md:overflow-hidden"
    >
      <div className="scanlines" />

      {/* Ambient top light strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,transparent,rgba(184,150,12,0.3),transparent)]"
      />

      <div className="flex flex-col md:flex-row gap-6 items-start max-w-4xl w-full px-6 md:px-6 py-16 md:py-0 md:min-h-0 md:overflow-y-auto">
        {/* LEFT: Main title panel */}
        <div
          className="flex-1 rounded p-6 bg-ink/[0.95] border border-gold/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          {/* Header logo */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gold/20">
            <GiStamper size={28} className="animate-flicker text-gold" />
            <div>
              <p className="font-typewriter tracking-widest uppercase text-xs text-gold">
                Election Commission, Nepal
              </p>
              <p
                className="font-nepali font-bold text-gold-light text-[0.8rem]"
              >
                निर्वाचन आयोग नेपाल
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <h1
              className="font-typewriter text-2xl md:text-3xl font-bold tracking-widest uppercase text-paper leading-[1.1] mb-1"
            >
              BALLOT INSPECTOR
            </h1>
            <p
              className="font-nepali text-[#9a8870] text-[0.75rem]"
            >
              मतपत्र परीक्षक — मतगणना विभाग
            </p>
          </div>

          {/* Story text */}
          <div
            className="mb-5 p-3 rounded bg-black/30 border border-white/[0.04]"
          >
            <p className="font-typewriter text-[#9a8870] text-[0.82rem] leading-[1.7]">
              You have been assigned to the{' '}
              <span className="text-[#c8b89a]">Ballot Validation Station</span> of the
              Election Commission of Nepal.
            </p>
            <p className="font-typewriter mt-2 text-[#9a8870] text-[0.82rem] leading-[1.7]">
              Your duty: examine each{' '}
              <span className="text-[#c8b89a]">Proportional Representation ballot</span>{' '}
              and determine whether it is{' '}
              <span className="text-[#22cc44]">VALID</span> or{' '}
              <span className="text-[#ee3333]">INVALID</span> before time runs out.
            </p>
            <p className="font-typewriter mt-2 text-[#9a8870] text-[0.82rem] leading-[1.7]">
              The integrity of the election depends on your accuracy.
            </p>
          </div>

          {/* Warning */}
          <div
            className="flex items-start gap-2 mb-5 p-2 rounded bg-stamp-red/10 border border-stamp-red/25"
          >
            <FiAlertTriangle size={12} className="text-[#cc3333] mt-[2px] shrink-0" />
            <p className="font-typewriter text-[#cc9988] text-[0.78rem] leading-[1.5]">
              Wrong decisions cost{' '}
              <span className="text-[#ff6666]">−8 seconds</span>. Each correct decision earns{' '}
              <span className="text-[#66cc66]">+2 seconds</span>. The shift ends when time expires.
            </p>
          </div>

          {/* Start button */}
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-3 py-3 rounded font-typewriter tracking-[0.25em] uppercase transition-all duration-200 bg-gold/[0.12] border-2 border-gold text-gold-light text-[0.85rem] shadow-[0_0_20px_rgba(184,150,12,0.1)] hover:bg-gold/[0.22] hover:shadow-[0_0_30px_rgba(184,150,12,0.2)]"
          >
            <span>REPORT FOR DUTY</span>
            <FiChevronRight size={16}  />
          </button>

          {/* Flavour footer */}
          <p
            className="text-center font-typewriter mt-6 text-white/30 text-[0.55rem] tracking-[0.1em]"
          >
            ELECTION COMMISSION OF NEPAL · KATHMANDU, 2079 BS
          </p>
        </div>

        {/* RIGHT: Rules quick-ref */}
        <div
          className="rounded p-5 w-full md:w-[260px] md:flex-shrink-0 bg-ink/[0.95] border border-gold/20 h-full flex flex-col justify-evenly"
        >
          <p className="font-typewriter tracking-widest uppercase mb-4 text-gold text-[0.78rem]">
            QUICK REFERENCE
          </p>

          <div className="mb-5">
            <p className="font-typewriter mb-2 text-[#22cc44] text-[0.8rem]">
              卐 VALID IF:
            </p>
            <ul className="space-y-1.5">
              {[
                'One 卐 mark in one box',
                'Clearly inside the cell',
                'Signature present',
                'Ballot undamaged',
                'No identifying marks',
              ].map((r, i) => (
                <li key={i} className="font-typewriter text-[#7a9a7a] text-[0.78rem] leading-[1.5]">
                  · {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-typewriter mb-2 text-[#ee3333] text-[0.8rem]">
              ✗ INVALID IF:
            </p>
            <ul className="space-y-1.5">
              {[
                'Multiple marks',
                'Blank — no mark',
                'Mark on border',
                'Writing/names present',
                'No officer signature',
                'Torn or damaged',
              ].map((r, i) => (
                <li key={i} className="font-typewriter text-[#9a7070] text-[0.78rem] leading-[1.5]">
                  · {r}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-5 pt-3 border-t border-gold/[0.15]"
          >
            <p className="font-typewriter text-[#5a4a3a] text-[0.75rem] leading-[1.8]">
              HOT KEYS<br />
              <span className="text-[#7a6a5a]">[V] — Valid</span><br />
              <span className="text-[#7a6a5a]">[I] — Invalid</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-4 md:mt-0 md:absolute md:bottom-8 left-0 right-0 flex justify-center pb-4 md:pb-0">
        <p
          className="text-sm flex flex-wrap items-center justify-center gap-1.5"
        >
          <span>Created by</span>
          <a
            href="https://www.animeshbasnet.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-80 text-gold"
          >
            <span className="font-medium">Crypticsy</span>
            <img
              src="https://github.com/crypticsy.png"
              alt="Crypticsy"
              className="w-7 h-7 rounded-full border-2 border-gold/50"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
