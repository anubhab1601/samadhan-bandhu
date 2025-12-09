import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Filter, Search, Eye, Download, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different statuses
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

const statusIcons = {
    'Completed': createCustomIcon('#10b981'),
    'In Progress': createCustomIcon('#3b82f6'),
    'Approved': createCustomIcon('#6366f1'),
    'Pending': createCustomIcon('#f97316'),
};

export default function GISMapping() {
    const [selectedState, setSelectedState] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const handleExport = () => {
        alert("Map export started. The file will be downloaded shortly.");
    };

    // Sample project data with real coordinates
    const projects = [
        { id: 1, name: "Adarsh Gram Development", state: "Karnataka", district: "Mysore", lat: 12.2958, lng: 76.6394, status: "In Progress", budget: "2.5 Cr" },
        { id: 2, name: "Skill Development Centre", state: "Bihar", district: "Patna", lat: 25.5941, lng: 85.1376, status: "Approved", budget: "1.8 Cr" },
        { id: 3, name: "Community Hall Construction", state: "Rajasthan", district: "Jaipur", lat: 26.9124, lng: 75.7873, status: "Completed", budget: "0.9 Cr" },
        { id: 4, name: "Water Supply Project", state: "Uttar Pradesh", district: "Lucknow", lat: 26.8467, lng: 80.9462, status: "Pending", budget: "3.2 Cr" },
        { id: 5, name: "Rural Road Development", state: "Maharashtra", district: "Pune", lat: 18.5204, lng: 73.8567, status: "In Progress", budget: "5.0 Cr" },
        { id: 6, name: "Education Infrastructure", state: "Tamil Nadu", district: "Chennai", lat: 13.0827, lng: 80.2707, status: "Completed", budget: "2.1 Cr" },
        { id: 7, name: "Healthcare Center", state: "West Bengal", district: "Kolkata", lat: 22.5726, lng: 88.3639, status: "In Progress", budget: "3.5 Cr" },
        { id: 8, name: "Sanitation Project", state: "Gujarat", district: "Ahmedabad", lat: 23.0225, lng: 72.5714, status: "Approved", budget: "1.5 Cr" },
    ];

    const states = [...new Set(projects.map(p => p.state))].sort();

    const filteredProjects = projects.filter(project => {
        const matchesState = selectedState === 'all' || project.state === selectedState;
        const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.district.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesState && matchesStatus && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500';
            case 'In Progress': return 'bg-blue-500';
            case 'Approved': return 'bg-indigo-500';
            case 'Pending': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">GIS Mapping & Geo-Tagging</h1>
                <p className="text-sm text-gray-600 mt-1">Interactive map view of all PM-AJAY projects across India</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or district..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All States</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleExport}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Export Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Total Projects on Map</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{filteredProjects.length}</p>
                </div>
                <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">States Covered</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedState === 'all' ? states.length : 1}</p>
                </div>
                <div className="bg-white border-l-4 border-l-orange-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        ₹{filteredProjects.reduce((sum, p) => sum + parseFloat(p.budget), 0).toFixed(1)} Cr
                    </p>
                </div>
                <div className="bg-white border-l-4 border-l-indigo-600 p-4 rounded-r-lg shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">Geo-Tagged</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{filteredProjects.length}</p>
                </div>
            </div>

            {/* Map Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map View */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded"></span>
                            India Map View
                        </h2>
                        <div className="flex gap-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin size={14} /> {filteredProjects.length} Projects
                            </span>
                        </div>
                    </div>

                    {/* Leaflet Map */}
                    <div className="h-[600px]">
                        <MapContainer
                            center={[20.5937, 78.9629]} // Center of India
                            zoom={5}
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {filteredProjects.map((project) => (
                                <Marker
                                    key={project.id}
                                    position={[project.lat, project.lng]}
                                    icon={statusIcons[project.status]}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <h3 className="font-bold text-sm text-gray-900">{project.name}</h3>
                                            <p className="text-xs text-gray-600 mt-1">
                                                <MapPin size={12} className="inline mr-1" />
                                                {project.district}, {project.state}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs font-semibold text-gray-700">₹{project.budget}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        project.status === 'Approved' ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* Project List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded"></span>
                            Projects List
                        </h2>
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                        {filteredProjects.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
                                <p>No projects found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {filteredProjects.map((project) => (
                                    <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    <MapPin size={12} className="inline mr-1" />
                                                    {project.district}, {project.state}
                                                </p>
                                            </div>
                                            <div className={`w-3 h-3 ${getStatusColor(project.status)} rounded-full`}></div>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-xs font-semibold text-gray-700">₹{project.budget}</span>
                                            <Link to={`/central/projects/${project.id}`} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                <Eye size={14} /> View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Map Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                        <span className="text-sm text-gray-700">Completed Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                        <span className="text-sm text-gray-700">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow"></div>
                        <span className="text-sm text-gray-700">Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow"></div>
                        <span className="text-sm text-gray-700">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
