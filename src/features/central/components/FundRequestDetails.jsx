import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function FundRequestDetails({ request, onClose }) {
    const navigate = useNavigate();

    if (!request) return null;

    const handleRelease = () => {
        onClose();
        navigate('/central/funds/transaction', { state: { request } });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 rounded-t-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Fund Request Details</h2>
                        <p className="text-sm opacity-90 mt-1">Request ID: {request.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-blue-700 rounded-full transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Status Badge */}
                    <div className="mb-6">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                request.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                    request.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                            }`}>
                            {request.status}
                        </span>
                    </div>

                    {/* Project Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Project Name</p>
                            <p className="text-lg font-bold text-gray-900">{request.project}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">State</p>
                            <p className="text-lg font-bold text-gray-900">{request.state}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Project Type</p>
                            <p className="text-lg font-bold text-gray-900">{request.type}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Request Date</p>
                            <p className="text-lg font-bold text-gray-900">{request.date}</p>
                        </div>
                    </div>

                    {/* Financial Details */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Requested Amount</p>
                                <p className="text-2xl font-bold text-blue-900">₹{request.requestedAmount}</p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-xs font-semibold text-green-600 uppercase mb-1">Approved Amount</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {request.approvedAmount !== '-' ? `₹${request.approvedAmount}` : 'Pending'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This fund request is for the {request.project} project in {request.state}.
                                The project falls under the {request.type} category and was submitted on {request.date}.
                                {request.status === 'Approved' && ' The request has been approved and is ready for fund release.'}
                                {request.status === 'Pending' && ' The request is currently under review.'}
                                {request.status === 'Rejected' && ' The request has been rejected.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 p-6 rounded-b-lg flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                        Close
                    </button>
                    {request.status === 'Approved' && (
                        <button
                            onClick={handleRelease}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        >
                            Release Funds
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
