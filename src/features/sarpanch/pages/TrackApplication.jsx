import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search, FileText, Eye, CheckCircle, XCircle, Clock,
    MapPin, User, Phone, Mail, Download, AlertCircle,
    Building, Users, Briefcase, TrendingUp, DollarSign, Calendar, ArrowLeft
} from 'lucide-react';

export default function TrackApplication() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    // Mock data for all applications
    const allApplications = [
        {
            id: 'PMAJAY-2025-MH-12345',
            title: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: '2025-11-20',
            currentStage: 3,
            currentStageName: 'IVA Verification',
            status: 'in-progress',
            budget: 5000000,
            progress: 30
        },
        {
            id: 'PMAJAY-2025-MH-12346',
            title: 'School Building Renovation',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: '2025-11-15',
            currentStage: 5,
            currentStageName: 'PM-AJAY Approval',
            status: 'in-progress',
            budget: 3000000,
            progress: 50
        },
        {
            id: 'PMAJAY-2025-MH-12347',
            title: 'Water Supply System',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: '2025-11-10',
            currentStage: 8,
            currentStageName: 'Work in Progress',
            status: 'in-progress',
            budget: 7000000,
            progress: 80
        },
        {
            id: 'PMAJAY-2025-MH-12348',
            title: 'Road Development',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: '2025-10-25',
            currentStage: 10,
            currentStageName: 'Project Completed',
            status: 'completed',
            budget: 4500000,
            progress: 100
        },
        {
            id: 'PMAJAY-2025-MH-12349',
            title: 'Community Center',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: '2025-11-25',
            currentStage: 2,
            currentStageName: 'State Review',
            status: 'in-progress',
            budget: 6000000,
            progress: 20
        }
    ];

    // Detailed timeline data
    const getDetailedTimeline = (appId) => {
        return {
            id: appId,
            title: allApplications.find(a => a.id === appId)?.title || 'Project',
            village: 'Shirdi',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            submittedDate: allApplications.find(a => a.id === appId)?.submittedDate || '2025-11-20',
            currentStage: allApplications.find(a => a.id === appId)?.currentStage || 3,
            estimatedCompletion: '2026-06-15',
            budget: allApplications.find(a => a.id === appId)?.budget || 5000000,
            timeline: [
                {
                    id: 1,
                    name: 'Application Submitted',
                    status: 'completed',
                    date: '2025-11-20 10:30 AM',
                    icon: FileText,
                    color: 'green',
                    description: 'Application successfully submitted by Sarpanch',
                    officer: {
                        name: 'Ramesh Patil',
                        role: 'Sarpanch',
                        phone: '+91 98765 43210',
                        email: 'ramesh.patil@example.com'
                    },
                    documents: [
                        { name: 'Application Form.pdf', size: '2.3 MB' },
                        { name: 'Site Photos.zip', size: '15.8 MB' }
                    ]
                },
                {
                    id: 2,
                    name: 'State Review',
                    status: 'completed',
                    date: '2025-11-22 02:15 PM',
                    icon: Eye,
                    color: 'green',
                    description: 'Application reviewed and approved by State Officer',
                    officer: {
                        name: 'Priya Sharma',
                        role: 'State Officer',
                        phone: '+91 98765 43211',
                        email: 'priya.sharma@pmajay.gov.in'
                    },
                    comments: 'Application meets all criteria. Forwarded to IVA for verification.',
                    documents: [
                        { name: 'State Approval Letter.pdf', size: '1.2 MB' }
                    ]
                },
                {
                    id: 3,
                    name: 'IVA Verification',
                    status: 'in-progress',
                    date: '2025-11-25',
                    estimatedDate: '2025-12-05',
                    icon: CheckCircle,
                    color: 'blue',
                    description: 'Independent Verification Agency conducting verification',
                    officer: {
                        name: 'Amit Kumar',
                        role: 'IVA Officer',
                        phone: '+91 98765 43212',
                        email: 'amit.kumar@iva.gov.in'
                    },
                    comments: 'Verification in progress. Site visit scheduled for Dec 3, 2025.'
                },
                {
                    id: 4,
                    name: 'Field Verification',
                    status: 'pending',
                    estimatedDate: '2025-12-10',
                    icon: MapPin,
                    color: 'gray',
                    description: 'Field Officer will conduct on-site inspection',
                    officer: {
                        name: 'To be assigned',
                        role: 'Field Officer'
                    }
                },
                {
                    id: 5,
                    name: 'PM-AJAY Approval',
                    status: 'pending',
                    estimatedDate: '2025-12-20',
                    icon: Building,
                    color: 'gray',
                    description: 'Final approval from PM-AJAY Center',
                    officer: {
                        name: 'To be assigned',
                        role: 'PM-AJAY Officer'
                    }
                },
                {
                    id: 6,
                    name: 'Tender Released',
                    status: 'pending',
                    estimatedDate: '2026-01-05',
                    icon: Briefcase,
                    color: 'gray',
                    description: 'Tender will be released for agency applications'
                },
                {
                    id: 7,
                    name: 'Agency Selected',
                    status: 'pending',
                    estimatedDate: '2026-01-20',
                    icon: Users,
                    color: 'gray',
                    description: 'Committee will select the winning agency'
                },
                {
                    id: 8,
                    name: 'Work in Progress',
                    status: 'pending',
                    estimatedDate: '2026-02-01',
                    icon: TrendingUp,
                    color: 'gray',
                    description: 'Construction work will begin'
                },
                {
                    id: 9,
                    name: 'Inspection Completed',
                    status: 'pending',
                    estimatedDate: '2026-05-15',
                    icon: Eye,
                    color: 'gray',
                    description: 'Final inspection by Field Officer'
                },
                {
                    id: 10,
                    name: 'Project Completed',
                    status: 'pending',
                    estimatedDate: '2026-06-15',
                    icon: CheckCircle,
                    color: 'gray',
                    description: 'Project successfully completed'
                }
            ]
        };
    };

    const filteredApplications = allApplications.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (appId) => {
        const details = getDetailedTimeline(appId);
        setSelectedApp(details);
    };

    const handleBack = () => {
        setSelectedApp(null);
    };

    const getStatusColor = (status) => {
        const colors = {
            'completed': 'bg-green-100 text-green-700 border-green-300',
            'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
            'pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'rejected': 'bg-red-100 text-red-700 border-red-300'
        };
        return colors[status] || colors['pending'];
    };

    const getStageColor = (status) => {
        const colors = {
            'completed': 'bg-green-500',
            'in-progress': 'bg-blue-500',
            'pending': 'bg-gray-300',
            'rejected': 'bg-red-500'
        };
        return colors[status] || colors['pending'];
    };

    const formatCurrency = (amount) => {
        return `₹${(amount / 100000).toFixed(2)}L`;
    };

    // If viewing detailed timeline
    if (selectedApp) {
        const progressPercentage = (selectedApp.currentStage / selectedApp.timeline.length) * 100;

        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Back to All Applications
                </button>

                {/* Application Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedApp.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Application ID: <span className="font-semibold text-orange-600">{selectedApp.id}</span>
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedApp.timeline[selectedApp.currentStage - 1].status)}`}>
                            {selectedApp.timeline[selectedApp.currentStage - 1].name}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600">Village</p>
                            <p className="font-semibold text-gray-900">{selectedApp.village}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600">District</p>
                            <p className="font-semibold text-gray-900">{selectedApp.district}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600">Submitted On</p>
                            <p className="font-semibold text-gray-900">{new Date(selectedApp.submittedDate).toLocaleDateString('en-IN')}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600">Estimated Budget</p>
                            <p className="font-semibold text-gray-900">{formatCurrency(selectedApp.budget)}</p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Overall Progress</h3>
                        <span className="text-sm text-gray-600">
                            {selectedApp.currentStage} of {selectedApp.timeline.length} stages completed
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Flipkart-style Timeline */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Application Timeline</h3>

                    <div className="space-y-8">
                        {selectedApp.timeline.map((stage, index) => {
                            const Icon = stage.icon;
                            const isLast = index === selectedApp.timeline.length - 1;

                            return (
                                <div key={stage.id} className="relative">
                                    {/* Connecting Line */}
                                    {!isLast && (
                                        <div className={`absolute left-6 top-14 bottom-0 w-0.5 ${stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                                            }`}></div>
                                    )}

                                    <div className="flex gap-4">
                                        {/* Icon Circle */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStageColor(stage.status)} text-white relative z-10`}>
                                            {stage.status === 'completed' ? (
                                                <CheckCircle size={24} />
                                            ) : stage.status === 'in-progress' ? (
                                                <Clock size={24} className="animate-pulse" />
                                            ) : stage.status === 'rejected' ? (
                                                <XCircle size={24} />
                                            ) : (
                                                <Icon size={24} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-lg">{stage.name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(stage.status)}`}>
                                                        {stage.status.replace('-', ' ').toUpperCase()}
                                                    </span>
                                                </div>

                                                {/* Date */}
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                                                    <Clock size={14} />
                                                    {stage.date ? (
                                                        <span>Completed on: <strong>{stage.date}</strong></span>
                                                    ) : stage.estimatedDate ? (
                                                        <span>Estimated: <strong>{stage.estimatedDate}</strong></span>
                                                    ) : (
                                                        <span>Pending</span>
                                                    )}
                                                </div>

                                                {/* Officer Info */}
                                                {stage.officer && (
                                                    <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                                                        <p className="text-xs text-gray-600 mb-2">Assigned Officer</p>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                                <User size={20} className="text-orange-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-gray-900">{stage.officer.name}</p>
                                                                <p className="text-xs text-gray-600">{stage.officer.role}</p>
                                                            </div>
                                                            {stage.officer.phone && (
                                                                <div className="flex gap-2">
                                                                    <a href={`tel:${stage.officer.phone}`} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                                                                        <Phone size={16} />
                                                                    </a>
                                                                    {stage.officer.email && (
                                                                        <a href={`mailto:${stage.officer.email}`} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                                                            <Mail size={16} />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Comments */}
                                                {stage.comments && (
                                                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                        <p className="text-xs text-blue-600 font-semibold mb-1">Comments:</p>
                                                        <p className="text-sm text-gray-700">{stage.comments}</p>
                                                    </div>
                                                )}

                                                {/* Documents */}
                                                {stage.documents && stage.documents.length > 0 && (
                                                    <div className="mt-3">
                                                        <p className="text-xs text-gray-600 mb-2">Documents:</p>
                                                        <div className="space-y-2">
                                                            {stage.documents.map((doc, idx) => (
                                                                <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText size={16} className="text-gray-600" />
                                                                        <span className="text-sm text-gray-900">{doc.name}</span>
                                                                        <span className="text-xs text-gray-500">({doc.size})</span>
                                                                    </div>
                                                                    <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                                                                        <Download size={16} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-orange-600 flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-semibold text-orange-900 mb-2">Need Help?</h4>
                            <p className="text-sm text-orange-800 mb-3">
                                If you have any questions about your application status, please contact the assigned officer at the current stage.
                            </p>
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-semibold">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default view - Show all applications as cards
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <MapPin size={32} />
                    Track Application Status
                </h1>
                <p className="text-orange-100">View and track the status of all your applications</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{allApplications.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{allApplications.filter(a => a.status === 'in-progress').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{allApplications.filter(a => a.status === 'completed').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Average Progress</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {Math.round(allApplications.reduce((sum, a) => sum + a.progress, 0) / allApplications.length)}%
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Application ID or Project Title..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredApplications.map((app) => (
                    <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{app.title}</h3>
                                <p className="text-sm text-orange-600 font-semibold">{app.id}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                {app.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </span>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin size={14} />
                                <span>{app.village}, {app.district}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={14} />
                                <span>Submitted: {new Date(app.submittedDate).toLocaleDateString('en-IN')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <DollarSign size={14} />
                                <span>Budget: {formatCurrency(app.budget)}</span>
                            </div>
                        </div>

                        {/* Current Stage */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p className="text-xs text-blue-600 font-semibold mb-1">Current Stage:</p>
                            <p className="text-sm font-semibold text-blue-900">{app.currentStageName}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-600">Progress</p>
                                <p className="text-xs font-semibold text-gray-900">{app.progress}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${app.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* View Details Button */}
                        <button
                            onClick={() => handleViewDetails(app.id)}
                            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold flex items-center justify-center gap-2"
                        >
                            <Eye size={18} />
                            View Detailed Timeline
                        </button>
                    </div>
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                    <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No applications found</p>
                </div>
            )}
        </div>
    );
}
