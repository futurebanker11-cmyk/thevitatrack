'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const supplements = [
  { href: '/heart', label: 'Heart Health' },
  { href: '/brain', label: 'Brain & Memory' },
  { href: '/liver', label: 'Liver Support' },
  { href: '/sleep', label: 'Sleep' },
  { href: '/digestion', label: 'Digestion' },
  { href: '/longevity', label: 'Longevity' },
  { href: '/skin-hair', label: 'Skin & Hair' },
];

const library = [
  { href: '/conditions', label: 'Conditions' },
  { href: '/symptoms', label: 'Symptoms' },
  { href: '/daily-living', label: 'Daily Living' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/plans', label: '7-Day Plans' },
];

function Dropdown({ label, items, viewAllHref, viewAllLabel, open, onToggle, onClose }: {
  label: string;
  items: { href: string; label: string }[];
  viewAllHref: string;
  viewAllLabel: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open, onClose]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="nav-link"
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 200ms', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: '8px', background: '#fff', borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)', border: '1px solid #E8E6E1',
          minWidth: '200px', padding: '8px 0', zIndex: 200,
          animation: 'dropIn 150ms ease'
        }}>
          {items.map(item => (
            <Link key={item.href} href={item.href} onClick={onClose}
              style={{
                display: 'block', padding: '10px 18px', color: '#2C2C2A',
                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                transition: 'background 150ms, padding-left 150ms'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F0FAF3'; e.currentTarget.style.paddingLeft = '22px'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '18px'; }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid #E8E6E1', margin: '4px 0' }} />
          <Link href={viewAllHref} onClick={onClose}
            style={{
              display: 'block', padding: '10px 18px', color: '#1A5632',
              textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700
            }}
          >
            {viewAllLabel} →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [suppOpen, setSuppOpen] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const [mobSuppOpen, setMobSuppOpen] = useState(false);
  const [mobLibOpen, setMobLibOpen] = useState(false);

  const closeAll = () => { setSuppOpen(false); setLibOpen(false); };

  return (
    <>
      <style>{`
        @keyframes dropIn { from { opacity: 0; transform: translateX(-50%) translateY(-4px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes dropIn { from { opacity: 1; } to { opacity: 1; } }
          @keyframes slideIn { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
      <header style={{ background: '#14442A', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link href="/" style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none', letterSpacing: '-0.01em', fontFamily: 'Fraunces, serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 36 36" fill="none" width="30" height="30"><circle cx="18" cy="18" r="16" fill="#1A5632"/><path d="M18 28 L12.5 21.5 C10 18.5 10 15.5 12.5 13.5 C14.5 12 16.5 13 18 15.5 C19.5 13 21.5 12 23.5 13.5 C26 15.5 26 18.5 23.5 21.5Z" fill="#4ADE80" opacity=".85"/><path d="M13 20.5L16 20.5 17 17.5 18.5 23 20 19.5 23 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            VitaTrack
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden-mobile">
            <Link href="/" className="nav-link">Home</Link>
            <Dropdown
              label="Supplements"
              items={supplements}
              viewAllHref="/#supplements"
              viewAllLabel="View All Supplements"
              open={suppOpen}
              onToggle={() => { setSuppOpen(!suppOpen); setLibOpen(false); }}
              onClose={() => setSuppOpen(false)}
            />
            <Dropdown
              label="Health Library"
              items={library}
              viewAllHref="/conditions"
              viewAllLabel="Browse All Articles"
              open={libOpen}
              onToggle={() => { setLibOpen(!libOpen); setSuppOpen(false); }}
              onClose={() => setLibOpen(false)}
            />
            <Link href="/tools" className="nav-link">Tools</Link>
            <Link href="/guides" className="nav-cta">Guides</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setMobileOpen(!mobileOpen); closeAll(); }}
            className="show-mobile"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px', display: 'none', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: '#14442A', zIndex: 999,
          display: 'flex', flexDirection: 'column', overflow: 'auto',
          animation: 'slideIn 200ms ease'
        }}>
          {/* Mobile header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none', fontFamily: 'Fraunces, serif' }}>
              VitaTrack
            </Link>
            <button onClick={() => setMobileOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px' }}>
              ✕
            </button>
          </div>

          <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column' }}>
            <Link href="/" onClick={() => setMobileOpen(false)} className="mobile-link">Home</Link>

            {/* Supplements accordion */}
            <button
              onClick={() => setMobSuppOpen(!mobSuppOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
            >
              Supplements
              <span style={{ transition: 'transform 200ms', transform: mobSuppOpen ? 'rotate(180deg)' : 'rotate(0)', fontSize: '0.8rem' }}>▼</span>
            </button>
            {mobSuppOpen && (
              <div style={{ paddingLeft: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', margin: '4px 0' }}>
                {supplements.map(s => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '10px 12px', fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {s.label}
                  </Link>
                ))}
                <Link href="/#supplements" onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', color: '#86efac', textDecoration: 'none', padding: '10px 12px', fontSize: '0.9rem', fontWeight: 700 }}>
                  View All →
                </Link>
              </div>
            )}

            {/* Health Library accordion */}
            <button
              onClick={() => setMobLibOpen(!mobLibOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', fontWeight: 500, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
            >
              Health Library
              <span style={{ transition: 'transform 200ms', transform: mobLibOpen ? 'rotate(180deg)' : 'rotate(0)', fontSize: '0.8rem' }}>▼</span>
            </button>
            {mobLibOpen && (
              <div style={{ paddingLeft: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', margin: '4px 0' }}>
                {library.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '10px 12px', fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/conditions" onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', color: '#86efac', textDecoration: 'none', padding: '10px 12px', fontSize: '0.9rem', fontWeight: 700 }}>
                  Browse All →
                </Link>
              </div>
            )}

            <Link href="/tools" onClick={() => setMobileOpen(false)} className="mobile-link">Tools</Link>
            <Link href="/guides" onClick={() => setMobileOpen(false)}
              style={{ display: 'block', textAlign: 'center', background: '#1E6B3E', color: '#fff', textDecoration: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', marginTop: '12px' }}>
              Premium Guides
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
