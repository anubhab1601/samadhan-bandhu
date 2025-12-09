import React, { useState } from 'react';
import { Download, TrendingUp, IndianRupee, CheckCircle, Clock, BarChart3, PieChart, FileText, Calendar } from 'lucide-react';

export default function Reports() {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [selectedDistrict, setSelectedDistrict] = useState('all');

    const districts = ['All Districts', 'Ahmednagar', 'Nashik', 'Pune', 'Thane', 'Mumbai'];

    const stats = {
        totalProjects: 45,
        completedProjects: 12,
        ongoingProjects: 28,
        delayedProjects: 5,
        totalBudget: 250000000,
        fundsReleased: 150000000,
        fundsUtilized: 105000000,
        avgProgress: 42
    };

    const districtPerformance = [
        { district: 'Ahmednagar', projects: 12, completed: 3, budget: 50000000, utilized: 32000000, progress: 45 },
        { district: 'Nashik', projects: 10, completed: 2, budget: 45000000, utilized: 28000000, progress: 38 },
        { district: 'Pune', projects: 15, completed: 5, budget: 80000000, utilized: 45000000, progress: 48 },
        { district: 'Thane', projects: 5, completed: 1, budget: 35000000, utilized: 15000000, progress: 35 },
        { district: 'Mumbai', projects: 3, completed: 1, budget: 40000000, utilized: 25000000, progress: 52 }
    ];

    const monthlyProgress = [
        { month: 'Jul', projects: 5, budget: 25000000 },
        { month: 'Aug', projects: 8, budget: 40000000 },
        { month: 'Sep', projects: 12, budget: 55000000 },
        { month: 'Oct', projects: 15, budget: 70000000 },
        { month: 'Nov', projects: 20, budget: 95000000 },
        { month: 'Dec', projects: 28, budget: 120000000 }
    ];

    const reportTypes = [
        {
            id: 1,
            title: 'Monthly Progress Report',
            description: 'Comprehensive monthly progress across all districts',
            icon: BarChart3,
            color: 'blue'
        },
        {
            id: 2,
            title: 'Budget Utilization Report',
            description: 'Detailed budget allocation and utilization analysis',
            icon: IndianRupee,
            color: 'green'
        },
        {
            id: 3,
            title: 'District Performance Report',
            description: 'District-wise project performance and metrics',
            icon: PieChart,
            color: 'purple'
        },
        {
            id: 4,
            title: 'Inspection Summary Report',
            description: 'Summary of all field inspections and findings',
            icon: CheckCircle,
            color: 'orange'
        }
    ];

    const generateReport = (reportType) => {
        alert(`Generating ${reportType}...\n\nReport will be downloaded as PDF shortly.`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Comprehensive state-level performance reports and analytics</p>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Period</label>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {districts.map(district => (
                            <option key={district} value={district.toLowerCase()}>{district}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <TrendingUp className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Completed</p>
                                <p className="text-3xl font-bold text-green-600">{stats.completedProjects}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.ongoingProjects}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                                <p className="text-3xl font-bold text-purple-600">₹{(stats.totalBudget / 10000000).toFixed(0)}Cr</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <IndianRupee className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Total Budget Allocated</p>
                        <p className="text-2xl font-bold text-gray-900">₹{(stats.totalBudget / 10000000).toFixed(2)} Cr</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Funds Released</p>
                        <p className="text-2xl font-bold text-purple-600">₹{(stats.fundsReleased / 10000000).toFixed(2)} Cr</p>
                        <p className="text-xs text-gray-500 mt-1">{((stats.fundsReleased / stats.totalBudget) * 100).toFixed(1)}% of total budget</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(stats.fundsReleased / stats.totalBudget) * 100}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Funds Utilized</p>
                        <p className="text-2xl font-bold text-green-600">₹{(stats.fundsUtilized / 10000000).toFixed(2)} Cr</p>
                        <p className="text-xs text-gray-500 mt-1">{((stats.fundsUtilized / stats.fundsReleased) * 100).toFixed(1)}% of released funds</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(stats.fundsUtilized / stats.fundsReleased) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* District Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">District-wise Performance</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">District</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Projects</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Completed</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Budget</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Utilized</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {districtPerformance.map((district, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{district.district}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{district.projects}</td>
                                    <td className="px-6 py-4 text-sm text-green-600 font-medium">{district.completed}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">₹{(district.budget / 10000000).toFixed(2)}Cr</td>
                                    <td className="px-6 py-4 text-sm text-purple-600 font-medium">₹{(district.utilized / 10000000).toFixed(2)}Cr</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${district.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 w-12">{district.progress}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Report Generation */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTypes.map((report) => {
                        const Icon = report.icon;
                        const colorClasses = {
                            blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
                            green: 'bg-green-50 text-green-600 hover:bg-green-100',
                            purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
                            orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                        };
                        return (
                            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${colorClasses[report.color]}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                                        <button
                                            onClick={() => generateReport(report.title)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 text-sm"
                                        >
                                            <Download size={16} />
                                            Generate PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Project Trend</h2>
                <div className="space-y-3">
                    {monthlyProgress.map((month, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium text-gray-700">{month.month}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm text-gray-600">Projects: {month.projects}</span>
                                    <span className="text-sm text-gray-400">|</span>
                                    <span className="text-sm text-gray-600">Budget: ₹{(month.budget / 10000000).toFixed(1)}Cr</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                                        style={{ width: `${(month.projects / 28) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
