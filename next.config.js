/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Para Cloudinary
      'lh3.googleusercontent.com', // Para Google
    ],
  },
};

module.exports = nextConfig;