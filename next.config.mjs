/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveimg.sooplive.co.kr',
        pathname: '/m/**',
      },
    ],
  },
};
  
  export default nextConfig;