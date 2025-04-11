export default function imageLoader({ src, width, quality }) {
    // Para imágenes del backend
    if (src.startsWith('/uploads/') || src.startsWith('uploads/')) {
        const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
        return `http://localhost:5000${normalizedSrc}`;
    }
    
    // Para imágenes en Windows (rutas absolutas)
    if (src.startsWith('C:\\')) {
        const publicPath = src.split('public')[1]?.replace(/\\/g, '/');
        return `http://localhost:5000${publicPath}`;
    }
    
    // Para otras imágenes (Cloudinary, etc.)
    return `${src}?w=${width}&q=${quality || 75}`;
}