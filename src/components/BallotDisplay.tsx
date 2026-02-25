import type { BallotData } from '../types';
import { PARTY_SYMBOLS, COLS, ROWS } from '../data/parties';

interface Props {
  ballot: BallotData;
  compact?: boolean; // true on mobile — smaller cells & fonts
  containerHeight?: number; // available height for the ballot to fit in
}

// const BALLOT_W = 460;
const CELL_H = 53;
const CELL_H_SM = 38;
// header (~60px) + signature (~36px) = ~96px
const HEADER_FOOTER_H = 96;

export default function BallotDisplay({ ballot, compact = false, containerHeight }: Props) {
  // containerHeight always wins — lets the ballot fit the measured space on both desktop and mobile.
  // compact controls fonts/signature sizing only.
  let cellH: number;
  if (containerHeight) {
    const availableForGrid = containerHeight - HEADER_FOOTER_H;
    cellH = Math.max(18, Math.min(compact ? CELL_H_SM : CELL_H, Math.floor(availableForGrid / ROWS)));
  } else if (compact) {
    cellH = CELL_H_SM;
  } else {
    cellH = CELL_H;
  }

  const markMap = new Map<string, { isBorder?: boolean; borderDir?: string; sloppy?: boolean; isSmudged?: boolean }>();
  for (const mark of ballot.marks) {
    markMap.set(`${mark.row}-${mark.col}`, {
      isBorder: mark.isBorder,
      borderDir: mark.borderDir,
      sloppy: ballot.sloppyMark,
      isSmudged: mark.isSmudged,
    });
  }

  const renderMark = (sloppy?: boolean, borderDir?: string, isBorder?: boolean, isSmudged?: boolean) => {
    if (isBorder && borderDir === 'right') return <span className="vote-mark-border-right">卐</span>;
    if (isBorder && borderDir === 'bottom') return <span className="vote-mark-border-bottom">卐</span>;
    if (isSmudged) return <span className="vote-mark vote-mark-smudged">卐</span>;
    return <span className={`vote-mark ${sloppy ? 'vote-mark-sloppy' : ''}`}>卐</span>;
  };

  return (
    <div
      className="ballot-paper rounded shadow-ballot mx-auto select-none w-full max-w-[460px] relative overflow-hidden"
    >
      {/* Torn corners */}
      {ballot.hasTear && ballot.tearPosition === 'top-right' && <div className="torn-corner-tr" />}
      {ballot.hasTear && ballot.tearPosition === 'bottom-right' && <div className="torn-corner-br" />}
      {ballot.hasTear && ballot.tearPosition === 'top-left' && <div className="torn-corner-tl" />}

      {/* Identifying text */}
      {ballot.identifyingText && ballot.identifyingPos && (
        <span
          className="identifying-text"
          style={{ top: ballot.identifyingPos.top, left: ballot.identifyingPos.left }}
        >
          {ballot.identifyingText}
        </span>
      )}

      {/* Header */}
      <div className="text-center py-2 px-3 font-nepali border-b-2 border-ink">
        <p className={`font-bold leading-snug text-ink ${compact ? 'text-[0.65rem]' : 'text-[0.85rem]'}`}>
          प्रतिनिधि सभा सदस्य निर्वाचन, २०७९
        </p>
        <p className={`leading-snug text-ink ${compact ? 'text-[0.58rem]' : 'text-[0.75rem]'}`}>
          समानुपातिक निर्वाचन प्रणालीको मतपत्र
        </p>
        <p className={`font-semibold text-ink mt-[2px] ${compact ? 'text-[0.55rem]' : 'text-[0.72rem]'}`}>
          एउटा कोठामित्र मात्र मतरसङ्केत (卐) गर्नुहोस्
        </p>
      </div>

      {/* Symbol grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          border: '1.5px solid #1a1208',
          borderTop: 'none',
          margin: '0 3px',
        }}
      >
        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLS }).map((_, col) => {
            const symbolIndex = row * COLS + col;
            const symbol = PARTY_SYMBOLS[symbolIndex];
            const PartyIcon = symbol?.icon;
            const key = `${row}-${col}`;
            const mark = markMap.get(key);
            const isLastRowEmpty = row === ROWS - 1 && col >= 3;

            if (isLastRowEmpty || !symbol) {
              return (
                <div
                  key={key}
                  style={{
                    borderRight: col < COLS - 1 ? '1px solid #1a1208' : 'none',
                    borderBottom: row < ROWS - 1 ? '1px solid #1a1208' : 'none',
                    height: cellH,
                    background: isLastRowEmpty ? 'rgba(0,0,0,0.03)' : undefined,
                  }}
                />
              );
            }

            return (
              <div
                key={key}
                style={{
                  position: 'relative',
                  height: cellH,
                  borderRight: col < COLS - 1 ? '1px solid #1a1208' : 'none',
                  borderBottom: row < ROWS - 1 ? '1px solid #1a1208' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: mark?.isBorder ? 'visible' : 'hidden',
                }}
              >
                <span className="party-symbol"><PartyIcon /></span>
                {mark && renderMark(mark.sloppy, mark.borderDir, mark.isBorder, mark.isSmudged)}
              </div>
            );
          })
        )}
      </div>

      {/* Signature area */}
      <div
        className="flex items-center px-3 font-nepali"
        style={{
          borderTop: '1.5px solid #1a1208',
          margin: '0 3px',
          minHeight: compact ? 26 : 34,
          paddingTop: compact ? 3 : 6,
          paddingBottom: compact ? 3 : 6,
        }}
      >
        <span className={`text-ink whitespace-nowrap ${compact ? 'text-[0.58rem]' : 'text-[0.72rem]'}`}>
          मतदान अधिकृतको दस्तखत :
        </span>
        <div
          style={{
            flex: 1,
            borderBottom: ballot.hasSignature ? '1px solid #1a1208' : '1px dashed rgba(80,20,20,0.35)',
            marginLeft: 8,
            height: compact ? 16 : 22,
            position: 'relative',
          }}
        >
          {ballot.hasSignature ? (
            <span
              style={{
                position: 'absolute',
                bottom: 1,
                left: 4,
                fontSize: compact ? '0.6rem' : '0.78rem',
                fontFamily: 'Courier Prime, cursive',
                color: '#1a1208',
                fontStyle: 'italic',
                opacity: 0.85,
                transform: 'rotate(-2deg)',
                display: 'inline-block',
              }}
            >
              / <span style={{ fontFamily: 'serif', letterSpacing: '-0.5px' }}>निर्वाचन अधिकृत</span>
            </span>
          ) : (
            <span style={{ position: 'absolute', bottom: 2, left: 4, fontSize: '0.62rem', fontFamily: 'Courier Prime, monospace', color: 'rgba(160,30,30,0.45)', letterSpacing: '0.05em' }}>
              — — —
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
