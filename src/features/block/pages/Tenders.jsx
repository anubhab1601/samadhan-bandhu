import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Calendar, IndianRupee, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Tenders() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data for tenders
    const mockTenders = [
        {
            id: 'TND-2025-001',
            title: 'Community Hall Construction',
            projectType: 'Infrastructure',
            budget: 5000000,
            location: 'Shirdi, Maharashtra',
            publishedDate: '2025-11-20',
            deadline: '2025-12-15',
            status: 'Active',
            applicationsReceived: 5,
            description: 'Construction of a modern community hall with capacity of 200 people'
        },
        {
            id: 'TND-2025-002',
            title: 'Village Road Development',
            projectType: 'Infrastructure',
            budget: 7500000,
            location: 'Shirdi, Maharashtra',
            publishedDate: '2025-11-15',
            deadline: '2025-12-10',
            status: 'Active',
            applicationsReceived: 8,
            description: 'Development and paving of 2km village road with proper drainage'
        },
        {
            id: 'TND-2025-003',
            title: 'Water Supply System Upgrade',
            projectType: 'Infrastructure',
            budget: 12000000,
            location: 'Shirdi, Maharashtra',
            publishedDate: '2025-10-25',
            deadline: '2025-11-30',
            status: 'Closed',
            applicationsReceived: 12,
            description: 'Installation of new water supply pipelines and storage tanks'
        },
        {
            id: 'TND-2025-004',
            title: 'School Building Renovation',
            projectType: 'Education',
            budget: 3000000,
            location: 'Shirdi, Maharashtra',
            publishedDate: '2025-10-10',
            deadline: '2025-11-15',
            status: 'Awarded',
            applicationsReceived: 6,
            awardedTo: 'ABC Construction Ltd.',
            description: 'Complete renovation of primary school building including classrooms and toilets'
        }
    ];

    useEffect(() => {
        fetchTenders();
    }, []);

    const fetchTenders = async () => {
        try {
            // Simulate API call
            setTimeout(() => {
                setTenders(mockTenders);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching tenders:', error);
            setTenders(mockTenders);
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Active': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            'Closed': { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle },
            'Awarded': { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle }
        };
        const badge = badges[status] || badges['Active'];
        const Icon = badge.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || tender.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: tenders.length,
        active: tenders.filter(t => t.status === 'Active').length,
        closed: tenders.filter(t => t.status === 'Closed').length,
        awarded: tenders.filter(t => t.status === 'Awarded').length
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tender Management</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage and monitor all published tenders</p>
                </div>
                <Link
                    to="/block/release-tender"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-colors"
                >
                    <Plus size={20} />
                    Release New Tender
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Tenders</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <AlertCircle className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Tenders</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Closed Tenders</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">{stats.closed}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <XCircle className="text-gray-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Awarded</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.awarded}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by tender ID or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                        <option value="Awarded">Awarded</option>
                    </select>
                </div>
            </div>

            {/* Tenders List */}
            {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">Loading tenders...</p>
                </div>
            ) : filteredTenders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No tenders found matching your criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredTenders.map((tender) => (
                        <div key={tender.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                {/* Left Section */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{tender.title}</h3>
                                                {getStatusBadge(tender.status)}
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">{tender.id}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">{tender.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <IndianRupee size={16} className="text-green-600" />
                                            <span className="font-medium">Budget:</span>
                                            <span className="font-semibold text-gray-900">
                                                ₹{(tender.budget / 100000).toFixed(2)} Lakhs
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin size={16} className="text-orange-600" />
                                            <span>{tender.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={16} className="text-blue-600" />
                                            <span className="font-medium">Published:</span>
                                            <span>{new Date(tender.publishedDate).toLocaleDateString('en-IN')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock size={16} className="text-red-600" />
                                            <span className="font-medium">Deadline:</span>
                                            <span className="font-semibold text-red-600">
                                                {new Date(tender.deadline).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Applications Received</p>
                                        <p className="text-3xl font-bold text-blue-600">{tender.applicationsReceived}</p>
                                    </div>
                                    {tender.status === 'Awarded' && tender.awardedTo && (
                                        <div className="text-right bg-blue-50 px-4 py-2 rounded-lg">
                                            <p className="text-xs text-gray-600">Awarded To</p>
                                            <p className="text-sm font-semibold text-blue-900">{tender.awardedTo}</p>
                                        </div>
                                    )}
                                    <Link
                                        to={`/block/tender-applications?id=${tender.id}`}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <Eye size={18} />
                                        View Applications
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
