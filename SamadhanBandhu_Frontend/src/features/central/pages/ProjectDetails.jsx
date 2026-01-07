import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, CheckCircle, Clock, FileText, Download } from 'lucide-react';

export default function ProjectDetails() {
    const { id } = useParams();

    // Mock project data - in real app, this would come from API
    const projects = {
        1: {
            id: 1,
            name: "Rural Infrastructure Development - Phase 3",
            state: "Maharashtra",
            district: "Pune",
            village: "Shirur",
            budget: 45000000,
            utilized: 30150000,
            status: "In Progress",
            progress: 67,
            startDate: "2024-01-15",
            expectedCompletion: "2024-12-31",
            description: "Comprehensive infrastructure development project focusing on road construction, water supply enhancement, and community facility upgrades in rural areas.",
            beneficiaries: 5000,
            category: "Infrastructure",
            sanctionedBy: "Ministry of Social Justice and Empowerment",
            implementingAgency: "Maharashtra Rural Development Authority",
            milestones: [
                { name: "Site Survey & Planning", status: "Completed", date: "2024-02-01" },
                { name: "Foundation Work", status: "Completed", date: "2024-04-15" },
                { name: "Main Construction", status: "In Progress", date: "2024-09-30" },
                { name: "Final Inspection", status: "Pending", date: "2024-12-15" }
            ],
            documents: [
                { name: "Project Proposal.pdf", size: "2.4 MB", uploadDate: "2024-01-10" },
                { name: "Budget Estimate.xlsx", size: "1.2 MB", uploadDate: "2024-01-12" },
                { name: "Site Photos.zip", size: "15.8 MB", uploadDate: "2024-02-05" }
            ]
        },
        2: {
            id: 2,
            name: "Community Center Construction",
            state: "Gujarat",
            district: "Ahmedabad",
            village: "Sanand",
            budget: 28000000,
            utilized: 28000000,
            status: "Completed",
            progress: 100,
            startDate: "2023-11-20",
            expectedCompletion: "2024-08-30",
            description: "Construction of a modern community center with multipurpose hall, library, and training facilities to serve the local community.",
            beneficiaries: 3500,
            category: "Social Infrastructure",
            sanctionedBy: "Ministry of Social Justice and Empowerment",
            implementingAgency: "Gujarat Social Welfare Department",
            milestones: [
                { name: "Site Survey & Planning", status: "Completed", date: "2023-12-01" },
                { name: "Foundation Work", status: "Completed", date: "2024-02-15" },
                { name: "Main Construction", status: "Completed", date: "2024-07-30" },
                { name: "Final Inspection", status: "Completed", date: "2024-08-25" }
            ],
            documents: [
                { name: "Project Proposal.pdf", size: "1.8 MB", uploadDate: "2023-11-15" },
                { name: "Completion Certificate.pdf", size: "0.5 MB", uploadDate: "2024-08-30" }
            ]
        },
        3: {
            id: 3,
            name: "Water Supply Enhancement Project",
            state: "Rajasthan",
            district: "Jaipur",
            village: "Chaksu",
            budget: 52000000,
            utilized: 23400000,
            status: "In Progress",
            progress: 45,
            startDate: "2024-02-10",
            expectedCompletion: "2025-03-31",
            description: "Installation of water purification systems, pipeline networks, and storage tanks to ensure clean drinking water supply to rural households.",
            beneficiaries: 8000,
            category: "Water & Sanitation",
            sanctionedBy: "Ministry of Social Justice and Empowerment",
            implementingAgency: "Rajasthan Water Resources Department",
            milestones: [
                { name: "Site Survey & Planning", status: "Completed", date: "2024-03-01" },
                { name: "Pipeline Installation", status: "In Progress", date: "2024-11-30" },
                { name: "Tank Construction", status: "Pending", date: "2025-01-31" },
                { name: "Final Testing", status: "Pending", date: "2025-03-15" }
            ],
            documents: [
                { name: "Project Proposal.pdf", size: "3.2 MB", uploadDate: "2024-02-05" },
                { name: "Technical Specifications.pdf", size: "2.1 MB", uploadDate: "2024-02-08" }
            ]
        }
    };

    const project = projects[id] || projects[1];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'In Progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Pending':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Back Button & Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white border-l-4 border-l-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                        <p className="text-sm text-gray-600 mt-2">Project ID: #{project.id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <DollarSign size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">Total Budget</p>
                            <p className="text-xl font-bold text-gray-900">₹{(project.budget / 10000000).toFixed(2)} Cr</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">Utilized</p>
                            <p className="text-xl font-bold text-gray-900">₹{(project.utilized / 10000000).toFixed(2)} Cr</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Clock size={20} className="text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">Progress</p>
                            <p className="text-xl font-bold text-gray-900">{project.progress}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Users size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">Beneficiaries</p>
                            <p className="text-xl font-bold text-gray-900">{project.beneficiaries.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
                <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                    <span className="absolute right-0 -top-6 text-sm font-bold text-blue-600">{project.progress}%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-blue-600" />
                        Project Details
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Category</span>
                            <span className="text-sm font-semibold text-gray-900">{project.category}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">State</span>
                            <span className="text-sm font-semibold text-gray-900">{project.state}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">District</span>
                            <span className="text-sm font-semibold text-gray-900">{project.district}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Village</span>
                            <span className="text-sm font-semibold text-gray-900">{project.village}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Start Date</span>
                            <span className="text-sm font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Expected Completion</span>
                            <span className="text-sm font-semibold text-gray-900">{new Date(project.expectedCompletion).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Sanctioned By</span>
                            <span className="text-sm font-semibold text-gray-900">{project.sanctionedBy}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-600">Implementing Agency</span>
                            <span className="text-sm font-semibold text-gray-900">{project.implementingAgency}</span>
                        </div>
                    </div>
                </div>

                {/* Milestones */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-600" />
                        Milestones
                    </h3>
                    <div className="space-y-4">
                        {project.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className={`mt-1 w-3 h-3 rounded-full ${milestone.status === 'Completed' ? 'bg-green-500' :
                                        milestone.status === 'In Progress' ? 'bg-blue-500' :
                                            'bg-gray-300'
                                    }`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{milestone.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">Target: {new Date(milestone.date).toLocaleDateString('en-IN')}</p>
                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                                        {milestone.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Download size={20} className="text-blue-600" />
                    Documents
                </h3>
                <div className="space-y-2">
                    {project.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-gray-600" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.size} • Uploaded on {new Date(doc.uploadDate).toLocaleDateString('en-IN')}</p>
                                </div>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center gap-1">
                                <Download size={14} />
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
