import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { BallotData, GameStats, PlayerDecision } from "../types";
import { generateBallotQueue } from "../data/ballotGenerator";
import BallotDisplay from "./BallotDisplay";
import Timer from "./Timer";
import RulesReference from "./RulesReference";
import FeedbackOverlay from "./FeedbackOverlay";
import { FiCheckCircle, FiXCircle, FiFileText, FiUser, FiPause, FiPlay, FiVolume2, FiVolumeX } from "react-icons/fi";
import { GiStamper } from "react-icons/gi";

const TOTAL_BALLOTS = 25;
const INITIAL_TIME = 120;
const CORRECT_BONUS = 2;
const WRONG_PENALTY = 8;

interface VoterProfile {
  name: string;
  age: number;
  district: string;
  face: string; // emoji
  voterId: string;
}

const VOTER_POOL: Omit<VoterProfile, "age" | "voterId">[] = [
  { name: "Ram Bahadur Thapa", face: "👨", district: "Kathmandu" },
  { name: "Sita Kumari Sharma", face: "👩", district: "Lalitpur" },
  { name: "Krishna Pd. Adhikari", face: "👴", district: "Bhaktapur" },
  { name: "Laxmi Devi Gurung", face: "👵", district: "Kaski" },
  { name: "Bimal Raj Shrestha", face: "🧑", district: "Chitwan" },
  { name: "Sunita Rai", face: "👩", district: "Morang" },
  { name: "Hari Bahadur Karki", face: "👨", district: "Sunsari" },
  { name: "Manita Tamang", face: "👧", district: "Nuwakot" },
  { name: "Ganesh Pd. Poudel", face: "👴", district: "Gorkha" },
  { name: "Saraswati Devi Yadav", face: "👵", district: "Siraha" },
  { name: "Nabin Khadka", face: "👦", district: "Rupandehi" },
  { name: "Puja Magar", face: "👧", district: "Palpa" },
  { name: "Rajendra Prasad Shah", face: "👨", district: "Bara" },
  { name: "Kamala Kumari Tiwari", face: "👩", district: "Parsa" },
  { name: "Dipak Bahadur Rana", face: "🧑", district: "Dang" },
  { name: "Rekha Chaudhary", face: "👩", district: "Kailali" },
  { name: "Bikram Singh Basnet", face: "👨", district: "Jumla" },
  { name: "Gita Limbu", face: "👧", district: "Taplejung" },
  { name: "Suman Ale Magar", face: "🧑", district: "Myagdi" },
  { name: "Savita Pandey", face: "👩", district: "Dadeldhura" },
];

function randomVoter(seed: number): VoterProfile {
  const base = VOTER_POOL[seed % VOTER_POOL.length];
  return {
    ...base,
    age: 18 + ((seed * 7 + 13) % 55),
    voterId: `NEC-${String((seed * 3947 + 1021) % 99999).padStart(5, "0")}`,
  };
}

interface Props {
  onEnd: (stats: GameStats) => void;
  onHome?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  muted?: boolean;
  onToggleMute?: () => void;
}

export default function GameScreen({ onEnd, onHome, onPause, onResume, muted = false, onToggleMute }: Props) {
  const [ballots] = useState<BallotData[]>(() =>
    generateBallotQueue(TOTAL_BALLOTS),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correct: 0,
    incorrect: 0,
    totalSeen: 0,
    decisions: [],
    timeElapsed: 0,
  });
  const [feedback, setFeedback] = useState<{
    show: boolean;
    correct: boolean;
    message: string;
  }>({
    show: false,
    correct: false,
    message: "",
  });
  const [ballotAnim, setBallotAnim] = useState<"in" | "out" | "idle">("in");
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [ballotContainerHeight, setBallotContainerHeight] = useState(0);
  const ballotContainerRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());
  // Always-fresh ref so the end-game effect never captures stale stats
  const statsRef = useRef<GameStats>(stats);
  statsRef.current = stats;
  // Guard so we only call onEnd once
  const gameEndedRef = useRef(false);

  const currentBallot: BallotData | undefined = ballots[currentIdx];
  const done = currentIdx >= ballots.length;
  const voter = useMemo(() => randomVoter(currentIdx), [currentIdx]);

  // Mobile detection + ballot container height measurement
  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768);
      if (ballotContainerRef.current) {
        setBallotContainerHeight(ballotContainerRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handler);
    // Initial measurement
    requestAnimationFrame(() => {
      if (ballotContainerRef.current) {
        setBallotContainerHeight(ballotContainerRef.current.clientHeight);
      }
    });
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Timer countdown — stops while paused
  useEffect(() => {
    if (done || gameEndedRef.current || paused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [done, paused]);

  // End game — reads stats via ref so it's never stale
  useEffect(() => {
    if ((timeLeft === 0 || done) && !gameEndedRef.current) {
      gameEndedRef.current = true;
      clearInterval(timerRef.current!);
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      // Small delay so any in-flight feedback animation finishes
      setTimeout(() => {
        onEnd({ ...statsRef.current, timeElapsed: elapsed });
      }, 700);
    }
  }, [timeLeft, done, onEnd]);

  const togglePause = useCallback(() => {
    if (done || timeLeft === 0 || gameEndedRef.current) return;
    setPaused((p) => {
      const next = !p;
      if (next) onPause?.();
      else onResume?.();
      return next;
    });
  }, [done, timeLeft, onPause, onResume]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        togglePause();
        return;
      }
      if (locked || paused) return;
      if (e.key === "v" || e.key === "V") decide("valid");
      if (e.key === "i" || e.key === "I") decide("invalid");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const decide = useCallback(
    (decision: "valid" | "invalid") => {
      if (
        locked ||
        !currentBallot ||
        done ||
        timeLeft === 0 ||
        gameEndedRef.current
      )
        return;
      setLocked(true);

      const correct =
        decision === (currentBallot.isValid ? "valid" : "invalid");
      const timeDelta = correct ? CORRECT_BONUS : -WRONG_PENALTY;
      const scoreDelta = correct ? 10 : -5;

      const d: PlayerDecision = {
        ballotId: currentBallot.id,
        decision,
        correct,
        invalidReason: currentBallot.invalidReason,
      };

      setStats((s) => ({
        ...s,
        score: Math.max(0, s.score + scoreDelta),
        correct: s.correct + (correct ? 1 : 0),
        incorrect: s.incorrect + (correct ? 0 : 1),
        totalSeen: s.totalSeen + 1,
        decisions: [...s.decisions, d],
      }));

      setTimeLeft((t) => Math.max(0, Math.min(INITIAL_TIME, t + timeDelta)));

      setFeedback({
        show: true,
        correct,
        message: currentBallot.invalidReasonDisplay ?? "",
      });
    },
    [locked, currentBallot, done, timeLeft],
  );

  const handleFeedbackDone = useCallback(() => {
    setFeedback({ show: false, correct: false, message: "" });
    setBallotAnim("out");
    setTimeout(() => {
      setCurrentIdx((i) => i + 1);
      setBallotAnim("in");
      setLocked(false);
    }, 400);
  }, []);

  const accuracy =
    stats.totalSeen > 0
      ? Math.round((stats.correct / stats.totalSeen) * 100)
      : 0;

  const statsItems = [
    { label: "SCORE", value: String(stats.score), color: "#d4b030" },
    { label: "CORRECT", value: String(stats.correct), color: "#2a9a2a" },
    { label: "WRONG", value: String(stats.incorrect), color: "#ee4444" },
    { label: "ACC.", value: `${accuracy}%`, color: "#c8b89a" },
  ];

  const btnDisabled = locked || paused || done || timeLeft === 0;

  return (
    <div className="h-[100dvh] w-screen desk-surface flex flex-col overflow-hidden relative">
      <div className="scanlines" />

      {/* ── Desktop Top bar ── */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 shrink-0 bg-desk/[0.97] border-b border-gold/25">
        <button
          onClick={onHome}
          className="flex items-center gap-4 group hover:opacity-75 transition-opacity duration-150"
          title="Back to home"
        >
          <GiStamper size={22} className="text-gold" />
          <div className="text-left">
            <p className="font-mono tracking-widest uppercase text-gold text-[0.78rem]">
              Ballot Inspector
            </p>
            <p className="font-mono text-[#5a4a3a] text-[0.68rem] mt-0.5">
              Ballot Validation Station
            </p>
          </div>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={togglePause}
            title={paused ? "Resume [P]" : "Pause [P]"}
            className="flex items-center justify-center w-7 h-7 rounded border border-gold/25 bg-black/20 hover:bg-gold/10 transition-colors duration-150 text-gold/60 hover:text-gold"
          >
            {paused ? <FiPlay size={13} /> : <FiPause size={13} />}
          </button>
          <Timer timeLeft={timeLeft} totalTime={INITIAL_TIME} />
          <button
            onClick={onToggleMute}
            title={muted ? "Unmute music" : "Mute music"}
            className="flex items-center justify-center w-7 h-7 rounded border border-gold/25 bg-black/20 hover:bg-gold/10 transition-colors duration-150 text-gold/60 hover:text-gold"
            style={{ color: muted ? 'rgba(184,150,12,0.3)' : undefined }}
          >
            {muted ? <FiVolumeX size={13} /> : <FiVolume2 size={13} />}
          </button>
        </div>

        <div className="flex items-center gap-5">
          {statsItems.map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-[#cec7b4] text-[0.65rem] tracking-[0.08em]">
                {label}
              </p>
              <p
                className="font-mono font-bold text-[1.25rem] leading-none"
                style={{ color }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Top bar — single row: brand | stats | timer ── */}
      <div
        className="flex md:hidden items-center justify-between shrink-0 px-3 gap-2 bg-desk/[0.97] border-b border-gold/25 pb-[10px]"
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <button
          onClick={onHome}
          className="flex items-center gap-1 shrink-0 pt-[10px] hover:opacity-75 transition-opacity duration-150"
          title="Back to home"
        >
          <GiStamper size={15} className="text-gold" />
        </button>
        <div className="flex items-center gap-4 pt-[10px]">
          {statsItems.map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-[#cec7b4] text-[0.48rem] tracking-[0.04em]">
                {label}
              </p>
              <p
                className="font-mono font-bold text-[0.88rem] leading-none"
                style={{ color }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-[10px]">
          <Timer timeLeft={timeLeft} totalTime={INITIAL_TIME} compact />
          <button
            onClick={togglePause}
            title={paused ? "Resume" : "Pause"}
            className="flex items-center justify-center w-7 h-7 rounded border border-gold/25 bg-black/20 text-gold/60 active:bg-gold/10"
          >
            {paused ? <FiPlay size={11} /> : <FiPause size={11} />}
          </button>
          <button
            onClick={onToggleMute}
            title={muted ? "Unmute" : "Mute"}
            className="flex items-center justify-center w-7 h-7 rounded border border-gold/25 bg-black/20 active:bg-gold/10"
            style={{ color: muted ? 'rgba(184,150,12,0.3)' : 'rgba(184,150,12,0.6)' }}
          >
            {muted ? <FiVolumeX size={11} /> : <FiVolume2 size={11} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Voter Strip ── */}
      <div className="flex md:hidden shrink-0 items-center gap-3 px-3 py-3 bg-[rgba(20,12,5,0.95)] border-b border-gold/[0.15]">
        <div className="text-[2.2rem] leading-none grayscale brightness-[0.72] contrast-[1.1] select-none shrink-0">
          {voter.face}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono font-bold truncate text-[#d4c8b0] text-[0.72rem]">
            {voter.name}
          </p>
          <p className="font-mono text-[#cec7b4]/80 text-[0.6rem]">
            Age {voter.age} · {voter.district}
          </p>
        </div>
        <div className="rounded px-2 py-1 shrink-0 bg-black/40 border border-white/[0.04]">
          <p className="font-mono text-[#cec7b4]/60 text-[0.55rem] tracking-[0.08em]">
            {voter.voterId}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <FiFileText size={12} className="text-[#cec7b4]" />
          <span className="font-typewriter text-[0.72rem] text-[#cec7b4]/80">
            {Math.min(currentIdx + 1, ballots.length)}/{ballots.length}
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 overflow-hidden md:gap-3 md:px-3 md:py-2">
        {/* Left sidebar — desktop only */}
        <div className="hidden md:flex shrink-0 flex-col gap-2 w-[15rem]">
          <RulesReference />
          
          {/* Creator credit */}
          <a
            href="https://www.animeshbasnet.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group flex items-center justify-center gap-2 py-2.5 pr-6 rounded no-underline bg-desk/[0.85] border border-gold/[0.18] group"
          >
            <img
              src="https://github.com/crypticsy.png"
              alt="Crypticsy"
              className="rounded-full shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200 w-7 h-7 group-hover:ring-2 group-hover:ring-gold"
            />
            <div className="flex gap-2 tems-start mt-1 items-center">
              <p className="font-mono text-[#9e947d] text-[0.58rem] tracking-[0.08em]">
                CREATED BY
              </p>
              <p className="font-mono group-hover:text-amber-400 transition-colors duration-200 text-[#9e947d] text-[0.68rem] tracking-[0.06em]">
                Crypticsy
              </p>
            </div>
          </a>
        </div>

        {/* Center — ballot */}
        <div className="flex-1 flex flex-col items-center overflow-hidden py-2 md:py-0">
          <div
            ref={ballotContainerRef}
            className="ballot-scroll-area flex-1 flex flex-col items-center justify-center overflow-hidden w-full"
          >
            {currentBallot && !gameEndedRef.current && (
              <div
                className={`relative max-w-[540px] w-full px-2 md:px-0 ${
                  ballotAnim === "in"
                    ? "animate-slideIn"
                    : ballotAnim === "out"
                      ? "animate-slideOut"
                      : ""
                }`}
              >
                <div
                  className={`${feedback.show || paused ? "opacity-10" : "opacity-100"} transition-opacity duration-200`}
                >
                  <BallotDisplay
                    ballot={currentBallot}
                    compact={isMobile}
                    containerHeight={
                      ballotContainerHeight > 0
                        ? ballotContainerHeight - 16
                        : undefined
                    }
                  />
                </div>
                <FeedbackOverlay
                  show={feedback.show}
                  correct={feedback.correct}
                  message={feedback.message}
                  onDone={handleFeedbackDone}
                />

                {/* Pause overlay */}
                {paused && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded"
                    style={{ background: 'rgba(10,5,2,0.82)', backdropFilter: 'blur(2px)', zIndex: 50 }}
                  >
                    <p className="font-mono tracking-[0.3em] uppercase text-gold text-[0.7rem]">
                      — SHIFT SUSPENDED —
                    </p>
                    <button
                      onClick={togglePause}
                      className="flex items-center gap-2 px-5 py-2.5 rounded font-typewriter tracking-[0.2em] uppercase text-[0.78rem] border-2 border-gold text-gold bg-gold/10 hover:bg-gold/20 transition-colors duration-150"
                    >
                      <FiPlay size={14} />
                      RESUME
                    </button>
                    <p className="font-mono text-[#5a4a3a] text-[0.58rem] tracking-[0.1em]">
                      [P] or [ESC]
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right sidebar — desktop only */}
        <div className="hidden md:flex shrink-0 flex-col items-center gap-2 w-[195px]">
            {/* Ballot progress tracker */}
          <div className="w-full px-3 py-3 rounded bg-desk/[0.85] border border-gold/[0.18]">
            <p className="font-mono mb-2 text-gold text-[0.68rem] tracking-[0.1em]">
              BALLOT QUEUE
            </p>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: ballots.length }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: 10,
                    height: 13,
                    background:
                      i < currentIdx
                        ? stats.decisions[i]?.correct
                          ? "rgba(0,120,0,0.65)"
                          : "rgba(180,0,0,0.55)"
                        : i === currentIdx
                          ? "#b8960c"
                          : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Voter ID card */}
          <div
            className="w-full rounded overflow-hidden bg-[rgba(20,12,5,0.92)] border border-gold/30"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border-b border-gold/20">
              <FiUser size={10} className="text-gold" />
              <span className="font-typewriter tracking-widest uppercase text-gold text-[0.58rem]">
                VOTER PRESENTING
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 px-3 py-3 mt-2">
              <div className="text-[3rem] leading-none grayscale brightness-[0.72] contrast-[1.1] select-none">
                {voter.face}
              </div>

              <div className="text-center w-full">
                <p className="font-mono font-bold leading-tight text-[#d4c8b0] text-[0.72rem] break-words">
                  {voter.name}
                </p>
                <p className="font-mono mt-0.5 text-[#cec7b4]/70 text-[0.6rem]">
                  Age {voter.age} · {voter.district}
                </p>
              </div>

              <div className="w-full text-center rounded px-2 py-1 bg-black/30 border border-white/[0.04]">
                <p className="font-mono text-[#cec7b4]/60 text-[0.6rem] tracking-[0.1em]">
                  {voter.voterId}
                </p>
              </div>
            </div>
          </div>

          <p className="font-mono mt-6 text-gold text-[0.66rem] tracking-[0.12em]">
            YOUR VERDICT
          </p>

          {/* VALID */}
          <button
            className="stamp-btn-valid rounded w-full flex flex-col items-center gap-1 py-2.5 px-3 disabled:opacity-[0.45] disabled:cursor-not-allowed"
            onClick={() => decide("valid")}
            disabled={btnDisabled}
          >
            <FiCheckCircle size={26} />
            <span className="text-[0.95rem] tracking-[0.22em]">
              VALID
            </span>
            <span className="font-nepali text-[0.6rem] tracking-[0.08em] opacity-75">
              मान्य मतपत्र
            </span>
          </button>

          <div className="w-[55%] h-px bg-white/[0.06]" />

          {/* INVALID */}
          <button
            className="stamp-btn-invalid rounded w-full flex flex-col items-center gap-1 py-2.5 px-3 disabled:opacity-[0.45] disabled:cursor-not-allowed"
            onClick={() => decide("invalid")}
            disabled={btnDisabled}
          >
            <FiXCircle size={26} />
            <span className="text-[0.95rem] tracking-[0.22em]">
              INVALID
            </span>
            <span className="font-nepali text-[0.6rem] tracking-[0.08em] opacity-75">
              अमान्य मतपत्र
            </span>
          </button>

          <div className="text-center mt-6">
            <p className="font-mono text-[#cec7b4] text-[0.62rem] leading-[1.8]">
              Correct:{" "}
              <span className="text-[#22cc44]">+{CORRECT_BONUS}s</span>
              <br />Wrong:{" "}
              <span className="text-[#ee3333]">−{WRONG_PENALTY}s</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile verdict buttons ── */}
      <div
        className="flex md:hidden shrink-0 border-t border-gold/[0.18] bg-[rgba(10,5,2,0.97)]"
        style={{
          paddingBottom: "max(6px, env(safe-area-inset-bottom))",
        }}
      >
        <button
          className={`flex-1 flex flex-row items-center justify-center gap-2 py-5 font-typewriter font-bold tracking-widest uppercase select-none transition-all duration-150 active:scale-95 text-[#22cc44] border-r border-white/[0.08] disabled:opacity-[0.45] disabled:cursor-not-allowed ${btnDisabled ? "bg-[rgba(34,204,68,0.03)]" : "bg-[rgba(34,204,68,0.08)]"}`}
          onClick={() => decide("valid")}
          disabled={btnDisabled}
        >
          <FiCheckCircle size={26} />
          <span className="text-[1rem] tracking-[0.18em]">
            VALID
          </span>
        </button>
        <button
          className={`flex-1 flex flex-row items-center justify-center gap-2 py-5 font-typewriter font-bold tracking-widest uppercase select-none transition-all duration-150 active:scale-95 text-[#ee3333] disabled:opacity-[0.45] disabled:cursor-not-allowed ${btnDisabled ? "bg-[rgba(238,51,51,0.03)]" : "bg-[rgba(238,51,51,0.08)]"}`}
          onClick={() => decide("invalid")}
          disabled={btnDisabled}
        >
          <FiXCircle size={26} />
          <span className="text-[1rem] tracking-[0.18em]">
            INVALID
          </span>
        </button>
      </div>


    </div>
  );
}
