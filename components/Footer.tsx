import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #E8E6E1', background: '#fff',
      padding: '32px 20px 24px', marginTop: '40px',
    }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '24px', marginBottom: '24px',
        }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14442A', marginBottom: '10px' }}>Supplements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <Link href="/heart" style={{ color: '#555550', textDecoration: 'none' }}>Heart</Link>
              <Link href="/brain" style={{ color: '#555550', textDecoration: 'none' }}>Brain & Memory</Link>
              <Link href="/blood-pressure" style={{ color: '#555550', textDecoration: 'none' }}>Blood Pressure</Link>
              <Link href="/kidney" style={{ color: '#555550', textDecoration: 'none' }}>Kidney</Link>
              <Link href="/sleep" style={{ color: '#555550', textDecoration: 'none' }}>Sleep</Link>
              <Link href="/digestion" style={{ color: '#555550', textDecoration: 'none' }}>Digestion</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14442A', marginBottom: '10px' }}>Health Library</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <Link href="/conditions" style={{ color: '#555550', textDecoration: 'none' }}>Conditions</Link>
              <Link href="/symptoms" style={{ color: '#555550', textDecoration: 'none' }}>Symptoms</Link>
              <Link href="/daily-living" style={{ color: '#555550', textDecoration: 'none' }}>Daily Living</Link>
              <Link href="/recipes" style={{ color: '#555550', textDecoration: 'none' }}>Recipes</Link>
              <Link href="/tools" style={{ color: '#555550', textDecoration: 'none' }}>Health Tools</Link>
              <Link href="/guides" style={{ color: '#555550', textDecoration: 'none' }}>Premium Guides</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14442A', marginBottom: '10px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <Link href="/about" style={{ color: '#555550', textDecoration: 'none' }}>About Us</Link>
              <Link href="/contact" style={{ color: '#555550', textDecoration: 'none' }}>Contact</Link>
              <Link href="/privacy-policy" style={{ color: '#555550', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms-of-use" style={{ color: '#555550', textDecoration: 'none' }}>Terms of Use</Link>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #E8E6E1', paddingTop: '16px',
          textAlign: 'center', fontSize: '0.8rem', color: '#717170', lineHeight: 1.7,
        }}>
          <p style={{ margin: '0 0 4px' }}>VitaTrack provides educational health information for adults 60+. This is not medical advice. Always consult your healthcare provider.</p>
          <p style={{ margin: 0 }}>&copy; 2026 VitaTrack. All rights reserved. As an Amazon Associate, VitaTrack earns from qualifying purchases.</p>
        </div>
      </div>
    </footer>
  );
}
