import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Relax build-time checks on CI providers (Netlify/Vercel)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Allow dev requests from additional origins (LAN/IPs)
  // Configure via env `NEXT_DEV_ALLOWED_ORIGINS` as comma-separated list if needed
  // Docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: (
    process.env.NEXT_DEV_ALLOWED_ORIGINS
      ? process.env.NEXT_DEV_ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
      : [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "http://0.0.0.0:3000",
        ]
  ) as any,
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
