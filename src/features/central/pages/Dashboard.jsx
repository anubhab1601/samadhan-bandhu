import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, DollarSign, AlertCircle, CheckCircle, ArrowRight, Download, Eye, RefreshCw, Filter, Calendar, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const InfoCard = ({ title, value, change, icon: Icon, gradient }) => (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
        <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={`relative ${gradient} p-3 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                    <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                </div>
            </div>
            {change && (
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-50' : 'bg-red-50'}`}>
                        <TrendingUp size={12} className={change.startsWith('+') ? 'text-green-600' : 'text-red-600 rotate-180'} />
                        <span className={`text-xs font-bold ${change.startsWith('+') ? 'text-green-700' : 'text-red-700'}`}>
                            {change}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-500">vs last month</span>
                </div>
            )}
        </div>
        <div className={`h-1 ${gradient}`}></div>
    </div>
);

const QuickLinkCard = ({ title, icon: Icon, link }) => (
    <Link to={link} className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-400 transition-all group">
        <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <Icon size={24} className="text-blue-600" />
            </div>
            <h4 className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-blue-600">{title}</h4>
        </div>
    </Link>
);

const AnnouncementSlide = ({ title, date, description }) => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-blue-100 text-sm mb-3">{description}</p>
                <p className="text-xs text-blue-200">Published: {date}</p>
            </div>
            <button className="ml-4 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 text-sm font-medium flex items-center gap-2">
                Read More <ArrowRight size={16} />
            </button>
        </div>
    </div>
);

export default function Dashboard() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const announcements = [
        {
            title: "New Guidelines for Project Submission Released",
            date: "22 November 2025",
            description: "Updated guidelines for PM-AJAY project proposals are now available. All stakeholders are requested to review."
        },
        {
            title: "Fund Disbursement for Q3 Completed",
            date: "20 November 2025",
            description: "₹450 Crores successfully disbursed to implementing agencies across all states."
        },
        {
            title: "National Workshop on Best Practices - 15th December",
            date: "18 November 2025",
            description: "Join us for a comprehensive workshop showcasing successful implementation models."
        }
    ];


    const fetchStats = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        try {
            // Mock data instead of API call
            const mockData = {
                totalProjects: 12547,
                activeProjects: 8234,
                completedProjects: 3892,
                totalBudget: 850000000000,
                utilizedBudget: 623000000000,
                pendingApprovals: 156,
                statusBreakdown: {
                    pending: 156,
                    inProgress: 8234,
                    completed: 3892,
                    onHold: 189,
                    planned: 76
                },
                recentProjects: [
                    {
                        id: 1,
                        name: "Rural Infrastructure Development - Phase 3",
                        state: "Maharashtra",
                        district: "Pune",
                        budget: 45000000,
                        status: "In Progress",
                        progress: 67,
                        startDate: "2024-01-15"
                    },
                    {
                        id: 2,
                        name: "Community Center Construction",
                        state: "Gujarat",
                        district: "Ahmedabad",
                        budget: 28000000,
                        status: "Completed",
                        progress: 100,
                        startDate: "2023-11-20"
                    },
                    {
                        id: 3,
                        name: "Water Supply Enhancement Project",
                        state: "Rajasthan",
                        district: "Jaipur",
                        budget: 52000000,
                        status: "In Progress",
                        progress: 45,
                        startDate: "2024-02-10"
                    }
                ]
            };

            setStats(mockData);
            setError(null);
        } catch (err) {
            console.error('Error fetching stats:', err);
            setError(err.response?.data?.error || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % announcements.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const exportToCSV = () => {
        if (!stats || !stats.recentProjects) return;

        const headers = ['Project ID', 'Title', 'State', 'District', 'Budget', 'Status'];
        const rows = stats.recentProjects.map(p => [
            p.id,
            p.title,
            p.state || '',
            p.district || '',
            p.total_budget ? `₹${(p.total_budget / 10000000).toFixed(2)} Cr` : 'N/A',
            p.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `projects-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const exportToPDF = async () => {
        if (!stats) return;

        const { jsPDF } = await import('jspdf');
        await import('jspdf-autotable');

        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text('PM-AJAY Dashboard Report', 14, 20);

        // Date
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

        // Statistics
        doc.setFontSize(12);
        doc.text('Summary Statistics', 14, 38);
        doc.setFontSize(10);
        doc.text(`Total Projects: ${stats.totalProjects}`, 14, 45);
        doc.text(`Total Budget: ₹${(stats.totalBudget / 10000000).toFixed(2)} Cr`, 14, 52);
        doc.text(`Completed: ${stats.statusBreakdown.completed}`, 14, 59);
        doc.text(`In Progress: ${stats.statusBreakdown.inProgress}`, 14, 66);
        doc.text(`Pending: ${stats.statusBreakdown.pending}`, 14, 73);

        // Projects Table
        if (stats.recentProjects && stats.recentProjects.length > 0) {
            doc.autoTable({
                startY: 80,
                head: [['ID', 'Title', 'State', 'Budget', 'Status']],
                body: stats.recentProjects.map(p => [
                    p.id,
                    p.title,
                    p.state || '',
                    p.total_budget ? `₹${(p.total_budget / 10000000).toFixed(2)} Cr` : 'N/A',
                    p.status
                ]),
            });
        }

        doc.save(`dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    // Prepare chart data
    const statusChartData = stats ? [
        { name: 'Pending', value: stats.statusBreakdown.pending },
        { name: 'In Progress', value: stats.statusBreakdown.inProgress },
        { name: 'Completed', value: stats.statusBreakdown.completed },
        { name: 'On Hold', value: stats.statusBreakdown.onHold },
        { name: 'Planned', value: stats.statusBreakdown.planned },
    ].filter(item => item.value > 0) : [];

    return (
        <div className="space-y-6">
            {/* Page Header with Controls */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Centre Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">Unified monitoring and management platform for PM-AJAY schemes</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Export dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowExportMenu(!showExportMenu)}
                                disabled={!stats}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download size={18} />
                                Export
                                <ChevronDown size={16} />
                            </button>
                            {showExportMenu && stats && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                    <button
                                        onClick={() => { exportToCSV(); setShowExportMenu(false); }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700 rounded-t-md"
                                    >
                                        <Download size={16} />
                                        Export as CSV
                                    </button>
                                    <button
                                        onClick={() => { exportToPDF(); setShowExportMenu(false); }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700 rounded-b-md"
                                    >
                                        <Download size={16} />
                                        Export as PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcements Carousel */}
            <div className="relative">
                <AnnouncementSlide {...announcements[currentSlide]} />
                <div className="flex justify-center gap-2 mt-3">
                    {announcements.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
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
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p className="font-medium">Error loading dashboard data</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InfoCard
                        title="Total Projects"
                        value={stats.totalProjects.toString()}
                        change={null}
                        icon={FileText}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                    />
                    <InfoCard
                        title="Funds Allocated"
                        value={`₹${(stats.totalBudget / 10000000).toFixed(2)} Cr`}
                        change={null}
                        icon={DollarSign}
                        gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
                    />
                    <InfoCard
                        title="Pending Approvals"
                        value={stats.statusBreakdown.pending.toString()}
                        change={null}
                        icon={AlertCircle}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-700"
                    />
                    <InfoCard
                        title="Completed Projects"
                        value={stats.statusBreakdown.completed.toString()}
                        change={null}
                        icon={CheckCircle}
                        gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
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
                            Project Status Distribution
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
                                <Bar dataKey="value" fill="#3b82f6" name="Projects" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    Quick Access
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <QuickLinkCard title="New Project" icon={FileText} link="/projects/new" />
                    <QuickLinkCard title="Fund Requests" icon={DollarSign} link="/funds" />
                    <QuickLinkCard title="Reports" icon={Download} link="/reports" />
                    <QuickLinkCard title="GIS View" icon={Eye} link="/gis" />
                    <QuickLinkCard title="Analytics" icon={TrendingUp} link="/analytics" />
                    <QuickLinkCard title="Alerts" icon={AlertCircle} link="/alerts" />
                </div>
            </div>

            {/* Recent Projects Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        Recent Projects
                    </h2>
                    <Link to="/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="px-6 py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-500">Loading projects...</p>
                        </div>
                    ) : stats && stats.recentProjects && stats.recentProjects.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Budget</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {stats.recentProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{project.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{project.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{project.state}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            ₹{project.budget ? (project.budget / 10000000).toFixed(2) + ' Cr' : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                    project.status === 'Planned' ? 'bg-indigo-100 text-indigo-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link to={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <p>No recent projects found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
