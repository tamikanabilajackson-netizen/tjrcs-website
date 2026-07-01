'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact'  },
] as const;

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      <nav
        className="bg-white"
        style={{ borderBottom: '1px solid #e8e0d6' }}
        aria-label="Main navigation"
      >

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#E8924B] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
        >
          Skip to main content
        </a>

        <div className="px-[5%] py-4 flex items-center justify-between" style={{ minHeight: '108px' }}>

          {/* Left: logo + business name */}
          <div className="flex items-center gap-3">
            <img src="/TJRSCtrans1.svg" alt="TJRCS Logo" style={{ height: '100px', width: 'auto' }} />
            <div className="flex flex-col leading-tight">
              <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '18px', color: '#1C3B3A' }}>
                Tamika Jackson
              </span>
              <span style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '13px', color: '#1C3B3A' }}>
                Recreation and Consulting Services
              </span>
            </div>
          </div>

          {/* Desktop nav pills */}
          <div className="hidden md:flex gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[17px] font-bold border-2 bg-transparent px-4 py-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: '#1C3B3A', borderColor: 'rgba(28,59,58,0.3)', outlineColor: '#1C3B3A' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E8924B';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E8924B';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#1C3B3A';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(28,59,58,0.3)';
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger toggle — mobile only */}
          <button
            className="md:hidden p-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: '#1C3B3A' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E8924B" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6"  y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E8924B" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div id="mobile-nav" className="md:hidden px-[5%] pb-5 flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[17px] font-bold border-2 bg-transparent px-4 py-3 rounded-full text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: '#1C3B3A', borderColor: 'rgba(28,59,58,0.3)', outlineColor: '#1C3B3A' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}

      </nav>
    </header>
  );
}
