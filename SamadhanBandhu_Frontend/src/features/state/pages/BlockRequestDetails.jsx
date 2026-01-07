import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, FileText, CheckCircle, XCircle, Send, Shield } from 'lucide-react';

export default function BlockRequestDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { request } = location.state || {};

    if (!request) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">No request details found.</p>
                <button onClick={() => navigate('/state/requests')} className="text-blue-600 mt-4">Go Back</button>
            </div>
        );
    }

    const handleApprove = () => {
        if (window.confirm('Approve this request?')) {
            alert(`Request ${request.id} approved successfully!`);
            navigate('/state/requests');
        }
    };

    const handleReject = () => {
        const reason = prompt("Please enter reason for rejection:");
        if (reason) {
            alert(`Request rejected. Reason: ${reason}`);
            navigate('/state/requests');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/state/requests')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} /> Back to Requests
                </button>

                {/* Header Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200">
                                    {request.id}
                                </span>
                            </div>
                            <p className="text-gray-600">{request.description}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-bold text-sm ${request.status === 'Pending Review' ? 'bg-orange-100 text-orange-700' :
                            request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {request.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Project Info */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="text-blue-600" size={20} /> Project Information
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Scheme Name</p>
                                    <p className="font-semibold text-gray-900">{request.scheme}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Requested Amount</p>
                                    <p className="font-bold text-green-600 text-lg">₹{request.amount}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Submission Date</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="font-medium text-gray-900">{request.date}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Duration</p>
                                    <p className="font-medium text-gray-900">12 Months (Est.)</p>
                                </div>
                            </div>
                        </div>

                        {/* Location Info */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="text-red-600" size={20} /> Location Details
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Village / Gram Panchayat</p>
                                    <p className="font-semibold text-gray-900">{request.village}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">District</p>
                                    <p className="font-semibold text-gray-900">{request.district}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">State</p>
                                    <p className="font-semibold text-gray-900">Uttar Pradesh</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Block</p>
                                    <p className="font-semibold text-gray-900">Sadar</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Sarpanch Info */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="text-purple-600" size={20} /> Applicant
                            </h2>
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <User size={32} className="text-purple-600" />
                                </div>
                                <p className="font-bold text-gray-900">{request.blockOfficer}</p>
                                <p className="text-sm text-gray-500">Block Officer</p>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Contact</span>
                                    <span className="font-medium">+91 98*** **123</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">ID</span>
                                    <span className="font-medium">BLK-UP-2024</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        {request.status === 'Pending Review' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleApprove}
                                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={18} /> Approve
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="w-full bg-white text-red-600 border border-red-200 py-2 px-4 rounded-lg font-bold hover:bg-red-50 flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} /> Reject Request
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Status Timeline (Mock) */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline</h2>
                            <div className="space-y-4 relative pl-4 border-l-2 border-gray-200">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    <p className="text-sm font-bold text-gray-900">Request Submitted</p>
                                    <p className="text-xs text-gray-500">{request.date}</p>
                                </div>
                                <div className="relative">
                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${request.status !== 'Pending Review' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <p className={`text-sm font-bold ${request.status !== 'Pending Review' ? 'text-gray-900' : 'text-gray-400'}`}>State Review</p>
                                    <p className="text-xs text-gray-500">In Progress</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                                    <p className="text-sm font-bold text-gray-400">Final Verification</p>
                                    <p className="text-xs text-gray-500">Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
