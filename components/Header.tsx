'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: '#14442A', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <Link href="/" style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none', letterSpacing: '-0.01em', fontFamily: 'Fraunces, serif' }}>
          VitaTrack
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="hidden-mobile">
          <Link href="/conditions" className="nav-link">Conditions</Link>
          <Link href="/symptoms" className="nav-link">Symptoms</Link>
          <Link href="/daily-living" className="nav-link">Daily Living</Link>
          <Link href="/recipes" className="nav-link">Recipes</Link>
          <Link href="/tools" className="nav-link">Tools</Link>
          <Link href="/guides" className="nav-cta">Guides</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px', display: 'none', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', transition: 'background 200ms' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#1A5632', padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>
          {['conditions','symptoms','daily-living','recipes','tools','guides'].map(path => (
            <Link key={path} href={`/${path}`} onClick={() => setOpen(false)} className="mobile-link">
              {path.replace('-', ' ')}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
