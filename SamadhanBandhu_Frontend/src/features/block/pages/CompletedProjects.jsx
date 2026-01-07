import React, { useState } from 'react';
import { Calendar, IndianRupee, Users, CheckCircle, Image, Download, Eye, Star, MapPin, Building2, FileText } from 'lucide-react';

export default function CompletedProjects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const projects = [
        {
            id: 'PROJ-COMP-001',
            title: 'Primary School Building',
            village: 'Shirdi Village',
            component: 'Grant-in-Aid',
            componentColor: 'bg-green-100 text-green-700',
            agency: 'DEF Constructions',
            budget: 3000000,
            actualCost: 2950000,
            startDate: '2024-06-01',
            completionDate: '2025-10-15',
            duration: '4.5 months',
            beneficiaries: 250,
            rating: 4.8,
            beforePhotos: 3,
            afterPhotos: 5,
            finalInspection: {
                date: '2025-10-20',
                officer: 'Field Officer 1',
                rating: 'Excellent',
                remarks: 'Project completed as per specifications with high quality standards'
            },
            impact: [
                { metric: 'Students Benefited', value: '250+' },
                { metric: 'Classrooms', value: '6' },
                { metric: 'Quality Rating', value: '4.8/5' }
            ]
        },
        {
            id: 'PROJ-COMP-002',
            title: 'Village Water Supply System',
            village: 'Khed Village',
            component: 'Adarshgram',
            componentColor: 'bg-blue-100 text-blue-700',
            agency: 'GHI Infrastructure',
            budget: 12000000,
            actualCost: 11800000,
            startDate: '2024-03-01',
            completionDate: '2025-09-30',
            duration: '7 months',
            beneficiaries: 1200,
            rating: 4.9,
            beforePhotos: 4,
            afterPhotos: 6,
            finalInspection: {
                date: '2025-10-05',
                officer: 'Field Officer 2',
                rating: 'Outstanding',
                remarks: 'Excellent execution with sustainable water supply solution'
            },
            impact: [
                { metric: 'Households Connected', value: '300+' },
                { metric: 'Daily Water Supply', value: '50,000L' },
                { metric: 'Quality Rating', value: '4.9/5' }
            ]
        },
        {
            id: 'PROJ-COMP-003',
            title: 'Panchayat Office Renovation',
            village: 'Rajgurunagar',
            component: 'Adarshgram',
            componentColor: 'bg-blue-100 text-blue-700',
            agency: 'JKL Builders',
            budget: 1500000,
            actualCost: 1480000,
            startDate: '2024-08-01',
            completionDate: '2025-11-10',
            duration: '3 months',
            beneficiaries: 500,
            rating: 4.6,
            beforePhotos: 2,
            afterPhotos: 4,
            finalInspection: {
                date: '2025-11-12',
                officer: 'Field Officer 3',
                rating: 'Very Good',
                remarks: 'Modern facilities with improved accessibility'
            },
            impact: [
                { metric: 'Office Space', value: '2000 sq.ft' },
                { metric: 'Meeting Capacity', value: '50 people' },
                { metric: 'Quality Rating', value: '4.6/5' }
            ]
        }
    ];

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 4.0) return 'text-blue-600';
        return 'text-orange-600';
    };

    const stats = {
        total: projects.length,
        totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
        totalBeneficiaries: projects.reduce((sum, p) => sum + p.beneficiaries, 0),
        avgRating: (projects.reduce((sum, p) => sum + p.rating, 0) / projects.length).toFixed(1)
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Completed Projects</h1>
                <p className="text-sm text-gray-600 mt-1">View history and impact of successfully completed village development projects</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Completed</p>
                            <p className="text-3xl font-bold text-green-600">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                            <p className="text-3xl font-bold text-blue-600">₹{(stats.totalBudget / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <IndianRupee className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Beneficiaries</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalBeneficiaries.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Users className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
                                <Star className="text-yellow-500" size={24} fill="currentColor" />
                            </div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <Star className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="text-green-600" size={24} />
                                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        Completed
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
                                        <span className="font-medium text-gray-900">{project.beneficiaries}+ Beneficiaries</span>
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

                        {/* Project Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Budget</p>
                                <p className="text-lg font-bold text-gray-900">₹{(project.budget / 100000).toFixed(2)}L</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Actual Cost</p>
                                <p className="text-lg font-bold text-green-600">₹{(project.actualCost / 100000).toFixed(2)}L</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Duration</p>
                                <p className="text-sm font-bold text-gray-900">{project.duration}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Beneficiaries</p>
                                <p className="text-lg font-bold text-purple-600">{project.beneficiaries}+</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <p className={`text-lg font-bold ${getRatingColor(project.rating)}`}>{project.rating}</p>
                                    <Star className="text-yellow-500" size={16} fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        {/* Impact Metrics */}
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-blue-900 mb-3">Project Impact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {project.impact.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-sm text-blue-800">{item.metric}:</span>
                                        <span className="text-lg font-bold text-blue-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Completion Info */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-green-600" />
                                    <span>Completed: <span className="font-medium text-gray-900">{new Date(project.completionDate).toLocaleDateString('en-IN')}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image size={16} className="text-orange-600" />
                                    <span>Photos: <span className="font-medium text-gray-900">{project.beforePhotos + project.afterPhotos}</span></span>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
                                <Download size={16} />
                                Download Report
                            </button>
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
                            {/* Project Information */}
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
                                            {selectedProject.beneficiaries}+ People
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Final Inspection */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Final Inspection Report</h3>
                                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm text-green-800">Inspection Date</p>
                                            <p className="font-bold text-green-900">{new Date(selectedProject.finalInspection.date).toLocaleDateString('en-IN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-green-800">Inspecting Officer</p>
                                            <p className="font-bold text-green-900">{selectedProject.finalInspection.officer}</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-sm text-green-800">Rating</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-2xl font-bold text-green-900">{selectedProject.finalInspection.rating}</p>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        className={i < Math.floor(selectedProject.rating) ? 'text-yellow-500' : 'text-gray-300'}
                                                        fill="currentColor"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-800 mb-1">Remarks</p>
                                        <p className="text-green-900">{selectedProject.finalInspection.remarks}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Before/After Photos */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Photo Gallery</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Before ({selectedProject.beforePhotos} photos)</p>
                                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                                            <Image className="mx-auto text-gray-400 mb-2" size={48} />
                                            <p className="text-sm text-gray-500">Before photos</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">After ({selectedProject.afterPhotos} photos)</p>
                                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                                            <Image className="mx-auto text-gray-400 mb-2" size={48} />
                                            <p className="text-sm text-gray-500">After photos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cost Savings */}
                            {selectedProject.budget > selectedProject.actualCost && (
                                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                                    <p className="text-sm font-medium text-purple-900 mb-1">Cost Savings</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        ₹{((selectedProject.budget - selectedProject.actualCost) / 100000).toFixed(2)} Lakhs
                                    </p>
                                    <p className="text-sm text-purple-800 mt-1">
                                        ({(((selectedProject.budget - selectedProject.actualCost) / selectedProject.budget) * 100).toFixed(1)}% under budget)
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Close
                            </button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                                <Download size={18} />
                                Download Full Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
