/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveimg.sooplive.co.kr',
        pathname: '/m/**',
      },
      {
        protocol: 'https',
        hostname: 'profile.img.sooplive.co.kr',
        pathname: '/LOGO/**',
      },
    ],
  },
};
  
  export default nextConfig;