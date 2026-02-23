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
      className="absolute inset-0 flex flex-col items-center justify-center z-50 rounded"
      style={{
        background: correct
          ? 'rgba(0, 60, 0, 0.18)'
          : 'rgba(100, 0, 0, 0.22)',
        pointerEvents: 'none',
      }}
    >
      {/* Stamp */}
      <div
        className={stamped ? 'animate-stampDrop' : 'opacity-0'}
        style={{
          border: `4px solid ${correct ? '#004d00' : '#8b0000'}`,
          color: correct ? '#004d00' : '#8b0000',
          padding: '8px 20px',
          transform: 'rotate(-12deg)',
          fontFamily: 'Special Elite, monospace',
          fontWeight: 900,
          fontSize: '2rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.9,
          boxShadow: `0 0 0 2px ${correct ? '#004d00' : '#8b0000'}`,
          background: correct ? 'rgba(0,77,0,0.07)' : 'rgba(139,0,0,0.07)',
          borderRadius: 4,
        }}
      >
        {correct ? 'CORRECT' : 'WRONG'}
      </div>

      {/* Icon + message */}
      {!correct && message && (
        <div
          className="mt-3 px-4 py-2 rounded text-center"
          style={{
            background: 'rgba(15,8,5,0.85)',
            border: '1px solid rgba(139,0,0,0.4)',
            maxWidth: 300,
            color: '#cc9988',
            fontSize: '0.65rem',
            fontFamily: 'Special Elite, monospace',
            lineHeight: 1.5,
            opacity: stamped ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="flex items-center justify-center gap-1 mb-1" style={{ color: '#cc3333' }}>
            <FiXCircle size={12} />
            <span className="uppercase tracking-wider" style={{ fontSize: '0.6rem' }}>Reason</span>
          </div>
          {message}
        </div>
      )}

      {correct && (
        <div
          className="mt-3"
          style={{
            opacity: stamped ? 1 : 0,
            transition: 'opacity 0.3s ease',
            color: '#1a6b1a',
          }}
        >
          <FiCheckCircle size={24} />
        </div>
      )}
    </div>
  );
}
