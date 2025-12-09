import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, Eye, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        // Simulate API call
        setTimeout(() => {
            setStats({
                totalApplications: 156,
                pendingReview: 24,
                pendingVerification: 15,
                forwardedToPMAJAY: 45,
                rejected: 12,
                ongoingProjects: 42,
                completedProjects: 18,
                totalFundsDisbursed: 125000000, // 12.5 Crores
                districtWiseData: [
                    { name: 'Pune', applications: 45 },
                    { name: 'Nagpur', applications: 32 },
                    { name: 'Nashik', applications: 28 },
                    { name: 'Aurangabad', applications: 25 },
                    { name: 'Thane', applications: 26 },
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    const statusChartData = stats ? [
        { name: 'Pending Review', value: stats.pendingReview },
        { name: 'Pending Verification', value: stats.pendingVerification },
        { name: 'Forwarded', value: stats.forwardedToPMAJAY },
        { name: 'Rejected', value: stats.rejected },
    ] : [];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">State Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                    {user.state || 'Maharashtra'} State Overview
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
                        value={stats.pendingReview.toString()}
                        icon={Clock}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-700"
                    />
                    <InfoCard
                        title="Pending Verification"
                        value={stats.pendingVerification.toString()}
                        icon={Users}
                        gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                    />
                    <InfoCard
                        title="Ongoing Projects"
                        value={stats.ongoingProjects.toString()}
                        icon={Building2}
                        gradient="bg-gradient-to-br from-green-500 to-green-700"
                    />
                </div>
            ) : null}

            {/* Charts Section */}
            {stats && (
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
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* District-wise Applications Bar Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded"></span>
                            Top Districts by Applications
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.districtWiseData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Recent Pending Applications Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Recent Pending Applications
                    </h2>
                    <Link to="/applications/pending" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Application ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Village</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">District</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">PMAJAY-2025-MH-1234{i}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">Village {String.fromCharCode(64 + i)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">Pune</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">Infrastructure</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">2025-11-2{i}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <Link to={`/applications/PMAJAY-2025-MH-1234${i}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                            <Eye size={16} /> Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
