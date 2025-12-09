import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, FileText } from 'lucide-react';

export default function FundManagement() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const [requests, setRequests] = useState([
        {
            id: 'SF-2025-001',
            applicationId: 'PMAJAY-2025-MH-12345',
            projectTitle: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            agency: 'ABC Construction Ltd.',
            totalProjectCost: 5000000,
            centralShare: 3000000,
            stateShare: 2000000,
            installment: '1st',
            status: 'Pending',
            requestedOn: '2025-11-28',
        },
        {
            id: 'SF-2025-002',
            applicationId: 'PMAJAY-2025-MH-12346',
            projectTitle: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            agency: 'XYZ Builders Pvt. Ltd.',
            totalProjectCost: 7500000,
            centralShare: 4500000,
            stateShare: 3000000,
            installment: '2nd',
            status: 'Released',
            requestedOn: '2025-11-20',
            releasedOn: '2025-11-25',
        },
        {
            id: 'SF-2025-003',
            applicationId: 'PMAJAY-2025-MH-12347',
            projectTitle: 'Water Supply System',
            village: 'Pune Village',
            district: 'Pune',
            agency: 'DEF Infrastructure',
            totalProjectCost: 12000000,
            centralShare: 7200000,
            stateShare: 4800000,
            installment: '1st',
            status: 'Released',
            requestedOn: '2025-11-18',
            releasedOn: '2025-11-22',
        },
    ]);

    const [releasingId, setReleasingId] = useState(null);

    const filteredRequests = requests.filter((req) => {
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesSearch =
            req.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalStateBudget = 100000000; // 10 Cr (demo)
    const totalStateShareCommitted = requests.reduce((sum, r) => sum + r.stateShare, 0);
    const totalStateShareReleased = requests
        .filter((r) => r.status === 'Released')
        .reduce((sum, r) => sum + r.stateShare, 0);

    const pendingCount = requests.filter((r) => r.status === 'Pending').length;

    const handleReleaseStateShare = (id) => {
        const req = requests.find((r) => r.id === id);
        if (!req) return;

        if (req.status === 'Released') {
            alert('State share for this request has already been released.');
            return;
        }

        if (!window.confirm(`Release State Share (₹${(req.stateShare / 100000).toFixed(2)}L) for ${req.projectTitle}?`)) {
            return;
        }

        setReleasingId(id);

        setTimeout(() => {
            const releasedDate = new Date().toISOString().split('T')[0];
            setRequests((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status: 'Released', releasedOn: releasedDate } : r))
            );

            alert(
                `State share released successfully!\n\nProject: ${req.projectTitle}\nApplication ID: ${req.applicationId}\nAmount: ₹${(
                    req.stateShare / 100000
                ).toFixed(2)}L\nInstallment: ${req.installment} installment (40% State share)`
            );
            setReleasingId(null);
        }, 1200);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">State Fund Management (40% Share)</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Monitor and release State share of funds to agencies for approved PM-AJAY projects
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Total State Budget (PM-AJAY)</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(totalStateBudget / 10000000).toFixed(2)} Cr</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Committed State Share</p>
                    <p className="text-2xl font-bold text-purple-700">₹{(totalStateShareCommitted / 10000000).toFixed(2)} Cr</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {(totalStateShareCommitted / totalStateBudget * 100).toFixed(1)}% of budget
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Released to Agencies</p>
                    <p className="text-2xl font-bold text-green-700">₹{(totalStateShareReleased / 10000000).toFixed(2)} Cr</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {(totalStateShareReleased / totalStateShareCommitted * 100 || 0).toFixed(1)}% of committed
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                    <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by project, village, or application ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <Filter size={18} className="text-gray-500" />
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                            filterStatus === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterStatus('Pending')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                            filterStatus === 'Pending'
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilterStatus('Released')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                            filterStatus === 'Released'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Released
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-600 rounded"></span>
                        Fund Requests from Agencies ({filteredRequests.length})
                    </h2>
                </div>

                {filteredRequests.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <FileText size={40} className="mx-auto text-gray-300 mb-3" />
                        <p>No fund requests found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Request ID
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Application ID
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Project / Village
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Agency
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Total Cost
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        State Share (40%)
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Installment
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-blue-700 font-medium">{req.id}</td>
                                        <td className="px-4 py-3 text-gray-800">{req.applicationId}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900 truncate max-w-xs">
                                                {req.projectTitle}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {req.village}, {req.district}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{req.agency}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">
                                            ₹{(req.totalProjectCost / 100000).toFixed(2)}L
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-green-700">
                                            ₹{(req.stateShare / 100000).toFixed(2)}L
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{req.installment}</td>
                                        <td className="px-4 py-3">
                                            {req.status === 'Released' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                                    <CheckCircle size={14} /> Released
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1 w-fit">
                                                    <Clock size={14} /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {req.status === 'Released' ? (
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="px-4 py-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg cursor-default"
                                                >
                                                    Already Released
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleReleaseStateShare(req.id)}
                                                    disabled={releasingId === req.id}
                                                    className="px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {releasingId === req.id ? (
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    ) : (
                                                        <CheckCircle size={14} />
                                                    )}
                                                    Release State Share
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
