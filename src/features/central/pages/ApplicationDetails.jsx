import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, MapPin, Building, Users, Send, ShieldCheck } from 'lucide-react';

export default function ApplicationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setApplication({
                id: id,
                villageName: 'Village E',
                villageCode: 'VIL-005',
                district: 'Thane',
                block: 'Kalyan',
                state: 'Maharashtra',
                status: 'Pending Approval',
                submittedDate: '2025-11-15',
                demographics: {
                    totalPopulation: 2000,
                    totalHouseholds: 450,
                    scPopulation: 600,
                    stPopulation: 100,
                    obcPopulation: 500,
                    bplFamilies: 120
                },
                infrastructure: {
                    primarySchools: 2,
                    healthCenters: 1,
                    electricityCoverage: 98,
                    sanitationCoverage: 90
                },
                project: {
                    type: 'Social',
                    description: 'Construction of a community library and skill development center.',
                    budget: '₹40 Lakhs',
                    justification: 'To empower youth and provide educational resources.'
                },
                verificationReport: {
                    id: 'REP-2025-005',
                    status: 'Approved',
                    rating: 'Excellent',
                    remarks: 'Site is suitable. Proposal is viable and necessary.'
                },
                photos: [1, 2, 3, 4]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    const handleIssueConsent = () => {
        if (window.confirm('Are you sure you want to issue the Consent Note for this project? This will allow the Sarpanch to release the tender.')) {
            // API call to update status and generate consent note
            alert('Consent Note Issued Successfully!');
            navigate('/central/applications');
        }
    };

    const handleReject = () => {
        const reason = window.prompt('Please enter the reason for rejection:');
        if (reason) {
            // API call to reject
            alert('Application rejected.');
            navigate('/central/applications');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!application) {
        return <div className="text-center py-12">Application not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/central/applications')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Application Review</h1>
                        <p className="text-sm text-gray-500">ID: {application.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === 'Pending Approval' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {application.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Verification Report Summary */}
                    <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-6">
                        <h2 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-green-600" />
                            IVA Verification Report
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="text-green-700">Status</label>
                                <p className="font-bold text-green-900">{application.verificationReport.status}</p>
                            </div>
                            <div>
                                <label className="text-green-700">Rating</label>
                                <p className="font-bold text-green-900">{application.verificationReport.rating}</p>
                            </div>
                            <div className="col-span-2">
                                <label className="text-green-700">Remarks</label>
                                <p className="font-medium text-green-900">{application.verificationReport.remarks}</p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin size={20} className="text-blue-600" />
                            Village Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-500">Village Name</label>
                                <p className="font-medium">{application.villageName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">District</label>
                                <p className="font-medium">{application.district}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">State</label>
                                <p className="font-medium">{application.state}</p>
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-blue-600" />
                            Project Proposal
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Project Type</label>
                                <p className="font-medium">{application.project.type}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Description</label>
                                <p className="text-gray-700 mt-1">{application.project.description}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Estimated Budget</label>
                                <p className="font-bold text-green-600">{application.project.budget}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Final Approval</h2>
                        <div className="space-y-3">
                            <button
                                onClick={handleIssueConsent}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors shadow-sm"
                            >
                                <CheckCircle size={18} />
                                Issue Consent Note
                            </button>
                            <button
                                onClick={handleReject}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                            >
                                <XCircle size={18} />
                                Reject Application
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            Issuing Consent Note will notify the State and Sarpanch to proceed with Tendering.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
