import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import api from '../services/api';

export default function Districts() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">District Projects Overview</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search districts or projects..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button className="px-4 py-2 border border-slate-300 rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-50">
                    <Filter size={20} />
                    Filter by Status
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-3 text-center text-slate-500">Loading district data...</p>
                ) : projects.length === 0 ? (
                    <p className="col-span-3 text-center text-slate-500">No projects found in this jurisdiction.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <MapPin className="text-blue-600" size={24} />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-amber-100 text-amber-700'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.title}</h3>

                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>District:</span>
                                    <span className="font-medium text-slate-800">{project.district}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Budget:</span>
                                    <span className="font-medium text-slate-800">₹{project.total_budget ? (project.total_budget / 10000000).toFixed(2) : '0'} Cr</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <button className="w-full text-blue-600 font-medium hover:text-blue-700 text-sm">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
