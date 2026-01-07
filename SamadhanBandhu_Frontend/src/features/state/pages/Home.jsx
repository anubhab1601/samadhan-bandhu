import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckSquare, Users, Eye, Clock, AlertCircle, TrendingUp, Building2, Calendar } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, link }) => (
    <Link to={link} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
        <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={`relative ${gradient} p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} className="text-white" strokeWidth={2.5} />
                    <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                </div>
            </div>
        </div>
        <div className={`h-1 ${gradient}`}></div>
    </Link>
);

const QuickActionCard = ({ title, description, icon: Icon, link, color }) => (
    <Link to={link} className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-400 transition-all group">
        <div className={`inline-flex items-center justify-center w-12 h-12 ${color} bg-opacity-10 rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </Link>
);

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome, {user.name || 'State Officer'}!
                        </h1>
                        <p className="text-blue-100">
                            {user.state || 'Maharashtra'} State Dashboard | PM-AJAY
                        </p>
                        <p className="text-sm text-blue-200 mt-2">
                            Review applications, assign IVAs, and monitor state-wide development progress.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <p className="text-xs text-blue-200 mb-1">Last Login</p>
                            <p className="text-sm font-semibold">{new Date().toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Overview */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    State Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Pending Review"
                        value="24"
                        icon={Clock}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-700"
                        link="/applications/pending"
                    />
                    <StatCard
                        title="Pending Verification"
                        value="15"
                        icon={CheckSquare}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                        link="/verification/assign"
                    />
                    <StatCard
                        title="Ready for Forwarding"
                        value="8"
                        icon={TrendingUp}
                        gradient="bg-gradient-to-br from-green-500 to-green-700"
                        link="/verification/forward"
                    />
                    <StatCard
                        title="Ongoing Projects"
                        value="42"
                        icon={Building2}
                        gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                        link="/projects/ongoing"
                    />
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <QuickActionCard
                        title="Review Applications"
                        description="Review new applications from Sarpanchs"
                        icon={FileText}
                        link="/applications/pending"
                        color="bg-blue-600"
                    />
                    <QuickActionCard
                        title="Assign IVA"
                        description="Assign verification agencies to applications"
                        icon={Users}
                        link="/verification/assign"
                        color="bg-orange-600"
                    />
                    <QuickActionCard
                        title="Schedule Inspection"
                        description="Plan field inspections for ongoing projects"
                        icon={Calendar}
                        link="/inspections/schedule"
                        color="bg-purple-600"
                    />
                    <QuickActionCard
                        title="Forward to PM-AJAY"
                        description="Submit verified applications for final approval"
                        icon={TrendingUp}
                        link="/verification/forward"
                        color="bg-green-600"
                    />
                    <QuickActionCard
                        title="Monitor Projects"
                        description="Track progress of all village projects"
                        icon={Eye}
                        link="/projects/ongoing"
                        color="bg-indigo-600"
                    />
                    <QuickActionCard
                        title="View Reports"
                        description="Access monthly and quarterly progress reports"
                        icon={FileText}
                        link="/reports"
                        color="bg-teal-600"
                    />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Recent Activity
                    </h2>
                </div>
                <div className="divide-y divide-gray-100">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">New Application Received</p>
                                <p className="text-sm text-gray-600 mt-1">Application PMAJAY-2025-MH-12345 received from Village XYZ</p>
                                <p className="text-xs text-gray-400 mt-2">10 mins ago</p>
                            </div>
                            <button className="text-xs text-blue-600 hover:underline font-medium">Review</button>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckSquare size={20} className="text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">IVA Report Submitted</p>
                                <p className="text-sm text-gray-600 mt-1">IVA submitted verification report for Project ABC</p>
                                <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
                            </div>
                            <button className="text-xs text-blue-600 hover:underline font-medium">View Report</button>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Eye size={20} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Inspection Completed</p>
                                <p className="text-sm text-gray-600 mt-1">Field Officer completed inspection for Road Project in Village PQR</p>
                                <p className="text-xs text-gray-400 mt-2">3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
