'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { cases, ui } from '../cases';

function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => setLanguage('es')}
        className={`px-4 py-2 text-md font-medium rounded-md transition-all duration-300 ${
          language === 'es'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Español
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 text-md font-medium rounded-md transition-all duration-300 ${
          language === 'en'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
}

function ScreenSlot({ photo, index, screen, viewFullLabel, onOpen, visible }) {
  return (
    <div
      className={`min-w-0 hero-enter ${visible ? 'hero-enter-active' : ''}`}
      style={{ transitionDelay: `${0.35 + index * 0.12}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#f4f1ec] group">
        {photo.src ? (
          <>
            <Image
              src={photo.src}
              alt={`${screen.step} · ${screen.title}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <button
              type="button"
              onClick={() => onOpen(index)}
              className="absolute inset-0 flex items-end justify-center bg-black/0 hover:bg-black/35 transition-colors duration-300"
            >
              <span className="mb-4 px-4 py-2 rounded-md bg-white/95 text-black text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {viewFullLabel}
              </span>
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-black/25">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
      <p className="mt-3 font-mono text-xs tracking-[0.2em] uppercase text-black/40">
        {screen.step}
      </p>
      <p className="text-lg font-bold text-black">{screen.title}</p>
      <p className="text-sm text-gray-600">{screen.detail}</p>
      {photo.src && (
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="mt-3 inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {viewFullLabel} →
        </button>
      )}
    </div>
  );
}

function Lightbox({ photo, screen, closeLabel, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={screen.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 md:top-8 md:right-8 z-10 px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-100 transition-colors"
      >
        {closeLabel}
      </button>

      <div
        className="relative w-full max-w-6xl max-h-[85vh] flex flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden rounded-lg bg-black/40">
          <Image
            src={photo.src}
            alt={`${screen.step} · ${screen.title}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <div className="mt-4 text-center text-white">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/55">
            {screen.step}
          </p>
          <p className="text-xl font-bold mt-1">{screen.title}</p>
          <p className="text-white/70 mt-1">{screen.detail}</p>
        </div>
      </div>
    </div>
  );
}

export default function AutomationCasePage() {
  const { slug } = useParams();
  const item = cases.find((entry) => entry.slug === slug);
  const [language, setLanguage] = useState('es');
  const [mounted, setMounted] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(null);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!item) {
    notFound();
  }

  const text = item[language];
  const labels = ui[language];
  const viewerPhoto = viewerIndex === null ? null : item.photos[viewerIndex];

  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
        >
          <Link
            href="/work/automations"
            className="inline-block text-lg text-blue-600 hover:text-blue-800"
          >
            ← {labels.title}
          </Link>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>

        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <div
            className={`px-6 md:px-8 pt-8 text-center hero-enter hero-enter-delay-1 ${mounted ? 'hero-enter-active' : ''}`}
          >
            <h2 className="text-2xl font-bold text-black mb-2">{text.client}</h2>
            <p className="text-lg mb-8 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {text.business}
            </p>
            <div className="max-w-3xl mx-auto text-left space-y-6">
              <div
                className={`hero-enter hero-enter-delay-2 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-xl font-bold text-black mb-2">{text.caseLabel}</h3>
                <p className="text-gray-600 text-lg">{text.caseText}</p>
              </div>
              <div
                className={`hero-enter hero-enter-delay-3 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-xl font-bold text-black mb-2">{text.solutionLabel}</h3>
                <p className="text-gray-600 text-lg">{text.solutionText}</p>
              </div>
              <div
                className={`hero-enter hero-enter-delay-4 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-xl font-bold text-black mb-2">{text.gainsLabel}</h3>
                <p className="text-gray-600 text-lg">{text.gainsText}</p>
              </div>
            </div>
          </div>

          <div
            className={`grid gap-6 p-6 md:p-8 ${
              item.photos.length === 1
                ? 'grid-cols-1 max-w-3xl mx-auto'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {item.photos.map((photo, index) => (
              <ScreenSlot
                key={photo.id}
                photo={photo}
                index={index}
                screen={text.screens[photo.id]}
                viewFullLabel={labels.viewFull}
                onOpen={setViewerIndex}
                visible={mounted}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-8 pb-8">
            {text.steps.map((step, index) => (
              <div
                key={step.name}
                className={`border-t border-gray-200 pt-4 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
                style={{ transitionDelay: `${0.85 + index * 0.1}s` }}
              >
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-black/40 mb-2">
                  0{index + 1}
                </p>
                <h3 className="text-xl font-bold text-black">{step.name}</h3>
                <p className="text-gray-600 mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      {viewerPhoto?.src && (
        <Lightbox
          photo={viewerPhoto}
          screen={text.screens[viewerPhoto.id]}
          closeLabel={labels.close}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
