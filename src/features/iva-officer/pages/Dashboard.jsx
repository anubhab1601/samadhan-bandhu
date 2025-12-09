import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, FileText, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight, Calendar } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();

    const stats = {
        newVillageTasks: 5,
        eligibleMarked: 12,
        notEligibleMarked: 3,
        committeeAgencyTasks: 4,
        visitsThisWeek: 3,
        avgCompletionTime: '2.5 days',
        successRate: 95
    };

    const pendingAssignments = [
        {
            id: 'VER-2025-001',
            applicantName: 'Rajesh Kumar',
            village: 'Shirdi',
            district: 'Ahmednagar',
            assignedDate: '2025-11-28',
            deadline: '2025-12-05',
            priority: 'High',
            status: 'Pending'
        },
        {
            id: 'VER-2025-002',
            applicantName: 'Priya Sharma',
            village: 'Nashik Village',
            district: 'Nashik',
            assignedDate: '2025-11-26',
            deadline: '2025-12-03',
            priority: 'Medium',
            status: 'In Progress'
        }
    ];

    const visitsThisWeek = [
        { id: 1, village: 'Shirdi', date: '2025-12-03', type: 'Village Eligibility' },
        { id: 2, village: 'Daund', date: '2025-12-04', type: 'Committee Verification' },
        { id: 3, village: 'Nashik Village', date: '2025-12-05', type: 'Agency Verification' }
    ];

    const recentActivity = [
        { id: 'VER-2025-003', action: 'Report Submitted', applicant: 'Amit Patel', time: '2 hours ago' },
        { id: 'VER-2025-004', action: 'Verification Completed', applicant: 'Sunita Desai', time: '5 hours ago' }
    ];

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'bg-red-100 text-red-700',
            'Medium': 'bg-orange-100 text-orange-700',
            'Low': 'bg-blue-100 text-blue-700'
        };
        return colors[priority] || colors['Medium'];
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'In Progress': 'bg-blue-100 text-blue-700',
            'Completed': 'bg-green-100 text-green-700'
        };
        return colors[status] || colors['Pending'];
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-4">
            {/* Page Header - Mobile Optimized */}
            <div className="bg-white border-l-4 border-l-orange-500 p-3 md:p-4 rounded-r-lg shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">IVA Dashboard</h1>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Welcome back! Here's your verification overview</p>
            </div>

            {/* Statistics Cards - Mobile Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <ClipboardCheck size={24} className="md:hidden" />
                        <ClipboardCheck size={32} className="hidden md:block" />
                        <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded font-medium">New</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold mb-1">{stats.newVillageTasks}</p>
                    <p className="text-blue-100 text-xs md:text-sm">New Village Tasks</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="md:hidden" />
                        <CheckCircle size={32} className="hidden md:block" />
                        <span className="text-xs bg-white text-green-600 px-2 py-1 rounded font-medium">Eligible</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold mb-1">{stats.eligibleMarked}</p>
                    <p className="text-green-100 text-xs md:text-sm">Eligible Marked</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <AlertCircle size={24} className="md:hidden" />
                        <AlertCircle size={32} className="hidden md:block" />
                        <span className="text-xs bg-white text-red-600 px-2 py-1 rounded font-medium">Not Eligible</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold mb-1">{stats.notEligibleMarked}</p>
                    <p className="text-red-100 text-xs md:text-sm">Not Eligible Marked</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <FileText size={24} className="md:hidden" />
                        <FileText size={32} className="hidden md:block" />
                        <span className="text-xs bg-white text-purple-600 px-2 py-1 rounded font-medium">Tasks</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold mb-1">{stats.committeeAgencyTasks}</p>
                    <p className="text-purple-100 text-xs md:text-sm">Committee/Agency Tasks</p>
                </div>
            </div>

            {/* Quick Actions - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <button
                        onClick={() => navigate('/iva-officer/assignments')}
                        className="p-3 md:p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
                    >
                        <ClipboardCheck className="text-blue-600 mb-2" size={20} />
                        <p className="font-semibold text-gray-900 text-sm md:text-base">Assignments</p>
                        <p className="text-xs text-gray-600">View all tasks</p>
                    </button>
                    <button
                        onClick={() => navigate('/iva-officer/reports')}
                        className="p-3 md:p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"
                    >
                        <FileText className="text-green-600 mb-2" size={20} />
                        <p className="font-semibold text-gray-900 text-sm md:text-base">Reports</p>
                        <p className="text-xs text-gray-600">Submit reports</p>
                    </button>
                    <button
                        onClick={() => navigate('/iva-officer/verifications')}
                        className="p-3 md:p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left col-span-2 md:col-span-1"
                    >
                        <MapPin className="text-orange-600 mb-2" size={20} />
                        <p className="font-semibold text-gray-900 text-sm md:text-base">Field Visits</p>
                        <p className="text-xs text-gray-600">Schedule visits</p>
                    </button>
                </div>
            </div>

            {/* Pending Assignments - Mobile Cards */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">Pending Assignments</h2>
                    <button
                        onClick={() => navigate('/iva-officer/verifications')}
                        className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium flex items-center gap-1"
                    >
                        View All
                        <ArrowRight size={14} />
                    </button>
                </div>
                <div className="space-y-3">
                    {pendingAssignments.map((assignment) => (
                        <div key={assignment.id} className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{assignment.applicantName}</h3>
                                    <p className="text-xs md:text-sm text-gray-600">ID: {assignment.id}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(assignment.priority)}`}>
                                        {assignment.priority}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-xs md:text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <MapPin size={14} />
                                    <span>{assignment.village}, {assignment.district}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Clock size={14} />
                                    <span>Due: {new Date(assignment.deadline).toLocaleDateString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visits This Week - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Visits This Week</h2>
                <div className="space-y-3">
                    {visitsThisWeek.map((visit) => (
                        <div key={visit.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <Calendar className="text-purple-600" size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{visit.village}</p>
                                <p className="text-xs md:text-sm text-gray-600">{visit.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs md:text-sm font-medium text-purple-600">{new Date(visit.date).toLocaleDateString('en-IN')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-green-100 rounded-full">
                                <CheckCircle className="text-green-600" size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{activity.action}</p>
                                <p className="text-xs md:text-sm text-gray-600">{activity.applicant} • {activity.id}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
