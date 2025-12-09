import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, FileText, Upload, X, CheckCircle, Clock, AlertCircle, Send, Download } from 'lucide-react';

export default function Proposals() {
    const location = useLocation();
    const navigate = useNavigate();
    const tenderFromState = location.state?.tender;

    const [showSubmitForm, setShowSubmitForm] = useState(!!tenderFromState);
    const [proposals, setProposals] = useState([
        {
            id: 'PROP-2025-001',
            tenderId: 'TND-2025-001',
            tenderTitle: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            submittedDate: '2025-11-22',
            status: 'Under Review',
            technicalScore: null,
            financialBid: 4800000,
            documents: ['Company Profile', 'Technical Proposal', 'Financial Bid', 'EMD Receipt']
        },
        {
            id: 'PROP-2025-002',
            tenderId: 'TND-2025-002',
            tenderTitle: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            submittedDate: '2025-11-20',
            status: 'Shortlisted',
            technicalScore: 85,
            financialBid: 7200000,
            documents: ['Company Profile', 'Technical Proposal', 'Financial Bid', 'EMD Receipt']
        },
        {
            id: 'PROP-2025-003',
            tenderId: 'TND-2025-004',
            tenderTitle: 'School Building Renovation',
            village: 'Thane Village',
            district: 'Thane',
            submittedDate: '2025-11-15',
            status: 'Awarded',
            technicalScore: 92,
            financialBid: 3300000,
            awardDate: '2025-11-28',
            documents: ['Company Profile', 'Technical Proposal', 'Financial Bid', 'EMD Receipt', 'Work Order']
        }
    ]);

    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Form state for new proposal
    const [formData, setFormData] = useState({
        companyName: '',
        registrationNo: '',
        experience: '',
        annualTurnover: '',
        similarProjects: '',
        technicalApproach: '',
        financialBid: '',
        projectDuration: '',
        uploadedDocs: []
    });

    const getStatusBadge = (status) => {
        const badges = {
            'Under Review': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
            'Shortlisted': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            'Awarded': { bg: 'bg-purple-100', text: 'text-purple-700', icon: CheckCircle },
            'Rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle }
        };
        const badge = badges[status] || badges['Under Review'];
        const Icon = badge.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1 w-fit`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const filteredProposals = proposals.filter(proposal => {
        const matchesSearch = proposal.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: proposals.length,
        underReview: proposals.filter(p => p.status === 'Under Review').length,
        shortlisted: proposals.filter(p => p.status === 'Shortlisted').length,
        awarded: proposals.filter(p => p.status === 'Awarded').length
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            uploadedDocs: [...formData.uploadedDocs, ...files.map(f => ({ name: f.name, size: f.size }))]
        });
    };

    const removeFile = (index) => {
        setFormData({
            ...formData,
            uploadedDocs: formData.uploadedDocs.filter((_, i) => i !== index)
        });
    };

    const handleSubmitProposal = () => {
        alert('Proposal submitted successfully!\n\nYour proposal has been submitted for review.\nProposal ID: PROP-2025-004');
        setShowSubmitForm(false);
        navigate('/proposals');
    };

    if (showSubmitForm) {
        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Submit Proposal</h1>
                            <p className="text-sm text-gray-600 mt-1">Complete the form to submit your tender proposal</p>
                        </div>
                        <button
                            onClick={() => {
                                setShowSubmitForm(false);
                                navigate('/proposals');
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {tenderFromState && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">Tender Details</p>
                        <p className="text-lg font-bold text-blue-600">{tenderFromState.title}</p>
                        <p className="text-sm text-blue-700">Tender ID: {tenderFromState.id} | Budget: ₹{(tenderFromState.budget / 100000).toFixed(2)}L</p>
                    </div>
                )}

                {/* Proposal Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                    {/* Company Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
                                <input
                                    type="text"
                                    value={formData.registrationNo}
                                    onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter registration number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                                <input
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter years"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Turnover (₹) *</label>
                                <input
                                    type="number"
                                    value={formData.annualTurnover}
                                    onChange={(e) => setFormData({ ...formData, annualTurnover: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Technical Proposal */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Proposal</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Similar Projects Completed *</label>
                                <input
                                    type="number"
                                    value={formData.similarProjects}
                                    onChange={(e) => setFormData({ ...formData, similarProjects: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Approach & Methodology *</label>
                                <textarea
                                    rows="5"
                                    value={formData.technicalApproach}
                                    onChange={(e) => setFormData({ ...formData, technicalApproach: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Describe your technical approach, methodology, and execution plan..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Proposed Project Duration (months) *</label>
                                <input
                                    type="number"
                                    value={formData.projectDuration}
                                    onChange={(e) => setFormData({ ...formData, projectDuration: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter duration"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Bid */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Bid</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (₹) *</label>
                            <input
                                type="number"
                                value={formData.financialBid}
                                onChange={(e) => setFormData({ ...formData, financialBid: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your bid amount"
                            />
                            {tenderFromState && formData.financialBid && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Your bid is {((formData.financialBid / tenderFromState.budget) * 100).toFixed(1)}% of estimated budget
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Document Upload */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center">
                                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                                <label className="cursor-pointer">
                                    <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                                    <span className="text-gray-600"> or drag and drop</span>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB each</p>
                            </div>
                        </div>

                        {formData.uploadedDocs.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {formData.uploadedDocs.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText className="text-blue-600" size={20} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setShowSubmitForm(false);
                            navigate('/proposals');
                        }}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmitProposal}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    >
                        <Send size={18} />
                        Submit Proposal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
                        <p className="text-sm text-gray-600 mt-1">Track all your submitted tender proposals</p>
                    </div>
                    <button
                        onClick={() => navigate('/tenders')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        Browse Tenders
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Proposals</p>
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
                            <p className="text-sm text-gray-600 mb-1">Under Review</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.underReview}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Clock className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
                            <p className="text-3xl font-bold text-green-600">{stats.shortlisted}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Awarded</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.awarded}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <CheckCircle className="text-purple-600" size={24} />
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
                        placeholder="Search by tender title or proposal ID..."
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
                        <option value="Awarded">Awarded</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Proposals List */}
            {filteredProposals.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 mb-4">No proposals found</p>
                    <button
                        onClick={() => navigate('/tenders')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        Browse Available Tenders
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredProposals.map((proposal) => (
                        <div key={proposal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{proposal.tenderTitle}</h3>
                                                {getStatusBadge(proposal.status)}
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">Proposal ID: {proposal.id}</p>
                                            <p className="text-sm text-gray-600">Tender ID: {proposal.tenderId}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Submitted Date</p>
                                            <p className="text-sm font-bold text-gray-900">{new Date(proposal.submittedDate).toLocaleDateString('en-IN')}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">Financial Bid</p>
                                            <p className="text-sm font-bold text-green-600">₹{(proposal.financialBid / 100000).toFixed(2)}L</p>
                                        </div>
                                        {proposal.technicalScore && (
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-xs text-gray-600 mb-1">Technical Score</p>
                                                <p className="text-sm font-bold text-blue-600">{proposal.technicalScore}/100</p>
                                            </div>
                                        )}
                                        {proposal.awardDate && (
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-xs text-gray-600 mb-1">Award Date</p>
                                                <p className="text-sm font-bold text-purple-600">{new Date(proposal.awardDate).toLocaleDateString('en-IN')}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FileText size={16} className="text-blue-600" />
                                        <span className="font-medium">Documents:</span>
                                        <span className="text-gray-900">{proposal.documents.length} files uploaded</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:w-48">
                                    <button
                                        onClick={() => {
                                            setSelectedProposal(proposal);
                                            setShowDetailsModal(true);
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                    {proposal.status === 'Awarded' && (
                                        <button
                                            onClick={() => navigate('/projects')}
                                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                                        >
                                            View Project
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedProposal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Proposal Details</h2>
                                <p className="text-sm text-gray-600 mt-1">{selectedProposal.id}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Tender</p>
                                <p className="text-lg font-bold text-gray-900">{selectedProposal.tenderTitle}</p>
                                <p className="text-sm text-gray-600">Tender ID: {selectedProposal.tenderId}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600 mb-1">Status</p>
                                    <p className="text-lg font-bold text-blue-900">{selectedProposal.status}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-600 mb-1">Financial Bid</p>
                                    <p className="text-lg font-bold text-green-900">₹{(selectedProposal.financialBid / 100000).toFixed(2)}L</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Uploaded Documents</h3>
                                <div className="space-y-2">
                                    {selectedProposal.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileText className="text-blue-600" size={20} />
                                                <span className="text-gray-900">{doc}</span>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
