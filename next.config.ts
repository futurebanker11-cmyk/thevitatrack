import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      // Old WordPress multi-language pages -> homepage
      // Spanish
      { source: '/:path*-es/', destination: '/', permanent: true },
      { source: '/es/:path*', destination: '/', permanent: true },
      // French
      { source: '/:path*-fr/', destination: '/', permanent: true },
      { source: '/fr/:path*', destination: '/', permanent: true },
      // German
      { source: '/:path*-de/', destination: '/', permanent: true },
      { source: '/de/:path*', destination: '/', permanent: true },
      // Italian
      { source: '/:path*-it/', destination: '/', permanent: true },
      { source: '/it/:path*', destination: '/', permanent: true },
      // Portuguese
      { source: '/:path*-pt/', destination: '/', permanent: true },
      { source: '/pt/:path*', destination: '/', permanent: true },
      { source: '/:path*-pt-br/', destination: '/', permanent: true },
      // Dutch
      { source: '/:path*-nl/', destination: '/', permanent: true },
      { source: '/nl/:path*', destination: '/', permanent: true },
      // Austrian German
      { source: '/:path*-at/', destination: '/', permanent: true },
      { source: '/at/:path*', destination: '/', permanent: true },

      // Old WordPress category paths
      { source: '/uncategorized/:path*', destination: '/', permanent: true },
      { source: '/uncategorized-pt/:path*', destination: '/', permanent: true },
      { source: '/uncategorized-fr/:path*', destination: '/', permanent: true },
      { source: '/uncategorized-de/:path*', destination: '/', permanent: true },
      { source: '/uncategorized-it/:path*', destination: '/', permanent: true },
      { source: '/uncategorized-at/:path*', destination: '/', permanent: true },

      // Old WordPress paths -> new paths
      { source: '/health-conditions', destination: '/conditions', permanent: true },
      { source: '/health-conditions/:path*', destination: '/conditions', permanent: true },
      { source: '/seniorshealth/:path*', destination: '/', permanent: true },

      // Old WordPress feed/admin
      { source: '/feed', destination: '/', permanent: true },
      { source: '/feed/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
