import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Star, TrendingUp, User, FileText, Camera, CheckCircle } from 'lucide-react';

export default function HistoryDetail() {
    const { inspectionId } = useParams();
    const navigate = useNavigate();

    // Mock data - in real app, fetch based on inspectionId
    const inspection = {
        id: inspectionId || 'INS-2024-045',
        projectId: 'PROJ-2024-010',
        projectTitle: 'Road Development Project',
        village: 'Daund',
        district: 'Pune',
        state: 'Maharashtra',
        completedDate: '2025-11-01',
        inspectionNumber: '2nd Inspection',
        qualityRating: 4,
        completionPercentage: 75,
        remarks: 'Good progress observed. The quality of work is satisfactory and meets the required standards. Materials used are of good quality.',
        improvementSuggestions: 'Recommend increasing workforce to meet deadline. Better waste management needed at the site.',
        publicFeedback: 'Local residents are satisfied with the progress. They appreciate the quality of work being done.',
        agency: 'Road Masters',
        agencyHead: 'Rajesh Kumar',
        sarpanch: 'Vijay Patil',
        fieldOfficer: 'Suresh Deshmukh',
        inspectionType: 'Progress Inspection',
        constructionPhotos: [
            { id: 1, caption: 'Main construction site', gps: '18.5204° N, 73.8567° E' },
            { id: 2, caption: 'Foundation work', gps: '18.5204° N, 73.8567° E' },
            { id: 3, caption: 'Material storage', gps: '18.5204° N, 73.8567° E' }
        ],
        wasteMaterialPhotos: [
            { id: 1, caption: 'Waste disposal area', gps: '18.5204° N, 73.8567° E' }
        ],
        officerAgencyPhotos: [
            { id: 1, caption: 'Officer with agency head', gps: '18.5204° N, 73.8567° E' }
        ],
        receiptPhotos: [
            { id: 1, caption: 'Material receipt 1', gps: '18.5204° N, 73.8567° E' },
            { id: 2, caption: 'Material receipt 2', gps: '18.5204° N, 73.8567° E' }
        ]
    };

    const getRatingStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={24}
                className={index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
            />
        ));
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'bg-green-100 text-green-700 border-green-300';
        if (rating >= 3) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        return 'bg-red-100 text-red-700 border-red-300';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/field-officer/history')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to History
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{inspection.projectTitle}</h1>
                        <p className="text-gray-600">Inspection ID: {inspection.id}</p>
                        <p className="text-gray-600">Project ID: {inspection.projectId}</p>
                        <p className="text-gray-600">{inspection.inspectionNumber}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-2">
                            {getRatingStars(inspection.qualityRating)}
                        </div>
                        <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getRatingColor(inspection.qualityRating)}`}>
                            Rating: {inspection.qualityRating}/5
                        </span>
                    </div>
                </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-indigo-600" size={24} />
                        <p className="text-sm text-gray-600">Location</p>
                    </div>
                    <p className="font-semibold text-gray-900">{inspection.village}</p>
                    <p className="text-sm text-gray-600">{inspection.district}, {inspection.state}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-purple-600" size={24} />
                        <p className="text-sm text-gray-600">Completed Date</p>
                    </div>
                    <p className="font-semibold text-gray-900">{new Date(inspection.completedDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="text-green-600" size={24} />
                        <p className="text-sm text-gray-600">Completion</p>
                    </div>
                    <p className="font-semibold text-green-600 text-xl">{inspection.completionPercentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="text-orange-600" size={24} />
                        <p className="text-sm text-gray-600">Type</p>
                    </div>
                    <p className="font-semibold text-gray-900">{inspection.inspectionType}</p>
                </div>
            </div>

            {/* Stakeholders */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Stakeholders</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Field Officer</p>
                        <p className="font-semibold text-gray-900">{inspection.fieldOfficer}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sarpanch</p>
                        <p className="font-semibold text-gray-900">{inspection.sarpanch}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Agency</p>
                        <p className="font-semibold text-gray-900">{inspection.agency}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Agency Head</p>
                        <p className="font-semibold text-gray-900">{inspection.agencyHead}</p>
                    </div>
                </div>
            </div>

            {/* Assessment Details */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assessment Details</h2>

                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-gray-900 mb-2">Quality Rating</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {getRatingStars(inspection.qualityRating)}
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{inspection.qualityRating}/5</span>
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-gray-900 mb-2">Completion Percentage</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-green-600 h-4 rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${inspection.completionPercentage}%` }}
                                    >
                                        <span className="text-xs text-white font-semibold">{inspection.completionPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Remarks</h3>
                        <p className="text-gray-700">{inspection.remarks}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Improvement Suggestions</h3>
                        <p className="text-gray-700">{inspection.improvementSuggestions}</p>
                    </div>

                    {inspection.publicFeedback && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h3 className="font-semibold text-gray-900 mb-2">Local Public Feedback</h3>
                            <p className="text-gray-700">{inspection.publicFeedback}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Photo Documentation */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Photo Documentation</h2>

                {/* Construction Site Photos */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Camera className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Construction Site Photos</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {inspection.constructionPhotos.map((photo) => (
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

                {/* Waste Material Photos */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Camera className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Waste Material Area Photos</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {inspection.wasteMaterialPhotos.map((photo) => (
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

                {/* Officer + Agency Photos */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Camera className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Officer + Agency Head Photos</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {inspection.officerAgencyPhotos.map((photo) => (
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

                {/* Receipt Photos */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Camera className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Material Receipt Photos</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {inspection.receiptPhotos.map((photo) => (
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
            </div>

            {/* Action Button */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/field-officer/history')}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                    Back to History
                </button>
            </div>
        </div>
    );
}
