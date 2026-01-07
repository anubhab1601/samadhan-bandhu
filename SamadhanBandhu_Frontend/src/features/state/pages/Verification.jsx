import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, UserPlus, CheckCircle, Clock, AlertCircle, FileText, MapPin, Calendar } from 'lucide-react';

export default function Verification() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([
        {
            id: 'PMAJAY-2025-MH-12345',
            village: 'Shirdi',
            district: 'Ahmednagar',
            sarpanch: 'Ramesh Patil',
            approvedDate: '2025-11-20',
            status: 'Pending IVA Assignment',
            ivaAssigned: null,
            verificationStatus: null,
            verificationDate: null,
            verificationReport: null
        },
        {
            id: 'PMAJAY-2025-MH-12346',
            village: 'Nashik Village',
            district: 'Nashik',
            sarpanch: 'Suresh Kumar',
            approvedDate: '2025-11-18',
            status: 'Verification In Progress',
            ivaAssigned: 'IVA Officer 1',
            ivaEmail: 'iva1@pmajay.gov.in',
            assignedDate: '2025-11-22',
            verificationStatus: 'In Progress',
            verificationDate: null,
            verificationReport: null
        },
        {
            id: 'PMAJAY-2025-MH-12347',
            village: 'Pune Village',
            district: 'Pune',
            sarpanch: 'Amit Deshmukh',
            approvedDate: '2025-11-15',
            status: 'Verification Completed',
            ivaAssigned: 'IVA Officer 2',
            ivaEmail: 'iva2@pmajay.gov.in',
            assignedDate: '2025-11-17',
            verificationStatus: 'Verified',
            verificationDate: '2025-11-25',
            verificationReport: {
                rating: 'Satisfactory',
                remarks: 'All documents verified. Village infrastructure needs improvement.',
                recommendations: 'Proceed with project approval'
            }
        }
    ]);

    const [selectedApp, setSelectedApp] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIVA, setSelectedIVA] = useState('');

    // Mock IVA officers list
    const ivaOfficers = [
        { id: 'IVA-001', name: 'IVA Officer 1', email: 'iva1@pmajay.gov.in', district: 'Ahmednagar', activeAssignments: 3 },
        { id: 'IVA-002', name: 'IVA Officer 2', email: 'iva2@pmajay.gov.in', district: 'Nashik', activeAssignments: 2 },
        { id: 'IVA-003', name: 'IVA Officer 3', email: 'iva3@pmajay.gov.in', district: 'Pune', activeAssignments: 4 },
        { id: 'IVA-004', name: 'IVA Officer 4', email: 'iva4@pmajay.gov.in', district: 'Thane', activeAssignments: 1 }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            'Pending IVA Assignment': { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle },
            'Verification In Progress': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
            'Verification Completed': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
        };
        const badge = badges[status] || badges['Pending IVA Assignment'];
        const Icon = badge.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1 w-fit`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const handleAssignIVA = (app) => {
        setSelectedApp(app);
        setSelectedIVA('');
        setShowAssignModal(true);
    };

    const confirmAssignment = () => {
        if (!selectedIVA) {
            alert('Please select an IVA officer');
            return;
        }
        const officer = ivaOfficers.find(iva => iva.id === selectedIVA);
        setApplications(applications.map(app =>
            app.id === selectedApp.id
                ? {
                    ...app,
                    status: 'Verification In Progress',
                    ivaAssigned: officer.name,
                    ivaEmail: officer.email,
                    assignedDate: new Date().toISOString().split('T')[0],
                    verificationStatus: 'In Progress'
                }
                : app
        ));
        alert(`IVA ${officer.name} has been assigned to ${selectedApp.id}\n\nNotification email sent to ${officer.email}`);
        setShowAssignModal(false);
    };

    const viewReport = (app) => {
        if (!app.verificationReport) {
            alert('No verification report available for this application.');
            return;
        }
        setSelectedApp(app);
        setShowReportModal(true);
    };

    const handleForwardToCenter = () => {
        alert(`Application ${selectedApp.id} forwarded to PM-AJAY Center successfully!`);
        setShowReportModal(false);
        // Update status in local state
        setApplications(applications.map(app =>
            app.id === selectedApp.id ? { ...app, status: 'Forwarded to Center' } : app
        ));
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.village.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'Pending IVA Assignment').length,
        inProgress: applications.filter(a => a.status === 'Verification In Progress').length,
        completed: applications.filter(a => a.status === 'Verification Completed').length
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Verification Management</h1>
                <p className="text-sm text-gray-600 mt-1">Assign IVA officers and track verification progress for approved applications</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Assignment</p>
                            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <AlertCircle className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">In Progress</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Clock className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Completed</p>
                            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by application ID or village..."
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
                        <option value="Pending IVA Assignment">Pending Assignment</option>
                        <option value="Verification In Progress">In Progress</option>
                        <option value="Verification Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No applications found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((app) => (
                        <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                {/* Left Section */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{app.village}</h3>
                                                {getStatusBadge(app.status)}
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">Application ID: {app.id}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin size={16} className="text-orange-600" />
                                            <span className="font-medium">District:</span>
                                            <span className="text-gray-900">{app.district}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <UserPlus size={16} className="text-blue-600" />
                                            <span className="font-medium">Sarpanch:</span>
                                            <span className="text-gray-900">{app.sarpanch}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} className="text-green-600" />
                                            <span className="font-medium">Approved:</span>
                                            <span className="text-gray-900">{new Date(app.approvedDate).toLocaleDateString('en-IN')}</span>
                                        </div>
                                    </div>

                                    {/* IVA Assignment Info */}
                                    {app.ivaAssigned && (
                                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                <div>
                                                    <p className="text-blue-600 font-medium mb-1">Assigned IVA</p>
                                                    <p className="text-blue-900 font-semibold">{app.ivaAssigned}</p>
                                                </div>
                                                <div>
                                                    <p className="text-blue-600 font-medium mb-1">Contact</p>
                                                    <p className="text-blue-900">{app.ivaEmail}</p>
                                                </div>
                                                <div>
                                                    <p className="text-blue-600 font-medium mb-1">Assigned On</p>
                                                    <p className="text-blue-900">{new Date(app.assignedDate).toLocaleDateString('en-IN')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Verification Completed Info */}
                                    {app.verificationStatus === 'Verified' && (
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-green-600 font-medium text-sm mb-1">Verification Completed</p>
                                                    <p className="text-green-900 font-semibold">{new Date(app.verificationDate).toLocaleDateString('en-IN')}</p>
                                                </div>
                                                <CheckCircle className="text-green-600" size={24} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Section - Actions */}
                                <div className="flex flex-col gap-3 lg:w-48">
                                    {app.status === 'Pending IVA Assignment' && (
                                        <button
                                            onClick={() => handleAssignIVA(app)}
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                                        >
                                            <UserPlus size={18} />
                                            Assign IVA
                                        </button>
                                    )}
                                    {app.verificationStatus === 'Verified' && (
                                        <button
                                            onClick={() => viewReport(app)}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Eye size={18} />
                                            View Report
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(`/state/applications/${app.id}`)}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                    >
                                        <FileText size={18} />
                                        View Application
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Assign IVA Modal */}
            {showAssignModal && selectedApp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <UserPlus size={32} />
                                <div>
                                    <h2 className="text-2xl font-bold">Assign IVA Officer</h2>
                                    <p className="text-blue-100 mt-1">Select an IVA officer for field verification</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-2">Application Details</p>
                                <p className="font-semibold text-gray-900">{selectedApp.id}</p>
                                <p className="text-sm text-gray-700">Village: {selectedApp.village}, {selectedApp.district}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Select IVA Officer *</label>
                                <div className="space-y-3">
                                    {ivaOfficers.map((iva) => (
                                        <div
                                            key={iva.id}
                                            onClick={() => setSelectedIVA(iva.id)}
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedIVA === iva.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{iva.name}</p>
                                                    <p className="text-sm text-gray-600">{iva.email}</p>
                                                    <p className="text-sm text-gray-600 mt-1">District: {iva.district}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Active Assignments</p>
                                                    <p className="text-2xl font-bold text-blue-600">{iva.activeAssignments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAssignment}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                            >
                                <UserPlus size={18} />
                                Confirm Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Report Modal */}
            {showReportModal && selectedApp && selectedApp.verificationReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Verification Report</h2>
                                <p className="text-sm text-gray-600 mt-1">{selectedApp.id}</p>
                            </div>
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Verified By</p>
                                    <p className="font-semibold text-gray-900">{selectedApp.ivaAssigned}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Verification Date</p>
                                    <p className="font-semibold text-gray-900">{new Date(selectedApp.verificationDate).toLocaleDateString('en-IN')}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <p className="text-sm font-medium text-green-900 mb-1">Overall Rating</p>
                                <p className="text-2xl font-bold text-green-600">{selectedApp.verificationReport.rating}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Remarks</h3>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApp.verificationReport.remarks}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
                                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">{selectedApp.verificationReport.recommendations}</p>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleForwardToCenter}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                            >
                                Forward to PM-AJAY
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
