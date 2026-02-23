import { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface Props {
  show: boolean;
  correct: boolean;
  message: string;
  onDone: () => void;
}

export default function FeedbackOverlay({ show, correct, message, onDone }: Props) {
  const [visible, setVisible] = useState(false);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setStamped(false);
      const t1 = setTimeout(() => setStamped(true), 50);
      const t2 = setTimeout(() => {
        setVisible(false);
        setStamped(false);
        onDone();
      }, 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [show, onDone]);

  if (!visible) return null;

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center z-50 rounded ${
        correct ? 'bg-green-900/20' : 'bg-red-900/25'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Stamp */}
      <div
        className={`font-typewriter font-black uppercase tracking-widest rounded ${
          stamped ? 'animate-stampDrop' : 'opacity-0'
        } ${
          correct
            ? 'text-green-400 border-green-400 bg-green-400/10'
            : 'text-red-400 border-red-400 bg-red-400/10'
        }`}
        style={{
          border: '4px solid',
          padding: '8px 20px',
          transform: 'rotate(-12deg)',
          fontSize: '2rem',
          letterSpacing: '0.15em',
          opacity: 0.95,
          boxShadow: `0 0 0 2px currentColor`,
        }}
      >
        {correct ? 'CORRECT' : 'WRONG'}
      </div>

      {/* Invalid reason — shown whenever the ballot was invalid */}
      {message && (
        <div
          className={`mt-3 px-4 py-2 rounded text-center bg-neutral-950/90 transition-opacity duration-300 ${
            stamped ? 'opacity-100' : 'opacity-0'
          } ${correct ? 'border border-green-500/40' : 'border border-red-500/50'}`}
          style={{ maxWidth: 300 }}
        >
          <div className={`flex items-center justify-center gap-1 mb-1 ${correct ? 'text-green-400' : 'text-red-400'}`}>
            {correct ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
            <span className="uppercase tracking-wider text-xs">Invalid reason</span>
          </div>
          <p className={`font-typewriter leading-relaxed ${correct ? 'text-green-200' : 'text-red-200'}`} style={{ fontSize: '0.65rem' }}>
            {message}
          </p>
        </div>
      )}

      {/* Correct icon — only when ballot was valid (no reason box to show) */}
      {correct && !message && (
        <div className={`mt-3 text-green-400 transition-opacity duration-300 ${stamped ? 'opacity-100' : 'opacity-0'}`}>
          <FiCheckCircle size={24} />
        </div>
      )}
    </div>
  );
}
