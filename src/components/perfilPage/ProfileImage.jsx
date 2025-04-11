import Image from 'next/image';

const ProfileImage = ({ src, alt }) => {
    const isCloudinary = src?.includes('res.cloudinary.com');
    const isLocal = src?.startsWith('/uploads/');
    
    if (isCloudinary) {
        return (
        <Image
            src={src}
            alt={alt}
            width={128}
            height={128}
            className="object-cover"
            priority
        />
        );
    }

    if (isLocal) {
        return (
        <Image
            src={`http://localhost:3000${src}`}
            alt={alt}
            width={128}
            height={128}
            className="object-cover"
            unoptimized={true}
        />
        );
    }

    return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
        <span className="text-gray-500">Sin imagen</span>
        </div>
    );
};

export default ProfileImage;