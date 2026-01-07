import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, FileText, MapPin, Calendar, IndianRupee, Clock, AlertCircle, CheckCircle, Send } from 'lucide-react';

export default function Tenders() {
    const navigate = useNavigate();
    const [tenders, setTenders] = useState([
        {
            id: 'TND-2025-001',
            title: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            budget: 5000000,
            emd: 100000,
            tenderFee: 5000,
            publishedDate: '2025-11-20',
            deadline: '2025-12-25',
            status: 'Active',
            description: 'Construction of a modern community hall with capacity for 500 people',
            scope: 'Complete construction including foundation, structure, roofing, electrical, and plumbing work',
            duration: '6 months',
            minExperience: 5,
            minTurnover: 10000000,
            similarProjects: 3,
            documents: ['Technical Specifications', 'Site Plan', 'BOQ'],
            applicationsReceived: 12
        },
        {
            id: 'TND-2025-002',
            title: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            budget: 7500000,
            emd: 150000,
            tenderFee: 7500,
            publishedDate: '2025-11-18',
            deadline: '2025-12-20',
            status: 'Active',
            description: 'Development of 5km village road with proper drainage system',
            scope: 'Road construction, drainage, culverts, and street lighting',
            duration: '4 months',
            minExperience: 7,
            minTurnover: 15000000,
            similarProjects: 5,
            documents: ['Technical Specifications', 'Survey Report', 'BOQ'],
            applicationsReceived: 18
        },
        {
            id: 'TND-2025-003',
            title: 'Water Supply System',
            village: 'Pune Village',
            district: 'Pune',
            budget: 12000000,
            emd: 240000,
            tenderFee: 10000,
            publishedDate: '2025-11-15',
            deadline: '2025-12-30',
            status: 'Active',
            description: 'Installation of comprehensive water supply system for the village',
            scope: 'Pipeline installation, water tank construction, pump house, and distribution network',
            duration: '8 months',
            minExperience: 10,
            minTurnover: 25000000,
            similarProjects: 4,
            documents: ['Technical Specifications', 'Hydraulic Design', 'BOQ'],
            applicationsReceived: 8
        },
        {
            id: 'TND-2025-004',
            title: 'School Building Renovation',
            village: 'Thane Village',
            district: 'Thane',
            budget: 3500000,
            emd: 70000,
            tenderFee: 3500,
            publishedDate: '2025-11-10',
            deadline: '2025-12-05',
            status: 'Closing Soon',
            description: 'Complete renovation of existing school building',
            scope: 'Structural repairs, painting, electrical work, and sanitation upgrades',
            duration: '3 months',
            minExperience: 3,
            minTurnover: 5000000,
            similarProjects: 2,
            documents: ['Technical Specifications', 'Structural Assessment', 'BOQ'],
            applicationsReceived: 15
        }
    ]);

    const [selectedTender, setSelectedTender] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const districts = ['Ahmednagar', 'Nashik', 'Pune', 'Thane', 'Mumbai'];

    const getStatusBadge = (status, deadline) => {
        const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1 w-fit">
                    <AlertCircle size={14} />
                    Closed
                </span>
            );
        }

        if (daysLeft <= 5) {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                    <AlertCircle size={14} />
                    Closing Soon ({daysLeft}d left)
                </span>
            );
        }

        return (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                <CheckCircle size={14} />
                Active ({daysLeft}d left)
            </span>
        );
    };

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDistrict = filterDistrict === 'all' || tender.district === filterDistrict;
        const matchesStatus = filterStatus === 'all' || tender.status === filterStatus;
        return matchesSearch && matchesDistrict && matchesStatus;
    });

    const stats = {
        total: tenders.length,
        active: tenders.filter(t => t.status === 'Active').length,
        closingSoon: tenders.filter(t => t.status === 'Closing Soon').length
    };

    const viewDetails = (tender) => {
        setSelectedTender(tender);
        setShowDetailsModal(true);
    };

    const applyForTender = (tender) => {
        navigate('/proposals/submit', { state: { tender } });
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Available Tenders</h1>
                <p className="text-sm text-gray-600 mt-1">Browse and apply for village development project tenders</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Tenders</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Active Tenders</p>
                            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Closing Soon</p>
                            <p className="text-3xl font-bold text-red-600">{stats.closingSoon}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by tender title, village, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filterDistrict}
                        onChange={(e) => setFilterDistrict(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Districts</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Closing Soon">Closing Soon</option>
                    </select>
                </div>
            </div>

            {/* Tenders List */}
            {filteredTenders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No tenders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredTenders.map((tender) => (
                        <div key={tender.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">{tender.title}</h3>
                                                {getStatusBadge(tender.status, tender.deadline)}
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">Tender ID: {tender.id}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4">{tender.description}</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin size={16} className="text-orange-600" />
                                            <span className="font-medium">Location:</span>
                                            <span className="text-gray-900">{tender.village}, {tender.district}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <IndianRupee size={16} className="text-green-600" />
                                            <span className="font-medium">Budget:</span>
                                            <span className="text-gray-900">₹{(tender.budget / 100000).toFixed(2)}L</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} className="text-blue-600" />
                                            <span className="font-medium">Deadline:</span>
                                            <span className="text-gray-900">{new Date(tender.deadline).toLocaleDateString('en-IN')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={16} className="text-purple-600" />
                                            <span className="font-medium">Duration:</span>
                                            <span className="text-gray-900">{tender.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-600">
                                            <span className="font-medium">Applications:</span> {tender.applicationsReceived}
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-600">
                                            <span className="font-medium">EMD:</span> ₹{(tender.emd / 1000).toFixed(0)}K
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-600">
                                            <span className="font-medium">Tender Fee:</span> ₹{tender.tenderFee}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:w-48">
                                    <button
                                        onClick={() => viewDetails(tender)}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => applyForTender(tender)}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} />
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tender Details Modal */}
            {showDetailsModal && selectedTender && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedTender.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">Tender ID: {selectedTender.id}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tender Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Location</p>
                                        <p className="font-semibold text-gray-900">{selectedTender.village}, {selectedTender.district}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Project Duration</p>
                                        <p className="font-semibold text-gray-900">{selectedTender.duration}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Published Date</p>
                                        <p className="font-semibold text-gray-900">{new Date(selectedTender.publishedDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Submission Deadline</p>
                                        <p className="font-semibold text-red-600">{new Date(selectedTender.deadline).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-600 mb-1">Estimated Budget</p>
                                        <p className="text-2xl font-bold text-blue-900">₹{(selectedTender.budget / 100000).toFixed(2)}L</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <p className="text-sm text-orange-600 mb-1">EMD Amount</p>
                                        <p className="text-2xl font-bold text-orange-900">₹{(selectedTender.emd / 1000).toFixed(0)}K</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-600 mb-1">Tender Fee</p>
                                        <p className="text-2xl font-bold text-green-900">₹{selectedTender.tenderFee}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Scope</h3>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTender.scope}</p>
                            </div>

                            {/* Eligibility */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Minimum Experience</p>
                                        <p className="text-lg font-bold text-gray-900">{selectedTender.minExperience} years</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Minimum Turnover</p>
                                        <p className="text-lg font-bold text-gray-900">₹{(selectedTender.minTurnover / 10000000).toFixed(1)}Cr</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Similar Projects</p>
                                        <p className="text-lg font-bold text-gray-900">{selectedTender.similarProjects} projects</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tender Documents</h3>
                                <div className="space-y-2">
                                    {selectedTender.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileText className="text-blue-600" size={20} />
                                                <span className="text-gray-900">{doc}</span>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    applyForTender(selectedTender);
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                            >
                                <Send size={18} />
                                Apply for Tender
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
