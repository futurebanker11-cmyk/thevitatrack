import Link from 'next/link';

export default function BundleCTA({ variant = 'default' }: { variant?: 'default' | 'compact' | 'inline' }) {
  if (variant === 'inline') {
    return (
      <Link href="/bundle" style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'linear-gradient(135deg, #14442A, #1E6B3E)',
        color: '#fff', textDecoration: 'none', padding: '14px 20px',
        borderRadius: '12px', margin: '24px 0', transition: 'transform 200ms, box-shadow 200ms',
      }}>
        <span style={{ fontSize: '24px' }}>📚</span>
        <span>
          <strong style={{ display: 'block', fontSize: '0.95rem' }}>Get All 19 Health Guides — $47</strong>
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Complete supplement protocols, diet plans, tracking sheets</span>
        </span>
        <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <div style={{
        background: '#14442A', borderRadius: '14px', padding: '20px 24px',
        margin: '32px 0', textAlign: 'center', color: '#fff',
      }}>
        <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px' }}>
          The Complete Senior Health Vault
        </p>
        <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '0 0 14px' }}>
          19 premium guides. Every protocol. Every tracking sheet. <strong>$47</strong> (save 75%)
        </p>
        <Link href="/bundle" style={{
          display: 'inline-block', background: '#fff', color: '#14442A',
          fontWeight: 700, fontSize: '0.9rem', padding: '10px 28px',
          borderRadius: '100px', textDecoration: 'none',
        }}>
          Get the Bundle →
        </Link>
      </div>
    );
  }

  // Default: full CTA banner
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f3320 0%, #1A5632 50%, #1E6B3E 100%)',
      borderRadius: '16px', padding: '36px 28px', margin: '40px 0',
      textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-20%', right: '-5%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7, margin: '0 0 10px' }}>
        Most Popular
      </p>
      <h3 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, margin: '0 0 10px', fontFamily: 'Fraunces, serif' }}>
        The Complete Senior Health Vault
      </h3>
      <p style={{ fontSize: '1rem', opacity: 0.85, maxWidth: '440px', margin: '0 auto 8px', lineHeight: 1.5 }}>
        All 19 guides. Every supplement protocol. Every tracking sheet. Lifetime access.
      </p>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 18px' }}>
        <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '1rem' }}>$190</span>{' '}$47
      </p>
      <Link href="/bundle" style={{
        display: 'inline-block', background: '#fff', color: '#14442A',
        fontWeight: 700, fontSize: '1rem', padding: '14px 36px',
        borderRadius: '100px', textDecoration: 'none', transition: 'transform 200ms',
      }}>
        Get All 19 Guides →
      </Link>
    </div>
  );
}
