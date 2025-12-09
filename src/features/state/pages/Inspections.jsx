import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, UserPlus, Eye, CheckCircle, Clock, AlertCircle, MapPin, FileText } from 'lucide-react';

export default function Inspections() {
    const navigate = useNavigate();
    const [inspections, setInspections] = useState([
        {
            id: 'INS-2025-001',
            projectId: 'PROJ-2025-001',
            projectTitle: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            scheduledDate: '2025-12-20',
            status: 'Scheduled',
            officer: 'Field Officer 1',
            officerEmail: 'fo1@pmajay.gov.in',
            type: 'Progress Inspection',
            priority: 'Medium',
            report: null
        },
        {
            id: 'INS-2025-002',
            projectId: 'PROJ-2025-002',
            projectTitle: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            scheduledDate: '2025-12-15',
            status: 'Scheduled',
            officer: 'Field Officer 2',
            officerEmail: 'fo2@pmajay.gov.in',
            type: 'Progress Inspection',
            priority: 'High',
            report: null
        },
        {
            id: 'INS-2025-003',
            projectId: 'PROJ-2025-003',
            projectTitle: 'Water Supply System',
            village: 'Pune Village',
            district: 'Pune',
            scheduledDate: '2025-11-25',
            status: 'Completed',
            officer: 'Field Officer 3',
            officerEmail: 'fo3@pmajay.gov.in',
            type: 'Progress Inspection',
            priority: 'High',
            completedDate: '2025-11-25',
            report: {
                rating: 'Satisfactory',
                progress: 29,
                remarks: 'Work is progressing but slightly behind schedule. Quality of work is good.',
                issues: 'Minor delay due to material shortage',
                recommendations: 'Expedite material procurement'
            }
        },
        {
            id: 'INS-2025-004',
            projectId: 'PROJ-2025-001',
            projectTitle: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            scheduledDate: '2025-11-20',
            status: 'Completed',
            officer: 'Field Officer 1',
            officerEmail: 'fo1@pmajay.gov.in',
            type: 'Initial Inspection',
            priority: 'Medium',
            completedDate: '2025-11-20',
            report: {
                rating: 'Good',
                progress: 35,
                remarks: 'Foundation work completed as per specifications. Quality is excellent.',
                issues: 'None',
                recommendations: 'Continue as planned'
            }
        }
    ]);

    const [selectedInspection, setSelectedInspection] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for scheduling
    const [scheduleForm, setScheduleForm] = useState({
        projectId: '',
        scheduledDate: '',
        officer: '',
        type: 'Progress Inspection',
        priority: 'Medium',
        notes: ''
    });

    const fieldOfficers = [
        { id: 'FO-001', name: 'Field Officer 1', email: 'fo1@pmajay.gov.in', district: 'Ahmednagar' },
        { id: 'FO-002', name: 'Field Officer 2', email: 'fo2@pmajay.gov.in', district: 'Nashik' },
        { id: 'FO-003', name: 'Field Officer 3', email: 'fo3@pmajay.gov.in', district: 'Pune' }
    ];

    const districts = ['Ahmednagar', 'Nashik', 'Pune', 'Thane', 'Mumbai'];

    const getStatusBadge = (status) => {
        const badges = {
            'Scheduled': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
            'Completed': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            'Overdue': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle }
        };
        const badge = badges[status] || badges['Scheduled'];
        const Icon = badge.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1 w-fit`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'text-red-600 bg-red-50',
            'Medium': 'text-orange-600 bg-orange-50',
            'Low': 'text-green-600 bg-green-50'
        };
        return colors[priority] || colors['Medium'];
    };

    const filteredInspections = inspections.filter(inspection => {
        const matchesSearch = inspection.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inspection.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || inspection.status === filterStatus;
        const matchesDistrict = filterDistrict === 'all' || inspection.district === filterDistrict;
        return matchesSearch && matchesStatus && matchesDistrict;
    });

    const stats = {
        total: inspections.length,
        scheduled: inspections.filter(i => i.status === 'Scheduled').length,
        completed: inspections.filter(i => i.status === 'Completed').length,
        overdue: inspections.filter(i => i.status === 'Overdue').length
    };

    const viewReport = (inspection) => {
        setSelectedInspection(inspection);
        setShowReportModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-orange-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inspection Management</h1>
                        <p className="text-sm text-gray-600 mt-1">Schedule and track field inspections for ongoing projects</p>
                    </div>
                    <button
                        onClick={() => setShowScheduleModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    >
                        <Calendar size={18} />
                        Schedule Inspection
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Inspections</p>
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
                            <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Overdue</p>
                            <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by project, village, or inspection ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filterDistrict}
                        onChange={(e) => setFilterDistrict(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Districts</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Inspections List */}
            {filteredInspections.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No inspections found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredInspections.map((inspection) => (
                        <div key={inspection.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{inspection.projectTitle}</h3>
                                                {getStatusBadge(inspection.status)}
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(inspection.priority)}`}>
                                                    {inspection.priority} Priority
                                                </span>
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">Inspection ID: {inspection.id}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin size={16} className="text-orange-600" />
                                            <span className="font-medium">Location:</span>
                                            <span className="text-gray-900">{inspection.village}, {inspection.district}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} className="text-blue-600" />
                                            <span className="font-medium">Scheduled:</span>
                                            <span className="text-gray-900">{new Date(inspection.scheduledDate).toLocaleDateString('en-IN')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <UserPlus size={16} className="text-green-600" />
                                            <span className="font-medium">Officer:</span>
                                            <span className="text-gray-900">{inspection.officer}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FileText size={16} className="text-purple-600" />
                                            <span className="font-medium">Type:</span>
                                            <span className="text-gray-900">{inspection.type}</span>
                                        </div>
                                    </div>

                                    {inspection.status === 'Completed' && inspection.report && (
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-green-600 font-medium text-sm mb-1">Inspection Completed</p>
                                                    <p className="text-green-900 font-semibold">{new Date(inspection.completedDate).toLocaleDateString('en-IN')}</p>
                                                </div>
                                                <CheckCircle className="text-green-600" size={24} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-3 lg:w-48">
                                    {inspection.status === 'Completed' && inspection.report && (
                                        <button
                                            onClick={() => viewReport(inspection)}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Eye size={18} />
                                            View Report
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate('/state/projects')}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                    >
                                        <FileText size={18} />
                                        View Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Schedule Inspection Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <Calendar size={32} />
                                <div>
                                    <h2 className="text-2xl font-bold">Schedule Inspection</h2>
                                    <p className="text-blue-100 mt-1">Assign field officer for project inspection</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project ID *</label>
                                    <input
                                        type="text"
                                        placeholder="PROJ-2025-XXX"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Date *</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Type *</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Progress Inspection</option>
                                        <option>Initial Inspection</option>
                                        <option>Final Inspection</option>
                                        <option>Quality Check</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Field Officer *</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Select Officer</option>
                                    {fieldOfficers.map(officer => (
                                        <option key={officer.id} value={officer.id}>
                                            {officer.name} - {officer.district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                                <textarea
                                    rows="3"
                                    placeholder="Add any special instructions or notes..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Inspection scheduled successfully!\n\nNotification sent to field officer.');
                                    setShowScheduleModal(false);
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                            >
                                <Calendar size={18} />
                                Schedule Inspection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Report Modal */}
            {showReportModal && selectedInspection && selectedInspection.report && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Inspection Report</h2>
                                <p className="text-sm text-gray-600 mt-1">{selectedInspection.id}</p>
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
                                    <p className="text-sm text-gray-600 mb-1">Inspected By</p>
                                    <p className="font-semibold text-gray-900">{selectedInspection.officer}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Inspection Date</p>
                                    <p className="font-semibold text-gray-900">{new Date(selectedInspection.completedDate).toLocaleDateString('en-IN')}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <p className="text-sm font-medium text-green-900 mb-1">Overall Rating</p>
                                <p className="text-2xl font-bold text-green-600">{selectedInspection.report.rating}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress Status</h3>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600 mb-2">Project Completion</p>
                                    <p className="text-3xl font-bold text-blue-900">{selectedInspection.report.progress}%</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Remarks</h3>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedInspection.report.remarks}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Issues Identified</h3>
                                <p className="text-gray-700 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">{selectedInspection.report.issues}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
                                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">{selectedInspection.report.recommendations}</p>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
