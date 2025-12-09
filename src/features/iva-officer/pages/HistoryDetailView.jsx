import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, Camera, CheckCircle, X } from 'lucide-react';

export default function HistoryDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock completed verification data
    const verification = {
        id: id || 'APP-2024-045',
        village: 'Daund',
        project: 'Road Development Project',
        type: 'Village Eligibility',
        sarpanch: 'Priya Sharma',
        district: 'Pune',
        state: 'Maharashtra',
        completedDate: '2025-11-01',
        visitDate: '2025-10-28',
        decision: 'Eligible',
        remarks: 'All demographic data verified. Infrastructure details confirmed. Proposed work is genuinely needed. The village meets all eligibility criteria for the PM-AJAY scheme.',

        // Application details
        population: 12000,
        scPopulation: 2500,
        stPopulation: 1200,
        existingInfrastructure: 'Primary School, Health Center, Community Hall',
        proposedWork: 'Construction of paved road connecting village to main highway (2.5 km)',

        // Visit photos
        visitPhotos: [
            { id: 1, caption: 'Village entrance', gps: '18.7645° N, 74.5914° E' },
            { id: 2, caption: 'Proposed road area', gps: '18.7645° N, 74.5914° E' },
            { id: 3, caption: 'Community meeting', gps: '18.7645° N, 74.5914° E' },
            { id: 4, caption: 'Existing infrastructure', gps: '18.7645° N, 74.5914° E' }
        ]
    };

    const getDecisionColor = (decision) => {
        const colors = {
            'Eligible': 'bg-green-100 text-green-700 border-green-300',
            'Verified': 'bg-green-100 text-green-700 border-green-300',
            'Not Eligible': 'bg-red-100 text-red-700 border-red-300',
            'Not Verified': 'bg-red-100 text-red-700 border-red-300'
        };
        return colors[decision] || colors['Eligible'];
    };

    const getTypeColor = (type) => {
        const colors = {
            'Village Eligibility': 'bg-purple-100 text-purple-700',
            'Committee Verification': 'bg-indigo-100 text-indigo-700',
            'Agency Verification': 'bg-teal-100 text-teal-700'
        };
        return colors[type] || colors['Village Eligibility'];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/iva-officer/history')}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to History
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Report</h1>
                        <p className="text-gray-600">ID: {verification.id}</p>
                        <p className="text-gray-600">Village: {verification.village}, {verification.district}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <span className={`px-4 py-2 rounded ${getTypeColor(verification.type)}`}>
                            {verification.type}
                        </span>
                        <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getDecisionColor(verification.decision)}`}>
                            {verification.decision === 'Eligible' || verification.decision === 'Verified' ? (
                                <span className="flex items-center gap-1">
                                    <CheckCircle size={16} />
                                    {verification.decision}
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <X size={16} />
                                    {verification.decision}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Project & Location Details */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Project Title</p>
                        <p className="font-semibold text-gray-900">{verification.project}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sarpanch</p>
                        <p className="font-semibold text-gray-900">{verification.sarpanch}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="font-semibold text-gray-900">{verification.village}, {verification.district}, {verification.state}</p>
                    </div>
                </div>

                {verification.type === 'Village Eligibility' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-gray-600 mb-1">Total Population</p>
                                <p className="text-2xl font-bold text-blue-600">{verification.population.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-gray-600 mb-1">SC Population</p>
                                <p className="text-2xl font-bold text-green-600">{verification.scPopulation.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <p className="text-sm text-gray-600 mb-1">ST Population</p>
                                <p className="text-2xl font-bold text-purple-600">{verification.stPopulation.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Existing Infrastructure</h3>
                                <p className="text-gray-700">{verification.existingInfrastructure}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Proposed Work</h3>
                                <p className="text-gray-700">{verification.proposedWork}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Verification Details */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Calendar size={16} />
                            Visit Date
                        </p>
                        <p className="text-lg font-bold text-blue-600">{new Date(verification.visitDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Calendar size={16} />
                            Completed Date
                        </p>
                        <p className="text-lg font-bold text-green-600">{new Date(verification.completedDate).toLocaleDateString('en-IN')}</p>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Verification Remarks</h3>
                    <p className="text-gray-700">{verification.remarks}</p>
                </div>
            </div>

            {/* Visit Photos */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Visit Photos</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {verification.visitPhotos.map((photo) => (
                        <div key={photo.id} className="relative group">
                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                <Camera className="text-gray-400" size={48} />
                            </div>
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded flex items-center gap-1">
                                <MapPin size={10} />
                                GPS: {photo.gps}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{photo.caption}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/iva-officer/history')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Back to History
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Print Report
                    </button>
                </div>
            </div>
        </div>
    );
}
