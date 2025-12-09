import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, MapPin, Building, Users, Calendar, Send } from 'lucide-react';

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
                villageName: 'Adarsh Gaon',
                villageCode: 'VIL-001',
                district: 'Pune',
                block: 'Haveli',
                state: 'Maharashtra',
                status: 'Pending Review',
                submittedDate: '2025-11-25',
                demographics: {
                    totalPopulation: 1200,
                    totalHouseholds: 250,
                    scPopulation: 300,
                    stPopulation: 50,
                    obcPopulation: 400,
                    bplFamilies: 80
                },
                infrastructure: {
                    primarySchools: 1,
                    healthCenters: 1,
                    electricityCoverage: 95,
                    sanitationCoverage: 80
                },
                project: {
                    type: 'Infrastructure',
                    description: 'Construction of a new community hall for village meetings and events.',
                    budget: '₹50 Lakhs',
                    justification: 'The current hall is dilapidated and unsafe.'
                },
                photos: [1, 2, 3, 4] // Mock photos
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    const handleForward = () => {
        if (window.confirm('Are you sure you want to forward this application to the IVA for verification?')) {
            // API call to update status
            alert('Application forwarded to IVA successfully!');
            navigate('/state/applications');
        }
    };

    const handleReject = () => {
        const reason = window.prompt('Please enter the reason for rejection:');
        if (reason) {
            // API call to reject
            alert('Application rejected.');
            navigate('/state/applications');
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
                        onClick={() => navigate('/state/applications')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Application Details</h1>
                        <p className="text-sm text-gray-500">ID: {application.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === 'Pending Review' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {application.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
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
                                <label className="text-sm text-gray-500">Village Code</label>
                                <p className="font-medium">{application.villageCode}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">District</label>
                                <p className="font-medium">{application.district}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Block</label>
                                <p className="font-medium">{application.block}</p>
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
                                <label className="text-sm text-gray-500">Justification</label>
                                <p className="text-gray-700 mt-1">{application.project.justification}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Estimated Budget</label>
                                <p className="font-bold text-green-600">{application.project.budget}</p>
                            </div>
                        </div>
                    </div>

                    {/* Photos */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Uploaded Photos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                    Photo {i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Demographics Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Users size={20} className="text-blue-600" />
                            Demographics
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Population</span>
                                <span className="font-medium">{application.demographics.totalPopulation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Households</span>
                                <span className="font-medium">{application.demographics.totalHouseholds}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">SC Population</span>
                                <span className="font-medium">{application.demographics.scPopulation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">BPL Families</span>
                                <span className="font-medium">{application.demographics.bplFamilies}</span>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building size={20} className="text-blue-600" />
                            Infrastructure
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Electricity</span>
                                <span className="font-medium">{application.infrastructure.electricityCoverage}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sanitation</span>
                                <span className="font-medium">{application.infrastructure.sanitationCoverage}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={handleForward}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                            >
                                <Send size={18} />
                                Forward to IVA
                            </button>
                            <button
                                onClick={handleReject}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                            >
                                <XCircle size={18} />
                                Reject Application
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
