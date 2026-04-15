import Link from 'next/link';

export function ReviewBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
      padding: '12px 16px', background: '#F0FAF3', border: '1px solid #BBF7D0',
      borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', color: '#065F46',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#1A5632"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Evidence-based
      </span>
      <span style={{ color: '#BBF7D0' }}>|</span>
      <span>Sources: NIH, WHO, AHA, AGS clinical guidelines</span>
      <span style={{ color: '#BBF7D0' }}>|</span>
      <span>Updated 2026</span>
    </div>
  );
}

export function MedicalDisclaimer() {
  return (
    <div style={{
      background: '#FFF8EE', border: '1px solid #F0E6D8', borderRadius: '12px',
      padding: '16px 20px', margin: '28px 0', fontSize: '0.85rem', color: '#6D4C00', lineHeight: 1.6,
    }}>
      <strong style={{ display: 'block', marginBottom: '4px' }}>Medical Disclaimer</strong>
      This article is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor before starting supplements or changing medications.{' '}
      <Link href="/about" style={{ color: '#1A5632', fontWeight: 600, textDecoration: 'underline' }}>
        Learn about our editorial process
      </Link>.
    </div>
  );
}
