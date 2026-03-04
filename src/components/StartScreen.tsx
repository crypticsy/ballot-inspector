import { FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import { GiStamper } from 'react-icons/gi';
import { VALID_RULES, INVALID_RULES } from '../data/rules';
import FlipClock from './FlipClock';

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

      <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-4xl w-full px-6 md:px-6 py-16 md:py-0 md:min-h-0 md:overflow-y-auto mb-0 md:mb-12">

        {/* LEFT: Quick Reference + Election Counter */}
        <div className="order-2 md:order-1 w-full md:w-[350px] md:flex-shrink-0 flex flex-col gap-3">

          {/* Election Countdown box */}
          <div className="rounded bg-ink/[0.95] border border-gold/30">
            <FlipClock />
          </div>

          {/* Quick Reference box */}
          <div className="rounded p-5 bg-ink/[0.95] border border-gold/20 flex flex-col flex-1">
            <p className="font-typewriter tracking-widest uppercase mb-4 text-gold text-[0.78rem]">
              QUICK REFERENCE
            </p>

            <div className="mb-5">
              <p className="font-typewriter mb-2 text-[#22cc44] text-[0.8rem]">
                ✓ VALID IF:
              </p>
              <ul className="space-y-1.5">
                {VALID_RULES.map((r, i) => (
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
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {INVALID_RULES.map((r, i) => (
                  <li key={i} className="font-typewriter text-[#9a7070] text-[0.72rem] leading-[1.5]">
                    · {r.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Ballot Inspector */}
        <div className="order-1 md:order-2 flex-1 rounded p-6 bg-ink/[0.95] border border-gold/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col">
          {/* Header logo */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gold/20">
            <GiStamper size={28} className="animate-flicker text-gold" />
            <div>
              <p className="font-typewriter tracking-widest uppercase text-xs text-gold">
                Election Commission, Nepal
              </p>
              <p className="font-nepali font-bold text-gold-light text-[0.8rem]">
                निर्वाचन आयोग नेपाल
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <h1 className="font-typewriter text-2xl md:text-3xl font-bold tracking-widest uppercase text-paper leading-[1.1] mb-1">
              BALLOT INSPECTOR
            </h1>
            <p className="font-nepali text-[#9a8870] text-[0.75rem]">
              मतपत्र परीक्षक — मतगणना विभाग
            </p>
          </div>

          {/* Story text */}
          <div className="mb-5 p-3 rounded bg-black/30 border border-white/[0.04]">
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
          <div className="flex items-start gap-2 mb-5 p-2 rounded bg-stamp-red/10 border border-stamp-red/25">
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
            <FiChevronRight size={16} />
          </button>

          {/* Flavour footer */}
          <p className="text-center font-typewriter mt-auto pt-6 text-white/30 text-[0.55rem] tracking-[0.1em]">
            ELECTION COMMISSION OF NEPAL · KATHMANDU, 2082 BS
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-4 md:mt-0 md:absolute md:bottom-8 left-0 right-0 flex justify-center pb-4 md:pb-0">
        <p className="text-sm flex flex-wrap items-center justify-center gap-1.5">
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
