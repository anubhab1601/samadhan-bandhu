import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, CheckCircle, Clock, Filter, Search, ArrowRight } from 'lucide-react';

export default function IncomingApplications() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Mock data - Applications forwarded by State
    const applications = [
        { id: 'PMAJAY-2025-MH-12349', village: 'Village E', district: 'Thane', state: 'Maharashtra', type: 'Social', status: 'Pending Approval', date: '2025-11-15' },
        { id: 'PMAJAY-2025-GJ-56789', village: 'Village X', district: 'Surat', state: 'Gujarat', type: 'Infrastructure', status: 'Approved', date: '2025-11-10' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Consent Note Issued</span>;
            case 'Pending Approval': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Pending Approval</span>;
            default: return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
        }
    };

    const filteredApps = applications.filter(app => {
        const matchesFilter = filter === 'all' || app.status.toLowerCase().includes(filter.toLowerCase());
        const matchesSearch = app.id.toLowerCase().includes(search.toLowerCase()) || app.village.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Incoming Applications</h1>
                    <p className="text-sm text-gray-600 mt-1">Review applications forwarded by State Officers for final approval</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or Village..."
                            value={search}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <Filter size={18} className="text-gray-500" />
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('pending approval')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'pending approval' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Approved
                    </button>
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Application ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Village</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredApps.length > 0 ? (
                                filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{app.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{app.village}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{app.state}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
                                        <td className="px-6 py-4 text-sm">{getStatusBadge(app.status)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link to={`/central/applications/${app.id}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                <Eye size={16} /> Review
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No applications found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
