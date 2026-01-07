import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Search, Filter, UserCheck, Clock, Mail } from 'lucide-react';

export default function PendingRegistrations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
    const [remarks, setRemarks] = useState('');

    // Mock data - will be replaced with API call
    const [registrations, setRegistrations] = useState([
        {
            id: 1,
            fullName: 'Rajesh Kumar',
            email: 'rajesh.kumar@gov.in',
            mobile: '9876543210',
            role: 'state',
            roleLabel: 'State Officer',
            state: 'Maharashtra',
            district: 'Pune',
            department: 'Rural Development',
            designation: 'Deputy Secretary',
            submittedOn: '2025-12-01',
            status: 'pending'
        },
        {
            id: 2,
            fullName: 'Amit Patel',
            email: 'amit.patel@msje.gov.in',
            mobile: '9876543212',
            role: 'central',
            roleLabel: 'Center Officer',
            state: 'Delhi',
            district: 'New Delhi',
            ministry: 'Ministry of Social Justice',
            designation: 'Joint Secretary',
            submittedOn: '2025-11-29',
            status: 'pending'
        },
        {
            id: 3,
            fullName: 'Suresh Patil',
            email: 'suresh.patil@block.gov.in',
            mobile: '9876543213',
            role: 'block',
            roleLabel: 'Block Officer',
            state: 'Maharashtra',
            district: 'Pune',
            block: 'Haveli',
            gramPanchayat: 'Haveli GP',
            submittedOn: '2025-12-02',
            status: 'pending'
        }
    ]);

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || reg.role === filterRole;
        return matchesSearch && matchesRole && reg.status === 'pending';
    });

    const handleViewDetails = (registration) => {
        setSelectedRegistration(registration);
        setShowModal(true);
        setActionType('');
        setRemarks('');
    };

    const handleAction = (type) => {
        setActionType(type);
    };

    const handleSubmitAction = () => {
        if (actionType === 'reject' && !remarks.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }

        // Update registration status
        setRegistrations(registrations.map(reg =>
            reg.id === selectedRegistration.id
                ? { ...reg, status: actionType === 'approve' ? 'approved' : 'rejected', remarks }
                : reg
        ));

        // In real app, this would trigger email notification
        alert(`Registration ${actionType === 'approve' ? 'approved' : 'rejected'} successfully! Email notification sent to ${selectedRegistration.email}`);

        setShowModal(false);
        setSelectedRegistration(null);
        setRemarks('');
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            'state': 'bg-blue-100 text-blue-800',
            'block': 'bg-green-100 text-green-800',
            'central': 'bg-purple-100 text-purple-800'
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <UserCheck size={28} className="text-blue-600" />
                    Pending Registrations
                </h1>
                <p className="text-gray-600 mt-1">Review and approve user registrations for State Officers, IVA Officers, and Center Officers</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Approvals</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredRegistrations.length}</p>
                        </div>
                        <Clock className="text-orange-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Approved Today</p>
                            <p className="text-2xl font-bold text-green-600">0</p>
                        </div>
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Rejected Today</p>
                            <p className="text-2xl font-bold text-red-600">0</p>
                        </div>
                        <XCircle className="text-red-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Roles</option>
                            <option value="state">State Officer</option>
                            <option value="block">Block Officer</option>
                            <option value="central">Center Officer</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted On
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No pending registrations found
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((registration) => (
                                    <tr key={registration.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{registration.fullName}</div>
                                                <div className="text-sm text-gray-500">{registration.email}</div>
                                                <div className="text-sm text-gray-500">{registration.mobile}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(registration.role)}`}>
                                                {registration.roleLabel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{registration.state}</div>
                                            <div className="text-sm text-gray-500">{registration.district}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(registration.submittedOn).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewDetails(registration)}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                            >
                                                <Eye size={16} />
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            {showModal && selectedRegistration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                            <h2 className="text-xl font-bold">Registration Review</h2>
                            <p className="text-blue-100 text-sm mt-1">{selectedRegistration.roleLabel} Application</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            {/* Personal Information */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-600">Full Name</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.fullName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">Email</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">Mobile</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.mobile}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">Role</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.roleLabel}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Location</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-600">State</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.state}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">District</label>
                                        <p className="font-medium text-gray-900">{selectedRegistration.district}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role-Specific Information */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Role-Specific Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedRegistration.designation && (
                                        <div>
                                            <label className="text-sm text-gray-600">Designation</label>
                                            <p className="font-medium text-gray-900">{selectedRegistration.designation}</p>
                                        </div>
                                    )}
                                    {selectedRegistration.department && (
                                        <div>
                                            <label className="text-sm text-gray-600">Department</label>
                                            <p className="font-medium text-gray-900">{selectedRegistration.department}</p>
                                        </div>
                                    )}
                                    {selectedRegistration.ministry && (
                                        <div>
                                            <label className="text-sm text-gray-600">Ministry</label>
                                            <p className="font-medium text-gray-900">{selectedRegistration.ministry}</p>
                                        </div>
                                    )}
                                    {selectedRegistration.organization && (
                                        <div>
                                            <label className="text-sm text-gray-600">Organization</label>
                                            <p className="font-medium text-gray-900">{selectedRegistration.organization}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Section */}
                            {!actionType && (
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => handleAction('approve')}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                    >
                                        <CheckCircle size={20} />
                                        Approve Registration
                                    </button>
                                    <button
                                        onClick={() => handleAction('reject')}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                                    >
                                        <XCircle size={20} />
                                        Reject Registration
                                    </button>
                                </div>
                            )}

                            {/* Remarks Section */}
                            {actionType && (
                                <div className="pt-4 border-t">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {actionType === 'approve' ? 'Approval Notes (Optional)' : 'Reason for Rejection *'}
                                    </label>
                                    <textarea
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder={actionType === 'approve' ? 'Add any notes...' : 'Please provide a reason for rejection...'}
                                    />
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={handleSubmitAction}
                                            className={`flex-1 px-6 py-3 text-white rounded-lg font-semibold ${actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                                }`}
                                        >
                                            Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                                        </button>
                                        <button
                                            onClick={() => setActionType('')}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        {!actionType && (
                            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
