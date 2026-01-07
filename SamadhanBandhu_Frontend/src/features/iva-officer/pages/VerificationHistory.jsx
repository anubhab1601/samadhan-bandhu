import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Calendar, MapPin, CheckCircle, X, FileText } from 'lucide-react';

export default function VerificationHistory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterDecision, setFilterDecision] = useState('all');
    const [filterDate, setFilterDate] = useState('all');

    const completedVerifications = [
        {
            id: 'APP-2024-045',
            village: 'Daund',
            project: 'Road Development Project',
            type: 'Village Eligibility',
            completedDate: '2025-11-01',
            decision: 'Eligible',
            remarks: 'All demographic data verified. Infrastructure details confirmed. Proposed work is genuinely needed.',
            visitDate: '2025-10-28'
        },
        {
            id: 'COM-2024-038',
            village: 'Shirdi',
            project: 'Community Hall Construction',
            type: 'Committee Verification',
            completedDate: '2025-10-15',
            decision: 'Verified',
            remarks: 'All committee members verified. Committee is properly constituted.',
            visitDate: '2025-10-12'
        },
        {
            id: 'AGN-2024-032',
            village: 'Nashik Village',
            project: 'Water Supply System',
            type: 'Agency Verification',
            completedDate: '2025-09-28',
            decision: 'Verified',
            remarks: 'Agency office exists and is active. All documents are authentic.',
            visitDate: '2025-09-25'
        },
        {
            id: 'APP-2024-025',
            village: 'Pune Rural',
            project: 'School Building Renovation',
            type: 'Village Eligibility',
            completedDate: '2025-08-20',
            decision: 'Not Eligible',
            remarks: 'Demographic data could not be verified. Proposed work not genuinely needed.',
            visitDate: '2025-08-17'
        },
        {
            id: 'COM-2024-018',
            village: 'Thane Village',
            project: 'Primary Health Center',
            type: 'Committee Verification',
            completedDate: '2025-07-15',
            decision: 'Verified',
            remarks: 'Committee members exist and are genuine. Properly constituted.',
            visitDate: '2025-07-12'
        }
    ];

    const filteredVerifications = completedVerifications.filter(verification => {
        const matchesSearch = verification.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            verification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            verification.project.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || verification.type === filterType;
        const matchesDecision = filterDecision === 'all' || verification.decision === filterDecision;
        return matchesSearch && matchesType && matchesDecision;
    });

    const stats = {
        total: completedVerifications.length,
        eligible: completedVerifications.filter(v => v.decision === 'Eligible' || v.decision === 'Verified').length,
        notEligible: completedVerifications.filter(v => v.decision === 'Not Eligible' || v.decision === 'Not Verified').length,
        thisMonth: completedVerifications.filter(v => new Date(v.completedDate).getMonth() === new Date().getMonth()).length
    };

    const getDecisionColor = (decision) => {
        const colors = {
            'Eligible': 'bg-green-100 text-green-700 border-green-300',
            'Verified': 'bg-green-100 text-green-700 border-green-300',
            'Not Eligible': 'bg-red-100 text-red-700 border-red-300',
            'Not Verified': 'bg-red-100 text-red-700 border-red-300'
        };
        return colors[decision] || colors['Eligible'];
    };

    const getTypeColor = (type) => {
        const colors = {
            'Village Eligibility': 'bg-purple-100 text-purple-700',
            'Committee Verification': 'bg-indigo-100 text-indigo-700',
            'Agency Verification': 'bg-teal-100 text-teal-700'
        };
        return colors[type] || colors['Village Eligibility'];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <FileText size={32} />
                    Verification History
                </h1>
                <p className="text-purple-100">View all your completed verifications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.eligible}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{stats.notEligible}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.thisMonth}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by village, ID, or project..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Types</option>
                            <option value="Village Eligibility">Village Eligibility</option>
                            <option value="Committee Verification">Committee Verification</option>
                            <option value="Agency Verification">Agency Verification</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterDecision}
                            onChange={(e) => setFilterDecision(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Decisions</option>
                            <option value="Eligible">Eligible/Verified</option>
                            <option value="Not Eligible">Not Eligible/Not Verified</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Dates</option>
                            <option value="this-month">This Month</option>
                            <option value="last-month">Last Month</option>
                            <option value="last-3-months">Last 3 Months</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Verifications List */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Completed Verifications ({filteredVerifications.length})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredVerifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No verifications found
                        </div>
                    ) : (
                        filteredVerifications.map((verification) => (
                            <div key={verification.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{verification.village}</h3>
                                        <p className="text-sm text-gray-600">ID: {verification.id}</p>
                                        <p className="text-sm text-gray-600">Project: {verification.project}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className={`px-2 py-1 rounded ${getTypeColor(verification.type)}`}>
                                                {verification.type}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getDecisionColor(verification.decision)}`}>
                                            {verification.decision === 'Eligible' || verification.decision === 'Verified' ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle size={16} />
                                                    {verification.decision}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <X size={16} />
                                                    {verification.decision}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 text-sm">
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar size={14} />
                                            Visit Date
                                        </p>
                                        <p className="font-medium text-gray-900">{new Date(verification.visitDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar size={14} />
                                            Completed
                                        </p>
                                        <p className="font-medium text-gray-900">{new Date(verification.completedDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Decision</p>
                                        <p className="font-medium text-gray-900">{verification.decision}</p>
                                    </div>
                                </div>

                                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Remarks:</p>
                                    <p className="text-sm text-gray-900">{verification.remarks}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        // Navigate to appropriate detail page based on type
                                        if (verification.type === 'Village Eligibility') {
                                            navigate(`/iva-officer/history/village/${verification.id}`);
                                        } else if (verification.type === 'Committee Verification') {
                                            navigate(`/iva-officer/history/committee/${verification.id}`);
                                        } else {
                                            navigate(`/iva-officer/history/agency/${verification.id}`);
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Full Report
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
