/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // <-- This causes double effects in dev

    //  that’s a classic one with Next.js and next/image. 
    // Next.js is being strict about which external image domains it allows for optimization. 
    // Since user?.picture is coming from a Google domain (lh3.googleusercontent.com), 
    // you need to explicitly allow it in your next.config.js
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/, // ⬅️ Rule applies to files ending in .svg
          issuer: /\.[jt]sx?$/, // ⬅️ Only if they're imported from .js, .ts, .jsx, or .tsx files
          use: ['@svgr/webpack'], // ⬅️ Uses @svgr/webpack loader to convert SVGs into React components
        });
        return config;
      },
};

export default nextConfig;
