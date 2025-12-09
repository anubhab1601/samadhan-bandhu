import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, Clock, AlertCircle, Search, Filter, ChevronDown, ChevronRight, User, MapPin, Building2, FileText, TrendingUp, Check, Shield, Lock, RefreshCw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FundTracking() {
    const [selectedVillage, setSelectedVillage] = useState('all');
    const [selectedComponent, setSelectedComponent] = useState('all');
    const [selectedPhase, setSelectedPhase] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedProject, setExpandedProject] = useState(null);
    const [showReleaseModal, setShowReleaseModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Payment window states
    const [step, setStep] = useState(1); // 1: Details, 2: OTP + Captcha, 3: Success
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [showVerified, setShowVerified] = useState(false);

    const otpRefs = useRef([]);

    useEffect(() => {
        if (showReleaseModal) {
            generateCaptcha();
        }
    }, [showReleaseModal]);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
        setCaptchaInput('');
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const verifyOtpAndCaptcha = () => {
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            alert('Please enter complete OTP');
            return;
        }

        if (captchaInput !== captcha) {
            alert('Captcha does not match. Please try again.');
            generateCaptcha();
            return;
        }

        // Show verification success
        setShowVerified(true);

        // Move to success after 2 seconds
        setTimeout(() => {
            setStep(3);
            // Close modal after 3 more seconds
            setTimeout(() => {
                closeModal();
            }, 3000);
        }, 2000);
    };

    const closeModal = () => {
        setShowReleaseModal(false);
        setSelectedProject(null);
        setStep(1);
        setOtp(['', '', '', '', '', '']);
        setCaptchaInput('');
        setShowVerified(false);
    };

    // Mock data - Projects with phase-wise fund release
    const projectsData = [
        {
            id: 1,
            name: 'Community Hall Construction',
            village: 'Shirdi Village',
            component: 'adarshgram',
            agency: 'Rural Development Agency',
            totalBudget: 15, // 15 lakhs
            phases: [
                {
                    id: 1,
                    name: 'Phase 1 - Foundation',
                    percentage: 30,
                    amount: 4.5,
                    status: 'completed',
                    releaseDate: '2024-11-01',
                    verifiedBy: 'Field Officer - Ramesh Kumar',
                    verificationDate: '2024-11-15',
                    verificationReport: 'Foundation work completed as per specifications',
                    workProgress: 100
                },
                {
                    id: 2,
                    name: 'Phase 2 - Structure',
                    percentage: 40,
                    amount: 6,
                    status: 'verified',
                    verifiedBy: 'Field Officer - Ramesh Kumar',
                    verificationDate: '2024-12-05',
                    verificationReport: 'Structural work 90% complete, quality satisfactory',
                    workProgress: 90,
                    readyForRelease: true
                },
                {
                    id: 3,
                    name: 'Phase 3 - Finishing',
                    percentage: 30,
                    amount: 4.5,
                    status: 'pending',
                    workProgress: 0
                }
            ]
        },
        {
            id: 2,
            name: 'School Building Renovation',
            village: 'Shirdi Village',
            component: 'grantInAid',
            agency: 'Education Support Foundation',
            totalBudget: 14, // 14 lakhs
            phases: [
                {
                    id: 1,
                    name: 'Phase 1 - Demolition & Prep',
                    percentage: 25,
                    amount: 3.5,
                    status: 'completed',
                    releaseDate: '2024-10-15',
                    verifiedBy: 'Field Officer - Priya Sharma',
                    verificationDate: '2024-10-28',
                    verificationReport: 'Demolition completed safely, site prepared',
                    workProgress: 100
                },
                {
                    id: 2,
                    name: 'Phase 2 - Construction',
                    percentage: 50,
                    amount: 7,
                    status: 'in-progress',
                    workProgress: 60,
                    expectedCompletion: '2025-01-15'
                },
                {
                    id: 3,
                    name: 'Phase 3 - Interior Work',
                    percentage: 25,
                    amount: 3.5,
                    status: 'pending',
                    workProgress: 0
                }
            ]
        },
        {
            id: 3,
            name: 'Hostel Facility Construction',
            village: 'Khed Village',
            component: 'hosteller',
            agency: 'Student Welfare Trust',
            totalBudget: 11, // 11 lakhs
            phases: [
                {
                    id: 1,
                    name: 'Phase 1 - Site Development',
                    percentage: 20,
                    amount: 2.2,
                    status: 'completed',
                    releaseDate: '2024-09-01',
                    verifiedBy: 'Field Officer - Amit Patel',
                    verificationDate: '2024-09-20',
                    verificationReport: 'Site leveling and boundary wall completed',
                    workProgress: 100
                },
                {
                    id: 2,
                    name: 'Phase 2 - Building Construction',
                    percentage: 60,
                    amount: 6.6,
                    status: 'verified',
                    verifiedBy: 'Field Officer - Amit Patel',
                    verificationDate: '2024-12-08',
                    verificationReport: 'Building structure 95% complete, excellent quality',
                    workProgress: 95,
                    readyForRelease: true
                },
                {
                    id: 3,
                    name: 'Phase 3 - Furnishing',
                    percentage: 20,
                    amount: 2.2,
                    status: 'pending',
                    workProgress: 0
                }
            ]
        }
    ];

    // Get filtered projects
    const getFilteredProjects = () => {
        return projectsData.filter(project => {
            const matchesVillage = selectedVillage === 'all' || project.village === selectedVillage;
            const matchesComponent = selectedComponent === 'all' || project.component === selectedComponent;
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.agency.toLowerCase().includes(searchTerm.toLowerCase());

            if (selectedPhase === 'all') return matchesVillage && matchesComponent && matchesSearch;

            const hasPhaseStatus = project.phases.some(phase => {
                if (selectedPhase === 'verified') return phase.status === 'verified' && phase.readyForRelease;
                return phase.status === selectedPhase;
            });

            return matchesVillage && matchesComponent && matchesSearch && hasPhaseStatus;
        });
    };

    const filteredProjects = getFilteredProjects();

    // Calculate statistics
    const stats = {
        totalProjects: projectsData.length,
        totalBudget: projectsData.reduce((sum, p) => sum + p.totalBudget, 0),
        released: projectsData.reduce((sum, p) =>
            sum + p.phases.filter(ph => ph.status === 'completed').reduce((s, ph) => s + ph.amount, 0), 0),
        pendingVerification: projectsData.reduce((count, p) =>
            count + p.phases.filter(ph => ph.status === 'in-progress').length, 0),
        readyForRelease: projectsData.reduce((count, p) =>
            count + p.phases.filter(ph => ph.status === 'verified' && ph.readyForRelease).length, 0)
    };

    const componentNames = {
        adarshgram: 'Adarshgram',
        grantInAid: 'Grant-in-Aid',
        hosteller: 'Hosteller'
    };

    const getStatusBadge = (status) => {
        const badges = {
            'completed': 'bg-green-100 text-green-700',
            'verified': 'bg-blue-100 text-blue-700',
            'in-progress': 'bg-yellow-100 text-yellow-700',
            'pending': 'bg-gray-100 text-gray-700'
        };
        return badges[status] || badges.pending;
    };

    const handleReleaseFund = (project, phase) => {
        setSelectedProject({ project, phase });
        setShowReleaseModal(true);
        setStep(1);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Phase-wise Fund Management Report", 14, 20);

        // Stats
        doc.setFontSize(10);
        doc.text(`Total Projects: ${stats.totalProjects}`, 14, 30);
        doc.text(`Total Budget: ${(stats.totalBudget / 100).toFixed(2)} Cr`, 14, 35);
        doc.text(`Funds Released: ${(stats.released / 100).toFixed(2)} Cr`, 14, 40);

        // Table
        autoTable(doc, {
            startY: 50,
            head: [['Project Name', 'Village', 'Component', 'Agency', 'Budget (Cr)', 'Completed Phases']],
            body: filteredProjects.map(p => [
                p.name,
                p.village,
                componentNames[p.component],
                p.agency,
                (p.totalBudget / 100).toFixed(2),
                `${p.phases.filter(ph => ph.status === 'completed').length}/${p.phases.length}`
            ]),
        });

        doc.save('fund_tracking_report.pdf');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-purple-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Phase-wise Fund Management</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Release funds based on Field Officer verification of work progress
                    </p>
                </div>
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Building2 size={24} className="text-purple-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Projects</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProjects}</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">Budget: ₹{(stats.totalBudget / 100).toFixed(2)} Cr</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Funds Released</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{(stats.released / 100).toFixed(2)} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stats.released / stats.totalBudget) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} className="text-yellow-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Pending Verification</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.pendingVerification}</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">Phases in progress</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <AlertCircle size={24} className="text-blue-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Ready for Release</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.readyForRelease}</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">Verified phases</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={20} className="text-gray-600" />
                    <h3 className="font-bold text-gray-900">Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Village</label>
                        <select
                            value={selectedVillage}
                            onChange={(e) => setSelectedVillage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="all">All Villages</option>
                            <option value="Shirdi Village">Shirdi Village</option>
                            <option value="Khed Village">Khed Village</option>
                            <option value="Rajgurunagar">Rajgurunagar</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Component</label>
                        <select
                            value={selectedComponent}
                            onChange={(e) => setSelectedComponent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="all">All Components</option>
                            <option value="adarshgram">Adarshgram</option>
                            <option value="grantInAid">Grant-in-Aid</option>
                            <option value="hosteller">Hosteller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Phase Status</label>
                        <select
                            value={selectedPhase}
                            onChange={(e) => setSelectedPhase(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="all">All Phases</option>
                            <option value="verified">Ready for Release</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-600 rounded"></span>
                    Projects with Phase-wise Fund Release
                </h2>
                <div className="space-y-4">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="bg-purple-50 p-4 cursor-pointer hover:bg-purple-100 transition-colors"
                                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        {expandedProject === project.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">{project.name}</h4>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {project.village}
                                                </span>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                    {componentNames[project.component]}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User size={14} />
                                                    {project.agency}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{(project.totalBudget / 100).toFixed(2)} Cr</p>
                                        <p className="text-xs text-gray-600">
                                            {project.phases.filter(p => p.status === 'completed').length}/{project.phases.length} phases completed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {expandedProject === project.id && (
                                <div className="p-4 bg-gray-50">
                                    <h5 className="font-semibold text-gray-900 mb-3">Phase-wise Fund Release</h5>
                                    <div className="space-y-3">
                                        {project.phases.map(phase => (
                                            <div key={phase.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h6 className="font-semibold text-gray-900">{phase.name}</h6>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(phase.status)}`}>
                                                                {phase.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            Amount: ₹{(phase.amount / 100).toFixed(2)} Cr ({phase.percentage}% of total)
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-gray-900">Progress: {phase.workProgress}%</p>
                                                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                                            <div
                                                                className="bg-purple-600 h-2 rounded-full"
                                                                style={{ width: `${phase.workProgress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {phase.status === 'completed' && (
                                                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                                                        <p className="text-green-800 font-medium mb-1">✓ Fund Released</p>
                                                        <p className="text-green-700 text-xs">Released on: {phase.releaseDate}</p>
                                                        <p className="text-green-700 text-xs">Verified by: {phase.verifiedBy}</p>
                                                    </div>
                                                )}

                                                {phase.status === 'verified' && phase.readyForRelease && (
                                                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                                        <p className="text-blue-800 font-medium text-sm mb-2">✓ Verified by Field Officer</p>
                                                        <p className="text-blue-700 text-xs mb-1">Verified on: {phase.verificationDate}</p>
                                                        <p className="text-blue-700 text-xs mb-1">Officer: {phase.verifiedBy}</p>
                                                        <p className="text-blue-700 text-xs mb-3">Report: {phase.verificationReport}</p>
                                                        <button
                                                            onClick={() => handleReleaseFund(project, phase)}
                                                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium text-sm"
                                                        >
                                                            Release Fund (₹{(phase.amount / 100).toFixed(2)} Cr)
                                                        </button>
                                                    </div>
                                                )}

                                                {phase.status === 'in-progress' && (
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                                                        <p className="text-yellow-800 font-medium mb-1">⏳ Work in Progress</p>
                                                        <p className="text-yellow-700 text-xs">Expected completion: {phase.expectedCompletion}</p>
                                                        <p className="text-yellow-700 text-xs mt-1">Awaiting Field Officer verification</p>
                                                    </div>
                                                )}

                                                {phase.status === 'pending' && (
                                                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
                                                        <p className="text-gray-700">⏸️ Not started - Previous phase must be completed</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <FileText size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No projects found matching your filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Centre-Style Payment/Release Modal */}
            {showReleaseModal && selectedProject && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-gray-50 rounded-lg shadow-2xl max-w-2xl w-full my-8">
                        {/* Progress Steps */}
                        <div className="bg-white rounded-t-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                {['Transaction Details', 'Verification', 'Complete'].map((label, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > index + 1 ? 'bg-green-500 text-white' :
                                            step === index + 1 ? 'bg-purple-500 text-white' :
                                                'bg-gray-200 text-gray-500'
                                            }`}>
                                            {step > index + 1 ? <Check size={20} /> : index + 1}
                                        </div>
                                        {index < 2 && (
                                            <div className={`w-32 h-1 mx-2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Step 1: Transaction Details */}
                            {step === 1 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Fund Release Details</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Project</span>
                                            <span className="font-bold text-gray-900">{selectedProject.project.name}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Village</span>
                                            <span className="font-bold text-gray-900">{selectedProject.project.village}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Component</span>
                                            <span className="font-bold text-gray-900">{componentNames[selectedProject.project.component]}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Agency</span>
                                            <span className="font-bold text-gray-900">{selectedProject.project.agency}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Phase</span>
                                            <span className="font-bold text-gray-900">{selectedProject.phase.name}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Amount to Release</span>
                                            <span className="font-bold text-green-600 text-xl">₹{(selectedProject.phase.amount / 100).toFixed(2)} Cr</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-blue-800 font-medium mb-2">Field Officer Verification</p>
                                        <p className="text-xs text-blue-700">Verified by: {selectedProject.phase.verifiedBy}</p>
                                        <p className="text-xs text-blue-700">Date: {selectedProject.phase.verificationDate}</p>
                                        <p className="text-xs text-blue-700 mt-1">{selectedProject.phase.verificationReport}</p>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-yellow-800">
                                            <Shield className="inline mr-2" size={16} />
                                            This transaction requires OTP and Captcha verification for security.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setStep(2)}
                                            className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
                                        >
                                            Proceed to Verification
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: OTP + Captcha Verification */}
                            {step === 2 && !showVerified && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Lock className="text-purple-600" size={32} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Required</h2>
                                        <p className="text-gray-600">Enter OTP and Captcha to complete the transaction</p>
                                    </div>

                                    {/* OTP Section */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">Enter OTP</label>
                                        <div className="flex justify-center gap-3 mb-2">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={el => otpRefs.current[index] = el}
                                                    type="text"
                                                    maxLength="1"
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 text-center">Code sent to your registered mobile number</p>
                                    </div>

                                    {/* Captcha Section */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">Enter Captcha</label>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center">
                                                <span className="text-2xl font-bold text-gray-800 tracking-widest select-none" style={{
                                                    fontFamily: 'monospace',
                                                    letterSpacing: '8px',
                                                    textDecoration: 'line-through',
                                                    textDecorationStyle: 'wavy'
                                                }}>
                                                    {captcha}
                                                </span>
                                            </div>
                                            <button
                                                onClick={generateCaptcha}
                                                className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                title="Refresh Captcha"
                                            >
                                                <RefreshCw size={20} className="text-gray-700" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                            placeholder="Enter captcha code"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-center text-lg font-bold"
                                        />
                                    </div>

                                    <button
                                        onClick={verifyOtpAndCaptcha}
                                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 mb-3"
                                    >
                                        Verify & Complete Transaction
                                    </button>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
                                    >
                                        Back
                                    </button>
                                </div>
                            )}

                            {/* Verification Success Message */}
                            {step === 2 && showVerified && (
                                <div className="bg-white rounded-lg shadow p-6 text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                        <Check className="text-green-600" size={48} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">OTP Verified Successfully!</h2>
                                    <p className="text-gray-600">Processing your transaction...</p>
                                </div>
                            )}

                            {/* Step 3: Success */}
                            {step === 3 && (
                                <div className="bg-white rounded-lg shadow p-6 text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="text-green-600" size={48} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Transaction Successful!</h2>
                                    <p className="text-gray-600 mb-4">Fund release has been completed successfully</p>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
                                        <p className="text-xl font-bold text-gray-900">TXN-{Math.floor(Math.random() * 1000000)}</p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-green-800">
                                            ✓ Amount: ₹{(selectedProject.phase.amount / 100).toFixed(2)} Cr<br />
                                            ✓ Project: {selectedProject.project.name}<br />
                                            ✓ Phase: {selectedProject.phase.name}<br />
                                            ✓ Village: {selectedProject.project.village}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-500">Closing window...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
