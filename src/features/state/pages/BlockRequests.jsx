import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Send, CheckCircle, Clock, XCircle, Filter, Search } from 'lucide-react';

export default function BlockRequests() {
    const navigate = useNavigate();
    const [filterScheme, setFilterScheme] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample requests from Block Officers
    const requests = [
        { id: 'BR-2024-001', blockOfficer: 'Ram Singh', block: 'Rampur', district: 'Lucknow', scheme: 'Adarsh Gram', amount: '0.25 Cr', status: 'Pending Review', date: '2024-11-20', description: 'Village development project' },
        { id: 'BR-2024-002', blockOfficer: 'Sita Devi', block: 'Krishnapur', district: 'Kanpur', scheme: 'GIA', amount: '0.18 Cr', status: 'Pending Review', date: '2024-11-18', description: 'Community hall construction' },
        { id: 'BR-2024-003', blockOfficer: 'Mohan Lal', block: 'Shivnagar', district: 'Agra', scheme: 'Hostels', amount: '0.32 Cr', status: 'Approved', date: '2024-11-15', description: 'Student hostel facility' },
        { id: 'BR-2024-004', blockOfficer: 'Geeta Sharma', block: 'Ganeshpur', district: 'Varanasi', scheme: 'Adarsh Gram', amount: '0.15 Cr', status: 'Pending Review', date: '2024-11-22', description: 'Infrastructure development' },
        { id: 'BR-2024-005', blockOfficer: 'Rajesh Kumar', block: 'Laxmipur', district: 'Prayagraj', scheme: 'GIA', amount: '0.20 Cr', status: 'Rejected', date: '2024-11-10', description: 'Water supply project' },
    ];

    const filteredRequests = requests.filter(req => {
        const matchesScheme = filterScheme === 'all' || req.scheme === filterScheme;
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesSearch = req.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.blockOfficer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesScheme && matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const styles = {
            'Pending Review': 'bg-orange-100 text-orange-700',
            'Approved': 'bg-green-100 text-green-700',
            'Rejected': 'bg-red-100 text-red-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const handleViewDetails = (request) => {
        navigate('/state/requests/details', { state: { request } });
    };



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Block Officer Requests</h1>
                <p className="text-sm text-gray-600 mt-1">Review and process project requests from Block Officers</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Clock size={24} className="text-orange-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Review</p>
                    <h3 className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'Pending Review').length}</h3>
                </div>



                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Approved</p>
                    <h3 className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'Approved').length}</h3>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                            <XCircle size={24} className="text-red-600" />
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rejected</p>
                    <h3 className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'Rejected').length}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by block, block officer, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    <select
                        value={filterScheme}
                        onChange={(e) => setFilterScheme(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Schemes</option>
                        <option value="Adarsh Gram">Adarsh Gram</option>
                        <option value="GIA">GIA</option>
                        <option value="Hostels">Hostels</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Request ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Block Officer</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Block</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Scheme</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-bold text-gray-900">{request.id}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{request.blockOfficer}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{request.block}</div>
                                            <div className="text-xs text-gray-500">{request.district}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{request.scheme}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-bold text-gray-900">₹{request.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewDetails(request)}
                                                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                            >
                                                <Eye size={16} /> View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
