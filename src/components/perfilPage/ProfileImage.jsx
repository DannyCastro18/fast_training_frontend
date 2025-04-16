'use client';
import { useState, useEffect } from 'react';

const ProfileImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState('/default-profile.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      if (src.includes('res.cloudinary.com')) {
        const cleanUrl = src.split('?')[0];
        setImageSrc(`${cleanUrl}?t=${Date.now()}`);
      } else if (src.startsWith('/uploads')) {
        setImageSrc(`${process.env.NEXT_PUBLIC_BACKEND_URL}${src}`);
      } else {
        setImageSrc(src);
      }
    }
  }, [src]);

  const handleError = () => {
    setImageSrc('/default-profile.png');
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

export default ProfileImage;