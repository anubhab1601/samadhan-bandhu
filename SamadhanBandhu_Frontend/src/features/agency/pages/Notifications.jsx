import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Filter, Search } from 'lucide-react';

export default function Notifications() {
    const [filterType, setFilterType] = useState('all');
    const [filterRead, setFilterRead] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            title: 'Proposal Shortlisted',
            message: 'Your proposal for Community Hall Construction has been shortlisted',
            time: '2025-12-02T14:30:00',
            read: false,
            action: 'View Proposal'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Progress Report Due',
            message: 'Monthly progress report for School Building Renovation is due in 3 days',
            time: '2025-12-02T09:15:00',
            read: false,
            action: 'Submit Report'
        },
        {
            id: 3,
            type: 'info',
            title: 'New Tender Available',
            message: 'New tender available: Water Supply System - Budget ₹12L',
            time: '2025-12-01T16:45:00',
            read: true,
            action: 'View Tender'
        },
        {
            id: 4,
            type: 'success',
            title: 'Payment Received',
            message: 'Payment of ₹4.5 Lakhs has been credited to your account',
            time: '2025-11-30T11:20:00',
            read: true,
            action: 'View Details'
        },
        {
            id: 5,
            type: 'warning',
            title: 'Site Inspection Scheduled',
            message: 'Field officer will visit School Building site on Dec 5, 2025',
            time: '2025-11-29T10:00:00',
            read: true,
            action: 'View Schedule'
        },
        {
            id: 6,
            type: 'info',
            title: 'Document Verification',
            message: 'Your submitted documents have been verified successfully',
            time: '2025-11-28T15:30:00',
            read: true,
            action: null
        },
        {
            id: 7,
            type: 'success',
            title: 'Milestone Completed',
            message: 'Foundation work milestone completed for School Building project',
            time: '2025-11-27T13:45:00',
            read: true,
            action: 'View Project'
        },
        {
            id: 8,
            type: 'warning',
            title: 'Material Shortage Alert',
            message: 'Low stock alert: Cement inventory below threshold',
            time: '2025-11-26T08:30:00',
            read: true,
            action: 'Order Materials'
        }
    ]);

    const filteredNotifications = notifications.filter(notif => {
        const matchesType = filterType === 'all' || notif.type === filterType;
        const matchesRead = filterRead === 'all' ||
            (filterRead === 'unread' && !notif.read) ||
            (filterRead === 'read' && notif.read);
        const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notif.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesRead && matchesSearch;
    });

    const getNotificationIcon = (type) => {
        const icons = {
            success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
            warning: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
            info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-100' }
        };
        return icons[type] || icons.info;
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return time.toLocaleDateString('en-IN');
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        success: notifications.filter(n => n.type === 'success').length,
        warning: notifications.filter(n => n.type === 'warning').length,
        info: notifications.filter(n => n.type === 'info').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Bell size={32} />
                            Notifications
                            {stats.unread > 0 && (
                                <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                                    {stats.unread} New
                                </span>
                            )}
                        </h1>
                        <p className="text-orange-100">Stay updated with important alerts and messages</p>
                    </div>
                    {stats.unread > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold"
                        >
                            Mark All as Read
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Success</p>
                    <p className="text-2xl font-bold text-green-600">{stats.success}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Warnings</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.warning}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Info</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.info}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search notifications..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Types</option>
                            <option value="success">Success</option>
                            <option value="warning">Warnings</option>
                            <option value="info">Information</option>
                        </select>
                    </div>

                    {/* Read Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterRead}
                            onChange={(e) => setFilterRead(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Notifications</option>
                            <option value="unread">Unread Only</option>
                            <option value="read">Read Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Notifications ({filteredNotifications.length})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>No notifications found</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => {
                            const iconConfig = getNotificationIcon(notif.type);
                            const Icon = iconConfig.icon;

                            return (
                                <div
                                    key={notif.id}
                                    className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-full ${iconConfig.bg} flex-shrink-0`}>
                                            <Icon className={iconConfig.color} size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className={`font-semibold text-gray-900 ${!notif.read ? 'font-bold' : ''}`}>
                                                    {notif.title}
                                                    {!notif.read && (
                                                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </h3>
                                                <button
                                                    onClick={() => deleteNotification(notif.id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {getTimeAgo(notif.time)}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {notif.action && (
                                                        <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                                                            {notif.action}
                                                        </button>
                                                    )}
                                                    {!notif.read && (
                                                        <button
                                                            onClick={() => markAsRead(notif.id)}
                                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                        >
                                                            Mark as Read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
