import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Relax build-time checks on CI providers (Netlify/Vercel)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'me7aitdbxq.ufs.sh' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'in.pinterest.com' },
      { protocol: 'https', hostname: 'www.youtube.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'lszcuaduebvabtiifhbgp.supabase.co' }
    ]
  }
};

export default nextConfig;
