import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, Eye, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const InfoCard = ({ title, value, icon: Icon, gradient }) => (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
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
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        // Simulate API call - replace with actual API
        setTimeout(() => {
            setStats({
                totalApplications: 12,
                pending: 3,
                approved: 6,
                rejected: 1,
                inProgress: 2,
                activeTenders: 2,
                ongoingProjects: 5,
                completedProjects: 8,
                totalFunds: 25000000, // 2.5 Crores
                applications: [
                    { id: 'PMAJAY-2025-MH-12345', title: 'Community Hall Construction', status: 'Approved', date: '2025-11-20' },
                    { id: 'PMAJAY-2025-MH-12346', title: 'Road Development', status: 'Pending', date: '2025-11-25' },
                    { id: 'PMAJAY-2025-MH-12347', title: 'Water Supply System', status: 'In Progress', date: '2025-11-15' },
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    const statusChartData = stats ? [
        { name: 'Pending', value: stats.pending },
        { name: 'Approved', value: stats.approved },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Rejected', value: stats.rejected },
    ].filter(item => item.value > 0) : [];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Sarpanch Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                    {user.village_name || 'Your Village'} | {user.district || 'District'}, {user.state || 'State'}
                </p>
            </div>

            {/* Statistics Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-md animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InfoCard
                        title="Total Applications"
                        value={stats.totalApplications.toString()}
                        icon={FileText}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                    />
                    <InfoCard
                        title="Pending Review"
                        value={stats.pending.toString()}
                        icon={Clock}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-700"
                    />
                    <InfoCard
                        title="Active Tenders"
                        value={stats.activeTenders.toString()}
                        icon={TrendingUp}
                        gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                    />
                    <InfoCard
                        title="Ongoing Projects"
                        value={stats.ongoingProjects.toString()}
                        icon={CheckCircle}
                        gradient="bg-gradient-to-br from-green-500 to-green-700"
                    />
                </div>
            ) : null}

            {/* Charts Section */}
            {stats && statusChartData.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Status Distribution Pie Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded"></span>
                            Application Status Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Status Breakdown Bar Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded"></span>
                            Status Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={statusChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#3b82f6" name="Applications" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Recent Applications Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Recent Applications
                    </h2>
                    <Link to="/sarpanch/applications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="px-6 py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-500">Loading applications...</p>
                        </div>
                    ) : stats && stats.applications && stats.applications.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Application ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitted Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {stats.applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{app.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{app.title}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    app.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link to={`/sarpanch/applications/${app.id}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <p>No applications found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">Ongoing Projects</h3>
                        <TrendingUp className="text-blue-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats?.ongoingProjects || 0}</p>
                    <Link to="/sarpanch/ongoing-projects" className="text-xs text-blue-600 hover:underline mt-2 inline-block">View Details →</Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">Completed Projects</h3>
                        <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats?.completedProjects || 0}</p>
                    <Link to="/sarpanch/completed-projects" className="text-xs text-green-600 hover:underline mt-2 inline-block">View Details →</Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">Total Funds Allocated</h3>
                        <DollarSign className="text-purple-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">₹{((stats?.totalFunds || 0) / 10000000).toFixed(2)} Cr</p>
                    <p className="text-xs text-gray-500 mt-2">Across all projects</p>
                </div>
            </div>
        </div>
    );
}
