import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, Send, DollarSign } from 'lucide-react';
import ProjectTimeline from '../../../shared/components/ProjectTimeline';

export default function CentralApplicationDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [actionType, setActionType] = useState(''); // 'approve-consent', 'reject', 'release-fund'
    const [consentRemarks, setConsentRemarks] = useState('');
    const [fundAmount, setFundAmount] = useState('');
    const [fundInstallment, setFundInstallment] = useState('first');
    const [fundRemarks, setFundRemarks] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock application data
    const application = {
        id: id || 'PMAJAY-2025-MH-12345',
        villageName: 'Khed',
        gramPanchayat: 'Khed GP',
        district: 'Pune',
        state: 'Maharashtra',
        sarpanchName: 'Ramesh Patil',

        // Project Details
        projectTitle: 'Community Hall Construction',
        projectCategory: 'Community Hall',
        projectDescription: 'Construction of a modern community hall for village meetings and social gatherings with capacity of 500 people...',
        estimatedCost: '5000000',
        projectDuration: '12',

        // Population
        totalPopulation: '5000',
        scPopulation: '2800',
        scPercentage: '56.00',

        // Beneficiaries
        directBeneficiaries: '5000',
        scBeneficiaries: '2800',
        womenBeneficiaries: '2500',

        // Status & Dates
        status: 'pending-consent',
        submittedDate: '2025-11-20',
        ivaVerifiedDate: '2025-11-28',
        stateForwardedDate: '2025-11-29',

        // IVA Verification Details
        ivaOfficer: 'Suresh Kumar',
        ivaRecommendation: 'approved',
        ivaRemarks: 'Village is eligible. SC population verified at 56%. All documents verified. Project is feasible and necessary for the village.',
        eligibilityStatus: 'eligible',

        // State Officer Details
        stateOfficer: 'Priya Sharma',
        stateRemarks: 'Application reviewed and found suitable. Forwarding to Center for consent.',

        // Documents
        documents: [
            { name: 'Gram Sabha Resolution.pdf', type: 'Gram Sabha Resolution', size: '2.5 MB' },
            { name: 'Population Certificate.pdf', type: 'Village Population Certificate', size: '1.2 MB' },
            { name: 'IVA Verification Report.pdf', type: 'IVA Verification Report', size: '3.1 MB' }
        ]
    };

    // Timeline stages
    const timelineStages = [
        {
            id: 1,
            name: 'Application Submitted',
            description: 'Sarpanch submitted Format I & II',
            status: 'completed',
            date: application.submittedDate,
            icon: FileText,
            actor: `Sarpanch - ${application.sarpanchName}`,
            details: `Village: ${application.villageName}, District: ${application.district}`
        },
        {
            id: 2,
            name: 'State Review',
            description: 'Application reviewed by State',
            status: 'completed',
            date: application.stateForwardedDate,
            icon: CheckCircle,
            actor: `State Officer - ${application.stateOfficer}`,
            details: application.stateRemarks
        },
        {
            id: 3,
            name: 'IVA Verification',
            description: 'Village eligibility verification',
            status: 'completed',
            date: application.ivaVerifiedDate,
            icon: CheckCircle,
            actor: `IVA Officer - ${application.ivaOfficer}`,
            details: application.ivaRemarks
        },
        {
            id: 4,
            name: 'Center Consent',
            description: 'Consent note from Center',
            status: 'in-progress',
            date: null,
            icon: FileText,
            actor: 'Pending',
            details: 'Awaiting consent note approval'
        },
        {
            id: 5,
            name: 'Fund Release',
            description: 'First installment release',
            status: 'pending',
            date: null,
            icon: DollarSign,
            actor: 'Not Started',
            details: 'Pending consent approval'
        }
    ];

    const handleAction = (type) => {
        setActionType(type);
        setConsentRemarks('');
        setFundAmount('');
        setFundRemarks('');
    };

    const handleSubmit = () => {
        if (actionType === 'approve-consent' && !consentRemarks.trim()) {
            alert('Please provide consent remarks');
            return;
        }

        if (actionType === 'reject' && !consentRemarks.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }

        if (actionType === 'release-fund') {
            if (!fundAmount || parseFloat(fundAmount) <= 0) {
                alert('Please enter a valid fund amount');
                return;
            }
        }

        setIsSubmitting(true);

        setTimeout(() => {
            if (actionType === 'approve-consent') {
                alert('Consent approved successfully! Application can now proceed to fund release.');
            } else if (actionType === 'reject') {
                alert('Application rejected successfully!');
            } else if (actionType === 'release-fund') {
                alert(`Fund of ₹${parseFloat(fundAmount).toLocaleString('en-IN')} released successfully!`);
            }
            setIsSubmitting(false);
            navigate('/central/applications');
        }, 2000);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/central/applications')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Applications
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Application Review & Consent</h1>
                <p className="text-gray-600 mt-1">Review IVA-verified application and provide consent</p>
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
                                Pending Consent
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Village:</span>
                                <p className="font-medium text-gray-900">{application.villageName}, {application.district}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">State:</span>
                                <p className="font-medium text-gray-900">{application.state}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Estimated Cost:</span>
                                <p className="font-medium text-gray-900">₹{parseInt(application.estimatedCost).toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">SC Percentage:</span>
                                <p className="font-medium text-green-600 flex items-center gap-1">
                                    {application.scPercentage}%
                                    <CheckCircle size={16} />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IVA Verification Summary */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                            <div className="flex-1">
                                <h3 className="font-semibold text-green-900 mb-2">IVA Verification - Approved</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-green-700 font-medium">IVA Officer:</span>
                                        <p className="text-green-800">{application.ivaOfficer}</p>
                                    </div>
                                    <div>
                                        <span className="text-green-700 font-medium">Eligibility Status:</span>
                                        <p className="text-green-800 capitalize">{application.eligibilityStatus}</p>
                                    </div>
                                    <div>
                                        <span className="text-green-700 font-medium">Verification Date:</span>
                                        <p className="text-green-800">{new Date(application.ivaVerifiedDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <span className="text-green-700 font-medium">Remarks:</span>
                                        <p className="text-green-800">{application.ivaRemarks}</p>
                                    </div>
                                </div>
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
                                    <span className="text-sm text-gray-600">Duration:</span>
                                    <p className="font-medium text-gray-900">{application.projectDuration} months</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Beneficiaries:</span>
                                    <p className="font-medium text-gray-900">{application.directBeneficiaries} people</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Population & Beneficiaries */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Population & Beneficiaries</h3>
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
                                <p className="font-medium text-green-600">{application.scPercentage}%</p>
                            </div>
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

                    {/* Project Timeline */}
                    <ProjectTimeline
                        projectId={application.id}
                        stages={timelineStages}
                        showDetails={true}
                    />

                    {/* Documents */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Supporting Documents</h3>
                        <div className="space-y-2">
                            {application.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                                    <div className="flex items-center gap-3">
                                        <FileText size={20} className="text-red-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{doc.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Actions */}
                <div className="space-y-6">
                    {/* Action Panel */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Consent Actions</h3>

                        {!actionType && application.status === 'pending-consent' && (
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleAction('approve-consent')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                >
                                    <CheckCircle size={20} />
                                    Approve Consent
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

                        {!actionType && application.status === 'consent-approved' && (
                            <button
                                onClick={() => handleAction('release-fund')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                            >
                                <DollarSign size={20} />
                                Release Fund
                            </button>
                        )}

                        {actionType === 'approve-consent' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Consent Remarks *
                                    </label>
                                    <textarea
                                        rows="5"
                                        value={consentRemarks}
                                        onChange={(e) => setConsentRemarks(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Provide consent note remarks..."
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Approving...' : 'Confirm Approval'}
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
                                        value={consentRemarks}
                                        onChange={(e) => setConsentRemarks(e.target.value)}
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

                        {actionType === 'release-fund' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Installment Type *
                                    </label>
                                    <select
                                        value={fundInstallment}
                                        onChange={(e) => setFundInstallment(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="first">First Installment (40%)</option>
                                        <option value="second">Second Installment (30%)</option>
                                        <option value="final">Final Installment (30%)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fund Amount (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={fundAmount}
                                        onChange={(e) => setFundAmount(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter amount"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Estimated Cost: ₹{parseInt(application.estimatedCost).toLocaleString('en-IN')}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Remarks (Optional)
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={fundRemarks}
                                        onChange={(e) => setFundRemarks(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Add any notes..."
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Releasing...' : 'Release Fund'}
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
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Application Journey</h4>
                        <div className="text-sm space-y-1 text-blue-800">
                            <p>✓ Submitted: {new Date(application.submittedDate).toLocaleDateString('en-IN')}</p>
                            <p>✓ State Forwarded: {new Date(application.stateForwardedDate).toLocaleDateString('en-IN')}</p>
                            <p>✓ IVA Verified: {new Date(application.ivaVerifiedDate).toLocaleDateString('en-IN')}</p>
                            <p className="font-medium">⏳ Awaiting Center Consent</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
