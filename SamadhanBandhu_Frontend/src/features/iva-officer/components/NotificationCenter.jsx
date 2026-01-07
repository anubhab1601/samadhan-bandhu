import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { io } from 'socket.io-client';

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) return;
        const socket = io('http://localhost:5000');
        socket.on('connect', () => socket.emit('join', user.id));
        socket.on('notification', (n) => {
            setNotifications(prev => [n, ...prev]);
            setUnreadCount(prev => prev + 1);
        });
        return () => socket.disconnect();
    }, []);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-white hover:bg-white/10 rounded-full">
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 px-2 py-1 text-xs bg-red-600 text-white rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold">Notifications</h3>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No notifications</div>
                            ) : (
                                notifications.map((n) => (
                                    <div key={n.id} className={`p-4 border-b hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`} onClick={() => markAsRead(n.id)}>
                                        <p className="text-sm font-semibold">{n.title}</p>
                                        <p className="text-sm text-gray-600">{n.message}</p>
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
