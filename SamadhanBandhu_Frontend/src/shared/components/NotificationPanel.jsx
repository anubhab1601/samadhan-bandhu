import React from 'react';
import { X, Check, AlertCircle, Info, Clock, Bell } from 'lucide-react';

export default function NotificationPanel({ isOpen, onClose, notifications }) {
    if (!isOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <Check className="text-green-600" size={20} />;
            case 'warning':
                return <AlertCircle className="text-orange-600" size={20} />;
            case 'error':
                return <AlertCircle className="text-red-600" size={20} />;
            default:
                return <Info className="text-blue-600" size={20} />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-orange-50 border-orange-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold">Notifications</h2>
                            <p className="text-xs opacity-90">{notifications.length} new notifications</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-blue-700 rounded-full transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Notifications List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <Bell size={48} className="mx-auto mb-3 opacity-30" />
                                <p>No new notifications</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`border rounded-lg p-4 ${getBgColor(notification.type)}`}
                                >
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">
                                                {notification.title}
                                            </h3>
                                            <p className="text-xs text-gray-700 mb-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock size={12} />
                                                <span>{notification.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4">
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
