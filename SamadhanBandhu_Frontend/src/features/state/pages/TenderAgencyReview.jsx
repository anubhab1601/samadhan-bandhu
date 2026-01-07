import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building2, FileText, CreditCard, CheckCircle, Send, Eye, Download, AlertCircle } from 'lucide-react';

export default function TenderAgencyReview() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [showForwardModal, setShowForwardModal] = useState(false);
    const [forwardTo, setForwardTo] = useState('');
    const [remarks, setRemarks] = useState('');

    // Mock data - would come from API
    const projectData = {
        id: projectId || 'PROJ-2025-MH-001',
        title: 'Community Hall Construction',
        village: 'Shirdi',
        district: 'Ahmednagar',
        sarpanch: 'Ramesh Patil',
        totalBudget: 5000000, // 50 Lakhs
        status: 'Agency Selected',
        selectedAgency: {
            name: 'ABC Construction Pvt Ltd',
            registrationId: 'REG-MH-2024-1234',
            gstNumber: '27AABCU9603R1ZM',
            panNumber: 'AABCU9603R',
            contactPerson: 'Suresh Kumar',
            email: 'suresh@abcconstruction.com',
            phone: '+91 98765 43210',
            address: '123, Industrial Area, Ahmednagar, Maharashtra - 414001',
            bankDetails: {
                accountName: 'ABC Construction Pvt Ltd',
                accountNumber: '1234567890',
                ifscCode: 'SBIN0001234',
                bankName: 'State Bank of India',
                branch: 'Ahmednagar Main Branch'
            },
            experience: '15 years',
            completedProjects: 45,
            rating: 4.5,
            documents: [
                { name: 'Technical Proposal', type: 'PDF', size: '2.5 MB', uploadedOn: '2025-11-20' },
                { name: 'Financial Proposal', type: 'PDF', size: '1.8 MB', uploadedOn: '2025-11-20' },
                { name: 'Budget Breakdown', type: 'Excel', size: '856 KB', uploadedOn: '2025-11-20' },
                { name: 'Committee Resolution', type: 'PDF', size: '1.2 MB', uploadedOn: '2025-11-21' },
                { name: 'Company Registration Certificate', type: 'PDF', size: '3.1 MB', uploadedOn: '2025-11-15' },
                { name: 'GST Certificate', type: 'PDF', size: '890 KB', uploadedOn: '2025-11-15' }
            ]
        },
        ivaVerificationStatus: 'Pending', // or 'Verified', 'In Progress'
        ivaRemarks: null
    };

    const handleForwardToIVA = () => {
        setForwardTo('IVA');
        setShowForwardModal(true);
    };

    const handleForwardToCenter = () => {
        setForwardTo('Center');
        setShowForwardModal(true);
    };

    const confirmForward = () => {
        if (!remarks.trim()) {
            alert('Please add remarks before forwarding');
            return;
        }
        alert(`Project forwarded to ${forwardTo} successfully!\\n\\nRemarks: ${remarks}`);
        setShowForwardModal(false);
        navigate('/state/projects');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border-l-4 border-l-blue-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/state/projects')}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tender & Agency Review</h1>
                            <p className="text-sm text-gray-600 mt-1">Project ID: {projectData.id}</p>
                        </div>
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {projectData.status}
                    </span>
                </div>
            </div>

            {/* Project Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="text-blue-600" size={20} />
                    Project Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Project Title</p>
                        <p className="font-semibold text-gray-900">{projectData.title}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{projectData.village}, {projectData.district}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Budget</p>
                        <p className="font-semibold text-green-600">₹{(projectData.totalBudget / 100000).toFixed(2)} Lakhs</p>
                    </div>
                </div>
            </div>

            {/* Selected Agency Profile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building2 className="text-blue-600" size={20} />
                    Selected Agency Profile
                </h2>

                {/* Agency Basic Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{projectData.selectedAgency.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <CheckCircle size={16} className="text-green-600" />
                                    {projectData.selectedAgency.completedProjects} Projects Completed
                                </span>
                                <span>|</span>
                                <span>{projectData.selectedAgency.experience} Experience</span>
                                <span>|</span>
                                <span className="flex items-center gap-1">
                                    ⭐ {projectData.selectedAgency.rating}/5.0
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Registration ID</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.registrationId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">GST Number</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.gstNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">PAN Number</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.panNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.contactPerson}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Email</p>
                        <p className="font-medium text-gray-900 text-sm">{projectData.selectedAgency.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Phone</p>
                        <p className="font-medium text-gray-900 text-sm">{projectData.selectedAgency.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Address</p>
                        <p className="font-medium text-gray-900 text-sm">{projectData.selectedAgency.address}</p>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="text-green-600" size={18} />
                        Bank Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Account Name</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.bankDetails.accountName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Account Number</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.bankDetails.accountNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">IFSC Code</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.bankDetails.ifscCode}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Bank Name</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.bankDetails.bankName}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-xs text-gray-600 mb-1">Branch</p>
                            <p className="font-semibold text-gray-900">{projectData.selectedAgency.bankDetails.branch}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="text-blue-600" size={20} />
                    Uploaded Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectData.selectedAgency.documents.map((doc, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-lg">
                                        <FileText className="text-red-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">Uploaded: {doc.uploadedOn}</p>
                            <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-1">
                                    <Eye size={14} /> View
                                </button>
                                <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs font-medium flex items-center justify-center gap-1">
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* IVA Verification Status */}
            {projectData.ivaVerificationStatus === 'Verified' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 mt-1" size={24} />
                        <div>
                            <h3 className="text-lg font-bold text-green-900 mb-2">IVA Verification Complete</h3>
                            <p className="text-green-800 mb-3">The agency and committee have been verified by the IVA Officer.</p>
                            {projectData.ivaRemarks && (
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-1">IVA Remarks:</p>
                                    <p className="text-sm text-gray-600">{projectData.ivaRemarks}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    {projectData.ivaVerificationStatus === 'Pending' && (
                        <button
                            onClick={handleForwardToIVA}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <Send size={18} />
                            Forward to IVA for Verification
                        </button>
                    )}
                    {projectData.ivaVerificationStatus === 'Verified' && (
                        <button
                            onClick={handleForwardToCenter}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <Send size={18} />
                            Forward to PM-AJAY Center
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/state/projects')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>

            {/* Forward Modal */}
            {showForwardModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                            <h2 className="text-2xl font-bold">Forward to {forwardTo}</h2>
                            <p className="text-blue-100 mt-1">Add your remarks before forwarding</p>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-2">Project Details</p>
                                <p className="font-semibold text-gray-900">{projectData.id} - {projectData.title}</p>
                                <p className="text-sm text-gray-600">Agency: {projectData.selectedAgency.name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    State Remarks *
                                </label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Add your remarks for ${forwardTo}...`}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowForwardModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmForward}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                            >
                                <Send size={18} />
                                Confirm Forward
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
