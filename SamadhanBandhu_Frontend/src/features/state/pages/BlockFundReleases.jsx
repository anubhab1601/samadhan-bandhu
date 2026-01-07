import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Building2, MapPin, TrendingUp, DollarSign, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronRight, Check, Shield, Lock, RefreshCw, FileText } from 'lucide-react';

export default function BlockFundReleases() {
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedComponent, setSelectedComponent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedBlock, setExpandedBlock] = useState(null);
    const [showReleaseModal, setShowReleaseModal] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);

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
        setSelectedBlock(null);
        setStep(1);
        setOtp(['', '', '', '', '', '']);
        setCaptchaInput('');
        setShowVerified(false);
    };

    // Mock data - Blocks with PM-AJAY fund allocation
    const blocksData = [
        {
            id: 'BLK-001',
            name: 'Shirdi Block',
            district: 'Ahmednagar',
            allocatedBudget: 10000000, // 1 Cr
            releasedAmount: 6000000,   // 60 lakhs
            pendingRelease: 4000000,   // 40 lakhs
            villages: 15,
            components: {
                adarshgram: { allocated: 4000000, released: 2400000, pending: 1600000 },
                grantInAid: { allocated: 3500000, released: 2100000, pending: 1400000 },
                hosteller: { allocated: 2500000, released: 1500000, pending: 1000000 }
            },
            lastReleaseDate: '2024-12-01',
            utilizationPercentage: 60,
            status: 'Active',
            blockOfficer: 'Ramesh Kumar',
            readyForRelease: true
        },
        {
            id: 'BLK-002',
            name: 'Kopargaon Block',
            district: 'Ahmednagar',
            allocatedBudget: 8500000,
            releasedAmount: 5100000,
            pendingRelease: 3400000,
            villages: 12,
            components: {
                adarshgram: { allocated: 3400000, released: 2040000, pending: 1360000 },
                grantInAid: { allocated: 3000000, released: 1800000, pending: 1200000 },
                hosteller: { allocated: 2100000, released: 1260000, pending: 840000 }
            },
            lastReleaseDate: '2024-11-28',
            utilizationPercentage: 60,
            status: 'Active',
            blockOfficer: 'Priya Sharma',
            readyForRelease: true
        },
        {
            id: 'BLK-003',
            name: 'Nashik Block',
            district: 'Nashik',
            allocatedBudget: 12000000,
            releasedAmount: 7200000,
            pendingRelease: 4800000,
            villages: 18,
            components: {
                adarshgram: { allocated: 4800000, released: 2880000, pending: 1920000 },
                grantInAid: { allocated: 4200000, released: 2520000, pending: 1680000 },
                hosteller: { allocated: 3000000, released: 1800000, pending: 1200000 }
            },
            lastReleaseDate: '2024-12-05',
            utilizationPercentage: 60,
            status: 'Active',
            blockOfficer: 'Amit Patel',
            readyForRelease: true
        },
        {
            id: 'BLK-004',
            name: 'Pune Rural Block',
            district: 'Pune',
            allocatedBudget: 9000000,
            releasedAmount: 4500000,
            pendingRelease: 4500000,
            villages: 14,
            components: {
                adarshgram: { allocated: 3600000, released: 1800000, pending: 1800000 },
                grantInAid: { allocated: 3150000, released: 1575000, pending: 1575000 },
                hosteller: { allocated: 2250000, released: 1125000, pending: 1125000 }
            },
            lastReleaseDate: '2024-11-25',
            utilizationPercentage: 50,
            status: 'Active',
            blockOfficer: 'Sunita Desai',
            readyForRelease: true
        }
    ];

    // Get filtered blocks
    const getFilteredBlocks = () => {
        return blocksData.filter(block => {
            const matchesDistrict = selectedDistrict === 'all' || block.district === selectedDistrict;
            const matchesComponent = selectedComponent === 'all';
            const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                block.district.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDistrict && matchesComponent && matchesSearch;
        });
    };

    const filteredBlocks = getFilteredBlocks();

    // Calculate statistics
    const stats = {
        totalBlocks: blocksData.length,
        totalAllocated: blocksData.reduce((sum, b) => sum + b.allocatedBudget, 0),
        totalReleased: blocksData.reduce((sum, b) => sum + b.releasedAmount, 0),
        totalPending: blocksData.reduce((sum, b) => sum + b.pendingRelease, 0),
        avgUtilization: Math.round(blocksData.reduce((sum, b) => sum + b.utilizationPercentage, 0) / blocksData.length)
    };

    const componentNames = {
        adarshgram: 'Adarshgram',
        grantInAid: 'Grant-in-Aid',
        hosteller: 'Hosteller'
    };

    const handleReleaseFund = (block) => {
        setSelectedBlock(block);
        setShowReleaseModal(true);
        setStep(1);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white border-l-4 border-l-blue-600 p-4 rounded-r-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Block-wise Fund Releases</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Release PM-AJAY scheme funds to Blocks for village-level implementation
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Building2 size={24} className="text-blue-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Blocks</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalBlocks}</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">Budget: ₹{(stats.totalAllocated / 10000000).toFixed(2)} Cr</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Funds Released</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{(stats.totalReleased / 10000000).toFixed(2)} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stats.totalReleased / stats.totalAllocated) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} className="text-orange-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Pending Release</p>
                            <h3 className="text-2xl font-bold text-gray-900">₹{(stats.totalPending / 10000000).toFixed(2)} Cr</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">{((stats.totalPending / stats.totalAllocated) * 100).toFixed(1)}% remaining</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-purple-600" />
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Utilization</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.avgUtilization}%</h3>
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">Block performance</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={20} className="text-gray-600" />
                    <h3 className="font-bold text-gray-900">Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">District</label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Districts</option>
                            <option value="Ahmednagar">Ahmednagar</option>
                            <option value="Nashik">Nashik</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Component</label>
                        <select
                            value={selectedComponent}
                            onChange={(e) => setSelectedComponent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Components</option>
                            <option value="adarshgram">Adarshgram</option>
                            <option value="grantInAid">Grant-in-Aid</option>
                            <option value="hosteller">Hosteller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search blocks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Blocks List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded"></span>
                    Blocks - PM-AJAY Fund Allocation
                </h2>
                <div className="space-y-4">
                    {filteredBlocks.map(block => (
                        <div key={block.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="bg-blue-50 p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                                onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        {expandedBlock === block.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">{block.name}</h4>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {block.district}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Building2 size={14} />
                                                    {block.villages} Villages
                                                </span>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                    {block.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{(block.allocatedBudget / 10000000).toFixed(2)} Cr</p>
                                        <p className="text-xs text-gray-600">
                                            Released: {((block.releasedAmount / block.allocatedBudget) * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {expandedBlock === block.id && (
                                <div className="p-4 bg-gray-50">
                                    <h5 className="font-semibold text-gray-900 mb-3">Component-wise Fund Allocation</h5>
                                    <div className="space-y-3">
                                        {Object.entries(block.components).map(([key, component]) => (
                                            <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h6 className="font-semibold text-gray-900">{componentNames[key]}</h6>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${key === 'adarshgram' ? 'bg-blue-100 text-blue-700' :
                                                                    key === 'grantInAid' ? 'bg-green-100 text-green-700' :
                                                                        'bg-orange-100 text-orange-700'
                                                                }`}>
                                                                {componentNames[key]}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-gray-600">Allocated</p>
                                                                <p className="font-semibold text-gray-900">₹{(component.allocated / 100000).toFixed(2)}L</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-600">Released</p>
                                                                <p className="font-semibold text-green-600">₹{(component.released / 100000).toFixed(2)}L</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-600">Pending</p>
                                                                <p className="font-semibold text-orange-600">₹{(component.pending / 100000).toFixed(2)}L</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {((component.released / component.allocated) * 100).toFixed(0)}%
                                                        </p>
                                                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${(component.released / component.allocated) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {block.readyForRelease && block.pendingRelease > 0 && (
                                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                                            <p className="text-blue-800 font-medium text-sm mb-2">✓ Ready for Fund Release</p>
                                            <p className="text-blue-700 text-xs mb-1">Block Officer: {block.blockOfficer}</p>
                                            <p className="text-blue-700 text-xs mb-3">Pending Amount: ₹{(block.pendingRelease / 10000000).toFixed(2)} Cr</p>
                                            <button
                                                onClick={() => handleReleaseFund(block)}
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm"
                                            >
                                                Release Fund to Block (₹{(block.pendingRelease / 10000000).toFixed(2)} Cr)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredBlocks.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <FileText size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No blocks found matching your filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment/Release Modal */}
            {showReleaseModal && selectedBlock && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-gray-50 rounded-lg shadow-2xl max-w-2xl w-full my-8">
                        {/* Progress Steps */}
                        <div className="bg-white rounded-t-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                {['Transaction Details', 'Verification', 'Complete'].map((label, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > index + 1 ? 'bg-green-500 text-white' :
                                            step === index + 1 ? 'bg-blue-500 text-white' :
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
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Block Fund Release Details</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Block</span>
                                            <span className="font-bold text-gray-900">{selectedBlock.name}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">District</span>
                                            <span className="font-bold text-gray-900">{selectedBlock.district}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Block Officer</span>
                                            <span className="font-bold text-gray-900">{selectedBlock.blockOfficer}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Villages Covered</span>
                                            <span className="font-bold text-gray-900">{selectedBlock.villages}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Amount to Release</span>
                                            <span className="font-bold text-green-600 text-xl">₹{(selectedBlock.pendingRelease / 10000000).toFixed(2)} Cr</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-blue-800 font-medium mb-2">PM-AJAY Scheme Fund Release</p>
                                        <p className="text-xs text-blue-700">This fund will be released to {selectedBlock.name} for distribution across {selectedBlock.villages} villages under PM-AJAY components (Adarshgram, Grant-in-Aid, Hosteller).</p>
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
                                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
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
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Lock className="text-blue-600" size={32} />
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
                                                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-bold"
                                        />
                                    </div>

                                    <button
                                        onClick={verifyOtpAndCaptcha}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mb-3"
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
                                    <p className="text-gray-600 mb-4">Fund release to block has been completed successfully</p>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
                                        <p className="text-xl font-bold text-gray-900">TXN-{Math.floor(Math.random() * 1000000)}</p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-green-800">
                                            ✓ Amount: ₹{(selectedBlock.pendingRelease / 10000000).toFixed(2)} Cr<br />
                                            ✓ Block: {selectedBlock.name}<br />
                                            ✓ District: {selectedBlock.district}<br />
                                            ✓ Villages: {selectedBlock.villages}
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
