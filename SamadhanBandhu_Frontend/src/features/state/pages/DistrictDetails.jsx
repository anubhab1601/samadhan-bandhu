import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, TrendingUp, DollarSign, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function DistrictDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [district, setDistrict] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            // Mock data based on ID
            const mockDistricts = {
                '1': { name: 'Ahmednagar', lat: 19.0952, lng: 74.7496, projects: 120, budget: '₹45 Cr', status: 'Active' },
                '2': { name: 'Pune', lat: 18.5204, lng: 73.8567, projects: 85, budget: '₹32 Cr', status: 'Active' },
                '3': { name: 'Nashik', lat: 19.9975, lng: 73.7898, projects: 95, budget: '₹38 Cr', status: 'Active' },
                '4': { name: 'Aurangabad', lat: 19.8762, lng: 75.3433, projects: 60, budget: '₹25 Cr', status: 'Alert' },
                '5': { name: 'Nagpur', lat: 21.1458, lng: 79.0882, projects: 75, budget: '₹28 Cr', status: 'Active' },
                '6': { name: 'Thane', lat: 19.2183, lng: 72.9781, projects: 45, budget: '₹18 Cr', status: 'Inactive' },
            };

            const data = mockDistricts[id] || { name: 'Unknown District', lat: 19.7515, lng: 75.7139, projects: 0, budget: '0', status: 'Unknown' };

            setDistrict({
                id: id,
                ...data,
                stats: {
                    completed: Math.floor(data.projects * 0.4),
                    ongoing: Math.floor(data.projects * 0.5),
                    pending: Math.floor(data.projects * 0.1)
                },
                recentProjects: [
                    { id: 'PRJ-001', name: 'Road Construction', village: 'Village A', status: 'In Progress', cost: '₹50 L' },
                    { id: 'PRJ-002', name: 'Water Supply', village: 'Village B', status: 'Completed', cost: '₹25 L' },
                    { id: 'PRJ-003', name: 'School Building', village: 'Village C', status: 'Pending', cost: '₹80 L' },
                    { id: 'PRJ-004', name: 'Community Hall', village: 'Village D', status: 'In Progress', cost: '₹40 L' },
                ]
            });
            setLoading(false);
        }, 800);
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!district) {
        return <div className="text-center py-12">District not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/state/districts')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{district.name} District</h1>
                        <p className="text-sm text-gray-500">District ID: MH-{district.id.toString().padStart(3, '0')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${district.status === 'Active' ? 'bg-green-100 text-green-700' :
                            district.status === 'Alert' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                        }`}>
                        {district.status}
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                            <p className="text-2xl font-bold text-gray-900">{district.projects}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Building className="text-blue-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                            <p className="text-2xl font-bold text-gray-900">{district.budget}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <DollarSign className="text-green-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Completed</p>
                            <p className="text-2xl font-bold text-green-600">{district.stats.completed}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Ongoing</p>
                            <p className="text-2xl font-bold text-orange-600">{district.stats.ongoing}</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Clock className="text-orange-600" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[400px]">
                    <MapContainer
                        center={[district.lat, district.lng]}
                        zoom={10}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[district.lat, district.lng]}>
                            <Popup>
                                {district.name} District Center
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {/* Recent Projects */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800">Recent Projects</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {district.recentProjects.map((project) => (
                            <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            <MapPin size={12} className="inline mr-1" />
                                            {project.village}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                'bg-orange-100 text-orange-700'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="mt-2 text-xs font-semibold text-gray-700">
                                    Cost: {project.cost}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center">
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                            View All Projects
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
