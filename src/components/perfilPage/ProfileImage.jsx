'use client';
import { useState, useEffect } from 'react';

const ProfileImage = ({ src, alt, className = '', onClick, ...rest }) => {
  const [imageSrc, setImageSrc] = useState('/default-profile.png');
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const loadImage = () => {
      if (!src) {
        setImageSrc('/default-profile.png');
        setIsLoading(false);
        return;
      }

      let finalSrc = src;
      
      // Manejar imágenes de Cloudinary
      if (src.includes('res.cloudinary.com')) {
        const baseUrl = src.split('?')[0];
        finalSrc = `${baseUrl}?t=${Date.now()}`;
      } 
      // Manejar imágenes locales del backend
      else if (src.startsWith('uploads') || src.startsWith('/uploads')) {
        finalSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${src.startsWith('/') ? '' : '/'}${src}?t=${Date.now()}`;
      }
      // Mantener URLs absolutas
      else if (src.startsWith('http')) {
        finalSrc = src;
      }
      // Default image
      else {
        finalSrc = '/default-profile.png';
      }

      if (finalSrc !== imageSrc) {
        setIsLoading(true);
        setImageSrc(finalSrc);
      }
    };

    loadImage();
  }, [src, version]);

  useEffect(() => {
    const handleImageUpdate = () => {
      setVersion(prev => prev + 1);
    };

    window.addEventListener('profileImageUpdated', handleImageUpdate);
    window.addEventListener('userDataUpdated', handleImageUpdate);
    
    return () => {
      window.removeEventListener('profileImageUpdated', handleImageUpdate);
      window.removeEventListener('userDataUpdated', handleImageUpdate);
    };
  }, []);

  const handleError = () => {
    setImageSrc('/default-profile.png');
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-full ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        {...rest}
      />
    </div>
  );
};

export default ProfileImage;