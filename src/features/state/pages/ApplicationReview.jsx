import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, XCircle, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import ProjectTimeline from '../../../shared/components/ProjectTimeline';

export default function StateApplicationReview() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [actionType, setActionType] = useState(''); // 'forward' or 'reject'
    const [remarks, setRemarks] = useState('');
    const [selectedIVA, setSelectedIVA] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock application data
    const application = {
        id: id || 'PMAJAY-2025-MH-12345',
        villageName: 'Khed',
        gramPanchayat: 'Khed GP',
        block: 'Khed',
        district: 'Pune',
        state: 'Maharashtra',
        pin: '412105',
        sarpanchName: 'Ramesh Patil',
        sarpanchEmail: 'ramesh@village.in',
        sarpanchMobile: '9876543210',

        // Population
        totalPopulation: '5000',
        scPopulation: '2800',
        scPercentage: '56.00',

        // Project Details
        projectTitle: 'Community Hall Construction',
        projectCategory: 'Community Hall',
        projectDescription: 'Construction of a modern community hall for village meetings and social gatherings...',
        estimatedCost: '5000000',
        projectDuration: '12',

        // Beneficiaries
        directBeneficiaries: '5000',
        scBeneficiaries: '2800',
        womenBeneficiaries: '2500',

        // Status
        status: 'pending-state-review',
        submittedDate: '2025-11-20',

        // Documents
        documents: [
            { name: 'Gram Sabha Resolution.pdf', type: 'Gram Sabha Resolution', size: '2.5 MB' },
            { name: 'Population Certificate.pdf', type: 'Village Population Certificate', size: '1.2 MB' },
            { name: 'SC Certificate.pdf', type: 'SC Population Certificate', size: '1.1 MB' }
        ],

        // Photos
        villagePhotos: 3,
        projectSitePhotos: 4
    };

    // Mock IVA officers list
    const ivaOfficers = [
        { id: 'IVA001', name: 'Suresh Kumar', organization: 'Maharashtra Verification Agency', district: 'Pune' },
        { id: 'IVA002', name: 'Priya Sharma', organization: 'Gujarat Verification Agency', district: 'Pune' },
        { id: 'IVA003', name: 'Amit Patel', organization: 'Central Verification Agency', district: 'Pune' }
    ];

    const handleAction = (type) => {
        setActionType(type);
        setRemarks('');
        setSelectedIVA('');
    };

    const handleSubmit = () => {
        if (actionType === 'reject' && !remarks.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }

        if (actionType === 'forward' && !selectedIVA) {
            alert('Please select an IVA Officer');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            alert(`Application ${actionType === 'forward' ? 'forwarded to IVA' : 'rejected'} successfully!`);
            setIsSubmitting(false);
            navigate('/state/applications');
        }, 2000);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/state/applications')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Applications
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Application Review</h1>
                <p className="text-gray-600 mt-1">Review application details and forward to IVA for verification</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Application Summary */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{application.projectTitle}</h2>
                                <p className="text-sm text-gray-600 mt-1">Application ID: {application.id}</p>
                            </div>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                                Pending Review
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Village:</span>
                                <p className="font-medium text-gray-900">{application.villageName}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">District:</span>
                                <p className="font-medium text-gray-900">{application.district}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Sarpanch:</span>
                                <p className="font-medium text-gray-900">{application.sarpanchName}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Submitted On:</span>
                                <p className="font-medium text-gray-900">
                                    {new Date(application.submittedDate).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Village Profile */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Village Profile</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Total Population:</span>
                                <p className="font-medium text-gray-900">{application.totalPopulation}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">SC Population:</span>
                                <p className="font-medium text-gray-900">{application.scPopulation}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">SC Percentage:</span>
                                <p className="font-medium text-green-600 flex items-center gap-1">
                                    {application.scPercentage}%
                                    <CheckCircle size={16} />
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600">Gram Panchayat:</span>
                                <p className="font-medium text-gray-900">{application.gramPanchayat}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Block:</span>
                                <p className="font-medium text-gray-900">{application.block}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">PIN Code:</span>
                                <p className="font-medium text-gray-900">{application.pin}</p>
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Project Details</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm text-gray-600">Category:</span>
                                <p className="font-medium text-gray-900">{application.projectCategory}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Description:</span>
                                <p className="text-gray-900">{application.projectDescription}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-600">Estimated Cost:</span>
                                    <p className="font-medium text-gray-900">₹{parseInt(application.estimatedCost).toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Duration:</span>
                                    <p className="font-medium text-gray-900">{application.projectDuration} months</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Beneficiaries</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Direct Beneficiaries:</span>
                                <p className="font-medium text-gray-900">{application.directBeneficiaries}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">SC Beneficiaries:</span>
                                <p className="font-medium text-gray-900">{application.scBeneficiaries}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Women Beneficiaries:</span>
                                <p className="font-medium text-gray-900">{application.womenBeneficiaries}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents & Photos */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Documents & Photos</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Supporting Documents ({application.documents.length})</p>
                                <div className="space-y-2">
                                    {application.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <div className="flex items-center gap-2">
                                                <FileText size={16} className="text-red-600" />
                                                <span className="text-sm text-gray-900">{doc.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{doc.size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Village Photos:</span>
                                    <p className="font-medium text-gray-900">{application.villagePhotos} photos (geo-tagged)</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Project Site Photos:</span>
                                    <p className="font-medium text-gray-900">{application.projectSitePhotos} photos (geo-tagged)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Actions */}
                <div className="space-y-6">
                    {/* Action Panel */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Review Actions</h3>

                        {!actionType && (
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleAction('forward')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                >
                                    <Send size={20} />
                                    Forward to IVA
                                </button>
                                <button
                                    onClick={() => handleAction('reject')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                                >
                                    <XCircle size={20} />
                                    Reject Application
                                </button>
                            </div>
                        )}

                        {actionType === 'forward' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select IVA Officer *
                                    </label>
                                    <select
                                        value={selectedIVA}
                                        onChange={(e) => setSelectedIVA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select IVA Officer</option>
                                        {ivaOfficers.map(iva => (
                                            <option key={iva.id} value={iva.id}>
                                                {iva.name} - {iva.organization}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Remarks (Optional)
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Add any notes for IVA officer..."
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Forwarding...' : 'Confirm Forward'}
                                    </button>
                                    <button
                                        onClick={() => setActionType('')}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {actionType === 'reject' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Rejection *
                                    </label>
                                    <textarea
                                        rows="5"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Provide detailed reason for rejection..."
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
                                    </button>
                                    <button
                                        onClick={() => setActionType('')}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t">
                            <p className="text-xs text-gray-500">
                                <strong>Note:</strong> Forwarding to IVA will initiate the village eligibility verification process.
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Sarpanch Contact</h4>
                        <div className="text-sm space-y-1">
                            <p className="text-blue-800">{application.sarpanchName}</p>
                            <p className="text-blue-700">{application.sarpanchEmail}</p>
                            <p className="text-blue-700">{application.sarpanchMobile}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
