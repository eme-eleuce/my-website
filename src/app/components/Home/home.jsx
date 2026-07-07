'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const names = [
  'luis eme',
  'λουίς εμέ',
  'louis eme',
  'луис эмм',
  'ルイス エム',
];

const ROTATE_MS = 4500;
const FADE_MS = 700;

export default function Home() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNameIndex((prev) => (prev + 1) % names.length);
        setIsVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const px = (mouse.x - 0.5) * 28;
  const py = (mouse.y - 0.5) * 28;

  return (
    <div className="hero relative flex min-h-screen h-screen overflow-hidden">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-mesh" />
      </div>

      <div
        className="hero-orb hero-orb-1"
        style={{ transform: `translate(${px * 0.6}px, ${py * 0.6}px)` }}
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-2"
        style={{ transform: `translate(${-px * 0.4}px, ${-py * 0.4}px)` }}
        aria-hidden="true"
      />
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-8 md:p-12 lg:p-16 text-center">
        <div className="max-w-4xl">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none hero-enter hero-enter-delay-1 ${mounted ? 'hero-enter-active' : ''}`}
          >
            <span
              className={`inline-block transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              {names[currentNameIndex]}
            </span>
          </h1>
          <p
            className={`font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-white/45 mt-5 md:mt-6 hero-enter hero-enter-delay-2 ${mounted ? 'hero-enter-active' : ''}`}
          >
            creating stuff
          </p>
        </div>

        <Link
          href="/work/websites"
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group hero-enter hero-enter-delay-3 ${mounted ? 'hero-enter-active' : ''}`}
          aria-label="Explore work"
        >
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-white/35 group-hover:text-white/60 transition-colors duration-300">
            explore
          </span>
          <div className="scroll-line" />
        </Link>
      </div>
    </div>
  );
}
