/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["bdtmp.ultra-x.jp"],
  },
};

export default nextConfig;
