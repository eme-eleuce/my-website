'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const workLinks = [
  { href: '/work/websites', label: 'websites' },
  { href: '/work/automations', label: 'automations' },
  { href: '/work/photography', label: 'photography' },
  { href: '/work/posters', label: 'posters' },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [workDropdown, setWorkDropdown] = useState(false);
  const workMenuRef = useRef(null);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const closeMobile = () => {
    setNav(false);
    setWorkDropdown(false);
  };

  useEffect(() => {
    setWorkDropdown(false);
    setNav(false);
  }, [pathname]);

  useEffect(() => {
    if (!workDropdown || nav) return;

    const closeOnOutside = (event) => {
      if (workMenuRef.current && !workMenuRef.current.contains(event.target)) {
        setWorkDropdown(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setWorkDropdown(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [workDropdown, nav]);

  useEffect(() => {
    if (!nav) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [nav]);

  useEffect(() => {
    const changeColor = () => {
      const isScrolled = window.scrollY >= 90;
      setScrolled(isScrolled);
      setTextColor(isScrolled ? '#000000' : isHomePage ? '#ffffff' : '#000000');
    };

    changeColor();
    window.addEventListener('scroll', changeColor);
    return () => window.removeEventListener('scroll', changeColor);
  }, [isHomePage]);

  const navClassName = scrolled
    ? 'backdrop-blur-md bg-white/85 shadow-sm'
    : 'bg-transparent';

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navClassName}`}>
      <div className="max-w-[1240px] m-auto flex justify-center items-center p-4 py-3 text-[#E9E9EB] relative z-[60]">
        <ul style={{ color: textColor }} className="hidden sm:flex gap-10 md:gap-14">
          <li className="p-2 text-2xl md:text-3xl">
            <Link href="/" className="nav-link">
              home
            </Link>
          </li>
          <li
            ref={workMenuRef}
            className="p-2 text-2xl md:text-3xl relative flex items-center"
          >
            <span
              onClick={() => setWorkDropdown(!workDropdown)}
              className="nav-link cursor-pointer flex items-center"
            >
              work
              <span className="ml-2 text-xs tracking-widest">
                {workDropdown ? '▲' : '▼'}
              </span>
            </span>
            {workDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm shadow-lg rounded-md py-2 min-w-[180px] z-[60]">
                {workLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-base font-mono tracking-wider text-black hover:bg-gray-100"
                    onClick={() => setWorkDropdown(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="p-2 text-2xl md:text-3xl">
            <Link href="/contact" className="nav-link">
              contact
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => {
            setNav((open) => {
              if (!open) setWorkDropdown(true);
              return !open;
            });
          }}
          className="sm:hidden flex items-center gap-2 text-lg font-mono tracking-widest relative z-[70]"
          style={{ color: nav ? '#ffffff' : textColor }}
          aria-expanded={nav}
          aria-label={nav ? 'Close menu' : 'Open menu'}
        >
          <span className="text-2xl">menu</span>
          <span className="text-2xl">{nav ? '✕' : '☰'}</span>
        </button>
      </div>

      <div
        className={`sm:hidden fixed inset-0 z-[55] bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
          nav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col pt-24 px-8 pb-10 h-full overflow-y-auto">
          <Link
            href="/"
            onClick={closeMobile}
            className="py-3 text-3xl text-white tracking-wide border-b border-white/15"
          >
            home
          </Link>

          <button
            type="button"
            onClick={() => setWorkDropdown((open) => !open)}
            className="flex items-center justify-between w-full py-3 text-3xl text-white tracking-wide border-b border-white/15"
          >
            <span>work</span>
            <span className="text-sm tracking-widest text-white/60">
              {workDropdown ? '▲' : '▼'}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              workDropdown ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="font-mono py-2 pl-3 border-b border-white/15">
              {workLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="block py-2.5 text-xl text-gray-300 hover:text-white tracking-wider"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={closeMobile}
            className="py-3 text-3xl text-white tracking-wide border-b border-white/15"
          >
            contact
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
