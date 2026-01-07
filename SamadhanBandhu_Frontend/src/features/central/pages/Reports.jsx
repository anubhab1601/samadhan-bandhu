import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, TrendingUp, BarChart3, PieChart, Users, DollarSign, MapPin, Eye, Printer } from 'lucide-react';

export default function Reports() {
    const [selectedReport, setSelectedReport] = useState('summary');
    const [dateRange, setDateRange] = useState('monthly');
    const [selectedState, setSelectedState] = useState('all');

    const reportTypes = [
        { id: 'summary', name: 'Executive Summary', icon: FileText, description: 'Overall project performance and statistics' },
        { id: 'financial', name: 'Financial Report', icon: DollarSign, description: 'Budget allocation and utilization' },
        { id: 'progress', name: 'Progress Report', icon: TrendingUp, description: 'Project completion status and milestones' },
        { id: 'beneficiary', name: 'Beneficiary Report', icon: Users, description: 'Beneficiary demographics and coverage' },
        { id: 'geographic', name: 'Geographic Report', icon: MapPin, description: 'State and district-wise distribution' },
        { id: 'category', name: 'Category-wise Report', icon: PieChart, description: 'Project categorization analysis' },
    ];

    const states = ['All States', 'Karnataka', 'Bihar', 'Rajasthan', 'Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Gujarat'];

    // Sample report data
    const summaryData = {
        totalProjects: 1248,
        completedProjects: 856,
        inProgressProjects: 312,
        pendingProjects: 80,
        totalBudget: '₹500 Cr',
        utilized: '₹450 Cr',
        beneficiaries: '2,45,680',
        statesCovered: 28
    };

    const financialData = [
        { category: 'Infrastructure', allocated: '₹200 Cr', utilized: '₹180 Cr', percentage: 90 },
        { category: 'Education', allocated: '₹100 Cr', utilized: '₹85 Cr', percentage: 85 },
        { category: 'Healthcare', allocated: '₹120 Cr', utilized: '₹110 Cr', percentage: 92 },
        { category: 'Sanitation', allocated: '₹80 Cr', utilized: '₹75 Cr', percentage: 94 },
    ];

    const progressData = [
        { month: 'Apr 2024', completed: 45, inProgress: 120, pending: 15 },
        { month: 'May 2024', completed: 52, inProgress: 115, pending: 12 },
        { month: 'Jun 2024', completed: 48, inProgress: 118, pending: 10 },
        { month: 'Jul 2024', completed: 55, inProgress: 110, pending: 8 },
        { month: 'Aug 2024', completed: 60, inProgress: 105, pending: 7 },
        { month: 'Sep 2024', completed: 58, inProgress: 108, pending: 9 },
    ];

    const handleExport = (format) => {
        alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleGenerateReport = () => {
        alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name}...`);
    };

    const handleApplyFilters = () => {
        alert(`Filters applied: Date Range - ${dateRange}, State - ${selectedState}`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-indigo-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Generate comprehensive reports for PM-AJAY schemes</p>
            </div>

            {/* Report Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTypes.map((report) => (
                    <button
                        key={report.id}
                        onClick={() => setSelectedReport(report.id)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${selectedReport === report.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${selectedReport === report.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <report.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{report.name}</h3>
                                <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="weekly">Last Week</option>
                            <option value="monthly">Last Month</option>
                            <option value="quarterly">Last Quarter</option>
                            <option value="yearly">Last Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State/UT</label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {states.map(state => (
                                <option key={state} value={state.toLowerCase().replace(' ', '-')}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                        >
                            <Filter size={18} />
                            Apply Filters
                        </button>
                    </div>

                    <div className="flex items-end gap-2">
                        <button
                            onClick={() => handleExport('pdf')}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            PDF
                        </button>
                        <button
                            onClick={() => handleExport('excel')}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Executive Summary Report */}
                {selectedReport === 'summary' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Executive Summary Report</h2>
                                <p className="text-sm text-gray-600 mt-1">Period: {dateRange === 'monthly' ? 'November 2024' : 'Custom Period'}</p>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <Printer size={18} />
                                Print
                            </button>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Total Projects</p>
                                        <p className="text-2xl font-bold text-gray-900">{summaryData.totalProjects}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <TrendingUp size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900">{summaryData.completedProjects}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <BarChart3 size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">In Progress</p>
                                        <p className="text-2xl font-bold text-gray-900">{summaryData.inProgressProjects}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Users size={20} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Beneficiaries</p>
                                        <p className="text-2xl font-bold text-gray-900">{summaryData.beneficiaries}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Budget Overview */}
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-800 mb-4">Budget Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Total Allocated</p>
                                    <p className="text-3xl font-bold text-gray-900">{summaryData.totalBudget}</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Utilized</p>
                                    <p className="text-3xl font-bold text-green-600">{summaryData.utilized}</p>
                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                                    <p className="text-3xl font-bold text-blue-600">₹50 Cr</p>
                                </div>
                            </div>
                        </div>

                        {/* Performance Chart */}
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4">Monthly Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Month</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Completed</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">In Progress</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Pending</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {progressData.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.month}</td>
                                                <td className="px-4 py-3 text-sm text-green-600 font-semibold">{row.completed}</td>
                                                <td className="px-4 py-3 text-sm text-blue-600 font-semibold">{row.inProgress}</td>
                                                <td className="px-4 py-3 text-sm text-orange-600 font-semibold">{row.pending}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Financial Report */}
                {selectedReport === 'financial' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Financial Report</h2>
                                <p className="text-sm text-gray-600 mt-1">Budget allocation and utilization analysis</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {financialData.map((item, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-gray-900">{item.category}</h3>
                                        <span className="text-sm font-bold text-green-600">{item.percentage}% Utilized</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-600">Allocated</p>
                                            <p className="text-lg font-bold text-gray-900">{item.allocated}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">Utilized</p>
                                            <p className="text-lg font-bold text-green-600">{item.utilized}</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Report Types - Placeholder */}
                {!['summary', 'financial'].includes(selectedReport) && (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <FileText size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {reportTypes.find(r => r.id === selectedReport)?.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {reportTypes.find(r => r.id === selectedReport)?.description}
                        </p>
                        <button
                            onClick={handleGenerateReport}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Generate Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
