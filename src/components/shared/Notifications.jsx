"use client";

import { useState, useEffect, useRef } from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NotificationsDropdown = () => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const { data: session, status } = useSession();

    const fetchAllNotifications = async () => {
        if (status !== "authenticated") return;

        try {
            setLoading(true);
            const [recentRes, allRes] = await Promise.all([
                api.get("/notificaciones", { params: { limit: 10, leido: false } }),
                api.get("/notificaciones", { params: { limit: 50 } })
            ]);
            
            if (!recentRes.data.success || !allRes.data.success) {
                throw new Error(recentRes.data.message || allRes.data.message);
            }

            const sortByDate = (a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora);
            
            setNotifications(recentRes.data.data?.sort(sortByDate) || []);
            setAllNotifications(allRes.data.data?.sort(sortByDate) || []);
            setUnreadCount(recentRes.data.data.filter(n => !n.leido).length);
            
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchAllNotifications();
            const interval = setInterval(fetchAllNotifications, 60000);
            return () => clearInterval(interval);
        }
    }, [status]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setNotificationsOpen(false);
                setShowAll(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const markAsRead = async (id) => {
        try {
            await api.patch(`/notificaciones/${id}/leido`);
            setNotifications(prev => prev.map(n => 
                n.id === id ? { ...n, leido: true } : n
            ));
            setAllNotifications(prev => prev.map(n => 
                n.id === id ? { ...n, leido: true } : n
            ));
            setUnreadCount(prev => prev - 1);
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch('/notificaciones/marcar-todas-leidas');
            setNotifications(prev => prev.map(n => ({ ...n, leido: true })));
            setAllNotifications(prev => prev.map(n => ({ ...n, leido: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        
        const urlMap = {
            'plan_entrenamiento': `/entrenamientos/${notification.metadata?.entrenamiento_id}`,
            'asignacion_equipo': `/equipo/${notification.metadata?.equipo_id}`,
            'estadisticas': `/estadisticas/${notification.metadata?.estadistica_id}`,
            'respuesta_queja': `/soporte/${notification.metadata?.solicitud_id}`
        };

        const url = urlMap[notification.tipo] || '/';
        router.push(url);
        setNotificationsOpen(false);
    };

    const getNotificationIcon = (type) => {
        const icons = {
            'plan_entrenamiento': '🏋️',
            'asignacion_equipo': '👥',
            'estadisticas': '📊',
            'respuesta_queja': '💬'
        };
        return icons[type] || '🔔';
    };

    const formatNotificationTime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Ahora mismo';
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
        if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`;
        
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    const displayedNotifications = showAll ? allNotifications : notifications;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notificaciones"
            >
                {unreadCount > 0 ? (
                    <CircleNotificationsRoundedIcon className="text-gray-700" />
                ) : (
                    <NotificationsNoneRoundedIcon className="text-gray-700" />
                )}
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                            {showAll ? 'Todas las notificaciones' : 'Notificaciones'}
                        </h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                className="text-sm py-1 px-3 bg-[#205088] text-white rounded-lg hover:bg-blue-700 transition"
                                disabled={loading}
                            >
                                Marcar todas
                            </button>
                        )}
                    </div>
                    
                    {error && (
                        <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <p>{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-6">
                            <svg
                                className="animate-spin h-5 w-5 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : displayedNotifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-gray-500">
                            No hay notificaciones {showAll ? '' : 'nuevas'}
                        </div>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <ul>
                                {displayedNotifications.map((notification) => (
                                    <li 
                                        key={notification.id} 
                                        className={`border-b border-gray-100 last:border-b-0 ${!notification.leido ? 'bg-blue-50' : ''}`}
                                    >
                                        <button
                                            onClick={() => handleNotificationClick(notification)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start">
                                                <span className="text-xl mr-3 mt-0.5">
                                                    {getNotificationIcon(notification.tipo)}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {notification.mensaje}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatNotificationTime(notification.fecha_hora)}
                                                    </p>
                                                </div>
                                                {!notification.leido && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1.5"></span>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center">
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className="text-sm text-[#205088] hover:text-blue-800 font-medium"
                        >
                            {showAll ? 'Ver recientes' : 'Ver todas'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;