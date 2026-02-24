import type { GameStats } from '../types';
import { FiCheckCircle, FiXCircle, FiRotateCcw, FiAward } from 'react-icons/fi';
import { GiStamper } from 'react-icons/gi';

interface Props {
  stats: GameStats;
  onRestart: () => void;
}

function getGrade(accuracy: number, score: number): { grade: string; label: string; color: string; nepali: string } {
  if (accuracy >= 90 && score >= 100) return { grade: 'S', label: 'EXEMPLARY', color: '#d4b030', nepali: 'उत्कृष्ट' };
  if (accuracy >= 80) return { grade: 'A', label: 'COMMENDABLE', color: '#1a6b1a', nepali: 'प्रशंसनीय' };
  if (accuracy >= 70) return { grade: 'B', label: 'SATISFACTORY', color: '#4a7a9a', nepali: 'सन्तोषजनक' };
  if (accuracy >= 60) return { grade: 'C', label: 'MARGINAL', color: '#8a6a00', nepali: 'सामान्य' };
  if (accuracy >= 50) return { grade: 'D', label: 'INADEQUATE', color: '#8a4a00', nepali: 'अपर्याप्त' };
  return { grade: 'F', label: 'FAILED', color: '#8b0000', nepali: 'असफल' };
}

function getFlavorText(grade: string): string {
  switch (grade) {
    case 'S': return '"Your dedication to electoral integrity is unmatched. The Commission is proud."';
    case 'A': return '"Well done. The democratic process is in capable hands."';
    case 'B': return '"Satisfactory performance. Further training may improve accuracy."';
    case 'C': return '"Several errors were noted. A review of procedures is recommended."';
    case 'D': return '"Significant errors compromised ballot integrity. Retraining required."';
    default: return '"Your performance has jeopardized the election. You are relieved of duty."';
  }
}

export default function EndScreen({ stats, onRestart }: Props) {
  const accuracy = stats.totalSeen > 0 ? Math.round((stats.correct / stats.totalSeen) * 100) : 0;
  const { grade, label, color, nepali } = getGrade(accuracy, stats.score);

  return (
    <div className="min-h-screen md:h-screen w-full max-w-full desk-surface flex flex-col items-center justify-start md:justify-center relative overflow-y-auto md:overflow-hidden">
      <div className="scanlines" />

      <div className="w-full max-w-5xl px-4 md:px-8 py-6 md:py-0 md:min-h-0 md:overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">

          {/* Main results panel */}
          <div className="flex-1 w-full rounded p-5 md:p-6 bg-ink/[0.95] border border-gold/25 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gold/20">
              <GiStamper size={28} className="text-gold" />
              <div>
                <p className="font-typewriter tracking-widest uppercase text-gold text-[0.78rem]">
                  Election Commission of Nepal
                </p>
                <p className="font-typewriter text-[#5a4a3a] text-[0.65rem]">
                  END OF SHIFT · PERFORMANCE REPORT
                </p>
              </div>
            </div>

            {/* Grade stamp */}
            <div className="flex items-center gap-5 mb-5">
              <div
                className="flex items-center justify-center font-typewriter font-bold rounded shrink-0"
                style={{
                  width: 80, height: 80,
                  border: `4px solid ${color}`,
                  color,
                  fontSize: '2.6rem',
                  transform: 'rotate(-8deg)',
                  boxShadow: `0 0 30px ${color}33`,
                }}
              >
                {grade}
              </div>
              <div>
                <p className="font-typewriter font-bold tracking-widest uppercase text-[1.3rem]" style={{ color }}>
                  {label}
                </p>
                <p className="font-nepali text-[#9a8870] text-[0.95rem]">
                  {nepali}
                </p>
                <p className="font-typewriter mt-2 text-[#5a4a3a] text-[0.68rem] max-w-[360px] leading-[1.6]">
                  {getFlavorText(grade)}
                </p>
              </div>
            </div>

            {/* Stats grid — 3 cols on desktop, 2 on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[
                { label: 'FINAL SCORE', value: String(stats.score), color: '#d4b030' },
                { label: 'ACCURACY', value: `${accuracy}%`, color: '#c8b89a' },
                { label: 'CORRECT', value: String(stats.correct), color: '#1a6b1a' },
                { label: 'INCORRECT', value: String(stats.incorrect), color: '#cc3333' },
                { label: 'BALLOTS REVIEWED', value: String(stats.totalSeen), color: '#9a8870' },
                { label: 'TIME ELAPSED', value: `${stats.timeElapsed}s`, color: '#9a8870' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded p-3 md:p-4 bg-black/30 border border-white/[0.04]"
                >
                  <p className="font-typewriter text-[#5a4a3a] text-[0.6rem] tracking-[0.1em]">
                    {s.label}
                  </p>
                  <p className="font-mono font-bold text-[1.6rem] leading-[1.2]" style={{ color: s.color }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Decision breakdown */}
            {stats.decisions.length > 0 && (
              <div className="mb-4 p-3 md:p-4 rounded bg-black/20 border border-white/[0.03]">
                <p className="font-typewriter mb-2 text-[#5a4a3a] text-[0.6rem] tracking-[0.1em]">
                  BALLOT DECISIONS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {stats.decisions.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded"
                      style={{
                        width: 24, height: 24,
                        background: d.correct ? 'rgba(0,77,0,0.4)' : 'rgba(139,0,0,0.4)',
                        border: `1px solid ${d.correct ? '#004d00' : '#8b0000'}`,
                      }}
                      title={`Ballot #${d.ballotId}: ${d.correct ? 'Correct' : 'Wrong'}`}
                    >
                      {d.correct
                        ? <FiCheckCircle size={12} className="text-[#4a9a4a]" />
                        : <FiXCircle size={12} className="text-[#cc4444]" />
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restart button */}
            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-3 py-3 md:py-4 rounded font-typewriter tracking-widest uppercase transition-all duration-200 bg-gold/10 border-2 border-gold text-gold-light text-[0.85rem] tracking-[0.2em] hover:bg-gold/20"
            >
              <FiRotateCcw size={16} />
              <span>ANOTHER SHIFT</span>
            </button>
          </div>

          {/* Right: Accuracy breakdown by type */}
          <div className="w-full md:w-[280px] md:shrink-0 rounded p-4 md:p-5 bg-ink/[0.95] border border-gold/20">
            <p className="font-typewriter mb-4 text-gold text-[0.68rem] tracking-[0.1em]">
              ERROR ANALYSIS
            </p>

            {/* Breakdown by invalid reason */}
            {(() => {
              const reasons: Record<string, { total: number; correct: number }> = {};
              for (const d of stats.decisions) {
                const key = d.invalidReason ?? 'valid';
                if (!reasons[key]) reasons[key] = { total: 0, correct: 0 };
                reasons[key].total++;
                if (d.correct) reasons[key].correct++;
              }
              const labels: Record<string, string> = {
                valid: 'VALID ballots',
                multiple_marks: 'Multiple marks',
                blank: 'Blank ballots',
                border_mark: 'Border marks',
                identifying_marks: 'ID marks',
                no_signature: 'No signature',
                torn: 'Torn ballots',
              };
              return Object.entries(reasons).map(([k, v]) => (
                <div key={k} className="mb-3">
                  <div className="flex justify-between mb-0.5">
                    <span className="font-typewriter text-[#7a6a5a] text-[0.62rem]">
                      {labels[k] ?? k}
                    </span>
                    <span className="font-typewriter text-[#9a8870] text-[0.62rem]">
                      {v.correct}/{v.total}
                    </span>
                  </div>
                  <div className="rounded overflow-hidden h-[5px] bg-white/[0.06]">
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.round((v.correct / v.total) * 100)}%`,
                        background: v.correct / v.total >= 0.7 ? '#004d00' : v.correct / v.total >= 0.5 ? '#8a6a00' : '#8b0000',
                      }}
                    />
                  </div>
                </div>
              ));
            })()}

            <div className="mt-5 pt-4 border-t border-gold/10">
              <div className="flex items-center gap-1.5 mb-4">
                <FiAward size={12} className="text-gold" />
                <p className="font-typewriter text-gold text-sm">RATING SCALE</p>
              </div>
              {[['S', '90%+ & 100+ pts', '#d4b030'], ['A', '80%+', '#1a6b1a'], ['B', '70%+', '#4a7a9a'],
              ['C', '60%+', '#8a6a00'], ['D', '50%+', '#8a4a00'], ['F', '<50%', '#8b0000']].map(([g, t, c]) => (
                <p key={g} className="font-typewriter text-[#5a4a3a] text-sm leading-[1.8]">
                  <span style={{ color: c as string }}>{g}</span> — {t}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
