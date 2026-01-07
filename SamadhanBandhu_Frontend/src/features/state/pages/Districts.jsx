import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, Filter, MapPin, ChevronRight, AlertCircle, CheckCircle, XCircle, LayoutGrid, List } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Districts() {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const [districts] = useState([
        { id: 1, name: 'Ahmednagar', projects: 120, budget: '₹45 Cr', status: 'Active', lat: 19.0952, lng: 74.7496 },
        { id: 2, name: 'Pune', projects: 85, budget: '₹32 Cr', status: 'Active', lat: 18.5204, lng: 73.8567 },
        { id: 3, name: 'Nashik', projects: 95, budget: '₹38 Cr', status: 'Active', lat: 19.9975, lng: 73.7898 },
        { id: 4, name: 'Aurangabad', projects: 60, budget: '₹25 Cr', status: 'Alert', lat: 19.8762, lng: 75.3433 },
        { id: 5, name: 'Nagpur', projects: 75, budget: '₹28 Cr', status: 'Active', lat: 21.1458, lng: 79.0882 },
        { id: 6, name: 'Thane', projects: 45, budget: '₹18 Cr', status: 'Inactive', lat: 19.2183, lng: 72.9781 },
    ]);

    const filteredDistricts = districts.filter(district => {
        const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || district.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-50 border-green-200';
            case 'Alert': return 'text-red-600 bg-red-50 border-red-200';
            case 'Inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">District Management</h1>
                    <p className="text-sm text-gray-600 mt-1">Monitor project progress and budget allocation across districts</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <List size={18} /> List View
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <MapPin size={18} /> Map View
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search districts..."
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
                        <option value="Active">Active</option>
                        <option value="Alert">Alert</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDistricts.map((district) => (
                        <div key={district.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <MapPin className="text-blue-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{district.name}</h3>
                                            <p className="text-sm text-gray-500">District ID: MH-{district.id.toString().padStart(3, '0')}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(district.status)}`}>
                                        {district.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 mb-1">Total Projects</p>
                                        <p className="font-bold text-gray-900">{district.projects}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 mb-1">Total Budget</p>
                                        <p className="font-bold text-gray-900">{district.budget}</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/state/districts/${district.id}`}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
                                >
                                    View Details
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px]">
                    <MapContainer
                        center={[19.7515, 75.7139]} // Center of Maharashtra
                        zoom={7}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredDistricts.map((district) => (
                            <Marker key={district.id} position={[district.lat, district.lng]}>
                                <Popup>
                                    <div className="p-2 min-w-[200px]">
                                        <h3 className="font-bold text-lg mb-2">{district.name}</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Projects:</span>
                                                <span className="font-semibold">{district.projects}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Budget:</span>
                                                <span className="font-semibold">{district.budget}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Status:</span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${district.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        district.status === 'Alert' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {district.status}
                                                </span>
                                            </div>
                                            <Link
                                                to={`/state/districts/${district.id}`}
                                                className="block w-full text-center mt-3 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            )}
        </div>
    );
}
