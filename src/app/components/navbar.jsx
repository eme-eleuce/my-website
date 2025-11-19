'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');
  const [workDropdown, setWorkDropdown] = useState(false);
  const pathname = usePathname();
  
  const handleNav = () => {
    setNav(!nav);
  };

  // Check if we're on home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#ffffff');
        setTextColor('#000000');
      } else {
        setColor('transparent');
        // If not on home page, keep text black even when transparent
        setTextColor(isHomePage ? '#ffffff' : '#000000');
      }
    };
    
    // Set initial color based on page
    changeColor();
    
    window.addEventListener('scroll', changeColor);
    return () => window.removeEventListener('scroll', changeColor);
  }, [isHomePage]);

  return (
    <div style={{backgroundColor: `${color}`}} className='fixed top-0 left-0 w-full z-10 ease duration-500'>
      <div className='max-w-[1240px] m-auto flex justify-center items-center p-4 py-2 text-[#E9E9EB]'>
        
        <ul style={{color: `${textColor}`}} className='hidden sm:flex gap-12'>
          <li className='p-3 text-3xl'>
            <Link href='/'> home</Link>
          </li>
          <li className='p-3 text-3xl relative flex items-center'>
            <span 
              onClick={() => setWorkDropdown(!workDropdown)}
              className='cursor-pointer flex items-center'
            >
              work
              <span className='ml-2 text-sm'>
                {workDropdown ? '▲' : '▼'}
              </span>
            </span>
            {workDropdown && (
              <div 
                className='absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[150px] z-50'
                style={{backgroundColor: '#ffffff'}}
              >
                <Link 
                  href='/work/websites' 
                  className='block px-4 py-2 text-lg text-black hover:bg-gray-100'
                  onClick={() => setWorkDropdown(false)}
                >
                  websites
                </Link>
                <Link 
                  href='/work/photography' 
                  className='block px-4 py-2 text-lg text-black hover:bg-gray-100'
                  onClick={() => setWorkDropdown(false)}
                >
                  photography
                </Link>
              </div>
            )}
          </li>
          <li className='p-3 text-3xl'>
            <Link href='/contact'> contact</Link>
          </li>
        </ul>

        <div onClick={handleNav} className='block sm:hidden z-10 items-right'>
          <button
            className="flex items-center gap-2 text-lg"
            style={{ color: nav ? '#ffffff' : textColor }}
          >
            <span className='text-3xl'>MENU</span>
            <span className="text-3xl">
              {nav ? '✕' : '☰'}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={nav ? 'sm:hidden absolute top-0 bottom-0 left-0 right-0 w-full h-screen flex justify-center items-center bg-black text-center ease-in duration-300' : 'sm:hidden absolute top-0 bottom-0 left-[-100%] right-0 w-full h-screen flex justify-center items-center bg-black text-center ease-in duration-300'}>
          <ul>
            <li onClick={() => setNav(false)} className='p-4 hover:text-gray-400 text-4xl text-white'>
              <Link href='/'> Home</Link>
            </li>
            <li className='p-4 text-4xl text-white'>
              <div 
                className='flex items-center justify-center cursor-pointer'
                onClick={() => setWorkDropdown(!workDropdown)}
              >
                <span> Work</span>
                <span className='ml-2 text-sm'>
                  {workDropdown ? '▲' : '▼'}
                </span>
              </div>
              {workDropdown && (
                <div className='mt-2'>
                  <Link 
                    href='/work/websites' 
                    className='block py-2 text-2xl text-gray-300 hover:text-white'
                    onClick={() => {
                      setWorkDropdown(false);
                      setNav(false);
                    }}
                  >
                    websites
                  </Link>
                  <Link 
                    href='/work/photography' 
                    className='block py-2 text-2xl text-gray-300 hover:text-white'
                    onClick={() => {
                      setWorkDropdown(false);
                      setNav(false);
                    }}
                  >
                    photography
                  </Link>
                </div>
              )}
            </li>
            <li onClick={() => setNav(false)} className='p-4 hover:text-gray-400 text-4xl text-white'>
              <Link href='/contact'> Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
