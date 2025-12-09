import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Search, Filter, Download, Eye, CheckCircle, Clock, AlertCircle, TrendingUp, Calendar, ArrowLeft, FileText } from 'lucide-react';

export default function FundTracking() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 'PROJ-2025-001',
            name: 'Community Hall Construction',
            applicationId: 'PMAJAY-2025-MH-12345',
            totalBudget: 5000000,
            releasedAmount: 3000000,
            pendingAmount: 2000000,
            status: 'in-progress',
            agency: 'ABC Constructions Pvt Ltd',
            releasePercentage: 60,
            installments: [
                {
                    number: 1,
                    amount: 1500000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-12-01',
                    transactionId: 'TXN123456789',
                    remarks: 'First installment released after tender finalization'
                },
                {
                    number: 2,
                    amount: 1500000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-12-15',
                    transactionId: 'TXN123456790',
                    remarks: 'Second installment released after 30% work completion'
                },
                {
                    number: 3,
                    amount: 1500000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-01-15',
                    remarks: 'Will be released after 60% work completion'
                },
                {
                    number: 4,
                    amount: 500000,
                    percentage: 10,
                    status: 'pending',
                    estimatedDate: '2026-02-15',
                    remarks: 'Final installment after project completion'
                }
            ]
        },
        {
            id: 'PROJ-2025-002',
            name: 'School Building Renovation',
            applicationId: 'PMAJAY-2025-MH-12346',
            totalBudget: 3000000,
            releasedAmount: 3000000,
            pendingAmount: 0,
            status: 'completed',
            agency: 'XYZ Builders',
            releasePercentage: 100,
            installments: [
                {
                    number: 1,
                    amount: 900000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-10-01',
                    transactionId: 'TXN123456791'
                },
                {
                    number: 2,
                    amount: 900000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-10-20',
                    transactionId: 'TXN123456792'
                },
                {
                    number: 3,
                    amount: 900000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-11-10',
                    transactionId: 'TXN123456793'
                },
                {
                    number: 4,
                    amount: 300000,
                    percentage: 10,
                    status: 'released',
                    releaseDate: '2025-11-25',
                    transactionId: 'TXN123456794'
                }
            ]
        },
        {
            id: 'PROJ-2025-003',
            name: 'Water Supply System',
            applicationId: 'PMAJAY-2025-MH-12347',
            totalBudget: 7000000,
            releasedAmount: 0,
            pendingAmount: 7000000,
            status: 'approved',
            agency: 'PQR Infrastructure',
            releasePercentage: 0,
            installments: [
                {
                    number: 1,
                    amount: 2100000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-01-05',
                    remarks: 'Awaiting work commencement'
                },
                {
                    number: 2,
                    amount: 2100000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-02-05'
                },
                {
                    number: 3,
                    amount: 2100000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-03-05'
                },
                {
                    number: 4,
                    amount: 700000,
                    percentage: 10,
                    status: 'pending',
                    estimatedDate: '2026-04-05'
                }
            ]
        },
        {
            id: 'PROJ-2025-004',
            name: 'Road Development',
            applicationId: 'PMAJAY-2025-MH-12348',
            totalBudget: 4500000,
            releasedAmount: 1350000,
            pendingAmount: 3150000,
            status: 'in-progress',
            agency: 'LMN Contractors',
            releasePercentage: 30,
            installments: [
                {
                    number: 1,
                    amount: 1350000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-11-28',
                    transactionId: 'TXN123456795',
                    remarks: 'First installment released'
                },
                {
                    number: 2,
                    amount: 1350000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-01-10'
                },
                {
                    number: 3,
                    amount: 1350000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-02-10'
                },
                {
                    number: 4,
                    amount: 450000,
                    percentage: 10,
                    status: 'pending',
                    estimatedDate: '2026-03-10'
                }
            ]
        },
        {
            id: 'PROJ-2025-005',
            name: 'Community Center',
            applicationId: 'PMAJAY-2025-MH-12349',
            totalBudget: 6000000,
            releasedAmount: 1800000,
            pendingAmount: 4200000,
            status: 'in-progress',
            agency: 'RST Builders',
            releasePercentage: 30,
            installments: [
                {
                    number: 1,
                    amount: 1800000,
                    percentage: 30,
                    status: 'released',
                    releaseDate: '2025-12-05',
                    transactionId: 'TXN123456796',
                    remarks: 'Initial installment released'
                },
                {
                    number: 2,
                    amount: 1800000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-01-20'
                },
                {
                    number: 3,
                    amount: 1800000,
                    percentage: 30,
                    status: 'pending',
                    estimatedDate: '2026-02-20'
                },
                {
                    number: 4,
                    amount: 600000,
                    percentage: 10,
                    status: 'pending',
                    estimatedDate: '2026-03-20'
                }
            ]
        }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalStats = {
        totalProjects: projects.length,
        totalBudget: projects.reduce((sum, p) => sum + p.totalBudget, 0),
        totalReleased: projects.reduce((sum, p) => sum + p.releasedAmount, 0),
        totalPending: projects.reduce((sum, p) => sum + p.pendingAmount, 0)
    };

    const getStatusBadge = (status) => {
        const config = {
            'released': { label: 'Released', color: 'bg-green-100 text-green-700', icon: CheckCircle },
            'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
            'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: TrendingUp },
            'completed': { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
            'approved': { label: 'Approved', color: 'bg-indigo-100 text-indigo-700', icon: CheckCircle }
        };
        return config[status] || config['pending'];
    };

    const formatCurrency = (amount) => {
        return `₹${(amount / 100000).toFixed(2)}L`;
    };

    const handleViewDetails = (project) => {
        setSelectedProject(project);
    };

    const handleBack = () => {
        setSelectedProject(null);
    };

    // Detailed view for selected project
    if (selectedProject) {
        const statusConfig = getStatusBadge(selectedProject.status);
        const StatusIcon = statusConfig.icon;
        const progressPercentage = (selectedProject.releasedAmount / selectedProject.totalBudget) * 100;

        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Back to All Projects
                </button>

                {/* Project Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Application ID: <span className="font-semibold text-orange-600">{selectedProject.applicationId}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Agency: <span className="font-semibold">{selectedProject.agency}</span>
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.color} flex items-center gap-2`}>
                            <StatusIcon size={16} />
                            {statusConfig.label}
                        </span>
                    </div>

                    {/* Budget Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-xs text-blue-600 font-semibold">Total Budget</p>
                            <p className="text-xl font-bold text-blue-900">{formatCurrency(selectedProject.totalBudget)}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-xs text-green-600 font-semibold">Released</p>
                            <p className="text-xl font-bold text-green-900">{formatCurrency(selectedProject.releasedAmount)}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <p className="text-xs text-orange-600 font-semibold">Pending</p>
                            <p className="text-xl font-bold text-orange-900">{formatCurrency(selectedProject.pendingAmount)}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-700">Release Progress</p>
                            <p className="text-sm text-gray-600">{progressPercentage.toFixed(0)}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Installments */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Installments</h4>
                    <div className="space-y-4">
                        {selectedProject.installments.map((installment) => {
                            const instStatusConfig = getStatusBadge(installment.status);
                            const InstStatusIcon = instStatusConfig.icon;

                            return (
                                <div key={installment.number} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h5 className="text-lg font-semibold text-gray-900">
                                                    Installment {installment.number}
                                                </h5>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${instStatusConfig.color} flex items-center gap-1`}>
                                                    <InstStatusIcon size={12} />
                                                    {instStatusConfig.label}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600">Amount</p>
                                                    <p className="font-semibold text-gray-900 text-lg">{formatCurrency(installment.amount)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Percentage</p>
                                                    <p className="font-semibold text-gray-900 text-lg">{installment.percentage}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">
                                                        {installment.status === 'released' ? 'Released On' : 'Estimated Date'}
                                                    </p>
                                                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {installment.releaseDate ? new Date(installment.releaseDate).toLocaleDateString('en-IN') : installment.estimatedDate ? new Date(installment.estimatedDate).toLocaleDateString('en-IN') : 'TBD'}
                                                    </p>
                                                </div>
                                                {installment.transactionId && (
                                                    <div>
                                                        <p className="text-gray-600">Transaction ID</p>
                                                        <p className="font-semibold text-gray-900 text-xs">{installment.transactionId}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {installment.remarks && (
                                                <p className="text-xs text-gray-600 mt-3 italic bg-blue-50 p-2 rounded">{installment.remarks}</p>
                                            )}
                                        </div>
                                        {installment.status === 'released' && (
                                            <button className="ml-4 p-2 text-orange-600 hover:bg-orange-50 rounded-lg" title="Download Receipt">
                                                <Download size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View Project Details Button */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <button
                        onClick={() => navigate(`/sarpanch/ongoing-projects`)}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold flex items-center gap-2"
                    >
                        <Eye size={20} />
                        View Full Project Details
                    </button>
                </div>
            </div>
        );
    }

    // Default view - Show all projects as cards
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <DollarSign size={32} />
                    Fund Tracking
                </h1>
                <p className="text-orange-100">Track installments and fund releases for all your projects</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.totalProjects}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalStats.totalBudget)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Released</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalStats.totalReleased)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalStats.totalPending)}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Status</option>
                            <option value="approved">Approved</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => {
                    const statusConfig = getStatusBadge(project.status);
                    const StatusIcon = statusConfig.icon;
                    const progressPercentage = (project.releasedAmount / project.totalBudget) * 100;
                    const releasedInstallments = project.installments.filter(i => i.status === 'released').length;
                    const totalInstallments = project.installments.length;

                    return (
                        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                                    <p className="text-sm text-orange-600 font-semibold">{project.applicationId}</p>
                                    <p className="text-xs text-gray-600 mt-1">Agency: {project.agency}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color} flex items-center gap-1`}>
                                    <StatusIcon size={14} />
                                    {statusConfig.label}
                                </span>
                            </div>

                            {/* Budget Summary */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-xs text-blue-600 font-semibold">Budget</p>
                                    <p className="text-sm font-bold text-blue-900">{formatCurrency(project.totalBudget)}</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <p className="text-xs text-green-600 font-semibold">Released</p>
                                    <p className="text-sm font-bold text-green-900">{formatCurrency(project.releasedAmount)}</p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg">
                                    <p className="text-xs text-orange-600 font-semibold">Pending</p>
                                    <p className="text-sm font-bold text-orange-900">{formatCurrency(project.pendingAmount)}</p>
                                </div>
                            </div>

                            {/* Installments Info */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                                <p className="text-xs text-gray-600 mb-1">Installments Released</p>
                                <p className="text-lg font-bold text-gray-900">{releasedInstallments} of {totalInstallments}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-gray-600">Release Progress</p>
                                    <p className="text-xs font-semibold text-gray-900">{progressPercentage.toFixed(0)}%</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <button
                                onClick={() => handleViewDetails(project)}
                                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold flex items-center justify-center gap-2"
                            >
                                <Eye size={18} />
                                View Installment Details
                            </button>
                        </div>
                    );
                })}
            </div>

            {filteredProjects.length === 0 && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                    <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No projects found</p>
                </div>
            )}
        </div>
    );
}
