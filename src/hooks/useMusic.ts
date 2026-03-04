import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

// "Mind Bender" by Eric Matyas — soundimage.org (royalty-free, free with attribution)
// import.meta.env.BASE_URL resolves to '/ballot-inspector/' in both dev and prod (from vite.config base)
const TRACK_SRC = `${import.meta.env.BASE_URL}music/bg.mp3`;
const VOLUME = 0.20;

export function useMusic() {
  const howlRef = useRef<Howl | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const howl = new Howl({
      src: [TRACK_SRC],
      loop: true,
      volume: 0,
      // html5: false (default) — Web Audio API gives Howler better autoplay-unlock control
    });

    const tryPlay = () => {
      if (!howl.playing()) {
        howl.play();
        howl.fade(0, VOLUME, 2000);
      }
    };

    // Start as soon as loaded; if autoplay is blocked the browser fires playerror
    howl.once('load', tryPlay);

    // Howler fires 'unlock' after the first user gesture — resume then
    howl.on('playerror', () => {
      howl.once('unlock', tryPlay);
    });

    howlRef.current = howl;

    return () => {
      const vol = howlRef.current?.volume() ?? 0;
      howl.fade(vol, 0, 400);
      setTimeout(() => { howl.stop(); howl.unload(); }, 450);
    };
  }, []);

  const toggleMute = () => {
    setMuted(prev => {
      const next = !prev;
      howlRef.current?.mute(next);
      return next;
    });
  };

  const pauseMusic = () => {
    const h = howlRef.current;
    if (h) h.fade(h.volume(), 0.05, 300);
  };

  const resumeMusic = () => {
    const h = howlRef.current;
    if (h) h.fade(h.volume(), VOLUME, 300);
  };

  return { muted, toggleMute, pauseMusic, resumeMusic };
}
