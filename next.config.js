/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty turbopack config allows dev mode to work with Next.js 16
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Fix for @react-pdf/renderer - prevent SSR bundling of browser-only modules
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@react-pdf/renderer': 'commonjs @react-pdf/renderer',
      });
    }
    
    // Handle canvas dependency (used by some PDF libs)
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    return config;
  },
}

module.exports = nextConfig
