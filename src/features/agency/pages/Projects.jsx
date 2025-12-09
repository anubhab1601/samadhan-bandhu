import React, { useState } from 'react';
import { Search, Filter, Eye, Upload, CheckCircle, Clock, TrendingUp, Camera, FileText } from 'lucide-react';

export default function Projects() {
    const [projects, setProjects] = useState([
        {
            id: 'PROJ-2025-001',
            tenderId: 'TND-2025-004',
            title: 'School Building Renovation',
            village: 'Thane Village',
            district: 'Thane',
            contractValue: 3300000,
            startDate: '2025-12-01',
            expectedCompletion: '2026-03-01',
            progress: 25,
            status: 'On Track',
            milestones: [
                { name: 'Site Preparation', status: 'Completed', date: '2025-12-05', progress: 100 },
                { name: 'Structural Repairs', status: 'In Progress', date: '2026-01-15', progress: 60 },
                { name: 'Electrical Work', status: 'Pending', date: '2026-02-10', progress: 0 },
                { name: 'Final Finishing', status: 'Pending', date: '2026-02-28', progress: 0 }
            ],
            payments: {
                total: 3300000,
                received: 1650000,
                pending: 1650000
            },
            photos: 12
        }
    ]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [progressForm, setProgressForm] = useState({ overallProgress: 0, milestones: [] });
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const openProgressModal = (project) => {
        setSelectedProject(project);
        setProgressForm({
            overallProgress: project.progress,
            milestones: project.milestones.map(m => ({ ...m }))
        });
        setShowProgressModal(true);
    };

    const updateMilestoneField = (index, field, value) => {
        setProgressForm(prev => ({
            ...prev,
            milestones: prev.milestones.map((m, i) =>
                i === index ? { ...m, [field]: value } : m
            )
        }));
    };

    const handleProgressSubmit = (e) => {
        e.preventDefault();

        setProjects(prevProjects => prevProjects.map(project =>
            project.id === selectedProject.id
                ? {
                    ...project,
                    progress: Number(progressForm.overallProgress),
                    milestones: progressForm.milestones
                }
                : project
        ));

        alert('Progress update submitted to State / PM-AJAY portals (demo only).');
        setShowProgressModal(false);
    };

    const getStatusColor = (status) => {
        const colors = {
            'On Track': 'bg-green-100 text-green-700',
            'Delayed': 'bg-red-100 text-red-700',
            'Completed': 'bg-blue-100 text-blue-700'
        };
        return colors[status] || colors['On Track'];
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: projects.length,
        onTrack: projects.filter(p => p.status === 'On Track').length,
        delayed: projects.filter(p => p.status === 'Delayed').length,
        completed: projects.filter(p => p.status === 'Completed').length,
        totalValue: projects.reduce((sum, p) => sum + p.contractValue, 0),
        avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                <p className="text-sm text-gray-600 mt-1">Manage your ongoing and completed project execution</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">On Track</p>
                            <p className="text-3xl font-bold text-green-600">{stats.onTrack}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Value</p>
                            <p className="text-3xl font-bold text-purple-600">₹{(stats.totalValue / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <TrendingUp className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Avg Progress</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.avgProgress}%</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by project title or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="On Track">On Track</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Projects List */}
            {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No projects found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-600 font-medium">Project ID: {project.id}</p>
                                    <p className="text-sm text-gray-600">Tender ID: {project.tenderId}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowUploadModal(true);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                                    >
                                        <Camera size={18} />
                                        Upload Photos
                                    </button>
                                    <button
                                        onClick={() => openProgressModal(project)}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium flex items-center gap-2"
                                    >
                                        <TrendingUp size={18} />
                                        Update Progress
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowDetailsModal(true);
                                        }}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                    <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-green-600 h-3 rounded-full transition-all"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Project Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Contract Value</p>
                                    <p className="text-sm font-bold text-gray-900">₹{(project.contractValue / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Received</p>
                                    <p className="text-sm font-bold text-green-600">₹{(project.payments.received / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Pending</p>
                                    <p className="text-sm font-bold text-orange-600">₹{(project.payments.pending / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Expected Completion</p>
                                    <p className="text-sm font-bold text-gray-900">{new Date(project.expectedCompletion).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Photos Uploaded</p>
                                    <p className="text-sm font-bold text-blue-600">{project.photos} photos</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">Project ID: {selectedProject.id}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Location</p>
                                    <p className="font-semibold text-gray-900">{selectedProject.village}, {selectedProject.district}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Contract Value</p>
                                    <p className="font-semibold text-gray-900">₹{(selectedProject.contractValue / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Start Date</p>
                                    <p className="font-semibold text-gray-900">{new Date(selectedProject.startDate).toLocaleDateString('en-IN')}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Expected Completion</p>
                                    <p className="font-semibold text-gray-900">{new Date(selectedProject.expectedCompletion).toLocaleDateString('en-IN')}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Milestones</h3>
                                <div className="space-y-3">
                                    {selectedProject.milestones.map((milestone, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {milestone.status === 'Completed' ? (
                                                        <CheckCircle className="text-green-600" size={20} />
                                                    ) : milestone.status === 'In Progress' ? (
                                                        <Clock className="text-blue-600" size={20} />
                                                    ) : (
                                                        <Clock className="text-gray-400" size={20} />
                                                    )}
                                                    <span className="font-semibold text-gray-900">{milestone.name}</span>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.status === 'Completed' ? 'bg-green-100 text-green-700' : milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {milestone.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm text-gray-600">Target: {new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                                <div className="flex-1">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ width: `${milestone.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{milestone.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
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

            {/* Update Progress Modal */}
            {showProgressModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Update Project Progress</h2>
                                <p className="text-sm text-gray-600 mt-1">{selectedProject.title} (ID: {selectedProject.id})</p>
                            </div>
                            <button
                                onClick={() => setShowProgressModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleProgressSubmit} className="p-6 space-y-6">
                            {/* Overall Progress */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-medium text-gray-700">Overall Project Progress</span>
                                    <span className="text-lg font-bold text-blue-600">{progressForm.overallProgress}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progressForm.overallProgress}
                                    onChange={(e) => setProgressForm(prev => ({ ...prev, overallProgress: e.target.value }))}
                                    className="w-full accent-blue-600"
                                />
                                <p className="text-xs text-gray-500 mt-2">Adjust the overall completion percentage of the project (0-100%).</p>
                            </div>

                            {/* Milestones */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Milestone Status</h3>
                                <div className="space-y-3">
                                    {progressForm.milestones.map((milestone, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{milestone.name}</p>
                                                    <p className="text-xs text-gray-500">Target date: {new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                                </div>
                                                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => updateMilestoneField(index, 'status', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">Progress</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={milestone.progress}
                                                            onChange={(e) => updateMilestoneField(index, 'progress', Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                                                            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-xs"
                                                        />
                                                        <span className="text-xs text-gray-600">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${milestone.status === 'Completed' ? 'bg-green-600' : milestone.status === 'In Progress' ? 'bg-blue-600' : 'bg-gray-400'}`}
                                                    style={{ width: `${milestone.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 mt-4 flex justify-end gap-3 -mx-6 -mb-6 rounded-b-lg">
                                <button
                                    type="button"
                                    onClick={() => setShowProgressModal(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Save & Submit Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Photos Modal */}
            {showUploadModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="bg-green-600 text-white p-6 rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <Camera size={32} />
                                <div>
                                    <h2 className="text-2xl font-bold">Upload Project Photos</h2>
                                    <p className="text-green-100 mt-1">Upload progress photos for {selectedProject.title}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                                <div className="text-center">
                                    <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                                    <label className="cursor-pointer">
                                        <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                                        <span className="text-gray-600"> or drag and drop</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 5MB each</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Photos uploaded successfully!');
                                    setShowUploadModal(false);
                                }}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                            >
                                Upload Photos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
