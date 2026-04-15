import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'VitaTrack privacy policy. How we collect, use, and protect your information.',
  alternates: { canonical: 'https://thevitatrack.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#14442A', marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>Privacy Policy</h1>
        <p style={{ color: '#717170', marginBottom: '32px' }}>Last updated: April 2026</p>

        <div className="article-content">
          <h2>Introduction</h2>
          <p>VitaTrack (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates thevitatrack.com. This Privacy Policy explains how we collect, use, and protect information when you visit our website.</p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <p>We may collect information you voluntarily provide, such as your email address if you subscribe to our newsletter or contact us.</p>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our site, we automatically collect:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Device type and screen size</li>
            <li>Approximate location (country/region level)</li>
          </ul>
          <p>This data is collected through cookies and similar technologies by our analytics and advertising partners.</p>

          <h2>How We Use Information</h2>
          <ul>
            <li>To provide and improve our health content and tools</li>
            <li>To understand how visitors use our site</li>
            <li>To display relevant advertisements</li>
            <li>To respond to your inquiries</li>
            <li>To send newsletters (only if you subscribe)</li>
          </ul>

          <h2>Third-Party Services</h2>
          <h3>Google AdSense</h3>
          <p>We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to our site and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.</p>

          <h3>Google Analytics</h3>
          <p>We use Google Analytics to understand how visitors interact with our site. This service collects anonymous usage data. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h3>Vercel</h3>
          <p>Our site is hosted on Vercel. Vercel may collect access logs including IP addresses for security and performance purposes.</p>

          <h2>Cookies</h2>
          <p>Our site uses cookies for:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the site to function</li>
            <li><strong>Analytics cookies:</strong> Help us understand site usage</li>
            <li><strong>Advertising cookies:</strong> Used by Google AdSense to show relevant ads</li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>

          <h2>Affiliate Links</h2>
          <p>Some links on our site are affiliate links (Amazon Associates and other programs). When you click these links and make a purchase, we may earn a commission. This does not affect the price you pay. Affiliate partners may use cookies to track referrals.</p>

          <h2>Data Security</h2>
          <p>We implement reasonable security measures to protect any information we collect. Our site uses HTTPS encryption for all connections. However, no method of transmission over the internet is 100% secure.</p>

          <h2>Children&#39;s Privacy</h2>
          <p>Our site is designed for adults over 60 and is not intended for children under 13. We do not knowingly collect information from children.</p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have rights regarding your personal data, including:</p>
          <ul>
            <li>Right to access your data</li>
            <li>Right to request deletion</li>
            <li>Right to opt out of data sale/sharing</li>
            <li>Right to correct inaccurate data</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:info@thevitatrack.com">info@thevitatrack.com</a>.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>

          <h2>Contact</h2>
          <p>Questions about this privacy policy? Email us at <a href="mailto:info@thevitatrack.com">info@thevitatrack.com</a>.</p>
        </div>
      </main>
    </>
  );
}
