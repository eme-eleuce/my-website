'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [workDropdown, setWorkDropdown] = useState(false);
  const pathname = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  const isHomePage = pathname === '/';

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
      <div className='max-w-[1240px] m-auto flex justify-center items-center p-4 py-3 text-[#E9E9EB] relative z-60'>

        <ul style={{ color: textColor }} className='hidden sm:flex gap-10 md:gap-14'>
          <li className='p-2 text-2xl md:text-3xl'>
            <Link href='/' className='nav-link'>home</Link>
          </li>
          <li className='p-2 text-2xl md:text-3xl relative flex items-center'>
            <span
              onClick={() => setWorkDropdown(!workDropdown)}
              className='nav-link cursor-pointer flex items-center'
            >
              work
              <span className='ml-2 text-xs tracking-widest'>
                {workDropdown ? '▲' : '▼'}
              </span>
            </span>
            {workDropdown && (
              <div className='absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm shadow-lg rounded-md py-2 min-w-[150px] z-[60]'>
                <Link
                  href='/work/websites'
                  className='block px-4 py-2 text-base font-mono tracking-wider text-black hover:bg-gray-100'
                  onClick={() => setWorkDropdown(false)}
                >
                  websites
                </Link>
                <Link
                  href='/work/photography'
                  className='block px-4 py-2 text-base font-mono tracking-wider text-black hover:bg-gray-100'
                  onClick={() => setWorkDropdown(false)}
                >
                  photography
                </Link>
                <Link
                  href='/work/posters'
                  className='block px-4 py-2 text-base font-mono tracking-wider text-black hover:bg-gray-100'
                  onClick={() => setWorkDropdown(false)}
                >
                  posters
                </Link>
              </div>
            )}
          </li>
          <li className='p-2 text-2xl md:text-3xl'>
            <Link href='/contact' className='nav-link'>contact</Link>
          </li>
        </ul>

        <div onClick={handleNav} className='block sm:hidden'>
          <button
            type="button"
            className="flex items-center gap-2 text-lg font-mono tracking-widest"
            style={{ color: nav ? '#ffffff' : textColor }}
          >
            <span className='text-2xl'>menu</span>
            <span className="text-2xl">
              {nav ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden fixed inset-0 z-[55] flex justify-center items-center bg-black/95 backdrop-blur-md text-center transition-transform duration-300 ${
          nav ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
          <ul>
            <li onClick={() => setNav(false)} className='p-4 hover:text-gray-400 text-4xl text-white'>
              <Link href='/'>home</Link>
            </li>
            <li className='p-4 text-4xl text-white'>
              <div
                className='flex items-center justify-center cursor-pointer'
                onClick={() => setWorkDropdown(!workDropdown)}
              >
                <span>work</span>
                <span className='ml-2 text-sm'>
                  {workDropdown ? '▲' : '▼'}
                </span>
              </div>
              {workDropdown && (
                <div className='mt-2 font-mono'>
                  <Link
                    href='/work/websites'
                    className='block py-2 text-2xl text-gray-300 hover:text-white tracking-wider'
                    onClick={() => {
                      setWorkDropdown(false);
                      setNav(false);
                    }}
                  >
                    websites
                  </Link>
                  <Link
                    href='/work/photography'
                    className='block py-2 text-2xl text-gray-300 hover:text-white tracking-wider'
                    onClick={() => {
                      setWorkDropdown(false);
                      setNav(false);
                    }}
                  >
                    photography
                  </Link>
                  <Link
                    href='/work/posters'
                    className='block py-2 text-2xl text-gray-300 hover:text-white tracking-wider'
                    onClick={() => {
                      setWorkDropdown(false);
                      setNav(false);
                    }}
                  >
                    posters
                  </Link>
                </div>
              )}
            </li>
            <li onClick={() => setNav(false)} className='p-4 hover:text-gray-400 text-4xl text-white'>
              <Link href='/contact'>contact</Link>
            </li>
          </ul>
      </div>
    </div>
  );
};

export default Navbar;
