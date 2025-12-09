import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Download, Filter, Search, Eye, FileText, AlertCircle } from 'lucide-react';

export default function FundAllocation() {
    const [selectedTab, setSelectedTab] = useState('overview');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample fund requests data
    const fundRequests = [
        { id: 'FR-2024-001', project: 'Village Development - Mysore', state: 'Karnataka', requestedAmount: '2.5 Cr', approvedAmount: '2.5 Cr', status: 'Approved', date: '2024-11-15', type: 'Infrastructure' },
        { id: 'FR-2024-002', project: 'Skill Development Centre - Patna', state: 'Bihar', requestedAmount: '1.8 Cr', approvedAmount: '1.5 Cr', status: 'Approved', date: '2024-11-10', type: 'Education' },
        { id: 'FR-2024-003', project: 'Community Hall Construction - Jaipur', state: 'Rajasthan', requestedAmount: '0.9 Cr', approvedAmount: '0.9 Cr', status: 'Disbursed', date: '2024-10-20', type: 'Infrastructure' },
        { id: 'FR-2024-004', project: 'Water Supply Project - Lucknow', state: 'Uttar Pradesh', requestedAmount: '3.2 Cr', approvedAmount: '-', status: 'Pending', date: '2024-11-18', type: 'Infrastructure' },
        { id: 'FR-2024-005', project: 'Healthcare Center - Kolkata', state: 'West Bengal', requestedAmount: '3.5 Cr', approvedAmount: '3.0 Cr', status: 'Approved', date: '2024-11-12', type: 'Healthcare' },
        { id: 'FR-2024-006', project: 'Sanitation Project - Ahmedabad', state: 'Gujarat', requestedAmount: '1.5 Cr', approvedAmount: '-', status: 'Rejected', date: '2024-11-08', type: 'Sanitation' },
    ];

    // Sample disbursement data
    const disbursements = [
        { id: 'DB-2024-001', project: 'Community Hall Construction - Jaipur', amount: '0.9 Cr', date: '2024-11-01', installment: '1 of 1', method: 'NEFT', status: 'Completed' },
        { id: 'DB-2024-002', project: 'Village Development - Mysore', amount: '1.25 Cr', date: '2024-11-20', installment: '1 of 2', method: 'RTGS', status: 'Completed' },
        { id: 'DB-2024-003', project: 'Skill Development Centre - Patna', amount: '0.75 Cr', date: '2024-11-22', installment: '1 of 2', method: 'NEFT', status: 'Processing' },
    ];

    const filteredRequests = fundRequests.filter(req => {
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesSearch = req.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const styles = {
            'Approved': 'bg-green-100 text-green-700',
            'Pending': 'bg-orange-100 text-orange-700',
            'Rejected': 'bg-red-100 text-red-700',
            'Disbursed': 'bg-blue-100 text-blue-700',
            'Processing': 'bg-yellow-100 text-yellow-700',
            'Completed': 'bg-indigo-100 text-indigo-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const totalRequested = fundRequests.reduce((sum, req) => sum + parseFloat(req.requestedAmount), 0);
    const totalApproved = fundRequests.filter(r => r.status === 'Approved' || r.status === 'Disbursed').reduce((sum, req) => sum + parseFloat(req.approvedAmount || 0), 0);
    const totalDisbursed = disbursements.filter(d => d.status === 'Completed').reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const pendingApproval = fundRequests.filter(r => r.status === 'Pending').length;

    const handleReleaseFund = (id) => {
        if (window.confirm(`Are you sure you want to release funds for request ${id}?`)) {
            alert(`Funds released successfully for request ${id}!\nTransaction ID: TXN-${Math.floor(Math.random() * 100000)}`);
            // In a real app, we would update the state here
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Fund Allocation & Management</h1>
                <p className="text-sm text-gray-600 mt-1">Track budget allocation, fund requests, and disbursements for PM-AJAY schemes</p>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Budget</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">₹500 Cr</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg">
                                <DollarSign size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50">
                                <TrendingUp size={14} className="text-green-600" />
                                <span className="text-sm font-bold text-green-700">FY 2024-25</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-blue-500 to-blue-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Allocated</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">₹{totalApproved.toFixed(1)} Cr</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 rounded-2xl shadow-lg">
                                <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50">
                                <TrendingUp size={14} className="text-green-600" />
                                <span className="text-sm font-bold text-green-700">+{((totalApproved / 500) * 100).toFixed(1)}%</span>
                            </div>
                            <span className="text-xs text-gray-500">of total budget</span>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-emerald-500 to-emerald-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Disbursed</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">₹{totalDisbursed.toFixed(1)} Cr</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-2xl shadow-lg">
                                <TrendingUp size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50">
                                <span className="text-sm font-bold text-blue-700">{disbursements.filter(d => d.status === 'Completed').length} Txns</span>
                            </div>
                            <span className="text-xs text-gray-500">completed</span>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{pendingApproval}</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 p-4 rounded-2xl shadow-lg">
                                <Clock size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50">
                                <AlertCircle size={14} className="text-orange-600" />
                                <span className="text-sm font-bold text-orange-700">Awaiting Review</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-orange-500 to-orange-700"></div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex gap-4 px-6">
                        <button
                            onClick={() => setSelectedTab('overview')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'overview'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Fund Requests
                        </button>
                        <button
                            onClick={() => setSelectedTab('disbursements')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'disbursements'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Disbursements
                        </button>
                        <button
                            onClick={() => setSelectedTab('analytics')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'analytics'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Analytics
                        </button>
                    </nav>
                </div>

                {/* Fund Requests Tab */}
                {selectedTab === 'overview' && (
                    <div className="p-6">
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by project, state, or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Disbursed">Disbursed</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        {/* Requests Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Request ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Requested</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Approved</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-blue-600">{request.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{request.project}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{request.state}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{request.type}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{request.requestedAmount}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-green-700">{request.approvedAmount !== '-' ? `₹${request.approvedAmount}` : '-'}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                        <Eye size={16} /> View
                                                    </button>
                                                    {request.status === 'Approved' && (
                                                        <button
                                                            onClick={() => handleReleaseFund(request.id)}
                                                            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                                                        >
                                                            <DollarSign size={16} /> Release
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Disbursements Tab */}
                {selectedTab === 'disbursements' && (
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Disbursement ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Installment</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {disbursements.map((disbursement) => (
                                        <tr key={disbursement.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-blue-600">{disbursement.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{disbursement.project}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{disbursement.amount}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{disbursement.installment}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{disbursement.method}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{disbursement.date}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(disbursement.status)}`}>
                                                    {disbursement.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                    <FileText size={16} /> Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {selectedTab === 'analytics' && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Budget Utilization</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Allocated</span>
                                            <span className="font-semibold text-gray-900">{((totalApproved / 500) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{ width: `${(totalApproved / 500) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Disbursed</span>
                                            <span className="font-semibold text-gray-900">{((totalDisbursed / 500) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full" style={{ width: `${(totalDisbursed / 500) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Available</span>
                                            <span className="font-semibold text-gray-900">{(((500 - totalApproved) / 500) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: `${((500 - totalApproved) / 500) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Category-wise Allocation</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Infrastructure</span>
                                        <span className="text-sm font-semibold text-gray-900">₹7.1 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Education</span>
                                        <span className="text-sm font-semibold text-gray-900">₹1.5 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Healthcare</span>
                                        <span className="text-sm font-semibold text-gray-900">₹3.0 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Sanitation</span>
                                        <span className="text-sm font-semibold text-gray-900">₹0.0 Cr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
