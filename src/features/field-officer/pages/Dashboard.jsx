import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, FileText, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight, Calendar, TrendingUp, Eye, Upload, Bell } from 'lucide-react';
import BroadcastDisplay from '../../../shared/components/BroadcastDisplay';

export default function Dashboard() {
    const navigate = useNavigate();

    const stats = {
        inspectionsToday: 2,
        inspectionsThisWeek: 6,
        overdueInspections: 1,
        completedInspections: 9,
        totalInspections: 15,
        pendingInspections: 5
    };

    const upcomingInspections = [
        {
            id: 'INS-2025-001',
            projectId: 'PROJ-2025-001',
            projectTitle: 'School Building Renovation',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            agency: 'ABC Constructions',
            agencyHead: 'Rajesh Kumar',
            sarpanch: 'Ramesh Patil',
            scheduledDate: '2025-12-03',
            scheduledTime: '10:00 AM',
            inspectionNumber: '1st Inspection',
            priority: 'High',
            status: 'Scheduled',
            inspectionType: 'Progress Inspection'
        },
        {
            id: 'INS-2025-002',
            projectId: 'PROJ-2025-002',
            projectTitle: 'Community Hall Construction',
            village: 'Nashik Village',
            district: 'Nashik',
            state: 'Maharashtra',
            agency: 'XYZ Builders',
            agencyHead: 'Suresh Patil',
            sarpanch: 'Sunita Deshmukh',
            scheduledDate: '2025-12-05',
            scheduledTime: '2:00 PM',
            inspectionNumber: '2nd Inspection',
            priority: 'Medium',
            status: 'Scheduled',
            inspectionType: 'Quality Check'
        },
        {
            id: 'INS-2025-003',
            projectId: 'PROJ-2025-003',
            projectTitle: 'Water Supply System',
            village: 'Pune Rural',
            district: 'Pune',
            state: 'Maharashtra',
            agency: 'Water Works Ltd',
            agencyHead: 'Amit Sharma',
            sarpanch: 'Vijay Kumar',
            scheduledDate: '2025-12-07',
            scheduledTime: '11:00 AM',
            inspectionNumber: '1st Inspection',
            priority: 'High',
            status: 'Scheduled',
            inspectionType: 'Site Inspection'
        }
    ];

    const todayInspections = upcomingInspections.filter(i => i.scheduledDate === '2025-12-03');

    const recentNotifications = [
        { id: 1, message: 'New inspection assigned: School Building Renovation', time: '2 hours ago', type: 'assignment' },
        { id: 2, message: 'Inspection date changed for Community Hall', time: '1 day ago', type: 'change' },
        { id: 3, message: 'Reminder: Inspection due tomorrow', time: '1 day ago', type: 'reminder' }
    ];

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'bg-red-100 text-red-700 border-red-300',
            'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'Low': 'bg-blue-100 text-blue-700 border-blue-300'
        };
        return colors[priority] || colors['Medium'];
    };

    const getStatusColor = (status) => {
        const colors = {
            'Scheduled': 'bg-blue-100 text-blue-700',
            'In Progress': 'bg-orange-100 text-orange-700',
            'Completed': 'bg-green-100 text-green-700',
            'Overdue': 'bg-red-100 text-red-700'
        };
        return colors[status] || colors['Scheduled'];
    };

    return (
        <div className="space-y-6">
            <BroadcastDisplay role="field-officer" />
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2">Field Officer Dashboard</h1>
                <p className="text-indigo-100">Welcome back! Here's your inspection overview</p>
            </div>

            {/* Statistics Cards - 3x2 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar size={32} />
                        <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded font-medium">Today</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.inspectionsToday}</p>
                    <p className="text-blue-100 text-sm">Inspections Today</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={32} />
                        <span className="text-xs bg-white text-purple-600 px-2 py-1 rounded font-medium">Week</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.inspectionsThisWeek}</p>
                    <p className="text-purple-100 text-sm">This Week</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <AlertCircle size={32} />
                        <span className="text-xs bg-white text-red-600 px-2 py-1 rounded font-medium">Urgent</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.overdueInspections}</p>
                    <p className="text-red-100 text-sm">Overdue Inspections</p>
                </div>

                {/* Row 2 */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={32} />
                        <span className="text-xs bg-white text-green-600 px-2 py-1 rounded font-medium">Done</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.completedInspections}</p>
                    <p className="text-green-100 text-sm">Completed</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <ClipboardCheck size={32} />
                        <span className="text-xs bg-white text-orange-600 px-2 py-1 rounded font-medium">Total</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.totalInspections}</p>
                    <p className="text-orange-100 text-sm">Total Inspections</p>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <FileText size={32} />
                        <span className="text-xs bg-white text-teal-600 px-2 py-1 rounded font-medium">Pending</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.pendingInspections}</p>
                    <p className="text-teal-100 text-sm">Pending Inspections</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate('/field-officer/inspections')}
                        className="p-4 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all hover:shadow-md text-left group"
                    >
                        <ClipboardCheck className="text-indigo-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                        <p className="font-semibold text-gray-900">All Inspections</p>
                        <p className="text-sm text-gray-600">View assigned</p>
                    </button>
                    <button
                        onClick={() => navigate('/field-officer/history')}
                        className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-all hover:shadow-md text-left group"
                    >
                        <FileText className="text-green-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                        <p className="font-semibold text-gray-900">History</p>
                        <p className="text-sm text-gray-600">Past inspections</p>
                    </button>
                    <button
                        onClick={() => navigate('/field-officer/schedule')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-all hover:shadow-md text-left group"
                    >
                        <Calendar className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                        <p className="font-semibold text-gray-900">Schedule</p>
                        <p className="text-sm text-gray-600">View calendar</p>
                    </button>
                    <button
                        onClick={() => navigate('/field-officer/notifications')}
                        className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition-all hover:shadow-md text-left group"
                    >
                        <Bell className="text-orange-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                        <p className="font-semibold text-gray-900">Notifications</p>
                        <p className="text-sm text-gray-600">View alerts</p>
                    </button>
                </div>
            </div>

            {/* Today's Inspections */}
            {todayInspections.length > 0 && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Today's Inspections</h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {todayInspections.length} Scheduled
                        </span>
                    </div>
                    <div className="space-y-4">
                        {todayInspections.map((inspection) => (
                            <div key={inspection.id} className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{inspection.projectTitle}</h3>
                                        <p className="text-sm text-gray-600">ID: {inspection.id} • Project: {inspection.projectId}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(inspection.priority)}`}>
                                        {inspection.priority}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                                    <div>
                                        <p className="text-gray-600">Location</p>
                                        <p className="font-medium text-gray-900">{inspection.village}, {inspection.district}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Time</p>
                                        <p className="font-medium text-gray-900">{inspection.scheduledTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Agency</p>
                                        <p className="font-medium text-gray-900">{inspection.agency}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Inspection</p>
                                        <p className="font-medium text-gray-900">{inspection.inspectionNumber}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/field-officer/inspections/${inspection.id}`)}
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => navigate(`/field-officer/inspections/${inspection.id}/form`)}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                    >
                                        <Upload size={16} />
                                        Start Inspection
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming Inspections */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Inspections</h2>
                    <button
                        onClick={() => navigate('/field-officer/inspections')}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                    >
                        View All
                        <ArrowRight size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingInspections.map((inspection) => (
                        <div key={inspection.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{inspection.projectTitle}</h3>
                                    <p className="text-sm text-gray-600">ID: {inspection.id}</p>
                                    <p className="text-xs text-gray-500">{inspection.inspectionNumber}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(inspection.priority)}`}>
                                    {inspection.priority}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm mb-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={14} />
                                    <span>{inspection.village}, {inspection.district}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={14} />
                                    <span>{new Date(inspection.scheduledDate).toLocaleDateString('en-IN')} • {inspection.scheduledTime}</span>
                                </div>
                                <div className="text-xs">
                                    <p className="text-gray-600">Agency: <span className="font-medium text-gray-900">{inspection.agency}</span></p>
                                    <p className="text-gray-600">Sarpanch: <span className="font-medium text-gray-900">{inspection.sarpanch}</span></p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/field-officer/inspections/${inspection.id}`)}
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                            >
                                <Eye size={16} />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                    <button
                        onClick={() => navigate('/field-officer/notifications')}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                    >
                        View All
                        <ArrowRight size={16} />
                    </button>
                </div>
                <div className="space-y-3">
                    {recentNotifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`p-2 rounded-full ${notification.type === 'assignment' ? 'bg-blue-100' :
                                notification.type === 'change' ? 'bg-yellow-100' : 'bg-orange-100'
                                }`}>
                                <Bell className={
                                    notification.type === 'assignment' ? 'text-blue-600' :
                                        notification.type === 'change' ? 'text-yellow-600' : 'text-orange-600'
                                } size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
