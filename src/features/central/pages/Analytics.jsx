import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Download, Filter, IndianRupee, Layers, Activity, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
    const [timeRange, setTimeRange] = useState('year');

    // Mock Data
    const kpiData = [
        { title: "Total Budget", value: "₹12,500 Cr", icon: IndianRupee, color: "bg-blue-500" },
        { title: "Funds Utilized", value: "₹8,240 Cr", icon: TrendingUp, color: "bg-green-500" },
        { title: "Total Projects", value: "1,245", icon: Layers, color: "bg-purple-500" },
        { title: "Completion Rate", value: "68%", icon: Activity, color: "bg-orange-500" }
    ];

    const statePerformance = [
        { state: "Uttar Pradesh", budget: 4500, spent: 3200, progress: 71 },
        { state: "Bihar", budget: 3200, spent: 1800, progress: 56 },
        { state: "Madhya Pradesh", budget: 2800, spent: 2100, progress: 75 },
        { state: "Rajasthan", budget: 2100, spent: 1900, progress: 90 },
        { state: "Maharashtra", budget: 3500, spent: 2800, progress: 80 },
    ];

    const schemeData = [
        { name: "Adarsh Gram", budget: 6000, spent: 4200, color: "#3b82f6" },
        { name: "GIA", budget: 4000, spent: 2800, color: "#10b981" },
        { name: "Hostels", budget: 2500, spent: 1240, color: "#f59e0b" }
    ];

    const monthlyExpenditure = [
        { month: 'Apr', spent: 450 },
        { month: 'May', spent: 520 },
        { month: 'Jun', spent: 480 },
        { month: 'Jul', spent: 610 },
        { month: 'Aug', spent: 580 },
        { month: 'Sep', spent: 650 },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Scheme Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Comprehensive view of scheme performance and fund utilization</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6">
                <select
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                </select>
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50">
                    <Filter size={18} /> Filter
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    <Download size={18} /> Export
                </button>
            </div>

            {/* KPI Cards - White Simple */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {kpiData.map((kpi, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-3">
                            <kpi.icon size={32} className="text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                        <div className="text-sm text-gray-600">{kpi.title}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fund Utilization */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Fund Utilization</h3>
                            <p className="text-sm text-gray-500">State-wise budget vs spent</p>
                        </div>
                        <Link to="/central/funds" className="text-orange-500 text-sm font-medium hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {statePerformance.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.state}</span>
                                    <span className="text-gray-500">{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${item.progress > 80 ? 'bg-green-500' :
                                            item.progress > 60 ? 'bg-blue-500' :
                                                'bg-orange-500'
                                            }`}
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>₹{item.spent} Cr Spent</span>
                                    <span>₹{item.budget} Cr Allocated</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Project Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="font-medium text-gray-700">In Progress</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">560 (45%)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="font-medium text-gray-700">Completed</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">373 (30%)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span className="font-medium text-gray-700">Pending</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">186 (15%)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="font-medium text-gray-700">Delayed</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">124 (10%)</span>
                        </div>
                    </div>
                </div>

                {/* Scheme-wise Fund Utilization */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Scheme-wise Fund Utilization</h3>
                    <div className="space-y-4">
                        {schemeData.map((scheme, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scheme.color }}></div>
                                        <span className="font-bold text-gray-800">{scheme.name}</span>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: scheme.color }}>
                                        {((scheme.spent / scheme.budget) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{ width: `${(scheme.spent / scheme.budget) * 100}%`, backgroundColor: scheme.color }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Utilized: ₹{scheme.spent} Cr</span>
                                    <span>Budget: ₹{scheme.budget} Cr</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Expenditure Trend */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Expenditure Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyExpenditure}>
                                <defs>
                                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                                <Area type="monotone" dataKey="spent" stroke="#10b981" strokeWidth={2} fill="url(#colorSpent)" name="Spent (Cr)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
