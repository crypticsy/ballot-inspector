import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

interface Props {
  timeLeft: number;
  totalTime: number;
  compact?: boolean;
}

export default function Timer({ timeLeft, totalTime, compact = false }: Props) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (timeLeft <= 15) {
      const id = setInterval(() => setPulse((p) => !p), 500);
      return () => clearInterval(id);
    }
  }, [timeLeft]);

  const pct = (timeLeft / totalTime) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLow = timeLeft <= 30;
  const isCritical = timeLeft <= 15;

  const barColor = isCritical ? '#cc0000' : isLow ? '#c8700c' : '#1a7a1a';
  const textColor = isCritical ? (pulse ? '#ff5555' : '#dd2222') : isLow ? '#d4780c' : '#c8b89a';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2 pb-1.5">
        <FiClock
          style={{ color: textColor }}
          className={`block ${compact ? 'text-[0.85rem]' : 'text-[1.1rem]'} ${isCritical ? 'animate-ticker' : ''}`}
        />
        <span
          className={`font-mono font-bold tracking-widest block text-center leading-none ${compact ? 'text-[1.15rem] min-w-[50px]' : 'text-lg min-w-[68px]'}`}
          style={{ color: textColor }}
        >
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>
      <div className="w-full rounded-full overflow-hidden h-[5px] bg-white/[0.08]">
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: isCritical ? `0 0 8px ${barColor}` : 'none',
          }}
        />
      </div>
    </div>
  );
}
