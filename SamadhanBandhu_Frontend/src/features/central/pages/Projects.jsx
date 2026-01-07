import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, FileText } from 'lucide-react';
import api from '../services/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.district?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Registry</h1>
                    <p className="text-sm text-gray-600 mt-1">Comprehensive list of all PM-AJAY projects across India</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by project name, ID, or district..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
                            <Download size={18} />
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{projects.length}</p>
                </div>
                <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {projects.filter(p => p.status === 'Completed').length}
                    </p>
                </div>
                <div className="bg-white border-l-4 border-l-orange-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {projects.filter(p => p.status === 'In Progress').length}
                    </p>
                </div>
                <div className="bg-white border-l-4 border-l-indigo-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        ₹{(projects.reduce((sum, p) => sum + (p.total_budget || 0), 0) / 10000000).toFixed(2)} Cr
                    </p>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded"></span>
                        All Projects ({filteredProjects.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2">Loading projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-lg font-medium">No projects found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">District</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Budget (₹)</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProjects.map((project, index) => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{project.state}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{project.district}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            {project.total_budget ? `₹${(project.total_budget / 10000000).toFixed(2)} Cr` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                    project.status === 'On Hold' ? 'bg-red-100 text-red-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-3">
                                                <Link to={`/central/projects/${project.id}`} className="text-blue-600 hover:text-blue-700" title="View Details">
                                                    <Eye size={18} />
                                                </Link>
                                                <button className="text-green-600 hover:text-green-700" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-700" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
