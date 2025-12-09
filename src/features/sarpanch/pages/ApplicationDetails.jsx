import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import ProjectTimeline from '../../../shared/components/ProjectTimeline';

export default function ApplicationDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock application data
    const application = {
        id: id || 'PMAJAY-2025-MH-12345',

        // Village Profile
        villageName: 'Khed',
        gramPanchayat: 'Khed GP',
        block: 'Khed',
        district: 'Pune',
        state: 'Maharashtra',
        pin: '412105',
        totalPopulation: '5000',
        scPopulation: '2800',
        scPercentage: '56.00',

        // Project Details
        projectTitle: 'Community Hall Construction',
        projectCategory: 'Community Hall',
        projectDescription: 'Construction of a modern community hall for village meetings and social gatherings with capacity of 500 people. The hall will include modern amenities like audio-visual equipment, proper seating arrangements, and accessibility features.',
        estimatedCost: '5000000',
        projectDuration: '12',

        // Beneficiaries
        directBeneficiaries: '5000',
        scBeneficiaries: '2800',
        womenBeneficiaries: '2500',

        // Status
        status: 'iva-verified',
        submittedDate: '2025-11-20',
        stateReviewedDate: '2025-11-22',
        ivaVerifiedDate: '2025-11-28',
        centerConsentDate: null,

        // Documents
        documents: [
            { name: 'Gram Sabha Resolution.pdf', type: 'Gram Sabha Resolution', size: '2.5 MB' },
            { name: 'Population Certificate.pdf', type: 'Village Population Certificate', size: '1.2 MB' },
            { name: 'SC Certificate.pdf', type: 'SC Population Certificate', size: '1.1 MB' },
            { name: 'Land Documents.pdf', type: 'Land Availability Certificate', size: '1.8 MB' }
        ],

        // Photos
        villagePhotos: 3,
        projectSitePhotos: 4,

        // Remarks
        stateRemarks: 'Application reviewed and found suitable. Forwarding to IVA for verification.',
        ivaRemarks: 'Village is eligible. SC population verified at 56%. All documents verified. Project is feasible and necessary for the village.'
    };

    // Timeline stages
    const timelineStages = [
        {
            id: 1,
            name: 'Application Submitted',
            description: 'Format I & II submitted successfully',
            status: 'completed',
            date: application.submittedDate,
            icon: FileText,
            actor: 'Sarpanch',
            details: 'All required documents and photos uploaded'
        },
        {
            id: 2,
            name: 'State Review',
            description: 'Application under State review',
            status: 'completed',
            date: application.stateReviewedDate,
            icon: CheckCircle,
            actor: 'State Officer',
            details: application.stateRemarks
        },
        {
            id: 3,
            name: 'IVA Verification',
            description: 'Village eligibility verification',
            status: 'completed',
            date: application.ivaVerifiedDate,
            icon: CheckCircle,
            actor: 'IVA Officer',
            details: application.ivaRemarks
        },
        {
            id: 4,
            name: 'Center Consent',
            description: 'Awaiting consent from Center',
            status: 'in-progress',
            date: null,
            icon: Clock,
            actor: 'Pending',
            details: 'Application forwarded to Center for consent approval'
        },
        {
            id: 5,
            name: 'Fund Release',
            description: 'Fund release pending',
            status: 'pending',
            date: null,
            icon: DollarSign,
            actor: 'Not Started',
            details: 'Awaiting Center consent'
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'submitted': { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
            'state-review': { label: 'Under State Review', color: 'bg-yellow-100 text-yellow-800' },
            'iva-verification': { label: 'IVA Verification', color: 'bg-purple-100 text-purple-800' },
            'iva-verified': { label: 'IVA Verified', color: 'bg-green-100 text-green-800' },
            'center-review': { label: 'Center Review', color: 'bg-orange-100 text-orange-800' },
            'approved': { label: 'Approved', color: 'bg-green-100 text-green-800' },
            'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-800' }
        };
        const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
        return <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>{config.label}</span>;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/sarpanch/applications')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Applications
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{application.projectTitle}</h1>
                        <p className="text-gray-600 mt-1">Application ID: {application.id}</p>
                    </div>
                    {getStatusBadge(application.status)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Village Profile */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b flex items-center gap-2">
                            <MapPin size={20} className="text-blue-600" />
                            Village Profile
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Village:</span>
                                <p className="font-medium text-gray-900">{application.villageName}</p>
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
                                <span className="text-gray-600">District:</span>
                                <p className="font-medium text-gray-900">{application.district}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">State:</span>
                                <p className="font-medium text-gray-900">{application.state}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">PIN Code:</span>
                                <p className="font-medium text-gray-900">{application.pin}</p>
                            </div>
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
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b flex items-center gap-2">
                            <FileText size={20} className="text-blue-600" />
                            Project Details
                        </h3>
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
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b flex items-center gap-2">
                            <Users size={20} className="text-blue-600" />
                            Beneficiaries
                        </h3>
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

                    {/* Project Timeline */}
                    <ProjectTimeline
                        projectId={application.id}
                        stages={timelineStages}
                        showDetails={true}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Summary */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                        <h4 className="font-semibold text-gray-900 mb-4">Application Status</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={16} />
                                <span className="text-gray-900">Application Submitted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={16} />
                                <span className="text-gray-900">State Reviewed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={16} />
                                <span className="text-gray-900">IVA Verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="text-orange-600" size={16} />
                                <span className="text-gray-900">Center Consent Pending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="text-gray-400" size={16} />
                                <span className="text-gray-500">Fund Release Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Dates */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3">Important Dates</h4>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-blue-700">Submitted:</span>
                                <p className="text-blue-900">{new Date(application.submittedDate).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div>
                                <span className="text-blue-700">State Reviewed:</span>
                                <p className="text-blue-900">{new Date(application.stateReviewedDate).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div>
                                <span className="text-blue-700">IVA Verified:</span>
                                <p className="text-blue-900">{new Date(application.ivaVerifiedDate).toLocaleDateString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Remarks */}
                    {application.stateRemarks && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">State Remarks</h4>
                            <p className="text-sm text-green-800">{application.stateRemarks}</p>
                        </div>
                    )}

                    {application.ivaRemarks && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">IVA Remarks</h4>
                            <p className="text-sm text-green-800">{application.ivaRemarks}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                        <button
                            onClick={() => navigate(`/sarpanch/track-application/${application.id}`)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Track Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
