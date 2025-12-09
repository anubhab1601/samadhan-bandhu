import React, { useState } from 'react';
import { DollarSign, Download, Filter, Search, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function Payments() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterProject, setFilterProject] = useState('all');

    const payments = [
        {
            id: 'PAY-2025-001',
            project: 'School Building Renovation',
            type: 'First Installment',
            amount: 450000,
            status: 'received',
            requestDate: '2025-11-15',
            receivedDate: '2025-11-30',
            invoiceNumber: 'INV-2025-001',
            description: 'Initial payment for foundation work'
        },
        {
            id: 'PAY-2025-002',
            project: 'School Building Renovation',
            type: 'Second Installment',
            amount: 345000,
            status: 'pending',
            requestDate: '2025-11-28',
            receivedDate: null,
            invoiceNumber: 'INV-2025-002',
            description: 'Payment for structural work completion'
        },
        {
            id: 'PAY-2024-045',
            project: 'Village Community Center',
            type: 'Final Payment',
            amount: 250000,
            status: 'received',
            requestDate: '2024-11-01',
            receivedDate: '2024-11-15',
            invoiceNumber: 'INV-2024-045',
            description: 'Final payment upon project completion'
        },
        {
            id: 'PAY-2024-044',
            project: 'Village Community Center',
            type: 'Third Installment',
            amount: 300000,
            status: 'received',
            requestDate: '2024-10-15',
            receivedDate: '2024-10-28',
            invoiceNumber: 'INV-2024-044',
            description: 'Payment for finishing work'
        },
        {
            id: 'PAY-2025-003',
            project: 'School Building Renovation',
            type: 'Material Advance',
            amount: 150000,
            status: 'processing',
            requestDate: '2025-12-01',
            receivedDate: null,
            invoiceNumber: 'INV-2025-003',
            description: 'Advance for material procurement'
        }
    ];

    const projects = ['All Projects', 'School Building Renovation', 'Village Community Center'];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
        const matchesProject = filterProject === 'all' || payment.project === filterProject;
        return matchesSearch && matchesStatus && matchesProject;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            received: { label: 'Received', color: 'bg-green-100 text-green-700', icon: CheckCircle },
            pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
            processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: TrendingUp }
        };
        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
                <Icon size={14} />
                {config.label}
            </span>
        );
    };

    const stats = {
        totalReceived: payments.filter(p => p.status === 'received').reduce((sum, p) => sum + p.amount, 0),
        totalPending: payments.filter(p => p.status === 'pending' || p.status === 'processing').reduce((sum, p) => sum + p.amount, 0),
        receivedCount: payments.filter(p => p.status === 'received').length,
        pendingCount: payments.filter(p => p.status === 'pending' || p.status === 'processing').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <DollarSign size={32} />
                    Payment History
                </h1>
                <p className="text-orange-100">Track all your payments and transactions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                    <p className="text-green-100 text-sm mb-1">Total Received</p>
                    <p className="text-3xl font-bold">₹{(stats.totalReceived / 100000).toFixed(2)}L</p>
                    <p className="text-green-100 text-xs mt-1">{stats.receivedCount} payments</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
                    <p className="text-yellow-100 text-sm mb-1">Total Pending</p>
                    <p className="text-3xl font-bold">₹{(stats.totalPending / 100000).toFixed(2)}L</p>
                    <p className="text-yellow-100 text-xs mt-1">{stats.pendingCount} payments</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <p className="text-blue-100 text-sm mb-1">This Month</p>
                    <p className="text-3xl font-bold">₹{(450000 / 100000).toFixed(2)}L</p>
                    <p className="text-blue-100 text-xs mt-1">1 payment</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                    <p className="text-purple-100 text-sm mb-1">Average Payment</p>
                    <p className="text-3xl font-bold">₹{((stats.totalReceived / stats.receivedCount) / 100000).toFixed(2)}L</p>
                    <p className="text-purple-100 text-xs mt-1">Per transaction</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search payments..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Status</option>
                            <option value="received">Received</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                        </select>
                    </div>

                    {/* Project Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterProject}
                            onChange={(e) => setFilterProject(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            {projects.map(project => (
                                <option key={project} value={project === 'All Projects' ? 'all' : project}>
                                    {project}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Payment Transactions ({filteredPayments.length})
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Request Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Received Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No payments found
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                                            <div className="text-xs text-gray-500">{payment.invoiceNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{payment.project}</div>
                                            <div className="text-xs text-gray-500">{payment.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{payment.type}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                ₹{payment.amount.toLocaleString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(payment.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-sm text-gray-900">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(payment.requestDate).toLocaleDateString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {payment.receivedDate ? (
                                                <div className="flex items-center gap-1 text-sm text-green-600">
                                                    <Calendar size={14} />
                                                    {new Date(payment.receivedDate).toLocaleDateString('en-IN')}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                                                <Download size={14} />
                                                Invoice
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
