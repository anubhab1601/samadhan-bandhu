import React, { useState } from 'react';
import { Search, Filter, Eye, MapPin, IndianRupee, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

export default function Projects() {
    const [projects, setProjects] = useState([
        {
            id: 'PROJ-2025-001',
            applicationId: 'PMAJAY-2025-MH-12345',
            title: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            agency: 'ABC Construction Ltd.',
            budget: 5000000,
            released: 2500000,
            utilized: 1800000,
            startDate: '2025-10-01',
            expectedCompletion: '2026-04-01',
            progress: 35,
            status: 'On Track',
            lastInspection: '2025-11-25',
            nextInspection: '2025-12-20',
            milestones: [
                { name: 'Foundation', status: 'Completed', date: '2025-10-15' },
                { name: 'Structure', status: 'In Progress', date: '2025-12-15' },
                { name: 'Roofing', status: 'Pending', date: '2026-01-30' },
                { name: 'Finishing', status: 'Pending', date: '2026-03-15' }
            ]
        },
        {
            id: 'PROJ-2025-002',
            applicationId: 'PMAJAY-2025-MH-12346',
            title: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            agency: 'XYZ Builders Pvt. Ltd.',
            budget: 7500000,
            released: 5625000,
            utilized: 4200000,
            startDate: '2025-09-15',
            expectedCompletion: '2026-03-15',
            progress: 56,
            status: 'On Track',
            lastInspection: '2025-11-20',
            nextInspection: '2025-12-15',
            milestones: [
                { name: 'Survey', status: 'Completed', date: '2025-09-20' },
                { name: 'Excavation', status: 'Completed', date: '2025-10-10' },
                { name: 'Base Layer', status: 'In Progress', date: '2025-12-01' },
                { name: 'Paving', status: 'Pending', date: '2026-02-15' }
            ]
        },
        {
            id: 'PROJ-2025-003',
            applicationId: 'PMAJAY-2025-MH-12347',
            title: 'Water Supply System',
            village: 'Pune Village',
            district: 'Pune',
            agency: 'DEF Infrastructure',
            budget: 12000000,
            released: 6000000,
            utilized: 3500000,
            startDate: '2025-08-01',
            expectedCompletion: '2026-05-01',
            progress: 29,
            status: 'Delayed',
            lastInspection: '2025-11-15',
            nextInspection: '2025-12-10',
            milestones: [
                { name: 'Pipeline Installation', status: 'In Progress', date: '2025-12-30' },
                { name: 'Tank Construction', status: 'Pending', date: '2026-02-28' },
                { name: 'Connection Work', status: 'Pending', date: '2026-04-15' },
                { name: 'Testing', status: 'Pending', date: '2026-04-30' }
            ]
        }
    ]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const districts = ['Ahmednagar', 'Nashik', 'Pune', 'Thane', 'Mumbai'];

    const getStatusColor = (status) => {
        const colors = {
            'On Track': 'bg-green-100 text-green-700',
            'Delayed': 'bg-red-100 text-red-700',
            'At Risk': 'bg-orange-100 text-orange-700',
            'On Hold': 'bg-gray-100 text-gray-700',
            'Completed': 'bg-blue-100 text-blue-700',
        };
        return colors[status] || colors['On Track'];
    };

    const getStatusIcon = (status) => {
        if (status === 'On Track') return <CheckCircle className="text-green-600" size={20} />;
        if (status === 'Delayed') return <AlertCircle className="text-red-600" size={20} />;
        if (status === 'On Hold') return <AlertCircle className="text-gray-600" size={20} />;
        if (status === 'Completed') return <CheckCircle className="text-blue-600" size={20} />;
        return <Clock className="text-orange-600" size={20} />;
    };

    const updateProjectStatus = (projectId, newStatus) => {
        setProjects(prev => prev.map(project =>
            project.id === projectId
                ? {
                    ...project,
                    status: newStatus,
                    progress: newStatus === 'Completed' ? 100 : project.progress,
                }
                : project
        ));

        if (newStatus === 'Completed') {
            alert('Project marked as Completed. Final status will be reflected across Sarpanch, Agency and PM-AJAY portals (demo only).');
        } else if (newStatus === 'On Hold') {
            alert('Project has been put On Hold by the State Officer. Execution should be paused until further orders (demo only).');
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDistrict = filterDistrict === 'all' || project.district === filterDistrict;
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesDistrict && matchesStatus;
    });

    const stats = {
        total: projects.length,
        onTrack: projects.filter(p => p.status === 'On Track').length,
        delayed: projects.filter(p => p.status === 'Delayed').length,
        totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
        totalReleased: projects.reduce((sum, p) => sum + p.released, 0),
        totalUtilized: projects.reduce((sum, p) => sum + p.utilized, 0),
        avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">State Project Monitoring</h1>
                <p className="text-sm text-gray-600 mt-1">Track progress and monitor all ongoing village development projects across the state</p>
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
                            <TrendingUp className="text-blue-600" size={24} />
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
                            <p className="text-sm text-gray-600 mb-1">Delayed</p>
                            <p className="text-3xl font-bold text-red-600">{stats.delayed}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="text-red-600" size={24} />
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

            {/* Budget Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Total Budget Allocated</p>
                        <p className="text-2xl font-bold text-gray-900">₹{(stats.totalBudget / 10000000).toFixed(2)} Cr</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Funds Released</p>
                        <p className="text-2xl font-bold text-purple-600">₹{(stats.totalReleased / 10000000).toFixed(2)} Cr</p>
                        <p className="text-xs text-gray-500 mt-1">{((stats.totalReleased / stats.totalBudget) * 100).toFixed(1)}% of total</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Funds Utilized</p>
                        <p className="text-2xl font-bold text-green-600">₹{(stats.totalUtilized / 10000000).toFixed(2)} Cr</p>
                        <p className="text-xs text-gray-500 mt-1">{((stats.totalUtilized / stats.totalReleased) * 100).toFixed(1)}% of released</p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by project title, village, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filterDistrict}
                        onChange={(e) => setFilterDistrict(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Districts</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="On Track">On Track</option>
                        <option value="Delayed">Delayed</option>
                        <option value="At Risk">At Risk</option>
                    </select>
                </div>
            </div>

            {/* Projects List */}
            {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
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
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} flex items-center gap-1`}>
                                            {getStatusIcon(project.status)}
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-600 font-medium">Project ID: {project.id}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-orange-600" />
                                            <span>{project.village}, {project.district}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={16} className="text-blue-600" />
                                            <span>{project.agency}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowDetailsModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                    <div className="flex gap-2">
                                        {project.status !== 'Completed' && (
                                            <button
                                                type="button"
                                                onClick={() => updateProjectStatus(project.id, 'Completed')}
                                                className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                                            >
                                                Mark Completed
                                            </button>
                                        )}
                                        {project.status !== 'On Hold' && project.status !== 'Completed' && (
                                            <button
                                                type="button"
                                                onClick={() => updateProjectStatus(project.id, 'On Hold')}
                                                className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-800 font-medium"
                                            >
                                                Halt Project
                                            </button>
                                        )}
                                    </div>
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
                                        className={`h-3 rounded-full transition-all ${project.status === 'On Track' ? 'bg-green-600' : project.status === 'Delayed' ? 'bg-red-600' : 'bg-orange-600'}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Project Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Budget</p>
                                    <p className="text-sm font-bold text-gray-900">₹{(project.budget / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Released</p>
                                    <p className="text-sm font-bold text-purple-600">₹{(project.released / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Utilized</p>
                                    <p className="text-sm font-bold text-green-600">₹{(project.utilized / 100000).toFixed(2)}L</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Last Inspection</p>
                                    <p className="text-sm font-bold text-gray-900">{new Date(project.lastInspection).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Expected Completion</p>
                                    <p className="text-sm font-bold text-gray-900">{new Date(project.expectedCompletion).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
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
                            {/* Project Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Village & District</p>
                                    <p className="font-semibold text-gray-900">{selectedProject.village}, {selectedProject.district}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Executing Agency</p>
                                    <p className="font-semibold text-gray-900">{selectedProject.agency}</p>
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

                            {/* Budget Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Budget Details</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-600 mb-1">Total Budget</p>
                                        <p className="text-2xl font-bold text-blue-900">₹{(selectedProject.budget / 100000).toFixed(2)}L</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-sm text-purple-600 mb-1">Funds Released</p>
                                        <p className="text-2xl font-bold text-purple-900">₹{(selectedProject.released / 100000).toFixed(2)}L</p>
                                        <p className="text-xs text-purple-700 mt-1">{((selectedProject.released / selectedProject.budget) * 100).toFixed(0)}% of budget</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-600 mb-1">Funds Utilized</p>
                                        <p className="text-2xl font-bold text-green-900">₹{(selectedProject.utilized / 100000).toFixed(2)}L</p>
                                        <p className="text-xs text-green-700 mt-1">{((selectedProject.utilized / selectedProject.released) * 100).toFixed(0)}% of released</p>
                                    </div>
                                </div>
                            </div>

                            {/* Milestones */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Milestones</h3>
                                <div className="space-y-3">
                                    {selectedProject.milestones.map((milestone, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-shrink-0">
                                                {milestone.status === 'Completed' ? (
                                                    <CheckCircle className="text-green-600" size={24} />
                                                ) : milestone.status === 'In Progress' ? (
                                                    <Clock className="text-blue-600" size={24} />
                                                ) : (
                                                    <AlertCircle className="text-gray-400" size={24} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{milestone.name}</p>
                                                <p className="text-sm text-gray-600">Target: {new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.status === 'Completed' ? 'bg-green-100 text-green-700' : milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {milestone.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inspection Schedule */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <p className="text-sm font-medium text-blue-900 mb-2">Next Inspection Scheduled</p>
                                <p className="text-lg font-bold text-blue-600">{new Date(selectedProject.nextInspection).toLocaleDateString('en-IN')}</p>
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
