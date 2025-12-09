import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, Search, Filter, Eye, TrendingUp, Calendar, IndianRupee, Users, MapPin, ArrowLeft } from 'lucide-react';

export default function Projects() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 'PROJ-2025-001',
            title: 'School Building Renovation',
            location: 'Daund, Pune',
            status: 'in-progress',
            progress: 45,
            budget: 5000000,
            spent: 2250000,
            startDate: '2025-10-01',
            expectedCompletion: '2026-03-31',
            currentPhase: 'Structural Work',
            workers: 15,
            nextMilestone: 'Complete RCC work',
            milestoneDate: '2025-12-20'
        },
        {
            id: 'PROJ-2024-012',
            title: 'Village Community Center',
            location: 'Khed, Pune',
            status: 'completed',
            progress: 100,
            budget: 3500000,
            spent: 3400000,
            startDate: '2024-06-01',
            expectedCompletion: '2024-11-30',
            completedDate: '2024-11-15',
            currentPhase: 'Completed',
            workers: 0,
            rating: 4.5
        },
        {
            id: 'PROJ-2024-011',
            title: 'Rural Road Construction',
            location: 'Shirur, Pune',
            status: 'completed',
            progress: 100,
            budget: 7500000,
            spent: 7200000,
            startDate: '2024-03-01',
            expectedCompletion: '2024-10-31',
            completedDate: '2024-10-20',
            currentPhase: 'Completed',
            workers: 0,
            rating: 5
        }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: TrendingUp },
            'completed': { label: 'Completed', color: 'bg-green-100 text-green-700', icon: TrendingUp },
            'on-hold': { label: 'On Hold', color: 'bg-yellow-100 text-yellow-700', icon: TrendingUp }
        };
        const config = statusConfig[status] || statusConfig['in-progress'];
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
                <Icon size={14} />
                {config.label}
            </span>
        );
    };

    const handleViewDetails = (project) => {
        setSelectedProject(project);
    };

    const handleCloseDetails = () => {
        setSelectedProject(null);
    };

    const stats = {
        total: projects.length,
        inProgress: projects.filter(p => p.status === 'in-progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
        totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
        totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
    };

    // If viewing project details
    if (selectedProject) {
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <button
                        onClick={handleCloseDetails}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Projects
                    </button>
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h1>
                            <p className="text-gray-600">Project ID: {selectedProject.id}</p>
                            <p className="text-gray-600 flex items-center gap-1 mt-1">
                                <MapPin size={16} />
                                {selectedProject.location}
                            </p>
                        </div>
                        {getStatusBadge(selectedProject.status)}
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Overall Progress</span>
                            <span className="font-semibold text-gray-900">{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all"
                                style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Current Phase</p>
                            <p className="font-semibold text-gray-900">{selectedProject.currentPhase}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Workers</p>
                            <p className="font-semibold text-gray-900">{selectedProject.workers} active</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Start Date</p>
                            <p className="font-semibold text-gray-900">{new Date(selectedProject.startDate).toLocaleDateString('en-IN')}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Expected Completion</p>
                            <p className="font-semibold text-gray-900">{new Date(selectedProject.expectedCompletion).toLocaleDateString('en-IN')}</p>
                        </div>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-600">Total Budget</p>
                            <p className="text-2xl font-bold text-blue-900">₹{(selectedProject.budget / 100000).toFixed(2)}L</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-600">Amount Spent</p>
                            <p className="text-2xl font-bold text-green-900">₹{(selectedProject.spent / 100000).toFixed(2)}L</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-sm text-purple-600">Remaining</p>
                            <p className="text-2xl font-bold text-purple-900">₹{((selectedProject.budget - selectedProject.spent) / 100000).toFixed(2)}L</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Budget Utilization</span>
                            <span className="font-semibold text-gray-900">{((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                                style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Next Milestone */}
                {selectedProject.status === 'in-progress' && (
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Next Milestone</h2>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div>
                                <p className="font-semibold text-gray-900">{selectedProject.nextMilestone}</p>
                                <p className="text-sm text-gray-600 mt-1">Target Date: {new Date(selectedProject.milestoneDate).toLocaleDateString('en-IN')}</p>
                            </div>
                            <Calendar className="text-orange-600" size={32} />
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/agency/projects/${selectedProject.id}/progress-report`)}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Submit Progress Report
                        </button>
                        <button
                            onClick={() => navigate('/agency/schedule')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            View Schedule
                        </button>
                        <button
                            onClick={() => navigate('/agency/workers')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Manage Workers
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Projects List View
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Briefcase size={32} />
                    My Projects
                </h1>
                <p className="text-orange-100">Manage and track all your ongoing and completed projects</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-purple-600">₹{(stats.totalBudget / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-orange-600">₹{(stats.totalSpent / 100000).toFixed(1)}L</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Status</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on-hold">On Hold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <MapPin size={14} />
                                        {project.location}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">ID: {project.id}</p>
                                </div>
                                {getStatusBadge(project.status)}
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-semibold text-gray-900">{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${project.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <IndianRupee size={14} className="text-gray-400" />
                                        <span className="text-gray-600">Budget:</span>
                                        <span className="font-semibold text-gray-900">₹{(project.budget / 100000).toFixed(1)}L</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-gray-400" />
                                        <span className="text-gray-600">Workers:</span>
                                        <span className="font-semibold text-gray-900">{project.workers}</span>
                                    </div>
                                </div>

                                <div className="text-sm">
                                    <span className="text-gray-600">Phase: </span>
                                    <span className="font-semibold text-gray-900">{project.currentPhase}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleViewDetails(project)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                            >
                                <Eye size={16} />
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
