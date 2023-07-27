/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },

  async rewrites() {
    const { publicRuntimeConfig } = require('next/config').default();
    console.log('destination', publicRuntimeConfig.SERVER_URL);
    return [
      {
        source: '/:path*',
        destination: `${publicRuntimeConfig.SERVER_URL}/:path*`,
      },
    ];
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN], // Added the themealdb here so that nextjs optimise the image
  },
};
