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
};

export default nextConfig;
