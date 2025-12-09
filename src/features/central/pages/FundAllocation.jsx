import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Download, Filter, Search, Eye, FileText, AlertCircle, Send } from 'lucide-react';
import FundRequestDetails from '../components/FundRequestDetails';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FundAllocation() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('overview');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDirectTransfer, setShowDirectTransfer] = useState(false);
    const [transferData, setTransferData] = useState({
        state: '',
        amount: '',
        purpose: 'Infrastructure Development'
    });

    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    // Sample fund requests data
    const fundRequests = [
        { id: 'FR-2024-001', project: 'Adarsh Gram Development - Mysore', state: 'Karnataka', requestedAmount: '0.25 Cr', approvedAmount: '0.25 Cr', status: 'Approved', date: '2024-11-15', type: 'Infrastructure' },
        { id: 'FR-2024-002', project: 'Skill Development Centre - Patna', state: 'Bihar', requestedAmount: '0.18 Cr', approvedAmount: '0.15 Cr', status: 'Approved', date: '2024-11-10', type: 'Education' },
        { id: 'FR-2024-003', project: 'Community Hall Construction - Jaipur', state: 'Rajasthan', requestedAmount: '0.09 Cr', approvedAmount: '0.09 Cr', status: 'Disbursed', date: '2024-10-20', type: 'Infrastructure' },
        { id: 'FR-2024-004', project: 'Water Supply Project - Lucknow', state: 'Uttar Pradesh', requestedAmount: '0.32 Cr', approvedAmount: '-', status: 'Pending', date: '2024-11-18', type: 'Infrastructure' },
        { id: 'FR-2024-005', project: 'Healthcare Center - Kolkata', state: 'West Bengal', requestedAmount: '0.35 Cr', approvedAmount: '0.30 Cr', status: 'Approved', date: '2024-11-12', type: 'Healthcare' },
        { id: 'FR-2024-006', project: 'Sanitation Project - Ahmedabad', state: 'Gujarat', requestedAmount: '0.15 Cr', approvedAmount: '-', status: 'Rejected', date: '2024-11-08', type: 'Sanitation' },
    ];

    // Sample disbursement data
    const disbursements = [
        { id: 'DB-2024-001', project: 'Community Hall Construction - Jaipur', amount: '0.09 Cr', date: '2024-11-01', installment: '1 of 1', method: 'NEFT', status: 'Completed' },
        { id: 'DB-2024-002', project: 'Adarsh Gram Development - Mysore', amount: '0.12 Cr', date: '2024-11-20', installment: '1 of 2', method: 'RTGS', status: 'Completed' },
        { id: 'DB-2024-003', project: 'Skill Development Centre - Patna', amount: '0.07 Cr', date: '2024-11-22', installment: '1 of 2', method: 'NEFT', status: 'Processing' },
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

    const handleReleaseFund = (request) => {
        navigate('/central/funds/transaction', { state: { request } });
    };

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
    };

    const handleViewReceipt = (disbursement) => {
        alert(`Receipt Details:\nTransaction ID: ${disbursement.id}\nAmount: ₹${disbursement.amount}\nDate: ${disbursement.date}\nMethod: ${disbursement.method}`);
    };

    const handleDirectTransferSubmit = (e) => {
        e.preventDefault();
        const transferRequest = {
            id: `DT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            project: `Direct Allocation - ${transferData.purpose}`,
            state: transferData.state,
            requestedAmount: transferData.amount,
            approvedAmount: transferData.amount,
            status: 'Approved',
            date: new Date().toISOString().split('T')[0],
            type: 'Direct Allocation'
        };
        navigate('/central/funds/transaction', { state: { request: transferRequest } });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Fund Allocation Report - ${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}`, 14, 20);

        if (selectedTab === 'overview') {
            autoTable(doc, {
                startY: 25,
                head: [['Request ID', 'Project', 'State', 'Type', 'Requested', 'Approved', 'Status']],
                body: filteredRequests.map(r => [
                    r.id,
                    r.project,
                    r.state,
                    r.type,
                    `Rs. ${r.requestedAmount}`,
                    `Rs. ${r.approvedAmount}`,
                    r.status
                ]),
            });
        } else if (selectedTab === 'disbursements') {
            autoTable(doc, {
                startY: 25,
                head: [['ID', 'Project', 'Amount', 'Installment', 'Method', 'Date', 'Status']],
                body: disbursements.map(d => [
                    d.id,
                    d.project,
                    `Rs. ${d.amount}`,
                    d.installment,
                    d.method,
                    d.date,
                    d.status
                ]),
            });
        } else {
            doc.text("Analytics Overview", 14, 30);
            doc.text(`Total Budget: 10 Cr`, 14, 40);
            doc.text(`Allocated: ${totalApproved.toFixed(2)} Cr`, 14, 50);
            doc.text(`Disbursed: ${totalDisbursed.toFixed(2)} Cr`, 14, 60);
        }

        doc.save('fund_allocation_report.pdf');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Fund Allocation & Management</h1>
                    <p className="text-sm text-gray-600 mt-1">Track budget allocation, fund requests, and disbursements for PM-AJAY schemes</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={downloadPDF}
                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                    >
                        <Download size={18} />
                        Download Report
                    </button>
                    <button
                        onClick={() => setShowDirectTransfer(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                    >
                        <Send size={18} />
                        Direct Transfer to State
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <DollarSign size={24} className="text-blue-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Budget</p>
                    <h3 className="text-3xl font-bold text-gray-900">₹10 Cr</h3>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Allocated</p>
                    <h3 className="text-3xl font-bold text-gray-900">₹{totalApproved.toFixed(2)} Cr</h3>
                    <p className="text-xs text-gray-500 mt-1">{((totalApproved / 10) * 100).toFixed(1)}% of total budget</p>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-100 rounded-lg">
                            <TrendingUp size={24} className="text-indigo-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Disbursed</p>
                    <h3 className="text-3xl font-bold text-gray-900">₹{totalDisbursed.toFixed(2)} Cr</h3>
                    <p className="text-xs text-gray-500 mt-1">{disbursements.filter(d => d.status === 'Completed').length} Transactions</p>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Clock size={24} className="text-orange-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                    <h3 className="text-3xl font-bold text-gray-900">{pendingApproval}</h3>
                    <p className="text-xs text-gray-500 mt-1">Awaiting Review</p>
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
                                                    <button
                                                        onClick={() => handleViewRequest(request)}
                                                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                                    >
                                                        <Eye size={16} /> View
                                                    </button>
                                                    {request.status === 'Approved' && (
                                                        <button
                                                            onClick={() => handleReleaseFund(request)}
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
                                                <button
                                                    onClick={() => handleViewReceipt(disbursement)}
                                                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                                >
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
                                            <span className="font-semibold text-gray-900">{((totalApproved / 10) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{ width: `${(totalApproved / 10) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Disbursed</span>
                                            <span className="font-semibold text-gray-900">{((totalDisbursed / 10) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full" style={{ width: `${(totalDisbursed / 10) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Available</span>
                                            <span className="font-semibold text-gray-900">{(((10 - totalApproved) / 10) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: `${((10 - totalApproved) / 10) * 100}%` }}></div>
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
                                        <span className="text-sm text-gray-600">Infrastructure</span>
                                        <span className="text-sm font-semibold text-gray-900">₹0.66 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Education</span>
                                        <span className="text-sm font-semibold text-gray-900">₹0.15 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Healthcare</span>
                                        <span className="text-sm font-semibold text-gray-900">₹0.30 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Sanitation</span>
                                        <span className="text-sm font-semibold text-gray-900">₹0.00 Cr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Fund Request Details Modal */}
            {selectedRequest && (
                <FundRequestDetails
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                />
            )}

            {/* Direct Transfer Modal */}
            {showDirectTransfer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-bold text-gray-900">Direct Fund Transfer</h3>
                            <button
                                onClick={() => setShowDirectTransfer(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleDirectTransferSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={transferData.state}
                                    onChange={(e) => setTransferData({ ...transferData, state: e.target.value })}
                                >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹ Crores)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        className="w-full pl-8 border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="0.00"
                                        value={transferData.amount}
                                        onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">Cr</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose / Remarks</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    rows="3"
                                    value={transferData.purpose}
                                    onChange={(e) => setTransferData({ ...transferData, purpose: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowDirectTransfer(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                                >
                                    <DollarSign size={18} />
                                    Proceed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
