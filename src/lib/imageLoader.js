export default function imageLoader({ src, width, quality }) {
    // Para imágenes locales
    if (src.startsWith('/uploads/')) {
        
    }
    
    // Para imágenes en Windows
    if (src.startsWith('C:\\')) {
        const publicPath = src.split('public')[1]?.replace(/\\/g, '/');
        return `http://localhost:5000${publicPath}`;
    }
    
    // Para otras imágenes (Cloudinary, etc.)
    return `${src}?w=${width}&q=${quality || 75}`;
}