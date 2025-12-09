import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, Eye, Clock, CheckCircle, Send } from 'lucide-react';

export default function CenterIncomingApplications() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data
    const [applications, setApplications] = useState([
        {
            id: 'PMAJAY-2025-MH-12345',
            villageName: 'Khed',
            district: 'Pune',
            state: 'Maharashtra',
            sarpanchName: 'Ramesh Patil',
            projectTitle: 'Community Hall Construction',
            estimatedCost: '₹50 Lakhs',
            submittedDate: '2025-11-20',
            ivaVerifiedDate: '2025-11-28',
            stateForwardedDate: '2025-11-29',
            status: 'pending-consent',
            ivaRecommendation: 'approved',
            scPercentage: '56.00'
        },
        {
            id: 'PMAJAY-2025-GJ-12346',
            villageName: 'Anand',
            district: 'Anand',
            state: 'Gujarat',
            sarpanchName: 'Amit Patel',
            projectTitle: 'School Building Renovation',
            estimatedCost: '₹35 Lakhs',
            submittedDate: '2025-11-22',
            ivaVerifiedDate: '2025-11-30',
            stateForwardedDate: '2025-12-01',
            status: 'pending-consent',
            ivaRecommendation: 'approved',
            scPercentage: '52.00'
        },
        {
            id: 'PMAJAY-2025-MH-12347',
            villageName: 'Shirur',
            district: 'Pune',
            state: 'Maharashtra',
            sarpanchName: 'Suresh Kumar',
            projectTitle: 'Road Development',
            estimatedCost: '₹75 Lakhs',
            submittedDate: '2025-11-25',
            ivaVerifiedDate: '2025-12-02',
            stateForwardedDate: '2025-12-02',
            status: 'consent-approved',
            ivaRecommendation: 'approved',
            scPercentage: '58.00'
        }
    ]);

    const states = ['All States', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'];

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesState = filterState === 'all' || app.state === filterState;
        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
        return matchesSearch && matchesState && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending-consent': { label: 'Pending Consent', color: 'bg-orange-100 text-orange-800' },
            'consent-approved': { label: 'Consent Approved', color: 'bg-green-100 text-green-800' },
            'consent-rejected': { label: 'Consent Rejected', color: 'bg-red-100 text-red-800' },
            'pending-fund-release': { label: 'Pending Fund Release', color: 'bg-blue-100 text-blue-800' },
            'fund-released': { label: 'Fund Released', color: 'bg-purple-100 text-purple-800' }
        };
        const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>{config.label}</span>;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={28} className="text-blue-600" />
                    Incoming Applications
                </h1>
                <p className="text-gray-600 mt-1">IVA-verified applications forwarded by State for consent and fund release</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Applications</p>
                            <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                        </div>
                        <FileText className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Consent</p>
                            <p className="text-2xl font-bold text-orange-600">
                                {applications.filter(a => a.status === 'pending-consent').length}
                            </p>
                        </div>
                        <Clock className="text-orange-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Consent Approved</p>
                            <p className="text-2xl font-bold text-green-600">
                                {applications.filter(a => a.status === 'consent-approved').length}
                            </p>
                        </div>
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Fund Release</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {applications.filter(a => a.status === 'pending-fund-release').length}
                            </p>
                        </div>
                        <Send className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Fund Released</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {applications.filter(a => a.status === 'fund-released').length}
                            </p>
                        </div>
                        <CheckCircle className="text-purple-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by village, project, or ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* State Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterState}
                            onChange={(e) => setFilterState(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {states.map(state => (
                                <option key={state} value={state === 'All States' ? 'all' : state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending-consent">Pending Consent</option>
                            <option value="consent-approved">Consent Approved</option>
                            <option value="pending-fund-release">Pending Fund Release</option>
                            <option value="fund-released">Fund Released</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Application ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Village Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estimated Cost
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IVA Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Forwarded On
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No applications found
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-blue-600">{app.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{app.villageName}</div>
                                            <div className="text-sm text-gray-500">{app.district}, {app.state}</div>
                                            <div className="text-sm text-gray-500">SC: {app.scPercentage}%</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{app.projectTitle}</div>
                                            <div className="text-sm text-gray-500">By: {app.sarpanchName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {app.estimatedCost}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                {app.ivaRecommendation === 'approved' ? 'Approved' : 'Rejected'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(app.stateForwardedDate).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => navigate(`/central/applications/${app.id}`)}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                            >
                                                <Eye size={16} />
                                                Review
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
