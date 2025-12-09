import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Clock, CheckCircle, FileText, AlertCircle } from 'lucide-react';

export default function PendingVerifications() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data
    const [verifications, setVerifications] = useState([
        {
            id: 'PMAJAY-2025-MH-12345',
            villageName: 'Khed',
            gramPanchayat: 'Khed GP',
            district: 'Pune',
            state: 'Maharashtra',
            sarpanchName: 'Ramesh Patil',
            projectTitle: 'Community Hall Construction',
            estimatedCost: '₹50 Lakhs',
            forwardedDate: '2025-11-25',
            status: 'pending-verification',
            priority: 'high'
        },
        {
            id: 'PMAJAY-2025-MH-12346',
            villageName: 'Shirur',
            gramPanchayat: 'Shirur GP',
            district: 'Pune',
            state: 'Maharashtra',
            sarpanchName: 'Suresh Kumar',
            projectTitle: 'Road Development',
            estimatedCost: '₹75 Lakhs',
            forwardedDate: '2025-11-26',
            status: 'pending-verification',
            priority: 'medium'
        },
        {
            id: 'PMAJAY-2025-MH-12347',
            villageName: 'Daund',
            gramPanchayat: 'Daund GP',
            district: 'Pune',
            state: 'Maharashtra',
            sarpanchName: 'Priya Sharma',
            projectTitle: 'Water Supply System',
            estimatedCost: '₹1.2 Crores',
            forwardedDate: '2025-11-22',
            status: 'in-progress',
            priority: 'high'
        }
    ]);

    const districts = ['All Districts', 'Pune', 'Mumbai', 'Nagpur', 'Nashik'];

    const filteredVerifications = verifications.filter(ver => {
        const matchesSearch = ver.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ver.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ver.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDistrict = filterDistrict === 'all' || ver.district === filterDistrict;
        const matchesStatus = filterStatus === 'all' || ver.status === filterStatus;
        return matchesSearch && matchesDistrict && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending-verification': { label: 'Pending Verification', color: 'bg-orange-100 text-orange-800', icon: Clock },
            'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: FileText },
            'completed': { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
            'on-hold': { label: 'On Hold', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle }
        };
        const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: FileText };
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                <Icon size={14} />
                {config.label}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            'high': { label: 'High', color: 'bg-red-100 text-red-800' },
            'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
            'low': { label: 'Low', color: 'bg-green-100 text-green-800' }
        };
        const config = priorityConfig[priority] || { label: priority, color: 'bg-gray-100 text-gray-800' };
        return <span className={`px-2 py-1 text-xs font-medium rounded ${config.color}`}>{config.label}</span>;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={28} className="text-blue-600" />
                    Pending Verifications
                </h1>
                <p className="text-gray-600 mt-1">Applications forwarded by State for village eligibility verification</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Verifications</p>
                            <p className="text-2xl font-bold text-gray-900">{verifications.length}</p>
                        </div>
                        <FileText className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-orange-600">
                                {verifications.filter(v => v.status === 'pending-verification').length}
                            </p>
                        </div>
                        <Clock className="text-orange-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {verifications.filter(v => v.status === 'in-progress').length}
                            </p>
                        </div>
                        <FileText className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-green-600">
                                {verifications.filter(v => v.status === 'completed').length}
                            </p>
                        </div>
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by village, project, or ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* District Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {districts.map(district => (
                                <option key={district} value={district === 'All Districts' ? 'all' : district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending-verification">Pending Verification</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on-hold">On Hold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Verifications Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Application ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Village Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estimated Cost
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Forwarded On
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredVerifications.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No verifications found
                                    </td>
                                </tr>
                            ) : (
                                filteredVerifications.map((ver) => (
                                    <tr key={ver.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-blue-600">{ver.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{ver.villageName}</div>
                                            <div className="text-sm text-gray-500">{ver.gramPanchayat}</div>
                                            <div className="text-sm text-gray-500">{ver.district}, {ver.state}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{ver.projectTitle}</div>
                                            <div className="text-sm text-gray-500">By: {ver.sarpanchName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {ver.estimatedCost}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPriorityBadge(ver.priority)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(ver.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(ver.forwardedDate).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => navigate(`/iva-officer/verify/${ver.id}`)}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                            >
                                                <Eye size={16} />
                                                Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
