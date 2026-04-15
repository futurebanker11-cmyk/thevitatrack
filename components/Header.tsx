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
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="hidden-mobile">
          <Link href="/conditions" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Conditions</Link>
          <Link href="/symptoms" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Symptoms</Link>
          <Link href="/daily-living" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Daily Living</Link>
          <Link href="/recipes" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Recipes</Link>
          <Link href="/tools" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Tools</Link>
          <Link href="/guides" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, background: '#1E6B3E', padding: '6px 14px', borderRadius: '20px' }}>Guides</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem', display: 'none' }} className="show-mobile" aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#1A5632', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['conditions','symptoms','daily-living','recipes','tools','guides'].map(path => (
            <Link key={path} href={`/${path}`} onClick={() => setOpen(false)}
              style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, textTransform: 'capitalize' }}>
              {path.replace('-', ' ')}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
