import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, FileText, User, IndianRupee, Clock, Upload, Eye, TrendingUp } from 'lucide-react';

export default function InspectionDetails() {
    const { inspectionId } = useParams();
    const navigate = useNavigate();

    // Mock data - in real app, fetch based on inspectionId
    const inspection = {
        id: 'INS-2025-001',
        projectTitle: 'School Building Renovation',
        projectId: 'PROJ-2025-001',
        sarpanchName: 'Ramesh Patil',
        agencyName: 'ABC Constructions',
        village: 'Shirdi',
        district: 'Ahmednagar',
        state: 'Maharashtra',
        scheduledDate: '2025-12-03',
        priority: 'High',
        status: 'Pending',
        inspectionType: 'Progress Inspection',
        progress: 25,
        contractValue: 3300000,
        startDate: '2025-10-01',
        expectedCompletion: '2026-03-31',
        description: 'Comprehensive renovation of government school building including structural repairs, new classrooms, and modern facilities.',
        scope: [
            'Structural assessment and repairs',
            'Construction of 4 new classrooms',
            'Renovation of existing facilities',
            'Installation of modern amenities',
            'Safety compliance upgrades'
        ],
        currentPhase: 'Foundation and Structural Work',
        completedMilestones: [
            { name: 'Site Preparation', date: '2025-10-15', status: 'Completed' },
            { name: 'Foundation Work', date: '2025-11-05', status: 'Completed' }
        ],
        upcomingMilestones: [
            { name: 'Structural Work', date: '2025-12-15', status: 'In Progress' },
            { name: 'Electrical Work', date: '2026-01-10', status: 'Pending' }
        ],
        documents: [
            { name: 'Project Proposal', type: 'PDF', size: '2.5 MB' },
            { name: 'Site Plan', type: 'PDF', size: '1.8 MB' },
            { name: 'Budget Breakdown', type: 'Excel', size: '850 KB' }
        ],
        previousInspections: [
            { id: 'INS-2024-045', date: '2025-11-01', type: 'Initial Inspection', status: 'Completed', officer: 'Suresh Patil' }
        ]
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'bg-red-100 text-red-700 border-red-300',
            'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'Low': 'bg-blue-100 text-blue-700 border-blue-300'
        };
        return colors[priority] || colors['Medium'];
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'Scheduled': 'bg-blue-100 text-blue-700',
            'In Progress': 'bg-orange-100 text-orange-700',
            'Completed': 'bg-green-100 text-green-700'
        };
        return colors[status] || colors['Pending'];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => navigate('/field-officer/inspections')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Inspections
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{inspection.projectTitle}</h1>
                        <p className="text-gray-600">Inspection ID: {inspection.id}</p>
                        <p className="text-gray-600">Project ID: {inspection.projectId}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getPriorityColor(inspection.priority)}`}>
                            {inspection.priority} Priority
                        </span>
                        <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(inspection.status)}`}>
                            {inspection.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-blue-600" size={24} />
                        <p className="text-sm text-gray-600">Location</p>
                    </div>
                    <p className="font-semibold text-gray-900">{inspection.village}</p>
                    <p className="text-sm text-gray-600">{inspection.district}, {inspection.state}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-purple-600" size={24} />
                        <p className="text-sm text-gray-600">Scheduled Date</p>
                    </div>
                    <p className="font-semibold text-gray-900">{new Date(inspection.scheduledDate).toLocaleDateString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Inspection Due</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <IndianRupee className="text-green-600" size={24} />
                        <p className="text-sm text-gray-600">Contract Value</p>
                    </div>
                    <p className="font-semibold text-green-600 text-xl">₹{(inspection.contractValue / 100000).toFixed(2)}L</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="text-orange-600" size={24} />
                        <p className="text-sm text-gray-600">Progress</p>
                    </div>
                    <p className="font-semibold text-gray-900 text-xl">{inspection.progress}%</p>
                    <p className="text-sm text-gray-600">{inspection.currentPhase}</p>
                </div>
            </div>

            {/* Project Description */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{inspection.description}</p>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Scope of Work:</h3>
                    <ul className="space-y-2">
                        {inspection.scope.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Stakeholders */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Stakeholders</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sarpanch</p>
                        <p className="font-semibold text-gray-900">{inspection.sarpanchName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Implementing Agency</p>
                        <p className="font-semibold text-gray-900">{inspection.agencyName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Inspection Type</p>
                        <p className="font-semibold text-gray-900">{inspection.inspectionType}</p>
                    </div>
                </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Completed Milestones</h3>
                        <div className="space-y-3">
                            {inspection.completedMilestones.map((milestone, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="p-1 bg-green-600 rounded-full mt-1">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{milestone.name}</p>
                                        <p className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Upcoming Milestones</h3>
                        <div className="space-y-3">
                            {inspection.upcomingMilestones.map((milestone, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="p-1 bg-blue-600 rounded-full mt-1">
                                        <Clock className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{milestone.name}</p>
                                        <p className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getStatusColor(milestone.status)}`}>
                                            {milestone.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {inspection.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <FileText className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-900">{doc.name}</p>
                                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                                <Eye size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Previous Inspections */}
            {inspection.previousInspections.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Previous Inspections</h2>
                    <div className="space-y-3">
                        {inspection.previousInspections.map((prev, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-900">{prev.type}</p>
                                        <p className="text-sm text-gray-600">ID: {prev.id}</p>
                                        <p className="text-sm text-gray-600">Officer: {prev.officer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{new Date(prev.date).toLocaleDateString('en-IN')}</p>
                                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getStatusColor(prev.status)}`}>
                                            {prev.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/field-officer/inspections')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Back to List
                    </button>
                    {inspection.status !== 'Completed' && (
                        <button
                            onClick={() => navigate(`/field-officer/inspections/${inspection.id}/form`)}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                            <Upload size={20} />
                            Submit Inspection Report
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
