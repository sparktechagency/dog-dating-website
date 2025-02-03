/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "10.0.70.38" },
      { hostname: "localhost" },
      { hostname: "127.0.0.1" },
      { hostname: "10.0.70.42" },
      { hostname: "10.0.70.112" },
      { hostname: "api.woofspot.net" },
    ],
  },
};

export default nextConfig;
