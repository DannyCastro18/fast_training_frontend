'use client';
import Image from 'next/image';

const ProfileImage = ({ src, alt }) => {
  if (!src || src === '/default-profile.png') {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
        <span className="text-gray-500">Sin imagen</span>
      </div>
    );
  }

  // Para imágenes de Cloudinary
  if (src.includes('res.cloudinary.com')) {
    return (
      <img
        src={src}
        alt={alt}
        width={128}
        height={128}
        className="object-cover w-full h-full rounded-full"
        onError={(e) => {
          e.target.src = '/default-profile.png';
        }}
      />
    );
  }

  // Para imágenes locales (solo en desarrollo)
  if (src.startsWith('/uploads/') || src.startsWith('uploads/')) {
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    return (
      <img
        src={`http://localhost:5000$`}
        alt={alt}
        width={128}
        height={128}
        className="object-cover w-full h-full rounded-full"
        onError={(e) => {
          e.target.src = '/default-profile.png';
        }}
      />
    );
  }

  // Para otras imágenes (Google, etc.)
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      className="object-cover w-full h-full rounded-full"
      priority
      onError={(e) => {
        e.target.src = '/default-profile.png';
      }}
    />
  );
};

export default ProfileImage;