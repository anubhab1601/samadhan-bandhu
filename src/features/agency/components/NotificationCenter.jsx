import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) return;

        const socket = io(SOCKET_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            socket.emit('join', user.id);
        });

        socket.on('notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);

            if (Notification.permission === 'granted') {
                new Notification(notification.title, {
                    body: notification.message,
                    icon: '/favicon.ico'
                });
            }
        });

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const clearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="text-green-600" size={20} />;
            case 'error': return <AlertCircle className="text-red-600" size={20} />;
            case 'warning': return <AlertCircle className="text-yellow-600" size={20} />;
            default: return <Info className="text-blue-600" size={20} />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white hover:text-gray-300 hover:bg-white/10 rounded-full transition-colors"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                            <div className="flex items-center gap-2">
                                {notifications.length > 0 && (
                                    <button onClick={clearAll} className="text-sm text-blue-600 hover:text-blue-700">Clear all</button>
                                )}
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell size={48} className="mx-auto mb-2 text-gray-300" />
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            {getIcon(notification.type)}
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                                            </div>
                                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
