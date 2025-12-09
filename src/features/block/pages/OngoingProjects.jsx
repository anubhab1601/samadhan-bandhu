import React, { useState } from 'react';
import { Calendar, IndianRupee, Users, TrendingUp, Eye, Image, CheckCircle, Clock, AlertCircle, MapPin, Building2, FileText } from 'lucide-react';

export default function OngoingProjects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const projects = [
        {
            id: 'PROJ-001',
            title: 'Community Hall Construction',
            village: 'Shirdi Village',
            component: 'Adarshgram',
            componentColor: 'bg-blue-100 text-blue-700',
            agency: 'ABC Construction Ltd.',
            budget: 5000000,
            released: 2500000,
            startDate: '2025-10-01',
            expectedCompletion: '2026-04-01',
            progress: 35,
            status: 'On Track',
            beneficiaries: 150,
            milestones: [
                { name: 'Foundation', status: 'Completed', date: '2025-10-15' },
                { name: 'Structure', status: 'In Progress', date: '2025-12-15' },
                { name: 'Roofing', status: 'Pending', date: '2026-01-30' },
                { name: 'Finishing', status: 'Pending', date: '2026-03-15' }
            ],
            inspections: [
                { date: '2025-10-20', officer: 'Field Officer - Ramesh Kumar', status: 'Approved', remarks: 'Foundation work excellent' },
                { date: '2025-11-25', officer: 'Field Officer - Priya Sharma', status: 'Approved', remarks: 'Structure progressing well' }
            ],
            nextInspection: '2025-12-20',
            photos: 8
        },
        {
            id: 'PROJ-002',
            title: 'School Building Renovation',
            village: 'Shirdi Village',
            component: 'Grant-in-Aid',
            componentColor: 'bg-green-100 text-green-700',
            agency: 'XYZ Builders Pvt. Ltd.',
            budget: 7500000,
            released: 3750000,
            startDate: '2025-09-15',
            expectedCompletion: '2026-03-15',
            progress: 50,
            status: 'On Track',
            beneficiaries: 95,
            milestones: [
                { name: 'Survey & Marking', status: 'Completed', date: '2025-09-20' },
                { name: 'Demolition', status: 'Completed', date: '2025-10-10' },
                { name: 'Construction', status: 'In Progress', date: '2025-12-01' },
                { name: 'Interior Work', status: 'Pending', date: '2026-02-15' }
            ],
            inspections: [
                { date: '2025-09-25', officer: 'Field Officer - Amit Patel', status: 'Approved', remarks: 'Survey completed accurately' },
                { date: '2025-10-15', officer: 'Field Officer - Ramesh Kumar', status: 'Approved', remarks: 'Demolition done safely' },
                { date: '2025-11-20', officer: 'Field Officer - Priya Sharma', status: 'Approved', remarks: 'Construction quality good' }
            ],
            nextInspection: '2025-12-15',
            photos: 12
        },
        {
            id: 'PROJ-003',
            title: 'Hostel Facility Construction',
            village: 'Khed Village',
            component: 'Hosteller',
            componentColor: 'bg-orange-100 text-orange-700',
            agency: 'Student Welfare Trust',
            budget: 6600000,
            released: 3960000,
            startDate: '2025-09-01',
            expectedCompletion: '2026-02-28',
            progress: 60,
            status: 'On Track',
            beneficiaries: 120,
            milestones: [
                { name: 'Site Development', status: 'Completed', date: '2025-09-20' },
                { name: 'Building Structure', status: 'Completed', date: '2025-11-15' },
                { name: 'Furnishing', status: 'In Progress', date: '2025-12-30' },
                { name: 'Final Setup', status: 'Pending', date: '2026-02-15' }
            ],
            inspections: [
                { date: '2025-09-25', officer: 'Field Officer - Amit Patel', status: 'Approved', remarks: 'Site prepared well' },
                { date: '2025-11-20', officer: 'Field Officer - Amit Patel', status: 'Approved', remarks: 'Building structure excellent' }
            ],
            nextInspection: '2026-01-05',
            photos: 15
        }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'On Track': 'bg-green-100 text-green-700',
            'Delayed': 'bg-red-100 text-red-700',
            'At Risk': 'bg-orange-100 text-orange-700'
        };
        return colors[status] || colors['On Track'];
    };

    const getMilestoneIcon = (status) => {
        if (status === 'Completed') return <CheckCircle className="text-green-600" size={20} />;
        if (status === 'In Progress') return <Clock className="text-blue-600" size={20} />;
        return <AlertCircle className="text-gray-400" size={20} />;
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Ongoing Projects</h1>
                <p className="text-sm text-gray-600 mt-1">Monitor progress and track milestones of active village projects</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                    <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                    <p className="text-3xl font-bold text-green-600">₹{(projects.reduce((sum, p) => sum + p.budget, 0) / 10000000).toFixed(1)}Cr</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Funds Released</p>
                    <p className="text-3xl font-bold text-purple-600">₹{(projects.reduce((sum, p) => sum + p.released, 0) / 10000000).toFixed(1)}Cr</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Avg Progress</p>
                    <p className="text-3xl font-bold text-orange-600">{Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%</p>
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.componentColor}`}>
                                        {project.component}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={16} className="text-purple-600" />
                                        <span className="font-medium text-gray-900">{project.village}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Building2 size={16} className="text-blue-600" />
                                        <span className="font-medium text-gray-900">{project.agency}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={16} className="text-green-600" />
                                        <span className="font-medium text-gray-900">{project.beneficiaries} Beneficiaries</span>
                                    </span>
                                </div>
                                <p className="text-sm text-blue-600 font-medium">Project ID: {project.id}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedProject(project);
                                    setShowDetailsModal(true);
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
                            >
                                <Eye size={18} />
                                View Details
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Project Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <IndianRupee size={16} className="text-green-600" />
                                    <p className="text-xs text-gray-600">Budget</p>
                                </div>
                                <p className="text-lg font-bold text-gray-900">₹{(project.budget / 100000).toFixed(2)}L</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp size={16} className="text-purple-600" />
                                    <p className="text-xs text-gray-600">Released</p>
                                </div>
                                <p className="text-lg font-bold text-purple-600">₹{(project.released / 100000).toFixed(2)}L</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar size={16} className="text-blue-600" />
                                    <p className="text-xs text-gray-600">Expected Completion</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{new Date(project.expectedCompletion).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Image size={16} className="text-orange-600" />
                                    <p className="text-xs text-gray-600">Photos</p>
                                </div>
                                <p className="text-lg font-bold text-orange-600">{project.photos}</p>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Milestones</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                {project.milestones.map((milestone, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            {getMilestoneIcon(milestone.status)}
                                            <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                                        </div>
                                        <p className="text-xs text-gray-600">{new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                        <p className="text-xs font-medium mt-1" style={{ color: milestone.status === 'Completed' ? '#16a34a' : milestone.status === 'In Progress' ? '#2563eb' : '#9ca3af' }}>
                                            {milestone.status}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="text-sm text-gray-600">Project ID: {selectedProject.id}</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedProject.componentColor}`}>
                                        {selectedProject.component}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Project Details */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Village</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <MapPin size={16} className="text-purple-600" />
                                            {selectedProject.village}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Agency</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <Building2 size={16} className="text-blue-600" />
                                            {selectedProject.agency}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Component</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <FileText size={16} className="text-green-600" />
                                            {selectedProject.component}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Beneficiaries</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <Users size={16} className="text-orange-600" />
                                            {selectedProject.beneficiaries} People
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Inspection History */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Inspection History</h3>
                                <div className="space-y-3">
                                    {selectedProject.inspections.map((inspection, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium text-gray-900">Inspection #{index + 1}</p>
                                                    <p className="text-sm text-gray-600">Officer: {inspection.officer}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">{new Date(inspection.date).toLocaleDateString('en-IN')}</p>
                                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mt-1">
                                                        {inspection.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {inspection.remarks && (
                                                <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                                                    <p className="text-sm text-blue-900">
                                                        <span className="font-medium">Remarks:</span> {inspection.remarks}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p className="text-sm font-medium text-blue-900">Next Inspection Scheduled</p>
                                        <p className="text-lg font-bold text-blue-600 mt-1">{new Date(selectedProject.nextInspection).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
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
