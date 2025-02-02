/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "10.0.70.38",
      "localhost",
      "127.0.0.1",
      "10.0.70.42",
      "10.0.70.112",
      "api.woofspot.net",
    ],
  },
};

export default nextConfig;
