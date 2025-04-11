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

  // Para imágenes locales en desarrollo
  if (src.startsWith('/uploads/') || src.startsWith('http://localhost:5000/uploads/')) {
    const imageUrl = src.startsWith('/uploads/') ? `http://localhost:5000${src}` : src;
    return (
      <img
        src={imageUrl}
        alt={alt}
        width={128}
        height={128}
        className="object-cover w-full h-full"
      />
    );
  }

  // Para imágenes remotas (Cloudinary, etc.)
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      className="object-cover w-full h-full"
      priority
    />
  );
};

export default ProfileImage;