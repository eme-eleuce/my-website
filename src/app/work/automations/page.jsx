'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER, cases, ui } from './cases';

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

export default function AutomationsPage() {
  const [language, setLanguage] = useState('es');
  const [mounted, setMounted] = useState(false);
  const text = ui[language];
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.whatsappMessage)}`;

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-white py-14 sm:py-20 px-4 sm:px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black px-2 break-words">
            {text.title}
          </h1>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const card = item[language];
            return (
              <Link
                key={item.slug}
                href={`/work/automations/${item.slug}`}
                className={`group overflow-hidden rounded-lg shadow-lg transition-all duration-300 bg-white hero-enter ${mounted ? 'hero-enter-active' : ''}`}
                style={{ transitionDelay: `${0.2 + index * 0.12}s` }}
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#f4f1ec]">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={card.client}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-sm tracking-[0.25em] uppercase text-black/25">
                        01
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-white p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-2 break-words">
                    {card.client}
                  </h2>
                  <p className="text-lg mb-4 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {card.business}
                  </p>
                  <span className="inline-block text-blue-600 group-hover:text-blue-800 font-medium text-lg transition-colors">
                    {text.seeCase}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div
          className={`mt-16 md:mt-20 max-w-2xl mx-auto text-center border-t border-gray-200 pt-12 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
          style={{ transitionDelay: `${0.2 + cases.length * 0.12}s` }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            {text.moreInfoTitle}
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">
            {text.moreInfoText}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-white font-semibold hover:bg-[#1ebe57] transition-colors duration-300"
          >
            <FaWhatsapp size={22} aria-hidden="true" />
            {text.moreInfoCta}
          </a>
        </div>
      </div>
    </div>
  );
}
