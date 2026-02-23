import { useState, useCallback } from 'react';
import type { GameState, GameStats } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);

  const handleStart = useCallback(() => {
    setFinalStats(null);
    setGameState('playing');
  }, []);

  const handleEnd = useCallback((stats: GameStats) => {
    setFinalStats(stats);
    setGameState('end');
  }, []);

  const handleRestart = useCallback(() => {
    setGameState('start');
  }, []);

  return (
    <>
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen key={Date.now()} onEnd={handleEnd} />}
      {gameState === 'end' && finalStats && (
        <EndScreen stats={finalStats} onRestart={handleRestart} />
      )}
    </>
  );
}
