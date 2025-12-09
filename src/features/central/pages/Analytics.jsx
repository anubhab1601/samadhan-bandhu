import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar, Filter, Download, ArrowUpRight, ArrowDownRight, IndianRupee, Layers, Activity, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Analytics() {
    const { t } = useLanguage();
    const [timeRange, setTimeRange] = useState('year');

    // Mock Data
    const kpiData = [
        { title: "Total Budget Allocated", value: "₹12,500 Cr", change: "+15%", trend: "up", icon: <IndianRupee />, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/30" },
        { title: "Funds Utilized", value: "₹8,240 Cr", change: "+8%", trend: "up", icon: <TrendingUp />, color: "from-green-500 to-green-600", shadow: "shadow-green-500/30" },
        { title: "Total Projects", value: "1,245", change: "+124", trend: "up", icon: <Layers />, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/30" },
        { title: "Completion Rate", value: "68%", change: "-2%", trend: "down", icon: <Activity />, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/30" }
    ];

    const statePerformance = [
        { state: "Uttar Pradesh", budget: 4500, spent: 3200, progress: 71 },
        { state: "Bihar", budget: 3200, spent: 1800, progress: 56 },
        { state: "Madhya Pradesh", budget: 2800, spent: 2100, progress: 75 },
        { state: "Rajasthan", budget: 2100, spent: 1900, progress: 90 },
        { state: "Maharashtra", budget: 3500, spent: 2800, progress: 80 },
    ];

    return (
        <div className="space-y-8 p-6 pb-24 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
                        {t('analytics_title') || "Scheme Analytics"}
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg font-medium">
                        {t('analytics_subtitle') || "Comprehensive view of scheme performance and fund utilization"}
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        className="bg-white border border-gray-200 text-gray-700 py-2.5 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all font-medium cursor-pointer"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 px-5 rounded-xl hover:bg-gray-50 shadow-sm hover:shadow-md transition-all font-medium">
                        <Filter size={18} /> Filter
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-5 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 font-medium">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            {/* KPI Cards - 3D Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kpiData.map((kpi, index) => (
                    <div key={index} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${kpi.color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300 -z-10 transform translate-y-2`}></div>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                {React.cloneElement(kpi.icon, { size: 80 })}
                            </div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-xl text-white shadow-lg ${kpi.shadow}`}>
                                    {React.cloneElement(kpi.icon, { size: 24 })}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${kpi.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {kpi.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {kpi.change}
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{kpi.title}</h3>
                            <p className="text-3xl font-black text-gray-900 mt-1">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section - 3D Style */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fund Utilization Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Fund Utilization</h3>
                            <p className="text-sm text-gray-500">State-wise budget vs spent</p>
                        </div>
                        <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">View Details</button>
                    </div>
                    <div className="space-y-6">
                        {statePerformance.map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-gray-700">{item.state}</span>
                                    <span className="font-medium text-gray-500">{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-4 shadow-inner overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${item.progress > 80 ? 'from-green-500 to-green-400' :
                                                item.progress > 60 ? 'from-blue-500 to-blue-400' :
                                                    'from-orange-500 to-orange-400'
                                            } shadow-lg relative group-hover:brightness-110 transition-all duration-500`}
                                        style={{ width: `${item.progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 w-full -translate-x-full group-hover:animate-shimmer"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                                    <span>₹{item.spent} Cr Spent</span>
                                    <span>₹{item.budget} Cr Allocated</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Status Distribution */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Project Status</h3>
                    <p className="text-sm text-gray-500 mb-8">Current status of all active projects</p>

                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-64 h-64">
                            {/* 3D Donut Effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner"></div>
                            <div className="absolute inset-2 rounded-full bg-white shadow-2xl flex items-center justify-center flex-col z-10">
                                <span className="text-5xl font-black text-gray-800 drop-shadow-sm">1,245</span>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide mt-1">Total Projects</span>
                            </div>

                            {/* Conic Gradient for Chart Segments */}
                            <div className="absolute inset-0 rounded-full opacity-90" style={{
                                background: `conic-gradient(
                                    #3b82f6 0% 45%, 
                                    transparent 45% 46%,
                                    #22c55e 46% 75%, 
                                    transparent 75% 76%,
                                    #f97316 76% 90%, 
                                    transparent 90% 91%,
                                    #ef4444 91% 100%
                                )`,
                                maskImage: 'radial-gradient(transparent 60%, black 61%)',
                                WebkitMaskImage: 'radial-gradient(transparent 60%, black 61%)'
                            }}></div>
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-10 w-full max-w-md">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md bg-blue-500 shadow-lg shadow-blue-500/40"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">In Progress</p>
                                    <p className="text-xs text-gray-500">560 Projects (45%)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md bg-green-500 shadow-lg shadow-green-500/40"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Completed</p>
                                    <p className="text-xs text-gray-500">373 Projects (30%)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md bg-orange-500 shadow-lg shadow-orange-500/40"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Pending</p>
                                    <p className="text-xs text-gray-500">186 Projects (15%)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md bg-red-500 shadow-lg shadow-red-500/40"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Delayed</p>
                                    <p className="text-xs text-gray-500">124 Projects (10%)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
