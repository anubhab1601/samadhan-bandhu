import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Shield, Lock, RefreshCw, Building, ArrowRight } from 'lucide-react';

export default function StateFundTransaction() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId, phase } = location.state || {};

    const [step, setStep] = useState(1); // 1: Details, 2: OTP + Captcha, 3: Success
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [showVerified, setShowVerified] = useState(false);

    const otpRefs = useRef([]);

    useEffect(() => {
        if (!projectId || !phase) {
            navigate('/state/dashboard');
        }
    }, [projectId, phase, navigate]);

    useEffect(() => {
        generateCaptcha();
    }, []);

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
            // Redirect after 3 more seconds
            setTimeout(() => {
                navigate('/state/dashboard');
            }, 3000);
        }, 2000);
    };

    if (!projectId) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white border-l-4 border-l-green-600 p-4 rounded-r-lg shadow-sm mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Fund Release Transaction</h1>
                    <p className="text-sm text-gray-600 mt-1">Secure payment gateway for Block disbursements</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-center justify-between">
                        {['Payment Details', 'Secure Verification', 'Transaction Complete'].map((label, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > index + 1 ? 'bg-green-500 text-white' :
                                    step === index + 1 ? 'bg-blue-600 text-white' :
                                        'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step > index + 1 ? <Check size={20} /> : index + 1}
                                </div>
                                {index < 2 && (
                                    <div className={`w-24 md:w-40 h-1 mx-2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 px-2">
                        <span className="text-xs font-medium text-gray-600">Details</span>
                        <span className="text-xs font-medium text-gray-600">Verification</span>
                        <span className="text-xs font-medium text-gray-600">Complete</span>
                    </div>
                </div>

                {/* Step 1: Payment Details */}
                {step === 1 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Building className="text-blue-600" />
                            Payment Summary
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-600">Project ID</span>
                                <span className="font-bold text-gray-900">{projectId}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-600">Payment Phase</span>
                                <span className="font-bold text-blue-600">Phase {phase.phase}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-600">IVA Status</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    {phase.ivaStatus}
                                </span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                                <span className="font-bold text-green-600 text-2xl">₹{phase.amount}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                <Shield className="inline mr-2" size={16} />
                                This transaction is secured. You will need to verify via OTP sent to your registered mobile number.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            Proceed to Secure Payment <ArrowRight size={18} />
                        </button>
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
                            <p className="text-gray-600">Enter OTP and Captcha to authorize fund release</p>
                        </div>

                        {/* OTP Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Enter 6-Digit OTP</label>
                            <div className="flex justify-center gap-2 md:gap-3 mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => otpRefs.current[index] = el}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-10 h-10 md:w-12 md:h-12 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 text-center">OTP sent to +91 98*** **210</p>
                        </div>

                        {/* Captcha Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Security Captcha</label>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-lg p-3 text-center select-none">
                                    <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-[0.5em] line-through decoration-wavy decoration-gray-400" style={{ fontFamily: 'monospace' }}>
                                        {captcha}
                                    </span>
                                </div>
                                <button
                                    onClick={generateCaptcha}
                                    className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    title="Refresh Captcha"
                                >
                                    <RefreshCw size={20} className="text-gray-700" />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                placeholder="Enter the characters shown above"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={verifyOtpAndCaptcha}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 shadow-md transition-all active:scale-[0.98]"
                            >
                                Verify & Release Funds
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Verification Success Message */}
                {step === 2 && showVerified && (
                    <div className="bg-white rounded-lg shadow p-6 text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <Check className="text-green-600" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Verification Successful!</h2>
                        <p className="text-gray-600">Processing fund transfer...</p>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <Check className="text-white" size={40} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-8">Funds have been successfully released to the agency.</p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Transaction ID</p>
                                    <p className="text-sm font-bold text-gray-900 font-mono">TXN-{Math.floor(Math.random() * 1000000000)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Date</p>
                                    <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Amount Paid</p>
                                    <p className="text-lg font-bold text-green-600">₹{phase.amount}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Status</p>
                                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">Completed</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">Redirecting to Payments page...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
