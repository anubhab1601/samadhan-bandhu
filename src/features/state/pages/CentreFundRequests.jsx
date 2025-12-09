import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Send, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function CentreFundRequests() {
    const navigate = useNavigate();

    // Sample requests to Centre
    const requests = [
        {
            id: 'CR-2024-001',
            project: 'Adarsh Gram - Rampur',
            amount: '2.5 Cr',
            status: 'Approved',
            date: '2024-11-20',
            ivaVerified: true,
            remarks: 'Funds released by Centre'
        },
        {
            id: 'CR-2024-002',
            project: 'Hostel Construction - Shivnagar',
            amount: '3.2 Cr',
            status: 'Pending',
            date: '2024-11-28',
            ivaVerified: true,
            remarks: 'Under review by Ministry'
        },
        {
            id: 'CR-2024-003',
            project: 'Water Supply - Ganeshpur',
            amount: '1.5 Cr',
            status: 'Draft',
            date: '2024-12-01',
            ivaVerified: true,
            remarks: 'Ready to send'
        }
    ];

    const handleRequestFund = () => {
        // Logic to create new request
        alert("New Fund Request form would open here.");
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Approved': 'bg-green-100 text-green-700',
            'Pending': 'bg-orange-100 text-orange-700',
            'Draft': 'bg-gray-100 text-gray-700',
            'Rejected': 'bg-red-100 text-red-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Centre Fund Requests</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage fund requests sent to the Central Ministry</p>
                </div>
                <button
                    onClick={handleRequestFund}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
                >
                    <Send size={18} /> New Request
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                        <span className="text-gray-600 font-medium">Total Received</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">₹2.5 Cr</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Clock className="text-orange-600" size={24} />
                        </div>
                        <span className="text-gray-600 font-medium">Pending Requests</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">₹3.2 Cr</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CheckCircle className="text-blue-600" size={24} />
                        </div>
                        <span className="text-gray-600 font-medium">Verified Projects</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">5</h3>
                </div>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Request ID</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Project</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">IVA Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{req.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{req.project}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{req.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(req.status)}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckCircle size={14} /> Verified
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{req.date}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
