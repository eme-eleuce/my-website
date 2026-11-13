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

function CaseCopy({ value }) {
  if (Array.isArray(value)) {
    return (
      <ul className="mt-2 space-y-2 text-gray-600 text-base sm:text-lg leading-relaxed list-disc pl-5">
        {value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{value}</p>
  );
}

function ScreenSlot({ photo, index, screen, viewFullLabel, onOpen, visible, showCaptions = true }) {
  const alt = showCaptions && screen?.title
    ? `${screen.step} · ${screen.title}`
    : photo.id || `screen-${index + 1}`;

  return (
    <div
      className={`min-w-0 hero-enter ${visible ? 'hero-enter-active' : ''}`}
      style={{ transitionDelay: `${0.35 + index * 0.12}s` }}
    >
      <div className="relative aspect-[5/4] sm:aspect-[4/3] overflow-hidden rounded-lg bg-[#f4f1ec] group">
        {photo.src ? (
          <>
            <Image
              src={photo.src}
              alt={alt}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <button
              type="button"
              onClick={() => onOpen(index)}
              className="absolute inset-0 flex items-end justify-center bg-black/0 active:bg-black/25 sm:hover:bg-black/35 transition-colors duration-300"
            >
              <span className="mb-4 px-4 py-2 rounded-md bg-white/95 text-black text-sm font-medium opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
      {showCaptions && screen?.title && (
        <>
          <p className="mt-3 font-mono text-xs tracking-[0.2em] uppercase text-black/40">
            {screen.step}
          </p>
          <p className="text-lg font-bold text-black">{screen.title}</p>
          <p className="text-sm text-gray-600">{screen.detail}</p>
        </>
      )}
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

function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div
      className={`relative bg-[#1a1a1a] rounded-[1.65rem] sm:rounded-[2rem] md:rounded-[2.35rem] p-[0.38rem] sm:p-[0.45rem] md:p-[0.55rem] shadow-[0_18px_40px_rgba(0,0,0,0.35)] ring-1 ring-black/40 ${className}`}
    >
      <div className="absolute top-[0.45rem] sm:top-[0.55rem] left-1/2 z-10 h-[0.95rem] sm:h-[1.15rem] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.3rem] sm:rounded-[1.55rem] md:rounded-[1.85rem] bg-[#f4f1ec]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 42vw, 180px"
        />
      </div>
    </div>
  );
}

function DesktopPhoneShowcase({ cover, phone, client, visible, onOpenDesktop, onOpenPhone, viewFullLabel }) {
  return (
    <div
      className={`px-4 sm:px-6 md:px-8 pt-2 pb-4 hero-enter ${visible ? 'hero-enter-active' : ''}`}
      style={{ transitionDelay: '0.35s' }}
    >
      {/* Móvil: desktop y teléfono uno debajo del otro, sin cruce */}
      <div className="mx-auto w-full max-w-md space-y-4 sm:hidden">
        <button
          type="button"
          onClick={onOpenDesktop}
          className="relative block w-full overflow-hidden rounded-xl bg-[#ebe6df] aspect-[16/10] active:opacity-95"
          aria-label={viewFullLabel}
        >
          <Image
            src={cover}
            alt={client}
            fill
            className="object-cover object-left-top"
            sizes="100vw"
            priority
          />
        </button>

        <button
          type="button"
          onClick={onOpenPhone}
          className="mx-auto block w-[42%] max-w-[9.5rem] active:scale-[0.98] transition-transform"
          aria-label={viewFullLabel}
        >
          <PhoneFrame src={phone.src} alt={client} />
        </button>
      </div>

      {/* Escritorio: teléfono dentro de la imagen horizontal */}
      <div className="relative mx-auto hidden w-full max-w-3xl md:max-w-4xl overflow-hidden rounded-lg bg-[#ebe6df] sm:block">
        <div className="relative aspect-[16/10] md:aspect-[16/9]">
          <Image
            src={cover}
            alt={client}
            fill
            className="object-cover object-top"
            sizes="896px"
            priority
          />
          <button
            type="button"
            onClick={onOpenDesktop}
            className="absolute inset-0 z-[1] bg-black/0 hover:bg-black/20 transition-colors duration-300"
            aria-label={viewFullLabel}
          />
          <button
            type="button"
            onClick={onOpenPhone}
            className="absolute z-[2] right-4 bottom-4 md:right-6 md:bottom-5 w-[20%] max-w-[9.75rem] md:w-[17%] md:max-w-[10.5rem] transition-transform duration-500 hover:-translate-y-1 focus:outline-none"
            aria-label={viewFullLabel}
          >
            <PhoneFrame src={phone.src} alt={client} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ photo, screen, closeLabel, onClose, showCaptions = true }) {
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

  const label = showCaptions && screen?.title
    ? `${screen.step} · ${screen.title}`
    : photo.id || 'preview';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
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
            alt={label}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        {showCaptions && screen?.title && (
          <div className="mt-4 text-center text-white">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/55">
              {screen.step}
            </p>
            <p className="text-xl font-bold mt-1">{screen.title}</p>
            <p className="text-white/70 mt-1">{screen.detail}</p>
          </div>
        )}
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
  const showCaptions = item.imageCaptions !== false;
  const lightboxEntries = [
    ...(item.cover && item.phone
      ? [
          {
            src: item.cover,
            id: 'desktop',
            screen: showCaptions
              ? {
                  step: language === 'es' ? 'Escritorio' : 'Desktop',
                  title: text.client,
                  detail: text.business,
                }
              : null,
          },
          {
            src: item.phone.src,
            id: item.phone.id,
            screen: text.screens?.[item.phone.id] || null,
          },
        ]
      : []),
    ...item.photos.map((photo) => ({
      ...photo,
      screen: text.screens?.[photo.id] || null,
    })),
  ];
  const viewerEntry = viewerIndex === null ? null : lightboxEntries[viewerIndex];

  return (
    <div className="min-h-screen bg-white py-14 sm:py-20 px-4 sm:px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-8 sm:mb-12 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
        >
          <Link
            href="/work/automations"
            className="inline-block text-base sm:text-lg text-blue-600 hover:text-blue-800"
          >
            ← {labels.title}
          </Link>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>

        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <div
            className={`px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 text-center hero-enter hero-enter-delay-1 ${mounted ? 'hero-enter-active' : ''}`}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">{text.client}</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {text.business}
            </p>
            <div className="max-w-3xl mx-auto text-left space-y-5 sm:space-y-6">
              <div
                className={`hero-enter hero-enter-delay-2 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2">{text.caseLabel}</h3>
                <CaseCopy value={text.caseText} />
              </div>
              <div
                className={`hero-enter hero-enter-delay-3 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2">{text.solutionLabel}</h3>
                <CaseCopy value={text.solutionText} />
              </div>
              <div
                className={`hero-enter hero-enter-delay-4 ${mounted ? 'hero-enter-active' : ''}`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2">{text.gainsLabel}</h3>
                <CaseCopy value={text.gainsText} />
              </div>
            </div>
          </div>

          {item.phone && (
            <DesktopPhoneShowcase
              cover={item.cover}
              phone={item.phone}
              client={text.client}
              visible={mounted}
              viewFullLabel={labels.viewFull}
              onOpenDesktop={() => setViewerIndex(0)}
              onOpenPhone={() => setViewerIndex(1)}
            />
          )}

          {item.photos.length > 0 && (
            <div
              className={`grid gap-4 sm:gap-6 px-4 sm:px-6 md:p-8 md:pt-6 ${
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
                  screen={text.screens?.[photo.id]}
                  viewFullLabel={labels.viewFull}
                  showCaptions={showCaptions}
                  onOpen={(photoIndex) =>
                    setViewerIndex(
                      item.phone ? photoIndex + 2 : photoIndex
                    )
                  }
                  visible={mounted}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 md:px-8 pb-8 pt-6">
            {text.steps.map((step, index) => (
              <div
                key={step.name}
                className={`border-t border-gray-200 pt-4 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
                style={{ transitionDelay: `${0.85 + index * 0.1}s` }}
              >
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-black/40 mb-2">
                  0{index + 1}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-black">{step.name}</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{step.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      {viewerEntry?.src && (
        <Lightbox
          photo={viewerEntry}
          screen={viewerEntry.screen}
          showCaptions={showCaptions}
          closeLabel={labels.close}
          onClose={() => setViewerIndex(null)}
        />
      )}

    </div>
  );
}
