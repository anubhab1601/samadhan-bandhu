import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, FileText, TrendingUp, DollarSign, Download, Shield, ArrowRight, Key, Lock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FundManagement() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [releasingId, setReleasingId] = useState(null);

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [paymentStep, setPaymentStep] = useState('confirm'); // confirm, otp, processing, success
    const [otp, setOtp] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [requests, setRequests] = useState([
        {
            id: 'SF-2025-001',
            applicationId: 'PMAJAY-2025-MH-12345',
            projectTitle: 'Community Hall Construction',
            village: 'Shirdi',
            district: 'Ahmednagar',
            agency: 'ABC Construction Ltd.',
            totalProjectCost: 5000000,
            centralShare: 3000000,
            stateShare: 2000000,
            installment: '1st',
            status: 'Pending',
            requestedOn: '2025-11-28',
        },
        {
            id: 'SF-2025-002',
            applicationId: 'PMAJAY-2025-MH-12346',
            projectTitle: 'Village Road Development',
            village: 'Nashik Village',
            district: 'Nashik',
            agency: 'XYZ Builders Pvt. Ltd.',
            totalProjectCost: 7500000,
            centralShare: 4500000,
            stateShare: 3000000,
            installment: '2nd',
            status: 'Released',
            requestedOn: '2025-11-20',
            releasedOn: '2025-11-25',
        },
        {
            id: 'SF-2025-003',
            applicationId: 'PMAJAY-2025-MH-12347',
            projectTitle: 'Water Supply System',
            village: 'Pune Village',
            district: 'Pune',
            agency: 'DEF Infrastructure',
            totalProjectCost: 12000000,
            centralShare: 7200000,
            stateShare: 4800000,
            installment: '1st',
            status: 'Released',
            requestedOn: '2025-11-18',
            releasedOn: '2025-11-22',
        },
        {
            id: 'SF-2025-004',
            applicationId: 'PMAJAY-2025-MH-12348',
            projectTitle: 'Solar Street Lights',
            village: 'Malegaon',
            district: 'Nashik',
            agency: 'Sun Power Ltd.',
            totalProjectCost: 2500000,
            centralShare: 1500000,
            stateShare: 1000000,
            installment: '1st',
            status: 'Pending',
            requestedOn: '2025-11-29',
        }
    ]);

    const filteredRequests = requests.filter((req) => {
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesSearch =
            req.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalStateBudget = 100000000; // 10 Cr
    const totalStateShareCommitted = requests.reduce((sum, r) => sum + r.stateShare, 0);
    const totalStateShareReleased = requests
        .filter((r) => r.status === 'Released')
        .reduce((sum, r) => sum + r.stateShare, 0);
    const pendingAmount = totalStateShareCommitted - totalStateShareReleased;
    const unallocated = totalStateBudget - totalStateShareCommitted;

    const pendingCount = requests.filter((r) => r.status === 'Pending').length;

    // Chart Data
    const budgetData = [
        { name: 'Released', value: totalStateShareReleased, color: '#16a34a' },
        { name: 'Pending Release', value: pendingAmount, color: '#ea580c' },
        { name: 'Unallocated', value: unallocated, color: '#e5e7eb' },
    ];

    const districtAllocationData = [
        { name: 'Ahmednagar', allocated: 2000000, released: 0 },
        { name: 'Nashik', allocated: 4000000, released: 3000000 },
        { name: 'Pune', allocated: 4800000, released: 4800000 },
    ];

    const handleReleaseStateShare = (id) => {
        const req = requests.find((r) => r.id === id);
        if (!req) return;

        if (req.status === 'Released') {
            alert('State share for this request has already been released.');
            return;
        }

        setSelectedRequest(req);
        setPaymentStep('confirm');
        setOtp('');
        setShowPaymentModal(true);
    };

    const handleProceedToOTP = () => {
        setPaymentStep('otp');
    };

    const handleVerifyOTP = () => {
        if (otp.length === 6) {
            setPaymentStep('processing');
            // Simulate processing
            setTimeout(() => {
                const txnId = 'TXN' + Date.now();
                setTransactionId(txnId);

                // Update request status
                const releasedDate = new Date().toISOString().split('T')[0];
                setRequests((prev) =>
                    prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: 'Released', releasedOn: releasedDate } : r))
                );

                setPaymentStep('success');
            }, 3000);
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    };

    const handleCloseModal = () => {
        setShowPaymentModal(false);
        setSelectedRequest(null);
        setPaymentStep('confirm');
        setOtp('');
        setTransactionId('');
    };

    const handleDownloadReceipt = () => {
        alert(`Downloading receipt for transaction ${transactionId}`);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("State Fund Management Report", 14, 20);

        // Summary
        doc.setFontSize(10);
        doc.text(`Total Budget: ${(totalStateBudget / 10000000).toFixed(2)} Cr`, 14, 30);
        doc.text(`Committed: ${(totalStateShareCommitted / 10000000).toFixed(2)} Cr`, 14, 35);
        doc.text(`Released: ${(totalStateShareReleased / 10000000).toFixed(2)} Cr`, 14, 40);
        doc.text(`Pending Requests: ${pendingCount}`, 14, 45);

        // Table
        autoTable(doc, {
            startY: 55,
            head: [['Request ID', 'App ID', 'Project', 'Village', 'Agency', 'Cost (L)', 'State Share (L)', 'Status']],
            body: filteredRequests.map(req => [
                req.id,
                req.applicationId,
                req.projectTitle,
                req.village,
                req.agency,
                (req.totalProjectCost / 100000).toFixed(2),
                (req.stateShare / 100000).toFixed(2),
                req.status
            ]),
        });

        doc.save('state_fund_management_report.pdf');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">State Fund Management</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Monitor and release funds to agencies for approved PM-AJAY projects
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total State Budget</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(totalStateBudget / 10000000).toFixed(2)} Cr</p>
                        </div>
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <DollarSign className="text-gray-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Committed Share</p>
                            <p className="text-2xl font-bold text-purple-700">₹{(totalStateShareCommitted / 10000000).toFixed(2)} Cr</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {(totalStateShareCommitted / totalStateBudget * 100).toFixed(1)}% of budget
                            </p>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="text-purple-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Released Amount</p>
                            <p className="text-2xl font-bold text-green-700">₹{(totalStateShareReleased / 10000000).toFixed(2)} Cr</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {(totalStateShareReleased / totalStateShareCommitted * 100 || 0).toFixed(1)}% of committed
                            </p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Value: ₹{(pendingAmount / 100000).toFixed(2)} L
                            </p>
                        </div>
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Clock className="text-orange-600" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget Utilization Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Budget Utilization</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={budgetData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {budgetData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)} L`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* District Allocation Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">District-wise Allocation vs Release</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={districtAllocationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `${value / 100000}L`} />
                                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)} L`} />
                                <Legend />
                                <Bar dataKey="allocated" name="Allocated" fill="#8884d8" />
                                <Bar dataKey="released" name="Released" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by project, village, or application ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <Filter size={18} className="text-gray-500" />
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${filterStatus === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterStatus('Pending')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${filterStatus === 'Pending'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilterStatus('Released')}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${filterStatus === 'Released'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Released
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-600 rounded"></span>
                        Fund Requests from Agencies ({filteredRequests.length})
                    </h2>
                </div>

                {filteredRequests.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <FileText size={40} className="mx-auto text-gray-300 mb-3" />
                        <p>No fund requests found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Request ID
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Application ID
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Project / Village
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Agency
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Total Cost
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        State Funds
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Installment
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-blue-700 font-medium">{req.id}</td>
                                        <td className="px-4 py-3 text-gray-800">{req.applicationId}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900 truncate max-w-xs">
                                                {req.projectTitle}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {req.village}, {req.district}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{req.agency}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">
                                            ₹{(req.totalProjectCost / 100000).toFixed(2)}L
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-green-700">
                                            ₹{(req.stateShare / 100000).toFixed(2)}L
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{req.installment}</td>
                                        <td className="px-4 py-3">
                                            {req.status === 'Released' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                                    <CheckCircle size={14} /> Released
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1 w-fit">
                                                    <Clock size={14} /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {req.status === 'Released' ? (
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="px-4 py-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg cursor-default"
                                                >
                                                    Already Released
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleReleaseStateShare(req.id)}
                                                    disabled={releasingId === req.id}
                                                    className="px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {releasingId === req.id ? (
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    ) : (
                                                        <CheckCircle size={14} />
                                                    )}
                                                    Release Funds
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                        {/* Step 1: Confirm Payment */}
                        {paymentStep === 'confirm' && (
                            <>
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">Confirm Fund Release</h2>
                                    <p className="text-sm text-gray-600 mt-1">Review fund details before releasing state share</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                                        <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-semibold mb-1">Secure Fund Transfer</p>
                                            <p>This transaction is encrypted and authorized by State Finance Department.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">Project Information</h3>
                                            <dl className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Application ID:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedRequest.applicationId}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Project:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedRequest.projectTitle}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Location:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedRequest.village}, {selectedRequest.district}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Agency:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedRequest.agency}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">Fund Details</h3>
                                            <dl className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Total Project Cost:</dt>
                                                    <dd className="font-medium text-gray-900">₹{(selectedRequest.totalProjectCost / 100000).toFixed(2)}L</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Installment:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedRequest.installment}</dd>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
                                                    <dt className="text-gray-800 font-semibold">State Share to Release:</dt>
                                                    <dd className="font-bold text-green-600 text-lg">₹{(selectedRequest.stateShare / 100000).toFixed(2)}L</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleProceedToOTP}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2"
                                    >
                                        Proceed to OTP <ArrowRight size={18} />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 2: OTP Verification */}
                        {paymentStep === 'otp' && (
                            <>
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">OTP Verification</h2>
                                    <p className="text-sm text-gray-600 mt-1">Enter the OTP sent to your registered mobile/email</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                                        <Key size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-green-800">
                                            <p className="font-semibold mb-1">OTP Sent Successfully</p>
                                            <p>A 6-digit OTP has been sent to your registered mobile number ending with ****89</p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Enter 6-Digit OTP</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            className="w-64 mx-auto text-center text-2xl font-bold tracking-widest px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="000000"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">OTP valid for 10 minutes</p>
                                    </div>

                                    <div className="text-center">
                                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                            Resend OTP
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        onClick={() => setPaymentStep('confirm')}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleVerifyOTP}
                                        disabled={otp.length !== 6}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Lock size={18} />
                                        Verify & Release
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3: Processing */}
                        {paymentStep === 'processing' && (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                                    <Clock size={40} className="text-blue-600 animate-spin" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Fund Release...</h3>
                                <p className="text-gray-600 mb-6">Please wait while we process the transaction securely</p>
                                <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Success */}
                        {paymentStep === 'success' && (
                            <>
                                <div className="p-6 border-b border-gray-200 bg-green-50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-600 rounded-full">
                                            <CheckCircle size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-green-900">Fund Released Successfully!</h2>
                                            <p className="text-sm text-green-700 mt-1">State share has been transferred to the agency</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <h3 className="font-semibold text-gray-800 mb-3">Transaction Details</h3>
                                        <dl className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Transaction ID:</dt>
                                                <dd className="font-bold text-blue-600">{transactionId}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Application ID:</dt>
                                                <dd className="font-medium text-gray-900">{selectedRequest.applicationId}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Amount Released:</dt>
                                                <dd className="font-bold text-green-600 text-lg">₹{(selectedRequest.stateShare / 100000).toFixed(2)}L</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Date & Time:</dt>
                                                <dd className="font-medium text-gray-900">{new Date().toLocaleString()}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Status:</dt>
                                                <dd className="font-medium text-green-600">✓ Completed</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDownloadReceipt}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                        >
                                            <Download size={18} />
                                            Download Receipt
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200 flex justify-end">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
