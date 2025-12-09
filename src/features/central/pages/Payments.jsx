import React, { useState } from 'react';
import { CreditCard, Building2, CheckCircle, Clock, AlertCircle, Download, Eye, Search, ArrowRight, Shield, Lock, Key, FileCheck } from 'lucide-react';

export default function Payments() {
    const [selectedTab, setSelectedTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentStep, setPaymentStep] = useState('confirm'); // confirm, otp, processing, success
    const [otp, setOtp] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // Sample payment data
    const payments = [
        { id: 'PAY-2024-001', project: 'Adarsh Gram Development - Mysore', beneficiary: 'Karnataka State Agency', amount: '1.25 Cr', installment: '1 of 2', status: 'Pending', dueDate: '2024-11-25', accountNo: '****6789', ifsc: 'SBIN0001234' },
        { id: 'PAY-2024-002', project: 'Skill Development Centre - Patna', beneficiary: 'Bihar Education Board', amount: '0.75 Cr', installment: '1 of 2', status: 'Pending', dueDate: '2024-11-26', accountNo: '****4521', ifsc: 'HDFC0002345' },
        { id: 'PAY-2024-003', project: 'Healthcare Center - Kolkata', beneficiary: 'WB Health Department', amount: '1.50 Cr', installment: '1 of 2', status: 'Processing', dueDate: '2024-11-22', accountNo: '****7890', ifsc: 'ICIC0003456' },
        { id: 'PAY-2024-004', project: 'Community Hall - Jaipur', beneficiary: 'Rajasthan Development Corp', amount: '0.90 Cr', installment: '1 of 1', status: 'Completed', dueDate: '2024-11-01', accountNo: '****1234', ifsc: 'SBIN0004567' },
        { id: 'PAY-2024-005', project: 'Water Supply - Lucknow', beneficiary: 'UP Jal Nigam', amount: '1.60 Cr', installment: '1 of 2', status: 'Completed', dueDate: '2024-10-28', accountNo: '****5678', ifsc: 'PNB0005678' },
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesTab = selectedTab === 'all' || payment.status.toLowerCase() === selectedTab;
        const matchesSearch = payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const styles = {
            'Pending': 'bg-orange-100 text-orange-700 border-orange-200',
            'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
            'Completed': 'bg-green-100 text-green-700 border-green-200',
            'Failed': 'bg-red-100 text-red-700 border-red-200',
        };
        return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} />;
            case 'Processing': return <Clock size={16} className="animate-spin" />;
            case 'Completed': return <CheckCircle size={16} />;
            case 'Failed': return <AlertCircle size={16} />;
            default: return null;
        }
    };

    const handleInitiatePayment = (payment) => {
        setSelectedPayment(payment);
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
                setPaymentStep('success');
            }, 3000);
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    };

    const handleDownloadReceipt = () => {
        alert(`Downloading receipt for transaction ${transactionId}`);
    };

    const handleCloseModal = () => {
        setShowPaymentModal(false);
        setSelectedPayment(null);
        setPaymentStep('confirm');
        setOtp('');
        setTransactionId('');
    };

    const pendingCount = payments.filter(p => p.status === 'Pending').length;
    const processingCount = payments.filter(p => p.status === 'Processing').length;
    const completedCount = payments.filter(p => p.status === 'Completed').length;
    const totalAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                <p className="text-sm text-gray-600 mt-1">Manage fund disbursements and track payment transactions</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Payments</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{pendingCount}</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 p-4 rounded-2xl shadow-lg">
                                <Clock size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-orange-500 to-orange-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Processing</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{processingCount}</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg">
                                <CreditCard size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-blue-500 to-blue-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Completed</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{completedCount}</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-2xl shadow-lg">
                                <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-green-500 to-green-700"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">₹{totalAmount.toFixed(1)} Cr</h3>
                            </div>
                            <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-2xl shadow-lg">
                                <Building2 size={32} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by project, beneficiary, or payment ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
                            <Download size={18} />
                            Export Transactions
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex gap-4 px-6">
                        <button
                            onClick={() => setSelectedTab('all')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'all'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            All Payments ({payments.length})
                        </button>
                        <button
                            onClick={() => setSelectedTab('pending')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'pending'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Pending ({pendingCount})
                        </button>
                        <button
                            onClick={() => setSelectedTab('processing')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'processing'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Processing ({processingCount})
                        </button>
                        <button
                            onClick={() => setSelectedTab('completed')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${selectedTab === 'completed'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Completed ({completedCount})
                        </button>
                    </nav>
                </div>

                {/* Payments Table */}
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Payment ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beneficiary</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Installment</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{payment.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{payment.project}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{payment.beneficiary}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{payment.amount}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{payment.installment}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{payment.dueDate}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${getStatusBadge(payment.status)}`}>
                                                {getStatusIcon(payment.status)}
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                {payment.status === 'Pending' && (
                                                    <button
                                                        onClick={() => handleInitiatePayment(payment)}
                                                        className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                                                    >
                                                        <CreditCard size={16} /> Pay
                                                    </button>
                                                )}
                                                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                    <Eye size={16} /> View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                        {/* Step 1: Confirm Payment */}
                        {paymentStep === 'confirm' && (
                            <>
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">Confirm Payment Details</h2>
                                    <p className="text-sm text-gray-600 mt-1">Review payment information before proceeding</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                                        <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-semibold mb-1">Secure Payment Gateway</p>
                                            <p>This transaction is encrypted and secured by government payment infrastructure.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">Payment Information</h3>
                                            <dl className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Payment ID:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedPayment.id}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Project:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedPayment.project}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Amount:</dt>
                                                    <dd className="font-bold text-green-600 text-lg">₹{selectedPayment.amount}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">Beneficiary Details</h3>
                                            <dl className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Name:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedPayment.beneficiary}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">Account:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedPayment.accountNo}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-gray-600">IFSC:</dt>
                                                    <dd className="font-medium text-gray-900">{selectedPayment.ifsc}</dd>
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
                                        Verify & Process
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
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
                                <p className="text-gray-600 mb-6">Please wait while we process your transaction securely</p>
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
                                            <h2 className="text-xl font-bold text-green-900">Payment Successful!</h2>
                                            <p className="text-sm text-green-700 mt-1">Transaction completed successfully</p>
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
                                                <dt className="text-gray-600">Payment ID:</dt>
                                                <dd className="font-medium text-gray-900">{selectedPayment.id}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Amount Paid:</dt>
                                                <dd className="font-bold text-green-600 text-lg">₹{selectedPayment.amount}</dd>
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
                                        <button
                                            onClick={handleDownloadReceipt}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                        >
                                            <FileCheck size={18} />
                                            View Receipt
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
