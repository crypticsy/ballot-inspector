import { useState, useEffect } from 'react';

const ELECTION_DATE = new Date('2026-03-05T00:00:00+05:45');
const CARD_H = 52;   // full card height px
const HALF   = 26;   // each half px

function pad(n: number) { return String(n).padStart(2, '0'); }

function getTimeLeft() {
  const diff = ELECTION_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', over: true };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { days: pad(d), hours: pad(h), minutes: pad(m), seconds: pad(s), over: false };
}

const upperBg  = 'linear-gradient(180deg,#222010 0%,#1c1a0e 100%)';
const lowerBg  = 'linear-gradient(180deg,#1c1a0e 0%,#201e0c 100%)';
const innerH   = { height: CARD_H } as const;
const numStyle = {
  fontSize: '1.9rem',
  color: '#f5d060',
  textShadow: '0 1px 8px rgba(0,0,0,1)',
} as const;

function Half({ anchor, val }: { anchor: 'top' | 'bot'; val: string }) {
  const isTop = anchor === 'top';
  return (
    <div
      className={`absolute left-0 right-0 overflow-hidden ${isTop ? 'top-0 rounded-t' : 'bottom-0 rounded-b'}`}
      style={{ height: HALF, background: isTop ? upperBg : lowerBg }}
    >
      <div
        className={`absolute left-0 right-0 flex items-center justify-center ${isTop ? 'top-0' : 'bottom-0'}`}
        style={innerH}
      >
        <span className="font-mono font-bold leading-none text-center w-full tracking-tight select-none" style={numStyle}>
          {val}
        </span>
      </div>
    </div>
  );
}

function FlipCard({ value, label }: { value: string; label: string }) {
  const [current, setCurrent] = useState(value);
  const [prev,    setPrev]    = useState(value);
  const [phase,   setPhase]   = useState(0);

  useEffect(() => {
    if (value === current) return;
    setPrev(current);
    setCurrent(value);
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 300);
    const t2 = setTimeout(() => setPhase(0), 580);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative rounded" style={{ width: 44, height: CARD_H, perspective: 160 }}>
        <Half anchor="top" val={current} />
        <Half anchor="bot" val={current} />

        {/* Crease */}
        <div className="absolute left-0 right-0 z-[5] pointer-events-none"
             style={{ top: HALF - 1, height: 2, background: '#050402' }} />

        {/* Phase 1 — old top folds away */}
        {phase === 1 && (
          <div className="fc-flap-top absolute left-0 right-0 top-0 overflow-hidden rounded-t z-10"
               style={{ height: HALF, background: upperBg,
                        transformOrigin: 'bottom center',
                        boxShadow: '0 6px 14px rgba(0,0,0,0.9)' }}>
            <div className="absolute left-0 right-0 top-0 flex items-center justify-center" style={innerH}>
              <span className="font-mono font-bold leading-none text-center w-full tracking-tight select-none" style={numStyle}>{prev}</span>
            </div>
          </div>
        )}

        {/* Phase 2 — new bottom rises up */}
        {phase === 2 && (
          <div className="fc-flap-bot absolute left-0 right-0 bottom-0 overflow-hidden rounded-b z-10"
               style={{ height: HALF, background: lowerBg,
                        transformOrigin: 'top center' }}>
            <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center" style={innerH}>
              <span className="font-mono font-bold leading-none text-center w-full tracking-tight select-none" style={numStyle}>{current}</span>
            </div>
          </div>
        )}
      </div>

      <span className="font-typewriter text-[0.48rem] tracking-[0.12em] uppercase text-[#a09070]">
        {label}
      </span>
    </div>
  );
}

export default function FlipClock() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-4 pb-3 border border-[rgba(180,150,100,0.22)] rounded">
      <p className="font-typewriter text-xs tracking-[0.14em] uppercase text-gold mb-0.5">
        {time.over ? '— ELECTION DAY —' : 'ELECTION DAY IN'}
      </p>
      <p className="font-nepali text-[0.56rem] text-[#8a7a68] mb-2.5">
        5 March 2026 / २१ फाल्गुण २०८२
      </p>
      <div className="flex items-start justify-center gap-0.5">
        <FlipCard value={time.days}    label="DAYS" />
        <span className="font-mono font-bold text-[1.1rem] text-[#7a6a50] leading-none self-center mb-[18px]">:</span>
        <FlipCard value={time.hours}   label="HRS"  />
        <span className="font-mono font-bold text-[1.1rem] text-[#7a6a50] leading-none self-center mb-[18px]">:</span>
        <FlipCard value={time.minutes} label="MIN"  />
        <span className="font-mono font-bold text-[1.1rem] text-[#7a6a50] leading-none self-center mb-[18px]">:</span>
        <FlipCard value={time.seconds} label="SEC"  />
      </div>
    </div>
  );
}
