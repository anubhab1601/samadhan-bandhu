import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Send, Eye, CheckCircle, Clock, AlertCircle, TrendingUp, Users, Building2 } from 'lucide-react';

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
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome, {user.name || 'Sarpanch'}!
                        </h1>
                        <p className="text-blue-100">
                            {user.village_name || 'Your Village'} | {user.district || 'District'}, {user.state || 'State'}
                        </p>
                        <p className="text-sm text-blue-200 mt-2">
                            Manage your village development projects and applications efficiently
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
                    Quick Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Applications"
                        value="12"
                        icon={FileText}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                        link="/applications"
                    />
                    <StatCard
                        title="Pending Review"
                        value="3"
                        icon={Clock}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-700"
                        link="/applications/track"
                    />
                    <StatCard
                        title="Active Tenders"
                        value="2"
                        icon={Send}
                        gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                        link="/tenders"
                    />
                    <StatCard
                        title="Ongoing Projects"
                        value="5"
                        icon={TrendingUp}
                        gradient="bg-gradient-to-br from-green-500 to-green-700"
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
                        title="Submit New Application"
                        description="Apply for village development under PM-AJAY scheme"
                        icon={FileText}
                        link="/applications/new"
                        color="bg-blue-600"
                    />
                    <QuickActionCard
                        title="Track Application Status"
                        description="Monitor your application progress in real-time"
                        icon={Eye}
                        link="/applications/track"
                        color="bg-green-600"
                    />
                    <QuickActionCard
                        title="Release Tender"
                        description="Publish tender for approved projects"
                        icon={Send}
                        link="/tenders/release"
                        color="bg-purple-600"
                    />
                    <QuickActionCard
                        title="View Tender Applications"
                        description="Review and select agencies for your projects"
                        icon={Users}
                        link="/tenders/applications"
                        color="bg-orange-600"
                    />
                    <QuickActionCard
                        title="Monitor Projects"
                        description="Track ongoing project progress and inspections"
                        icon={Building2}
                        link="/projects/ongoing"
                        color="bg-indigo-600"
                    />
                    <QuickActionCard
                        title="Completed Projects"
                        description="View history of completed village projects"
                        icon={CheckCircle}
                        link="/projects/completed"
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
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle size={20} className="text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Application Approved</p>
                                <p className="text-sm text-gray-600 mt-1">Your application PMAJAY-2025-MH-12345 has been approved by State Officer</p>
                                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">New Tender Application</p>
                                <p className="text-sm text-gray-600 mt-1">ABC Construction submitted application for Community Hall project</p>
                                <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <AlertCircle size={20} className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Inspection Scheduled</p>
                                <p className="text-sm text-gray-600 mt-1">Field inspection scheduled for Road Construction project on 5th Dec 2025</p>
                                <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h3 className="text-sm font-bold text-yellow-900">Important Notice</h3>
                        <p className="text-sm text-yellow-800 mt-1">
                            All pending applications must be updated with latest village data by 15th December 2025.
                            Please ensure all information is accurate and up-to-date.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
