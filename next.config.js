/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'localhost',
      '127.0.0.1',
      'tu-dominio.com' // Reemplaza con tu dominio en producción
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/profiles/**',
      },
      {
        protocol: 'https',
        hostname: 'tu-dominio.com',
        port: '',
        pathname: '/uploads/profiles/**',
      },
    ],
    // Opcional: Configuración para desactivar la optimización en desarrollo
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Otras configuraciones de Next.js...
};

module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
  },
};