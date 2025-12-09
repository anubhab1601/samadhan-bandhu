import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, Eye, Calendar, MapPin, Star, TrendingUp } from 'lucide-react';

export default function InspectionHistory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [filterDate, setFilterDate] = useState('all');

    const completedInspections = [
        {
            id: 'INS-2024-045',
            projectId: 'PROJ-2024-010',
            projectTitle: 'Road Development Project',
            village: 'Daund',
            district: 'Pune',
            completedDate: '2025-11-01',
            inspectionNumber: '2nd Inspection',
            qualityRating: 4,
            completionPercentage: 75,
            remarks: 'Good progress. Quality of work is satisfactory.',
            agency: 'Road Masters'
        },
        {
            id: 'INS-2024-038',
            projectId: 'PROJ-2024-008',
            projectTitle: 'Village Community Center',
            village: 'Shirdi',
            district: 'Ahmednagar',
            completedDate: '2025-10-15',
            inspectionNumber: '1st Inspection',
            qualityRating: 5,
            completionPercentage: 40,
            remarks: 'Excellent work quality. On schedule.',
            agency: 'ABC Constructions'
        },
        {
            id: 'INS-2024-032',
            projectId: 'PROJ-2024-005',
            projectTitle: 'Water Supply System',
            village: 'Nashik Village',
            district: 'Nashik',
            completedDate: '2025-09-28',
            inspectionNumber: '3rd Inspection',
            qualityRating: 3,
            completionPercentage: 90,
            remarks: 'Average quality. Some improvements needed.',
            agency: 'Water Works Ltd'
        },
        {
            id: 'INS-2024-025',
            projectId: 'PROJ-2024-003',
            projectTitle: 'School Building Renovation',
            village: 'Pune Rural',
            district: 'Pune',
            completedDate: '2025-08-20',
            inspectionNumber: '1st Inspection',
            qualityRating: 5,
            completionPercentage: 30,
            remarks: 'Excellent start. High quality materials used.',
            agency: 'XYZ Builders'
        }
    ];

    const filteredInspections = completedInspections.filter(inspection => {
        const matchesSearch = inspection.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.village.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = filterRating === 'all' || inspection.qualityRating === parseInt(filterRating);
        return matchesSearch && matchesRating;
    });

    const stats = {
        total: completedInspections.length,
        avgRating: (completedInspections.reduce((sum, i) => sum + i.qualityRating, 0) / completedInspections.length).toFixed(1),
        avgCompletion: Math.round(completedInspections.reduce((sum, i) => sum + i.completionPercentage, 0) / completedInspections.length),
        thisMonth: completedInspections.filter(i => new Date(i.completedDate).getMonth() === new Date().getMonth()).length
    };

    const getRatingStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={16}
                className={index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
            />
        ));
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'bg-green-100 text-green-700';
        if (rating >= 3) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <FileText size={32} />
                    Inspection History
                </h1>
                <p className="text-indigo-100">View all your completed inspections</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.avgRating} / 5</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Avg Completion</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.avgCompletion}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-green-600">{stats.thisMonth}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search inspections..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterRating}
                            onChange={(e) => setFilterRating(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Dates</option>
                            <option value="this-month">This Month</option>
                            <option value="last-month">Last Month</option>
                            <option value="last-3-months">Last 3 Months</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inspections List */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Completed Inspections ({filteredInspections.length})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredInspections.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No inspections found
                        </div>
                    ) : (
                        filteredInspections.map((inspection) => (
                            <div key={inspection.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{inspection.projectTitle}</h3>
                                        <p className="text-sm text-gray-600">ID: {inspection.id} • Project: {inspection.projectId}</p>
                                        <p className="text-xs text-gray-500">{inspection.inspectionNumber}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1">
                                            {getRatingStars(inspection.qualityRating)}
                                        </div>
                                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getRatingColor(inspection.qualityRating)}`}>
                                            Rating: {inspection.qualityRating}/5
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <MapPin size={14} />
                                            Location
                                        </p>
                                        <p className="font-medium text-gray-900">{inspection.village}, {inspection.district}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar size={14} />
                                            Completed
                                        </p>
                                        <p className="font-medium text-gray-900">{new Date(inspection.completedDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <TrendingUp size={14} />
                                            Completion
                                        </p>
                                        <p className="font-medium text-gray-900">{inspection.completionPercentage}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Agency</p>
                                        <p className="font-medium text-gray-900">{inspection.agency}</p>
                                    </div>
                                </div>

                                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Remarks:</p>
                                    <p className="text-sm text-gray-900">{inspection.remarks}</p>
                                </div>

                                <button
                                    onClick={() => navigate(`/field-officer/history/${inspection.id}`)}
                                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Full Report
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
