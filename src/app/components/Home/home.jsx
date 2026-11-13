'use client';

import { useState, useEffect, useRef } from 'react';

const names = [
  'luis eme',
  'λουίς εμέ',
  'louis eme',
  'луис эмм',
  'ルイス エム',
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρστυφχψωあいうえおカキクケコ';
const ROTATE_MS = 4200;
const SCRAMBLE_MS = 720;

function scrambleToward(target, progress) {
  const locked = Math.floor(progress * target.length);
  let out = '';
  for (let i = 0; i < target.length; i += 1) {
    if (target[i] === ' ') {
      out += ' ';
      continue;
    }
    if (i < locked) {
      out += target[i];
      continue;
    }
    out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return out;
}

export default function Home() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [displayName, setDisplayName] = useState(names[0]);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrambleRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const interval = setInterval(() => {
        setCurrentNameIndex((prev) => {
          const next = (prev + 1) % names.length;
          setDisplayName(names[next]);
          return next;
        });
      }, ROTATE_MS);
      return () => clearInterval(interval);
    }

    const interval = setInterval(() => {
      setCurrentNameIndex((prev) => {
        const next = (prev + 1) % names.length;
        const target = names[next];
        const start = performance.now();

        if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current);

        const tick = (now) => {
          const progress = Math.min(1, (now - start) / SCRAMBLE_MS);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayName(progress >= 1 ? target : scrambleToward(target, eased));
          if (progress < 1) {
            scrambleRef.current = requestAnimationFrame(tick);
          }
        };

        scrambleRef.current = requestAnimationFrame(tick);
        return next;
      });
    }, ROTATE_MS);

    return () => {
      clearInterval(interval);
      if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current);
    };
  }, [reducedMotion]);

  return (
    <div className="hero relative flex min-h-screen h-screen overflow-hidden">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-mesh" />
        <div className="hero-color-blob hero-color-blob-a" />
        <div className="hero-color-blob hero-color-blob-b" />
        <div className="hero-color-blob hero-color-blob-c" />
        <div className="grain-overlay" />
        <div className="grain-overlay grain-overlay-fine" />
      </div>

      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />
      <div className="grain-overlay grain-overlay-top" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-8 md:p-12 lg:p-16 text-center">
        <div className={`max-w-5xl hero-enter hero-enter-delay-1 ${mounted ? 'hero-enter-active' : ''}`}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight"
            aria-live="polite"
          >
            <span className="hero-name-glow inline-block min-h-[1.1em]">
              {displayName}
            </span>
          </h1>
          <div
            className={`hero-accent-line mx-auto mt-5 md:mt-6 hero-enter hero-enter-delay-2 ${mounted ? 'hero-enter-active' : ''}`}
            aria-hidden="true"
          />
          <p
            className={`font-mono text-xs md:text-sm tracking-[0.28em] uppercase text-white/50 mt-4 md:mt-5 hero-tagline hero-enter hero-enter-delay-3 ${mounted ? 'hero-enter-active' : ''}`}
          >
            creating stuff
          </p>
        </div>
      </div>
    </div>
  );
}
