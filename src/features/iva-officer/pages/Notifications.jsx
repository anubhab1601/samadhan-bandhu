import React, { useState } from 'react';
import { Bell, Search, Filter, Eye, Trash2, CheckCircle, AlertCircle, Calendar, Clock } from 'lucide-react';

export default function Notifications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterRead, setFilterRead] = useState('all');

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'assignment',
            title: 'New Verification Assigned',
            message: 'You have been assigned to verify village eligibility for Shirdi, Ahmednagar. Deadline: December 5, 2025.',
            applicationId: 'APP-2025-001',
            verificationId: 'VER-2025-001',
            date: '2025-12-02T10:30:00',
            read: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'change',
            title: 'Verification Date Changed',
            message: 'The verification visit for Committee Verification in Daund has been rescheduled to December 6, 2025.',
            applicationId: 'COM-2025-001',
            verificationId: 'VER-2025-002',
            date: '2025-12-01T15:20:00',
            read: false,
            priority: 'medium'
        },
        {
            id: 3,
            type: 'reminder',
            title: 'Verification Due Tomorrow',
            message: 'Reminder: Village verification for Nashik Village is scheduled for tomorrow at 10:00 AM.',
            applicationId: 'APP-2025-002',
            verificationId: 'VER-2025-003',
            date: '2025-12-01T09:00:00',
            read: true,
            priority: 'high'
        },
        {
            id: 4,
            type: 'assignment',
            title: 'Agency Verification Assigned',
            message: 'You have been assigned to verify ABC Constructions Pvt Ltd for the School Building project.',
            applicationId: 'AGN-2025-001',
            verificationId: 'VER-2025-004',
            date: '2025-11-30T14:00:00',
            read: true,
            priority: 'medium'
        },
        {
            id: 5,
            type: 'reminder',
            title: 'Pending Report Submission',
            message: 'You have a pending verification report for Road Development Project. Please submit it soon.',
            applicationId: 'APP-2024-045',
            verificationId: 'VER-2024-120',
            date: '2025-11-29T11:00:00',
            read: true,
            priority: 'low'
        },
        {
            id: 6,
            type: 'approval',
            title: 'Verification Approved',
            message: 'Your verification report for Shirdi village has been approved by the State Officer.',
            applicationId: 'APP-2024-040',
            verificationId: 'VER-2024-115',
            date: '2025-11-28T16:30:00',
            read: false,
            priority: 'low'
        }
    ]);

    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || notification.type === filterType;
        const matchesRead = filterRead === 'all' ||
            (filterRead === 'unread' && !notification.read) ||
            (filterRead === 'read' && notification.read);
        return matchesSearch && matchesType && matchesRead;
    });

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        assignments: notifications.filter(n => n.type === 'assignment').length,
        reminders: notifications.filter(n => n.type === 'reminder').length
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAsUnread = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: false } : n
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getTypeIcon = (type) => {
        const config = {
            'assignment': { icon: Bell, color: 'text-blue-600', bg: 'bg-blue-100' },
            'change': { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
            'reminder': { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
            'approval': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' }
        };
        return config[type] || config['assignment'];
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': 'border-red-300 bg-red-50',
            'medium': 'border-yellow-300 bg-yellow-50',
            'low': 'border-blue-300 bg-blue-50'
        };
        return colors[priority] || colors['medium'];
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const notifDate = new Date(date);
        const diffMs = now - notifDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Bell size={32} />
                            Notifications
                        </h1>
                        <p className="text-purple-100">Stay updated with your verification assignments</p>
                    </div>
                    {stats.unread > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-semibold"
                        >
                            Mark All as Read
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Assignments</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.assignments}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Reminders</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.reminders}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search notifications..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Types</option>
                            <option value="assignment">Assignments</option>
                            <option value="change">Changes</option>
                            <option value="reminder">Reminders</option>
                            <option value="approval">Approvals</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterRead}
                            onChange={(e) => setFilterRead(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                        All Notifications ({filteredNotifications.length})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No notifications found
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => {
                            const typeConfig = getTypeIcon(notification.type);
                            const Icon = typeConfig.icon;
                            return (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'border-l-4 ' + getPriorityColor(notification.priority) : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-full ${typeConfig.bg}`}>
                                            <Icon className={typeConfig.color} size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="ml-2 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                    {notification.applicationId && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Application: {notification.applicationId} • Verification: {notification.verificationId}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                <span>{getTimeAgo(notification.date)}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {!notification.read ? (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                                                    title="Mark as read"
                                                >
                                                    <CheckCircle size={14} className="inline mr-1" />
                                                    Read
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => markAsUnread(notification.id)}
                                                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                                    title="Mark as unread"
                                                >
                                                    <Eye size={14} className="inline mr-1" />
                                                    Unread
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} className="inline mr-1" />
                                                Delete
                                            </button>
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
