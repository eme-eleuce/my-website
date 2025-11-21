'use client';

import { useState, useEffect, useId, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ElectricBorder = ({ children, color = '#5227FF', speed = 1, chaos = 1, thickness = 2, className, style }) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }

    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach(a => {
        if (typeof a.beginElement === 'function') {
          try {
            a.beginElement();
          } catch {
            console.warn('ElectricBorder: beginElement failed');
          }
        }
      });
    });
  };

  useEffect(() => {
    updateAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, chaos]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inheritRadius = {
    borderRadius: style?.borderRadius ?? 'inherit'
  };

  const strokeStyle = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color
  };

  const glow1Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: hexToRgba(color, 0.6),
    filter: `blur(${0.5 + thickness * 0.25}px)`,
    opacity: 0.5
  };

  const glow2Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color,
    filter: `blur(${2 + thickness * 0.5}px)`,
    opacity: 0.5
  };

  const bgGlowStyle = {
    ...inheritRadius,
    transform: 'scale(1.08)',
    filter: 'blur(32px)',
    opacity: 0.3,
    zIndex: -1,
    background: `linear-gradient(-30deg, ${hexToRgba(color, 0.8)}, transparent, ${color})` 
  };

  return (
    <div ref={rootRef} className={'relative isolate ' + (className ?? '')} style={style}>
      <svg
        ref={svgRef}
        className="fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none"
        aria-hidden
        focusable="false"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
        <div ref={strokeRef} className="absolute inset-0 box-border" style={strokeStyle} />
        <div className="absolute inset-0 box-border" style={glow1Style} />
        <div className="absolute inset-0 box-border" style={glow2Style} />
        <div className="absolute inset-0" style={bgGlowStyle} />
      </div>

      <div className="relative h-full" style={inheritRadius}>
        {children}
      </div>
    </div>
  );
};

// Array modular de websites - puedes agregar más fácilmente
const websites = [
  {
    id: 1,
    client: 'Chalaco Films',
    business: 'Advertising',
    photo: '/webs/chalaco.png',
    link: 'https://www.chalacofilms.com/'
  },
  {
    id: 2,
    client: 'Pacchar',
    business: 'Sustainable Agriculture',
    photo: '/webs/pacchar.png',
    link: 'https://www.pacchar.com/es'
  },
  {
    id: 3,
    client: 'Carleche',
    business: 'Color Grading',
    photo: '/webs/carleche.png',
    link: 'https://www.carleche.com/'
  }
];

const plansData = {
  en: [
    {
      id: 1,
      name: 'Essential Website',
      price: 'from $80 USD',
      description: 'Perfect for small businesses, personal brands, or simple online presence.',
      features: [
        'Up to 3 sections (Home, About, Contact)',
        'Mobile-friendly responsive design',
        'Basic SEO setup',
        'Custom design',
        'Free Hosting'
      ],
      delivery: '7–10 days',
      whatsIncluded: 'What\'s included:',
      deliveryLabel: 'Delivery:',
      getStarted: 'Get Started',
      mostPopular: 'Most Popular'
    },
    {
      id: 2,
      name: 'Professional Website',
      price: 'from $250 USD',
      description: 'Best for brands that need a polished, fully-featured website.',
      features: [
        'Up to 5 sections',
        'Custom design + branding elements',
        'Booking/Chat Integration',
        'SEO optimization',
        'Integration with social media'
      ],
      delivery: '2–3 weeks',
      popular: true,
      whatsIncluded: 'What\'s included:',
      deliveryLabel: 'Delivery:',
      getStarted: 'Get Started',
      mostPopular: 'Most Popular'
    },
    {
      id: 3,
      name: 'E-Commerce Website',
      price: 'from $800 USD',
      description: 'For businesses that want to sell products online.',
      features: [
        'Online store setup (Shop, Checkout, Payments)',
        'Up to 20 products added',
        'Secure payment integration (Stripe, PayPal, etc.)',
        'Inventory management',
        'SEO + analytics'
      ],
      delivery: '3–6 weeks',
      whatsIncluded: 'What\'s included:',
      deliveryLabel: 'Delivery:',
      getStarted: 'Get Started',
      mostPopular: 'Most Popular'
    }
  ],
  es: [
    {
      id: 1,
      name: 'Sitio Web Esencial',
      price: 'desde $80 USD',
      description: 'Perfecto para pequeñas empresas, marcas personales o presencia online simple.',
      features: [
        'Hasta 3 secciones (Inicio, Acerca de, Contacto)',
        'Diseño responsive para móviles',
        'Configuración básica de SEO',
        'Diseño personalizado',
        'Hosting gratuito'
      ],
      delivery: '7–10 días',
      whatsIncluded: 'Qué incluye:',
      deliveryLabel: 'Entrega:',
      getStarted: 'Comenzar',
      mostPopular: 'Más Popular'
    },
    {
      id: 2,
      name: 'Sitio Web Profesional',
      price: 'desde $250 USD',
      description: 'Ideal para marcas que necesitan un sitio web completo y pulido.',
      features: [
        'Hasta 5 secciones',
        'Diseño personalizado + elementos de marca',
        'Integración de Reservas/Chat',
        'Optimización SEO',
        'Integración con redes sociales'
      ],
      delivery: '2–3 semanas',
      popular: true,
      whatsIncluded: 'Qué incluye:',
      deliveryLabel: 'Entrega:',
      getStarted: 'Comenzar',
      mostPopular: 'Más Popular'
    },
    {
      id: 3,
      name: 'Sitio Web E-Commerce',
      price: 'desde $800 USD',
      description: 'Para negocios que quieren vender productos en línea.',
      features: [
        'Configuración de tienda online (Tienda, Checkout, Pagos)',
        'Hasta 20 productos agregados',
        'Integración de pagos seguros (Stripe, PayPal, etc.)',
        'Gestión de inventario',
        'SEO + analíticas'
      ],
      delivery: '3–6 semanas',
      whatsIncluded: 'Qué incluye:',
      deliveryLabel: 'Entrega:',
      getStarted: 'Comenzar',
      mostPopular: 'Más Popular'
    }
  ]
};

const translations = {
  en: {
    addOnsTitle: 'Optional Add-Ons',
    addOns: [
      { name: 'Monthly maintenance', price: 'from $30/mo' },
      { name: 'Extra sections', price: 'from $15 each' },
      { name: 'Product upload (e-commerce)', price: 'from $3 per product' },
      { name: 'Design Assets', price: 'from $20' },
      { name: 'Logo design', price: 'from $50' }
    ]
  },
  es: {
    addOnsTitle: 'Complementos Opcionales',
    addOns: [
      { name: 'Mantenimiento mensual', price: 'desde $30/mes' },
      { name: 'Secciones extra', price: 'desde $15 cada una' },
      { name: 'Carga de productos (e-commerce)', price: 'desde $3 por producto' },
      { name: 'Recursos de diseño', price: 'desde $20' },
      { name: 'Diseño de logo', price: 'desde $50' }
    ]
  }
};

export default function WebsitesPage() {
  const [activeTab, setActiveTab] = useState('plans');
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mt-10 mb-12">
          
          
          {/* Navigation Bar */}
          <div className="flex justify-center gap-4 mb-15">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-8 py-3 text-xl font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'plans'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Plans
            </button>
            <button
              onClick={() => setActiveTab('websites')}
              className={`px-8 py-3 text-xl font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'websites'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Websites
            </button>
          </div>

          {/* Language Selector - Only for Plans */}
          {activeTab === 'plans' && (
            <div className="flex justify-center gap-2 mt-6">
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
            </div>
          )}
        </div>

        {/* Websites Section */}
        {activeTab === 'websites' && (
          <>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-black mb-12">
              Active Websites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((website) => (
              <div 
                key={website.id}
                className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <a 
                  href={website.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-80 w-full overflow-hidden"
                >
                  <Image
                    src={website.photo}
                    alt={`${website.client} website`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </a>

                {/* Info Below Image */}
                <div className="bg-white p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {website.client}
                  </h3>
                  <p className="text-lg mb-4 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {website.business}
                  </p>
                  <a
                    href={website.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            ))}
            </div>
          </>
        )}

        {/* Plans Section */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plansData[language].map((plan) => {
              const cardContent = (
                <div 
                  className={`relative rounded-2xl shadow-xl p-8 flex flex-col h-full ${
                    plan.popular ? '' : 'border border-gray-200'
                  }`}
                >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                    {plan.mostPopular}
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-4xl md:text-3xl font-bold text-black mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-4">
                    {plan.price}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-black mb-3 text-lg">{plan.whatsIncluded}</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 text-xl">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <p className="text-gray-600 text-center">
                    <span className="font-semibold">{plan.deliveryLabel}</span> {plan.delivery}
                  </p>
                </div>

                <a
                  href={`https://wa.me/5930968572318?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20plan`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 text-center"
                >
                  {plan.getStarted}
                </a>
                </div>
              );

              return plan.popular ? (
                <ElectricBorder
                  key={plan.id}
                  color="#9333ea"
                  speed={1}
                  chaos={0.8}
                  thickness={4}
                  className="h-full"
                  style={{ borderRadius: '0.1rem' }}
                >
                  {cardContent}
                </ElectricBorder>
              ) : (
                <div key={plan.id} className="h-full">{cardContent}</div>
              );
            })}
          </div>
        )}

        {/* Optional Add-Ons Section */}
        {activeTab === 'plans' && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-center text-black mb-8">
                {translations[language].addOnsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {translations[language].addOns.map((addon, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-purple-600 text-2xl">+</span>
                    <div>
                      <h3 className="font-semibold text-black text-lg">{addon.name}</h3>
                      <p className="text-gray-600">{addon.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
