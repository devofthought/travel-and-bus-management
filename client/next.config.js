/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ibb.co",
      "assets.volvo.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "placehold.it",
    ],
  },
};

module.exports = nextConfig;
