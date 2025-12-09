import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Eye, Calendar, User, AlertCircle } from 'lucide-react';

export default function Verifications() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const verifications = [
        {
            id: 'APP-2025-001',
            village: 'Shirdi',
            sarpanch: 'Ramesh Patil',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            dateAssigned: '2025-11-28',
            deadline: '2025-12-05',
            status: 'Pending',
            priority: 'High',
            type: 'Village Eligibility'
        },
        {
            id: 'APP-2025-002',
            village: 'Nashik Village',
            sarpanch: 'Sunita Deshmukh',
            district: 'Nashik',
            state: 'Maharashtra',
            dateAssigned: '2025-11-26',
            deadline: '2025-12-03',
            status: 'In Progress',
            priority: 'Medium',
            type: 'Village Eligibility'
        },
        {
            id: 'APP-2025-003',
            village: 'Pune Rural',
            sarpanch: 'Vijay Kumar',
            district: 'Pune',
            state: 'Maharashtra',
            dateAssigned: '2025-11-25',
            deadline: '2025-12-02',
            status: 'Pending',
            priority: 'High',
            type: 'Village Eligibility'
        },
        {
            id: 'COM-2025-001',
            village: 'Daund',
            sarpanch: 'Priya Sharma',
            district: 'Pune',
            state: 'Maharashtra',
            dateAssigned: '2025-11-29',
            deadline: '2025-12-06',
            status: 'Pending',
            priority: 'Medium',
            type: 'Committee Verification'
        },
        {
            id: 'AGN-2025-001',
            village: 'Shirdi',
            sarpanch: 'Ramesh Patil',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            dateAssigned: '2025-11-30',
            deadline: '2025-12-07',
            status: 'Pending',
            priority: 'Low',
            type: 'Agency Verification'
        }
    ];

    const filteredVerifications = verifications.filter(verification => {
        const matchesSearch = verification.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            verification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            verification.sarpanch.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || verification.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || verification.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = {
        total: verifications.length,
        pending: verifications.filter(v => v.status === 'Pending').length,
        inProgress: verifications.filter(v => v.status === 'In Progress').length,
        completed: verifications.filter(v => v.status === 'Completed').length
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'bg-red-100 text-red-700',
            'Medium': 'bg-orange-100 text-orange-700',
            'Low': 'bg-blue-100 text-blue-700'
        };
        return colors[priority] || colors['Medium'];
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'In Progress': 'bg-blue-100 text-blue-700',
            'Completed': 'bg-green-100 text-green-700'
        };
        return colors[status] || colors['Pending'];
    };

    const getTypeColor = (type) => {
        const colors = {
            'Village Eligibility': 'bg-purple-100 text-purple-700',
            'Committee Verification': 'bg-indigo-100 text-indigo-700',
            'Agency Verification': 'bg-teal-100 text-teal-700'
        };
        return colors[type] || colors['Village Eligibility'];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2">Verification Tasks</h1>
                <p className="text-purple-100">Manage village eligibility and committee verifications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
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
                            placeholder="Search by village, ID, or sarpanch..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Verifications List */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Verification Tasks ({filteredVerifications.length})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredVerifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No verification tasks found
                        </div>
                    ) : (
                        filteredVerifications.map((verification) => (
                            <div key={verification.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{verification.village}</h3>
                                        <p className="text-sm text-gray-600">Application ID: {verification.id}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className={`px-2 py-1 rounded ${getTypeColor(verification.type)}`}>
                                                {verification.type}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className={`px-3 py-1 text-xs rounded-full ${getPriorityColor(verification.priority)}`}>
                                            {verification.priority} Priority
                                        </span>
                                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(verification.status)}`}>
                                            {verification.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <User size={14} />
                                            Sarpanch
                                        </p>
                                        <p className="font-medium text-gray-900">{verification.sarpanch}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <MapPin size={14} />
                                            Location
                                        </p>
                                        <p className="font-medium text-gray-900">{verification.district}, {verification.state}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar size={14} />
                                            Assigned
                                        </p>
                                        <p className="font-medium text-gray-900">{new Date(verification.dateAssigned).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Clock size={14} />
                                            Deadline
                                        </p>
                                        <p className="font-medium text-red-600">{new Date(verification.deadline).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (verification.type === 'Village Eligibility') {
                                            navigate(`/iva-officer/verifications/village/${verification.id}`);
                                        } else if (verification.type === 'Committee Verification') {
                                            navigate(`/iva-officer/verifications/committee/${verification.id}`);
                                        } else {
                                            navigate(`/iva-officer/verifications/agency/${verification.id}`);
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Details & Verify
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
