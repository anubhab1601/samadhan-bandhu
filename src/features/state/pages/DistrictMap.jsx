import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function DistrictMap() {
    // Mock Data for Districts
    const districtData = [
        { name: 'Ahmednagar', lat: 19.0952, lng: 74.7496, projects: 45, completed: 30, ongoing: 15, budget: 120 },
        { name: 'Nashik', lat: 19.9975, lng: 73.7898, projects: 52, completed: 25, ongoing: 27, budget: 150 },
        { name: 'Pune', lat: 18.5204, lng: 73.8567, projects: 68, completed: 40, ongoing: 28, budget: 200 },
        { name: 'Thane', lat: 19.2183, lng: 72.9781, projects: 35, completed: 20, ongoing: 15, budget: 90 },
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, projects: 25, completed: 15, ongoing: 10, budget: 80 },
    ];

    const chartData = [
        { name: 'Ahmednagar', Completed: 30, Ongoing: 15 },
        { name: 'Nashik', Completed: 25, Ongoing: 27 },
        { name: 'Pune', Completed: 40, Ongoing: 28 },
        { name: 'Thane', Completed: 20, Ongoing: 15 },
        { name: 'Mumbai', Completed: 15, Ongoing: 10 },
    ];

    const pieData = [
        { name: 'Completed', value: 130 },
        { name: 'Ongoing', value: 95 },
        { name: 'Delayed', value: 25 },
    ];

    const COLORS = ['#10B981', '#3B82F6', '#EF4444'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">District Wise Map & Analysis</h1>
                <p className="text-sm text-gray-600 mt-1">Geospatial view of project distribution and performance analytics</p>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="text-blue-600" />
                    Project Distribution Map
                </h2>
                <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200 z-0">
                    <MapContainer center={[19.7515, 75.7139]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {districtData.map((district) => (
                            <Marker key={district.name} position={[district.lat, district.lng]}>
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg">{district.name}</h3>
                                        <div className="space-y-1 mt-2 text-sm">
                                            <p>Total Projects: <b>{district.projects}</b></p>
                                            <p className="text-green-600">Completed: <b>{district.completed}</b></p>
                                            <p className="text-blue-600">Ongoing: <b>{district.ongoing}</b></p>
                                            <p className="text-purple-600">Budget: <b>₹{district.budget} Cr</b></p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="text-blue-600" />
                        District-wise Project Status
                    </h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Completed" fill="#10B981" />
                                <Bar dataKey="Ongoing" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <AlertCircle className="text-orange-600" />
                        Overall Project Status Distribution
                    </h2>
                    <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-green-600 font-medium">Highest Completion</p>
                            <h3 className="text-xl font-bold text-green-900">Pune District</h3>
                            <p className="text-xs text-green-700">40 Projects Completed</p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Highest Investment</p>
                            <h3 className="text-xl font-bold text-blue-900">Pune District</h3>
                            <p className="text-xs text-blue-700">₹200 Cr Allocated</p>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <AlertCircle className="text-orange-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-orange-600 font-medium">Needs Attention</p>
                            <h3 className="text-xl font-bold text-orange-900">Mumbai District</h3>
                            <p className="text-xs text-orange-700">Lowest Completion Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
