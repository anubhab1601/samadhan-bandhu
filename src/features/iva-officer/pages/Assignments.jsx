import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, User, Phone, Home, CheckCircle, AlertCircle, Eye, FileText } from 'lucide-react';

export default function Assignments() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([
        {
            id: 'VER-2025-001',
            applicantName: 'Rajesh Kumar',
            applicationId: 'APP-2025-123',
            village: 'Shirdi',
            district: 'Ahmednagar',
            phone: '+91 98765 43210',
            address: 'Plot No. 45, Main Road, Shirdi',
            assignedDate: '2025-11-28',
            deadline: '2025-12-05',
            priority: 'High',
            status: 'Pending',
            projectType: 'Community Hall',
            estimatedBudget: 5000000
        },
        {
            id: 'VER-2025-002',
            applicantName: 'Priya Sharma',
            applicationId: 'APP-2025-124',
            village: 'Nashik Village',
            district: 'Nashik',
            phone: '+91 98765 43211',
            address: 'House No. 12, Gandhi Chowk',
            assignedDate: '2025-11-26',
            deadline: '2025-12-03',
            priority: 'Medium',
            status: 'In Progress',
            projectType: 'Road Development',
            estimatedBudget: 7500000
        },
        {
            id: 'VER-2025-003',
            applicantName: 'Amit Patel',
            applicationId: 'APP-2025-125',
            village: 'Thane Village',
            district: 'Thane',
            phone: '+91 98765 43212',
            address: 'Sector 5, Near Temple',
            assignedDate: '2025-11-24',
            deadline: '2025-12-01',
            priority: 'Low',
            status: 'Completed',
            projectType: 'School Renovation',
            estimatedBudget: 3300000
        }
    ]);

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = assignment.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.village.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || assignment.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = {
        total: assignments.length,
        pending: assignments.filter(a => a.status === 'Pending').length,
        inProgress: assignments.filter(a => a.status === 'In Progress').length,
        completed: assignments.filter(a => a.status === 'Completed').length
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-4">
            {/* Page Header - Mobile Optimized */}
            <div className="bg-white border-l-4 border-l-orange-500 p-3 md:p-4 rounded-r-lg shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Verification Assignments</h1>
                <p className="text-xs md:text-sm text-gray-600 mt-1">View and manage your assigned verifications</p>
            </div>

            {/* Statistics - Mobile Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Total</p>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Pending</p>
                            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="text-yellow-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">In Progress</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <AlertCircle className="text-blue-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Completed</p>
                            <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.completed}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters - Mobile Stacked */}
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or village..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400" size={18} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>

            {/* Assignments List - Mobile Cards */}
            {filteredAssignments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={40} />
                    <p className="text-gray-500 text-sm md:text-base">No assignments found</p>
                </div>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {filteredAssignments.map((assignment) => (
                        <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{assignment.applicantName}</h3>
                                    <p className="text-xs md:text-sm text-blue-600 font-medium">ID: {assignment.id}</p>
                                    <p className="text-xs text-gray-600">App: {assignment.applicationId}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end ml-2">
                                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getPriorityColor(assignment.priority)}`}>
                                        {assignment.priority}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(assignment.status)}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                    <span className="break-words">{assignment.village}, {assignment.district}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                    <Clock size={14} className="flex-shrink-0" />
                                    <span>Deadline: {new Date(assignment.deadline).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                    <FileText size={14} className="flex-shrink-0" />
                                    <span>{assignment.projectType}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedAssignment(assignment);
                                    setShowDetailsModal(true);
                                }}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center justify-center gap-2"
                            >
                                <Eye size={16} />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Modal - Mobile Optimized */}
            {showDetailsModal && selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
                    <div className="bg-white rounded-t-2xl md:rounded-lg shadow-xl w-full md:max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">{selectedAssignment.applicantName}</h2>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">{selectedAssignment.id}</p>
                                </div>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                            {/* Status Badges */}
                            <div className="flex gap-2">
                                <span className={`px-3 py-1 text-xs md:text-sm rounded-full ${getPriorityColor(selectedAssignment.priority)}`}>
                                    {selectedAssignment.priority} Priority
                                </span>
                                <span className={`px-3 py-1 text-xs md:text-sm rounded-full ${getStatusColor(selectedAssignment.status)}`}>
                                    {selectedAssignment.status}
                                </span>
                            </div>

                            {/* Applicant Details */}
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg space-y-3">
                                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Applicant Information</h3>
                                <div className="space-y-2 text-xs md:text-sm">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-600" />
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-900">{selectedAssignment.applicantName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-gray-600" />
                                        <span className="text-gray-600">Phone:</span>
                                        <a href={`tel:${selectedAssignment.phone}`} className="font-medium text-blue-600">{selectedAssignment.phone}</a>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Home size={16} className="text-gray-600 mt-0.5" />
                                        <span className="text-gray-600">Address:</span>
                                        <span className="font-medium text-gray-900 flex-1">{selectedAssignment.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-600" />
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-medium text-gray-900">{selectedAssignment.village}, {selectedAssignment.district}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="bg-blue-50 p-3 md:p-4 rounded-lg space-y-2">
                                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Project Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                                    <div>
                                        <p className="text-gray-600">Project Type</p>
                                        <p className="font-medium text-gray-900">{selectedAssignment.projectType}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Estimated Budget</p>
                                        <p className="font-medium text-gray-900">₹{(selectedAssignment.estimatedBudget / 100000).toFixed(2)}L</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Assigned Date</p>
                                        <p className="font-medium text-gray-900">{new Date(selectedAssignment.assignedDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Deadline</p>
                                        <p className="font-medium text-red-600">{new Date(selectedAssignment.deadline).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 md:p-6 flex flex-col md:flex-row gap-3">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="flex-1 px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-sm md:text-base"
                            >
                                Close
                            </button>
                            {selectedAssignment.status !== 'Completed' && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        navigate(`/iva-officer/verifications/village/${selectedAssignment.applicationId}`);
                                    }}
                                    className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm md:text-base"
                                >
                                    Submit Verification
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
