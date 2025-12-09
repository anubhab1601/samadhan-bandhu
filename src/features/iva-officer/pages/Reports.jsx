import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Eye, FileText, Upload, CheckCircle, Clock, AlertCircle, Send, Camera, X } from 'lucide-react';

export default function Reports() {
    const location = useLocation();
    const assignmentFromState = location.state?.assignment;
    const autoOpenSubmit = location.state?.autoOpenSubmit;
    const [reports, setReports] = useState([
        {
            id: 'REP-2025-001',
            verificationId: 'VER-2025-003',
            applicantName: 'Amit Patel',
            village: 'Thane Village',
            district: 'Thane',
            submittedDate: '2025-11-25',
            status: 'Approved',
            recommendation: 'Approved',
            rating: 'Excellent',
            remarks: 'All documents verified. Site visit completed successfully.'
        },
        {
            id: 'REP-2025-002',
            verificationId: 'VER-2025-004',
            applicantName: 'Sunita Desai',
            village: 'Pune Village',
            district: 'Pune',
            submittedDate: '2025-11-23',
            status: 'Approved',
            recommendation: 'Approved with Conditions',
            rating: 'Good',
            remarks: 'Minor documentation issues noted.'
        }
    ]);

    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        verificationId: '',
        recommendation: '',
        rating: '',
        siteVisitDate: '',
        remarks: '',
        issues: '',
        uploadedPhotos: []
    });

    const getStatusColor = (status) => {
        const colors = {
            'Approved': 'bg-green-100 text-green-700',
            'Pending Review': 'bg-yellow-100 text-yellow-700',
            'Rejected': 'bg-red-100 text-red-700'
        };
        return colors[status] || colors['Pending Review'];
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: reports.length,
        approved: reports.filter(r => r.status === 'Approved').length,
        pending: reports.filter(r => r.status === 'Pending Review').length,
        rejected: reports.filter(r => r.status === 'Rejected').length
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            uploadedPhotos: [...formData.uploadedPhotos, ...files.map(f => ({ name: f.name, size: f.size }))]
        });
    };

    const removePhoto = (index) => {
        setFormData({
            ...formData,
            uploadedPhotos: formData.uploadedPhotos.filter((_, i) => i !== index)
        });
    };

    const handleSubmitReport = () => {
        // Validation
        if (!formData.verificationId || !formData.recommendation || !formData.rating || !formData.siteVisitDate || !formData.remarks) {
            alert('Please fill in all required fields marked with *');
            return;
        }

        // Checklist validation if Approved
        if (formData.recommendation === 'Approved') {
            const checklist = formData.checklist || {};
            if (!checklist.scPopulation || !checklist.landAvailable || !checklist.resolutionPassed || !checklist.noDuplicate) {
                alert('All eligibility checklist items must be verified for Approval');
                return;
            }
        }

        if (formData.uploadedPhotos.length < 1) {
            alert('Please upload at least 1 photo from the site visit');
            return;
        }

        // Simulate backend API call
        setTimeout(() => {
            alert('Report submitted successfully!\n\nYour verification report has been submitted for review.');
            setShowSubmitModal(false);
            setFormData({
                verificationId: '',
                recommendation: '',
                rating: '',
                siteVisitDate: '',
                remarks: '',
                issues: '',
                checklist: {},
                uploadedPhotos: []
            });
        }, 1500);
    };

    // Auto-open modal and pre-fill if coming from Assignments
    useEffect(() => {
        if (autoOpenSubmit && assignmentFromState) {
            setFormData({
                verificationId: assignmentFromState.id,
                recommendation: '',
                rating: '',
                siteVisitDate: '',
                remarks: '',
                issues: '',
                uploadedPhotos: []
            });
            setShowSubmitModal(true);
        }
    }, [autoOpenSubmit, assignmentFromState]);

    return (
        <div className="space-y-4 md:space-y-6 pb-4">
            {/* Page Header - Mobile Optimized */}
            <div className="bg-white border-l-4 border-l-orange-500 p-3 md:p-4 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Verification Reports</h1>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">Submit and view your verification reports</p>
                    </div>
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-xs md:text-sm flex items-center gap-1 md:gap-2"
                    >
                        <Send size={16} />
                        <span className="hidden sm:inline">Submit Report</span>
                        <span className="sm:hidden">Submit</span>
                    </button>
                </div>
            </div>

            {/* Statistics - Mobile Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Total</p>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Approved</p>
                            <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Pending</p>
                            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="text-yellow-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Rejected</p>
                            <p className="text-2xl md:text-3xl font-bold text-red-600">{stats.rejected}</p>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg">
                            <AlertCircle className="text-red-600" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters - Mobile Stacked */}
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or report ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={18} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Reports List - Mobile Cards */}
            {filteredReports.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={40} />
                    <p className="text-gray-500 text-sm md:text-base mb-4">No reports found</p>
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                    >
                        Submit Your First Report
                    </button>
                </div>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {filteredReports.map((report) => (
                        <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{report.applicantName}</h3>
                                    <p className="text-xs md:text-sm text-blue-600 font-medium">Report ID: {report.id}</p>
                                    <p className="text-xs text-gray-600">Verification: {report.verificationId}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ml-2 ${getStatusColor(report.status)}`}>
                                    {report.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3 text-xs md:text-sm">
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">Recommendation</p>
                                    <p className="font-medium text-gray-900">{report.recommendation}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">Rating</p>
                                    <p className="font-medium text-gray-900">{report.rating}</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 mb-3">Submitted: {new Date(report.submittedDate).toLocaleDateString('en-IN')}</p>

                            <button
                                onClick={() => {
                                    setSelectedReport(report);
                                    setShowDetailsModal(true);
                                }}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center justify-center gap-2"
                            >
                                <Eye size={16} />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit Report Modal - Mobile Bottom Sheet */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
                    <div className="bg-white rounded-t-2xl md:rounded-lg shadow-xl w-full md:max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">Submit Verification Report</h2>
                                    {assignmentFromState && (
                                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                                            For: {assignmentFromState.applicantName} • {assignmentFromState.village}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Verification ID *</label>
                                <input
                                    type="text"
                                    value={formData.verificationId}
                                    onChange={(e) => setFormData({ ...formData, verificationId: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter verification ID"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation *</label>
                                    <select
                                        value={formData.recommendation}
                                        onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Approved with Conditions">Approved with Conditions</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                                    <select
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site Visit Date *</label>
                                <input
                                    type="date"
                                    value={formData.siteVisitDate}
                                    onChange={(e) => setFormData({ ...formData, siteVisitDate: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks *</label>
                                <textarea
                                    rows="3"
                                    value={formData.remarks}
                                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your observations and remarks..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Issues Identified (if any)</label>
                                <textarea
                                    rows="3"
                                    value={formData.issues}
                                    onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="List any issues or concerns..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Checklist *</label>
                                <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={formData.checklist?.scPopulation}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                checklist: { ...formData.checklist, scPopulation: e.target.checked }
                                            })}
                                        />
                                        <span className="text-sm text-gray-700">SC Population &gt; 50% verified</span>
                                    </label>
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={formData.checklist?.landAvailable}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                checklist: { ...formData.checklist, landAvailable: e.target.checked }
                                            })}
                                        />
                                        <span className="text-sm text-gray-700">Land availability confirmed</span>
                                    </label>
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={formData.checklist?.resolutionPassed}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                checklist: { ...formData.checklist, resolutionPassed: e.target.checked }
                                            })}
                                        />
                                        <span className="text-sm text-gray-700">Gram Panchayat resolution verified</span>
                                    </label>
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={formData.checklist?.noDuplicate}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                checklist: { ...formData.checklist, noDuplicate: e.target.checked }
                                            })}
                                        />
                                        <span className="text-sm text-gray-700">No duplicate project exists</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                    <div className="text-center">
                                        <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                                        <label className="cursor-pointer">
                                            <span className="text-blue-600 hover:text-blue-700 font-medium text-sm">Click to upload</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                                    </div>
                                </div>

                                {formData.uploadedPhotos.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {formData.uploadedPhotos.map((photo, index) => (
                                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <Camera className="text-blue-600 flex-shrink-0" size={16} />
                                                    <span className="text-sm text-gray-900 truncate">{photo.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => removePhoto(index)}
                                                    className="text-red-600 hover:text-red-700 flex-shrink-0"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 md:p-6 flex flex-col md:flex-row gap-3">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-sm md:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReport}
                                className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm md:text-base flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal - Mobile Bottom Sheet */}
            {showDetailsModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
                    <div className="bg-white rounded-t-2xl md:rounded-lg shadow-xl w-full md:max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">Report Details</h2>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">{selectedReport.id}</p>
                                </div>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 space-y-4">
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Applicant:</span>
                                    <span className="font-medium text-gray-900">{selectedReport.applicantName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Verification ID:</span>
                                    <span className="font-medium text-gray-900">{selectedReport.verificationId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Location:</span>
                                    <span className="font-medium text-gray-900">{selectedReport.village}, {selectedReport.district}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Submitted:</span>
                                    <span className="font-medium text-gray-900">{new Date(selectedReport.submittedDate).toLocaleDateString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-xs text-blue-600 mb-1">Recommendation</p>
                                    <p className="font-semibold text-blue-900 text-sm">{selectedReport.recommendation}</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <p className="text-xs text-green-600 mb-1">Rating</p>
                                    <p className="font-semibold text-green-900 text-sm">{selectedReport.rating}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Remarks</h3>
                                <p className="text-xs md:text-sm text-gray-700">{selectedReport.remarks}</p>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 md:p-6">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="w-full px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-sm md:text-base"
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
