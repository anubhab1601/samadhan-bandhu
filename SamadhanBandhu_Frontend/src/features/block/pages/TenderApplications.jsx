import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Eye, CheckCircle, XCircle, Award, FileText, Building, Users, IndianRupee, Calendar, Star, Download } from 'lucide-react';

export default function TenderApplications() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tenderId = searchParams.get('id');

    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAwardModal, setShowAwardModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [committeeMembers, setCommitteeMembers] = useState([
        { name: '', designation: '' },
        { name: '', designation: '' },
        { name: '', designation: '' }
    ]);

    // Mock data for applications
    const mockApplications = [
        {
            id: 'APP-001',
            tenderId: 'TND-2025-001',
            tenderTitle: 'Community Hall Construction',
            agencyName: 'ABC Construction Ltd.',
            agencyId: 'AGN-2025-001',
            registrationNumber: 'PWD/MH/2020/12345',
            experience: 8,
            turnover: 15000000,
            similarProjects: 12,
            technicalScore: 85,
            financialBid: 4800000,
            emdSubmitted: true,
            documentsComplete: true,
            submittedDate: '2025-11-25',
            status: 'Under Review',
            contactPerson: 'Mr. Rajesh Kumar',
            contactEmail: 'rajesh@abcconstruction.com',
            contactPhone: '+91 9876543210',
            completedProjects: [
                { name: 'Village Hall - Pune', year: 2023, value: 5000000 },
                { name: 'Community Center - Nashik', year: 2022, value: 4500000 }
            ]
        },
        {
            id: 'APP-002',
            tenderId: 'TND-2025-001',
            tenderTitle: 'Community Hall Construction',
            agencyName: 'XYZ Builders Pvt. Ltd.',
            agencyId: 'AGN-2025-002',
            registrationNumber: 'CPWD/MH/2019/67890',
            experience: 12,
            turnover: 25000000,
            similarProjects: 18,
            technicalScore: 92,
            financialBid: 4950000,
            emdSubmitted: true,
            documentsComplete: true,
            submittedDate: '2025-11-24',
            status: 'Under Review',
            contactPerson: 'Ms. Priya Sharma',
            contactEmail: 'priya@xyzbuilders.com',
            contactPhone: '+91 9876543211',
            completedProjects: [
                { name: 'Panchayat Building - Mumbai', year: 2023, value: 8000000 },
                { name: 'School Building - Thane', year: 2022, value: 6000000 }
            ]
        },
        {
            id: 'APP-003',
            tenderId: 'TND-2025-001',
            tenderTitle: 'Community Hall Construction',
            agencyName: 'PQR Infrastructure',
            agencyId: 'AGN-2025-003',
            registrationNumber: 'PWD/MH/2021/11111',
            experience: 5,
            turnover: 8000000,
            similarProjects: 6,
            technicalScore: 72,
            financialBid: 5200000,
            emdSubmitted: true,
            documentsComplete: false,
            submittedDate: '2025-11-26',
            status: 'Incomplete',
            contactPerson: 'Mr. Amit Patel',
            contactEmail: 'amit@pqrinfra.com',
            contactPhone: '+91 9876543212',
            completedProjects: [
                { name: 'Road Construction - Satara', year: 2023, value: 3000000 }
            ]
        }
    ];

    useEffect(() => {
        // Simulate API call
        setApplications(mockApplications);
    }, []);

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const badges = {
            'Under Review': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Eye },
            'Shortlisted': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            'Rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
            'Incomplete': { bg: 'bg-orange-100', text: 'text-orange-700', icon: FileText },
            'Awarded': { bg: 'bg-purple-100', text: 'text-purple-700', icon: Award }
        };
        const badge = badges[status] || badges['Under Review'];
        const Icon = badge.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    const handleAwardTender = (application) => {
        setSelectedApplication(application);
        setShowAwardModal(true);
    };

    const handleCommitteeMemberChange = (index, field, value) => {
        const updated = [...committeeMembers];
        updated[index][field] = value;
        setCommitteeMembers(updated);
    };

    const confirmAward = () => {
        alert(`Tender awarded to ${selectedApplication.agencyName}!\n\nCommittee members recorded.\nAgency will be notified via email.`);
        setShowAwardModal(false);
        navigate('/block/tenders');
    };

    const stats = {
        total: applications.length,
        underReview: applications.filter(a => a.status === 'Under Review').length,
        shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
        incomplete: applications.filter(a => a.status === 'Incomplete').length
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tender Applications</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {tenderId ? `Applications for Tender: ${tenderId}` : 'Review and select agencies for your projects'}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/block/tenders')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                        Back to Tenders
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Applications</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Under Review</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.underReview}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Eye className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Shortlisted</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{stats.shortlisted}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Incomplete</p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.incomplete}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <FileText className="text-orange-600" size={24} />
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
                        placeholder="Search by agency name or application ID..."
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
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No applications found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((application) => (
                        <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                {/* Left Section */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Building className="text-blue-600" size={24} />
                                                <h3 className="text-lg font-semibold text-gray-900">{application.agencyName}</h3>
                                                {getStatusBadge(application.status)}
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">Application ID: {application.id}</p>
                                            <p className="text-sm text-gray-600">Registration: {application.registrationNumber}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Experience</p>
                                            <p className="text-lg font-bold text-gray-900">{application.experience} Years</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Annual Turnover</p>
                                            <p className="text-lg font-bold text-green-600">₹{(application.turnover / 10000000).toFixed(1)}Cr</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Similar Projects</p>
                                            <p className="text-lg font-bold text-blue-600">{application.similarProjects}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Technical Score</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-lg font-bold text-purple-600">{application.technicalScore}/100</p>
                                                <Star className="text-yellow-500" size={16} fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <IndianRupee size={16} className="text-green-600" />
                                            <span className="font-medium">Financial Bid:</span>
                                            <span className="font-semibold text-gray-900">₹{(application.financialBid / 100000).toFixed(2)} Lakhs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-blue-600" />
                                            <span>Submitted: {new Date(application.submittedDate).toLocaleDateString('en-IN')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {application.documentsComplete ? (
                                                <>
                                                    <CheckCircle size={16} className="text-green-600" />
                                                    <span className="text-green-600 font-medium">Documents Complete</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={16} className="text-red-600" />
                                                    <span className="text-red-600 font-medium">Documents Incomplete</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section - Actions */}
                                <div className="flex flex-col justify-between gap-3 lg:w-48">
                                    <button
                                        onClick={() => handleViewDetails(application)}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                    {application.status === 'Under Review' && application.documentsComplete && (
                                        <button
                                            onClick={() => handleAwardTender(application)}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Award size={18} />
                                            Award Tender
                                        </button>
                                    )}
                                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
                                        <Download size={18} />
                                        Download Docs
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.agencyName}</h2>
                                <p className="text-sm text-gray-600 mt-1">Application ID: {selectedApplication.id}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                                        <p className="font-medium text-gray-900">{selectedApplication.contactPerson}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Email</p>
                                        <p className="font-medium text-gray-900">{selectedApplication.contactEmail}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                                        <p className="font-medium text-gray-900">{selectedApplication.contactPhone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Completed Projects */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Completed Similar Projects</h3>
                                <div className="space-y-3">
                                    {selectedApplication.completedProjects.map((project, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-900">{project.name}</p>
                                                <p className="text-sm text-gray-600">Year: {project.year}</p>
                                            </div>
                                            <p className="text-lg font-bold text-green-600">₹{(project.value / 100000).toFixed(2)} L</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Evaluation Scores */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Evaluation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-sm text-purple-600 mb-1">Technical Score</p>
                                        <p className="text-3xl font-bold text-purple-600">{selectedApplication.technicalScore}/100</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-600 mb-1">Financial Bid</p>
                                        <p className="text-3xl font-bold text-green-600">₹{(selectedApplication.financialBid / 100000).toFixed(2)}L</p>
                                    </div>
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
                            {selectedApplication.status === 'Under Review' && selectedApplication.documentsComplete && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        handleAwardTender(selectedApplication);
                                    }}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                                >
                                    <Award size={18} />
                                    Award Tender
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Award Tender Modal */}
            {showAwardModal && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="bg-green-600 text-white p-6 rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <Award size={32} />
                                <div>
                                    <h2 className="text-2xl font-bold">Award Tender</h2>
                                    <p className="text-green-100 mt-1">Select committee members and confirm award</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <p className="text-sm text-blue-900">
                                    <strong>Agency:</strong> {selectedApplication.agencyName}<br />
                                    <strong>Financial Bid:</strong> ₹{(selectedApplication.financialBid / 100000).toFixed(2)} Lakhs<br />
                                    <strong>Technical Score:</strong> {selectedApplication.technicalScore}/100
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Committee Members (Minimum 3)</h3>
                                <div className="space-y-4">
                                    {committeeMembers.map((member, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Member {index + 1} Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) => handleCommitteeMemberChange(index, 'name', e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Designation *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={member.designation}
                                                    onChange={(e) => handleCommitteeMemberChange(index, 'designation', e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter designation"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAwardModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAward}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                            >
                                <Award size={18} />
                                Confirm Award
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
