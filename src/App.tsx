import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameStats } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const FADE_MS = 350;

export default function App() {
  const [screen, setScreen] = useState<GameState>('start');
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);
  const [visible, setVisible] = useState(false);
  const gameKeyRef = useRef(0);
  const pendingRef = useRef<{ screen: GameState; stats?: GameStats } | null>(null);

  // Initial entrance
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const go = useCallback((next: GameState, stats?: GameStats) => {
    pendingRef.current = { screen: next, stats };
    setVisible(false);
    setTimeout(() => {
      const p = pendingRef.current;
      if (!p) return;
      if (p.stats) setFinalStats(p.stats);
      if (p.screen === 'playing') gameKeyRef.current += 1;
      setScreen(p.screen);
      pendingRef.current = null;
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, FADE_MS);
  }, []);

  const handleStart    = useCallback(() => go('playing'), [go]);
  const handleEnd      = useCallback((stats: GameStats) => go('end', stats), [go]);
  const handleRestart  = useCallback(() => go('start'), [go]);

  return (
    <div
      className="transition-[opacity,transform] ease-in-out"
      style={{
        transitionDuration: `${FADE_MS}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(8px)',
      }}
    >
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'playing' && <GameScreen key={gameKeyRef.current} onEnd={handleEnd} />}
      {screen === 'end' && finalStats && <EndScreen stats={finalStats} onRestart={handleRestart} />}
    </div>
  );
}
