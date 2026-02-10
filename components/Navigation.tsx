'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/story', label: 'Story' },
    { href: '/building', label: 'The Building' },
    { href: '/apartments', label: 'Apartments' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/apply', label: 'Apply' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-8 transition-all duration-400 ${
        scrolled
          ? 'py-3 bg-[rgba(10,10,10,0.92)]'
          : 'py-4 bg-[rgba(10,10,10,0.3)] backdrop-blur-lg'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-display text-[1.4rem] font-medium tracking-[0.12em] uppercase text-[var(--gold)]! hover:text-[var(--gold)]!"
        >
          Madame X Mansion
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-[var(--ivory)] transition-all ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-[var(--ivory)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-[var(--ivory)] transition-all ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-ui text-[0.85rem] font-light tracking-[0.15em] uppercase relative
                  ${pathname === link.href ? 'text-[var(--gold)]!' : 'text-[var(--ivory)]!'}
                  hover:text-[var(--gold)]!
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--gold)] after:transition-all
                  hover:after:w-full
                  ${pathname === link.href ? 'after:w-full!' : ''}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="absolute top-full left-0 right-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl flex flex-col p-6 gap-4 list-none md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-ui text-[0.85rem] font-light tracking-[0.15em] uppercase
                    ${pathname === link.href ? 'text-[var(--gold)]!' : 'text-[var(--ivory)]!'}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
