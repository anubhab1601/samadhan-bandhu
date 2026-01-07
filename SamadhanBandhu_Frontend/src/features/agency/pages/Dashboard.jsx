import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Send, Briefcase, IndianRupee, TrendingUp, Clock, CheckCircle,
    AlertCircle, ArrowRight, Bell, ListTodo, Upload, Users, Calendar,
    BarChart3, DollarSign, Eye, Edit
} from 'lucide-react';
import BroadcastDisplay from '../../../shared/components/BroadcastDisplay';

export default function Dashboard() {
    const navigate = useNavigate();

    const stats = {
        activeTenders: 4,
        submittedProposals: 3,
        ongoingProjects: 1,
        totalEarnings: 990000,
        pendingPayments: 825000,
        completionRate: 100
    };

    const activeTenders = [
        { id: 'TND-2025-001', title: 'Community Hall Construction', budget: 5000000, deadline: '2025-12-25', status: 'Active', location: 'Pune' },
        { id: 'TND-2025-002', title: 'Village Road Development', budget: 7500000, deadline: '2025-12-20', status: 'Active', location: 'Mumbai' },
        { id: 'TND-2025-003', title: 'Water Supply System', budget: 12000000, deadline: '2025-12-30', status: 'Active', location: 'Nashik' }
    ];

    const ongoingProjects = [
        {
            id: 'PROJ-2025-001',
            title: 'School Building Renovation',
            progress: 45,
            status: 'On Track',
            location: 'Daund',
            nextMilestone: 'Foundation Work',
            dueDate: '2025-12-15'
        }
    ];

    const recentProjects = [
        { id: 'PROJ-2024-012', title: 'Village Community Center', status: 'Completed', completedDate: '2024-11-15', rating: 5 },
        { id: 'PROJ-2024-011', title: 'Rural Road Construction', status: 'Completed', completedDate: '2024-10-20', rating: 4.5 }
    ];

    const tasks = [
        { id: 1, title: 'Submit monthly progress report', priority: 'high', dueDate: '2025-12-05', status: 'pending' },
        { id: 2, title: 'Upload site inspection photos', priority: 'medium', dueDate: '2025-12-07', status: 'pending' },
        { id: 3, title: 'Review tender documents', priority: 'low', dueDate: '2025-12-10', status: 'pending' },
        { id: 4, title: 'Submit bills for approval', priority: 'high', dueDate: '2025-12-06', status: 'pending' }
    ];

    const notifications = [
        { id: 1, type: 'success', message: 'Your proposal for Community Hall was shortlisted', time: '2 hours ago', read: false },
        { id: 2, type: 'warning', message: 'Progress report due in 3 days', time: '5 hours ago', read: false },
        { id: 3, type: 'info', message: 'New tender available: Water Supply System', time: '1 day ago', read: true },
        { id: 4, type: 'success', message: 'Payment of ₹4.5L received', time: '2 days ago', read: true }
    ];

    const getPriorityColor = (priority) => {
        const colors = {
            high: 'bg-red-100 text-red-700 border-red-200',
            medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            low: 'bg-green-100 text-green-700 border-green-200'
        };
        return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getNotificationIcon = (type) => {
        const icons = {
            success: <CheckCircle className="text-green-600" size={20} />,
            warning: <AlertCircle className="text-yellow-600" size={20} />,
            info: <Bell className="text-blue-600" size={20} />
        };
        return icons[type] || <Bell className="text-gray-600" size={20} />;
    };

    return (
        <div className="space-y-6">
            <BroadcastDisplay role="agency" />
            {/* Page Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2">Agency Dashboard</h1>
                <p className="text-orange-100">Welcome back! Here's an overview of your business</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <FileText size={32} />
                        <span className="text-sm bg-white text-blue-600 px-2 py-1 rounded font-medium">Tenders</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.activeTenders}</p>
                    <p className="text-blue-100 text-sm">Active Tenders Available</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <Send size={32} />
                        <span className="text-sm bg-white text-green-600 px-2 py-1 rounded font-medium">Proposals</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.submittedProposals}</p>
                    <p className="text-green-100 text-sm">Submitted Proposals</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <Briefcase size={32} />
                        <span className="text-sm bg-white text-purple-600 px-2 py-1 rounded font-medium">Projects</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.ongoingProjects}</p>
                    <p className="text-purple-100 text-sm">Ongoing Projects</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <IndianRupee size={32} />
                        <span className="text-sm bg-white text-orange-600 px-2 py-1 rounded font-medium">Earnings</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">₹{(stats.totalEarnings / 100000).toFixed(2)}L</p>
                    <p className="text-orange-100 text-sm">Total Received</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={32} />
                        <span className="text-sm bg-white text-red-600 px-2 py-1 rounded font-medium">Pending</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">₹{(stats.pendingPayments / 100000).toFixed(2)}L</p>
                    <p className="text-red-100 text-sm">Pending Payments</p>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={32} />
                        <span className="text-sm bg-white text-teal-600 px-2 py-1 rounded font-medium">Success</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.completionRate}%</p>
                    <p className="text-teal-100 text-sm">Completion Rate</p>
                </div>
            </div>

            {/* Quick Actions - Enhanced */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="text-orange-600" size={24} />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <button
                        onClick={() => navigate('/agency/tenders')}
                        className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all text-center group"
                    >
                        <FileText className="text-blue-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">Browse Tenders</p>
                        <p className="text-xs text-gray-600 mt-1">Find opportunities</p>
                    </button>

                    <button
                        onClick={() => navigate('/agency/projects')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-all text-center group"
                    >
                        <Briefcase className="text-purple-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">My Projects</p>
                        <p className="text-xs text-gray-600 mt-1">Manage execution</p>
                    </button>

                    <button
                        onClick={() => navigate('/agency/progress-report')}
                        className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all text-center group"
                    >
                        <Upload className="text-green-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">Submit Report</p>
                        <p className="text-xs text-gray-600 mt-1">Progress update</p>
                    </button>

                    <button
                        onClick={() => navigate('/agency/payments')}
                        className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-all text-center group"
                    >
                        <DollarSign className="text-orange-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">Payments</p>
                        <p className="text-xs text-gray-600 mt-1">Track finances</p>
                    </button>

                    <button
                        onClick={() => navigate('/agency/workers')}
                        className="p-4 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all text-center group"
                    >
                        <Users className="text-indigo-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">Workers</p>
                        <p className="text-xs text-gray-600 mt-1">Manage team</p>
                    </button>

                    <button
                        onClick={() => navigate('/agency/schedule')}
                        className="p-4 border-2 border-pink-200 rounded-lg hover:bg-pink-50 hover:border-pink-400 transition-all text-center group"
                    >
                        <Calendar className="text-pink-600 mb-2 mx-auto group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-semibold text-gray-900 text-sm">Schedule</p>
                        <p className="text-xs text-gray-600 mt-1">View timeline</p>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Tenders */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="text-blue-600" size={20} />
                                Active Tenders
                            </h2>
                            <button
                                onClick={() => navigate('/agency/tenders')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                View All
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {activeTenders.slice(0, 3).map((tender) => (
                                <div key={tender.id} className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{tender.title}</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">Tender ID: {tender.id}</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="text-gray-600">Budget: <span className="font-semibold text-gray-900">₹{(tender.budget / 100000).toFixed(2)}L</span></span>
                                        <span className="text-gray-600">Location: <span className="font-semibold text-gray-900">{tender.location}</span></span>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                                        <span className="text-xs text-gray-600">Deadline: <span className="font-semibold text-red-600">{new Date(tender.deadline).toLocaleDateString('en-IN')}</span></span>
                                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                            <Eye size={14} />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ongoing Projects */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Briefcase className="text-purple-600" size={20} />
                                Ongoing Projects
                            </h2>
                            <button
                                onClick={() => navigate('/agency/projects')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                View All
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {ongoingProjects.map((project) => (
                                <div key={project.id} className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                                            <p className="text-sm text-gray-600">Project ID: {project.id}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{project.status}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-gray-900">{project.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full transition-all"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                                            <span>Next: <span className="font-semibold text-gray-900">{project.nextMilestone}</span></span>
                                            <span>Due: <span className="font-semibold text-gray-900">{new Date(project.dueDate).toLocaleDateString('en-IN')}</span></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={20} />
                                Recent Completed Projects
                            </h2>
                            <button
                                onClick={() => navigate('/agency/projects/completed')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                View All
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Completed</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Completed: <span className="font-semibold text-gray-900">{new Date(project.completedDate).toLocaleDateString('en-IN')}</span></span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-semibold text-gray-900">{project.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Tasks */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ListTodo className="text-orange-600" size={20} />
                                Tasks
                            </h2>
                            <button
                                onClick={() => navigate('/agency/tasks')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                                View All
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {tasks.slice(0, 4).map((task) => (
                                <div key={task.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                                    <div className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Bell className="text-blue-600" size={20} />
                                Notifications
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </h2>
                            <button
                                onClick={() => navigate('/agency/notifications')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                                View All
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {notifications.slice(0, 4).map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-3 rounded-lg border transition-all ${notification.read
                                        ? 'bg-gray-50 border-gray-200'
                                        : 'bg-blue-50 border-blue-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {getNotificationIcon(notification.type)}
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
