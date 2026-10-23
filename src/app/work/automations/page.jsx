'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cases, ui } from './cases';

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

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 hero-enter ${mounted ? 'hero-enter-active' : ''}`}
        >
          <h1 className="text-6xl font-bold text-black">{text.title}</h1>
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
                  <h2 className="text-2xl font-bold text-black mb-2">{card.client}</h2>
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
      </div>
    </div>
  );
}
