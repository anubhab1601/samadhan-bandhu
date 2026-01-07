import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, Eye, Clock, CheckCircle, Send, AlertCircle } from 'lucide-react';

export default function TenderApplications() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data - tenders available for bidding
    const [tenders, setTenders] = useState([
        {
            id: 'TENDER-2025-MH-001',
            projectId: 'PMAJAY-2025-MH-12345',
            projectTitle: 'Community Hall Construction',
            villageName: 'Khed',
            district: 'Pune',
            state: 'Maharashtra',
            estimatedCost: '₹50 Lakhs',
            tenderAmount: '₹48 Lakhs',
            publishedDate: '2025-11-30',
            closingDate: '2025-12-15',
            status: 'open',
            applicationsReceived: 3,
            myApplicationStatus: null // null, 'submitted', 'shortlisted', 'selected', 'rejected'
        },
        {
            id: 'TENDER-2025-MH-002',
            projectId: 'PMAJAY-2025-MH-12346',
            projectTitle: 'Road Development',
            villageName: 'Shirur',
            district: 'Pune',
            state: 'Maharashtra',
            estimatedCost: '₹75 Lakhs',
            tenderAmount: '₹72 Lakhs',
            publishedDate: '2025-11-28',
            closingDate: '2025-12-12',
            status: 'open',
            applicationsReceived: 5,
            myApplicationStatus: 'submitted'
        },
        {
            id: 'TENDER-2025-MH-003',
            projectId: 'PMAJAY-2025-MH-12347',
            projectTitle: 'Water Supply System',
            villageName: 'Daund',
            district: 'Pune',
            state: 'Maharashtra',
            estimatedCost: '₹1.2 Crores',
            tenderAmount: '₹1.15 Crores',
            publishedDate: '2025-11-25',
            closingDate: '2025-12-10',
            status: 'closed',
            applicationsReceived: 8,
            myApplicationStatus: 'selected'
        }
    ]);

    const districts = ['All Districts', 'Pune', 'Mumbai', 'Nagpur', 'Nashik'];

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDistrict = filterDistrict === 'all' || tender.district === filterDistrict;
        const matchesStatus = filterStatus === 'all' || tender.status === filterStatus;
        return matchesSearch && matchesDistrict && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'open': { label: 'Open for Bidding', color: 'bg-green-100 text-green-800', icon: CheckCircle },
            'closed': { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: Clock },
            'awarded': { label: 'Awarded', color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
        };
        const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: FileText };
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                <Icon size={14} />
                {config.label}
            </span>
        );
    };

    const getApplicationStatusBadge = (status) => {
        if (!status) return null;
        const statusConfig = {
            'submitted': { label: 'Application Submitted', color: 'bg-blue-100 text-blue-800' },
            'shortlisted': { label: 'Shortlisted', color: 'bg-yellow-100 text-yellow-800' },
            'selected': { label: 'Selected', color: 'bg-green-100 text-green-800' },
            'rejected': { label: 'Not Selected', color: 'bg-red-100 text-red-800' }
        };
        const config = statusConfig[status];
        return <span className={`px-2 py-1 text-xs font-medium rounded ${config.color}`}>{config.label}</span>;
    };

    const getDaysRemaining = (closingDate) => {
        const today = new Date();
        const closing = new Date(closingDate);
        const diffTime = closing - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={28} className="text-blue-600" />
                    Available Tenders
                </h1>
                <p className="text-gray-600 mt-1">Browse and apply for PM-AJAY project tenders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Tenders</p>
                            <p className="text-2xl font-bold text-gray-900">{tenders.length}</p>
                        </div>
                        <FileText className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Open Tenders</p>
                            <p className="text-2xl font-bold text-green-600">
                                {tenders.filter(t => t.status === 'open').length}
                            </p>
                        </div>
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">My Applications</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {tenders.filter(t => t.myApplicationStatus).length}
                            </p>
                        </div>
                        <Send className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Selected</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {tenders.filter(t => t.myApplicationStatus === 'selected').length}
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
                            placeholder="Search by project, village, or ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* District Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {districts.map(district => (
                                <option key={district} value={district === 'All Districts' ? 'all' : district}>
                                    {district}
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
                            <option value="open">Open for Bidding</option>
                            <option value="closed">Closed</option>
                            <option value="awarded">Awarded</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tenders List */}
            <div className="space-y-4">
                {filteredTenders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center text-gray-500">
                        No tenders found
                    </div>
                ) : (
                    filteredTenders.map((tender) => {
                        const daysRemaining = getDaysRemaining(tender.closingDate);
                        const isUrgent = daysRemaining <= 3 && tender.status === 'open';

                        return (
                            <div
                                key={tender.id}
                                className={`bg-white rounded-lg shadow border-2 p-6 hover:shadow-lg transition-shadow ${isUrgent ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{tender.projectTitle}</h3>
                                            {getStatusBadge(tender.status)}
                                            {tender.myApplicationStatus && getApplicationStatusBadge(tender.myApplicationStatus)}
                                        </div>
                                        <p className="text-sm text-gray-600">Tender ID: {tender.id}</p>
                                        <p className="text-sm text-gray-600">Project ID: {tender.projectId}</p>
                                    </div>
                                    {isUrgent && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                            <AlertCircle size={16} />
                                            Closing Soon!
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <span className="text-sm text-gray-600">Location:</span>
                                        <p className="font-medium text-gray-900">{tender.villageName}, {tender.district}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Estimated Cost:</span>
                                        <p className="font-medium text-gray-900">{tender.estimatedCost}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Tender Amount:</span>
                                        <p className="font-medium text-green-600">{tender.tenderAmount}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Applications:</span>
                                        <p className="font-medium text-gray-900">{tender.applicationsReceived}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-6 text-sm">
                                        <div>
                                            <span className="text-gray-600">Published:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {new Date(tender.publishedDate).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Closing:</span>
                                            <span className={`ml-2 font-medium ${isUrgent ? 'text-orange-600' : 'text-gray-900'}`}>
                                                {new Date(tender.closingDate).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                        {tender.status === 'open' && (
                                            <div className={`font-medium ${isUrgent ? 'text-orange-600' : 'text-blue-600'}`}>
                                                {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Closes today'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/agency/tenders/${tender.id}`)}
                                            className="flex items-center gap-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                                        >
                                            <Eye size={16} />
                                            View Details
                                        </button>
                                        {tender.status === 'open' && !tender.myApplicationStatus && (
                                            <button
                                                onClick={() => navigate(`/agency/tenders/${tender.id}/apply`)}
                                                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                <Send size={16} />
                                                Apply Now
                                            </button>
                                        )}
                                        {tender.myApplicationStatus === 'selected' && (
                                            <button
                                                onClick={() => navigate(`/agency/projects/${tender.projectId}`)}
                                                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                <CheckCircle size={16} />
                                                View Project
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
