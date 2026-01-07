import React, { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X, Bell, Filter } from 'lucide-react';

export default function Alerts() {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const alerts = [
        {
            id: 1,
            type: 'critical',
            title: 'Budget Overrun Alert',
            message: 'Project #1234 in Maharashtra has exceeded 90% of allocated budget',
            timestamp: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'warning',
            title: 'Pending Approval',
            message: '15 new project proposals are awaiting your review and approval',
            timestamp: '5 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'success',
            title: 'Milestone Completed',
            message: 'Community Center Construction in Gujarat has reached 100% completion',
            timestamp: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'info',
            title: 'Scheduled Maintenance',
            message: 'System maintenance scheduled for December 15, 2024 from 2:00 AM to 4:00 AM',
            timestamp: '2 days ago',
            read: true
        },
        {
            id: 5,
            type: 'warning',
            title: 'Document Verification Pending',
            message: '8 projects require document verification before fund disbursement',
            timestamp: '3 days ago',
            read: false
        },
        {
            id: 6,
            type: 'critical',
            title: 'Deadline Approaching',
            message: 'Q4 report submission deadline is in 3 days',
            timestamp: '4 days ago',
            read: false
        }
    ];

    const [activeAlerts, setActiveAlerts] = useState(alerts);

    const handleDismiss = (id) => {
        setActiveAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical':
                return <AlertCircle className="text-red-600" size={24} />;
            case 'warning':
                return <AlertTriangle className="text-orange-600" size={24} />;
            case 'success':
                return <CheckCircle className="text-green-600" size={24} />;
            case 'info':
                return <Info className="text-blue-600" size={24} />;
            default:
                return <Bell className="text-gray-600" size={24} />;
        }
    };

    const getAlertBgColor = (type) => {
        switch (type) {
            case 'critical':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-orange-50 border-orange-200';
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    const filteredAlerts = selectedFilter === 'all'
        ? activeAlerts
        : activeAlerts.filter(alert => alert.type === selectedFilter);

    const unreadCount = activeAlerts.filter(a => !a.read).length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Bell size={28} className="text-orange-600" />
                            Alerts & Notifications
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Stay updated with important system notifications and alerts
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                                {unreadCount} Unread
                            </span>
                            <span className="text-xs text-gray-500">
                                {activeAlerts.length} Total Alerts
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={20} className="text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700 mr-2">Filter:</span>
                    {['all', 'critical', 'warning', 'success', 'info'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedFilter === filter
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`${getAlertBgColor(alert.type)} border rounded-lg p-5 transition-all hover:shadow-md ${!alert.read ? 'border-l-4' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                {alert.title}
                                                {!alert.read && (
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                                )}
                                            </h3>
                                            <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                                            <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDismiss(alert.id)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts Found</h3>
                        <p className="text-gray-600">There are no alerts matching your selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
