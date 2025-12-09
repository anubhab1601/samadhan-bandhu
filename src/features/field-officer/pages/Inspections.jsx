import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Eye, FileText, CheckCircle, AlertCircle, Calendar, Camera, TrendingUp } from 'lucide-react';

export default function Inspections() {
    const navigate = useNavigate();

    const [inspections, setInspections] = useState([
        {
            id: 'INS-2025-001',
            projectTitle: 'School Building Renovation',
            projectId: 'PROJ-2025-001',
            sarpanchName: 'Ramesh Patil',
            village: 'Shirdi',
            district: 'Ahmednagar',
            scheduledDate: '2025-12-03',
            priority: 'High',
            status: 'Pending',
            inspectionType: 'Progress Inspection',
            progress: 25,
            contractValue: 3300000
        },
        {
            id: 'INS-2025-002',
            projectTitle: 'Community Hall Construction',
            projectId: 'PROJ-2025-002',
            sarpanchName: 'Sunita Deshmukh',
            village: 'Nashik Village',
            district: 'Nashik',
            scheduledDate: '2025-12-05',
            priority: 'Medium',
            status: 'Scheduled',
            inspectionType: 'Quality Check',
            progress: 50,
            contractValue: 5000000
        },
        {
            id: 'INS-2025-003',
            projectTitle: 'Road Development',
            projectId: 'PROJ-2025-003',
            sarpanchName: 'Vijay Kumar',
            village: 'Thane Village',
            district: 'Thane',
            scheduledDate: '2025-11-28',
            priority: 'Low',
            status: 'Completed',
            inspectionType: 'Final Inspection',
            progress: 100,
            contractValue: 7500000
        }
    ]);

    const [selectedInspection, setSelectedInspection] = useState(null);
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
            'Scheduled': 'bg-blue-100 text-blue-700',
            'Completed': 'bg-green-100 text-green-700'
        };
        return colors[status] || colors['Pending'];
    };

    const filteredInspections = inspections.filter(inspection => {
        const matchesSearch = inspection.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.village.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || inspection.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || inspection.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = {
        total: inspections.length,
        pending: inspections.filter(i => i.status === 'Pending').length,
        scheduled: inspections.filter(i => i.status === 'Scheduled').length,
        completed: inspections.filter(i => i.status === 'Completed').length
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-4">
            {/* Page Header - Mobile Optimized */}
            <div className="bg-white border-l-4 border-l-orange-500 p-3 md:p-4 rounded-r-lg shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Field Inspections</h1>
                <p className="text-xs md:text-sm text-gray-600 mt-1">View and manage your inspection assignments</p>
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
                            <p className="text-xs text-gray-600 mb-1">Scheduled</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.scheduled}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Calendar className="text-blue-600" size={20} />
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
                        placeholder="Search by project, ID, or village..."
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
                            <option value="Scheduled">Scheduled</option>
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

            {/* Inspections List - Mobile Cards */}
            {filteredInspections.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={40} />
                    <p className="text-gray-500 text-sm md:text-base">No inspections found</p>
                </div>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {filteredInspections.map((inspection) => (
                        <div key={inspection.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{inspection.projectTitle}</h3>
                                    <p className="text-xs md:text-sm text-blue-600 font-medium">ID: {inspection.id}</p>
                                    <p className="text-xs text-gray-600">Project: {inspection.projectId}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end ml-2">
                                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getPriorityColor(inspection.priority)}`}>
                                        {inspection.priority}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(inspection.status)}`}>
                                        {inspection.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                    <span className="break-words">{inspection.village}, {inspection.district}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                    <Calendar size={14} className="flex-shrink-0" />
                                    <span>Scheduled: {new Date(inspection.scheduledDate).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                    <FileText size={14} className="flex-shrink-0" />
                                    <span>{inspection.inspectionType}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">Project Progress</span>
                                    <span className="font-semibold text-gray-900">{inspection.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                        style={{ width: `${inspection.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedInspection(inspection);
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

            {/* Details Modal - Mobile Bottom Sheet */}
            {showDetailsModal && selectedInspection && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
                    <div className="bg-white rounded-t-2xl md:rounded-lg shadow-xl w-full md:max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">{selectedInspection.projectTitle}</h2>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">{selectedInspection.id}</p>
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
                                <span className={`px-3 py-1 text-xs md:text-sm rounded-full ${getPriorityColor(selectedInspection.priority)}`}>
                                    {selectedInspection.priority} Priority
                                </span>
                                <span className={`px-3 py-1 text-xs md:text-sm rounded-full ${getStatusColor(selectedInspection.status)}`}>
                                    {selectedInspection.status}
                                </span>
                            </div>

                            {/* Project Details */}
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg space-y-3">
                                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Project Information</h3>
                                <div className="space-y-2 text-xs md:text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Project ID:</span>
                                        <span className="font-medium text-gray-900">{selectedInspection.projectId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sarpanch:</span>
                                        <span className="font-medium text-gray-900">{selectedInspection.sarpanchName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-medium text-gray-900">{selectedInspection.village}, {selectedInspection.district}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Contract Value:</span>
                                        <span className="font-medium text-gray-900">₹{(selectedInspection.contractValue / 100000).toFixed(2)}L</span>
                                    </div>
                                </div>
                            </div>

                            {/* Inspection Details */}
                            <div className="bg-blue-50 p-3 md:p-4 rounded-lg space-y-2">
                                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Inspection Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                                    <div>
                                        <p className="text-gray-600">Type</p>
                                        <p className="font-medium text-gray-900">{selectedInspection.inspectionType}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Scheduled Date</p>
                                        <p className="font-medium text-gray-900">{new Date(selectedInspection.scheduledDate).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Project Progress</p>
                                        <p className="font-medium text-gray-900">{selectedInspection.progress}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Status</p>
                                        <p className="font-medium text-gray-900">{selectedInspection.status}</p>
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
                            {selectedInspection.status !== 'Completed' && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        navigate(`/field-officer/inspections/${selectedInspection.id}/form`);
                                    }}
                                    className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm md:text-base"
                                >
                                    Submit Report
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
